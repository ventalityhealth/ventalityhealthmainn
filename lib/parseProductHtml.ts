export interface SupplementFactRow {
  label: string
  amount: string
  dv?: string
  indented?: boolean
}

export interface ParsedProductContent {
  benefits: string[]
  supplementFacts: {
    servingSize: string
    servingsPerContainer: string
    rows: SupplementFactRow[]
  } | null
  ingredients: string | null
  warnings: string | null
}

/** Strip HTML tags and decode common HTML entities */
function decode(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Parses Supliful's raw descriptionHtml into structured sections.
 * Handles the typical Supliful format:
 *   - <ul><li> benefit bullets
 *   - <table> supplement facts
 *   - "Other Ingredients:" paragraph
 *   - Warnings section
 */
export function parseProductHtml(html: string): ParsedProductContent {
  if (!html?.trim()) {
    return { benefits: [], supplementFacts: null, ingredients: null, warnings: null }
  }

  // Collapse all whitespace inside the HTML but keep tag structure intact
  const h = html.replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ')

  // ── Benefits: first non-empty <ul> ──────────────────────────────────────
  const benefits: string[] = []
  const ulBlocks = [...h.matchAll(/<ul[^>]*>(.*?)<\/ul>/gi)]
  for (const m of ulBlocks) {
    const liItems = [...m[1].matchAll(/<li[^>]*>(.*?)<\/li>/gi)]
    const texts = liItems.map((li) => decode(li[1])).filter((t) => t.length > 4)
    if (texts.length > 0) {
      benefits.push(...texts.slice(0, 6))
      break
    }
  }

  // ── Supplement Facts table ──────────────────────────────────────────────
  let supplementFacts: ParsedProductContent['supplementFacts'] = null
  const tableMatch = h.match(/<table[^>]*>(.*?)<\/table>/i)
  if (tableMatch) {
    const trMatches = [...tableMatch[1].matchAll(/<tr[^>]*>(.*?)<\/tr>/gi)]
    const factRows: SupplementFactRow[] = []
    let servingSize = ''
    let servingsPerContainer = ''

    for (const rowMatch of trMatches) {
      const rawRow = rowMatch[0]
      const cells = [...rowMatch[1].matchAll(/<t[dh][^>]*>(.*?)<\/t[dh]>/gi)]
      const vals = cells.map((c) => decode(c[1]))
      if (vals.length === 0) continue

      const v0Lower = vals[0].toLowerCase()

      // Serving size row
      if (v0Lower.includes('serving size')) {
        const combined = vals.join(' ')
        const m = combined.match(/serving size[:\s]+(.+)/i)
        if (m) {
          // Remove trailing "Servings Per Container..." that sometimes appears in same cell
          servingSize = m[1].replace(/servings per container.*/i, '').trim()
        }
        const m2 = combined.match(/servings per container[:\s]+(\S+)/i)
        if (m2) servingsPerContainer = m2[1]
        continue
      }
      if (v0Lower.includes('servings per container')) {
        servingsPerContainer = vals[1]?.trim() || v0Lower.replace(/servings per container[:\s]*/i, '').trim()
        continue
      }

      // Skip header/label rows
      if (
        v0Lower === '' ||
        v0Lower.includes('amount per serving') ||
        v0Lower.includes('supplement facts') ||
        v0Lower.includes('% daily value') ||
        v0Lower.includes('daily value')
      ) {
        continue
      }

      // Detect indented rows (sub-ingredients) via inline style or leading spaces
      const isIndented =
        /style=["'][^"']*padding-left/i.test(rawRow) ||
        /class=["'][^"']*indent/i.test(rawRow) ||
        vals[0].startsWith('\u00a0') ||
        /^\s{3,}/.test(vals[0])

      const dv = vals[2] && vals[2] !== '†' && vals[2] !== '*' && vals[2] !== '' ? vals[2] : undefined

      factRows.push({
        label: vals[0].replace(/^\s+/, ''),
        amount: vals[1] || '',
        dv,
        indented: isIndented,
      })
    }

    if (factRows.length > 0 || servingSize) {
      supplementFacts = { servingSize, servingsPerContainer, rows: factRows }
    }
  }

  // ── Other Ingredients ───────────────────────────────────────────────────
  let ingredients: string | null = null
  // Look for "Other Ingredients:" either in a <p> or plain text
  const ingMatch = h.match(/other ingredients?[:\s]+([^<]{8,})/i)
  if (ingMatch) {
    ingredients = decode(ingMatch[1]).replace(/\.\s*$/, '').trim() || null
  }

  // ── Warnings ────────────────────────────────────────────────────────────
  let warnings: string | null = null
  // Look for a heading like <h2>Warnings</h2> and capture the content after it
  const warnHeadingMatch = h.match(
    /<h[1-6][^>]*>[^<]*warning[s]?[^<]*<\/h[1-6]>(.*?)(?=<h[1-6]|$)/i
  )
  if (warnHeadingMatch) {
    warnings = decode(warnHeadingMatch[1]).trim() || null
  } else {
    // Fallback: inline "Warning:" or "Caution:" label
    const warnInlineMatch = h.match(/(?:^|>)\s*(?:warning|caution)[:\s]+([^<]{10,})/i)
    if (warnInlineMatch) {
      warnings = decode(warnInlineMatch[1]).trim() || null
    }
  }

  return { benefits, supplementFacts, ingredients, warnings }
}
