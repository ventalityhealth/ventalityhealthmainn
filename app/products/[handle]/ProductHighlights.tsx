"use client"

import React, { useMemo, useState } from "react"
import {
  Zap,
  Moon,
  Brain,
  Heart,
  ShieldCheck,
  Activity,
  Leaf,
  Sparkles,
  Dumbbell,
  Droplets,
  Sun,
  Flame,
  Bone,
  Timer,
  RefreshCw,
  FlaskConical,
  Pill,
  ChevronDown,
} from "lucide-react"
import type { LucideProps } from "lucide-react"

type IconComp = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>

interface GridItem {
  icon: IconComp
  label: string
  sourceText?: string
}

interface SupplementFactRow {
  label: string
  amount: string
  dv?: string
}

interface SupplementFactsData {
  servingSize: string
  servingsPerContainer: string
  rows: SupplementFactRow[]
}

interface BenefitNode {
  icon: IconComp
  label: string
  eyebrow: string
  summary: string
  metric: string
  facts: string[]
  hasFacts: boolean
  details: string[]
  sourceClaim: string | null
}

// ── Tag → icon grid item ─────────────────────────────────────────────────────
const TAG_GRID: Record<string, GridItem> = {
  wellness:          { icon: Sun,         label: "Daily Wellness" },
  performance:       { icon: Activity,    label: "Performance" },
  energy:            { icon: Zap,         label: "Energy" },
  immunity:          { icon: ShieldCheck, label: "Immunity" },
  "immune-support":  { icon: ShieldCheck, label: "Immune Defense" },
  sleep:             { icon: Moon,        label: "Better Sleep" },
  relaxation:        { icon: Moon,        label: "Relaxation" },
  focus:             { icon: Brain,       label: "Focus & Clarity" },
  cognitive:         { icon: Brain,       label: "Cognitive Support" },
  "brain-health":    { icon: Brain,       label: "Brain Health" },
  adaptogen:         { icon: Leaf,        label: "Adaptogenic" },
  mushroom:          { icon: Sparkles,    label: "Functional Mushrooms" },
  "weight-management":{ icon: Flame,      label: "Weight Management" },
  thermogenic:       { icon: Flame,       label: "Thermogenic" },
  collagen:          { icon: Sparkles,    label: "Skin & Joints" },
  protein:           { icon: Dumbbell,    label: "Protein" },
  omega:             { icon: Heart,       label: "Heart & Brain" },
  "vitamin-d":       { icon: Sun,         label: "Bone Health" },
  magnesium:         { icon: Moon,        label: "Recovery" },
  probiotic:         { icon: Leaf,        label: "Gut Health" },
  gut:               { icon: Leaf,        label: "Gut Health" },
  antioxidant:       { icon: Sparkles,    label: "Antioxidant" },
  "stress-relief":   { icon: Brain,       label: "Stress Relief" },
  hormone:           { icon: Activity,    label: "Hormone Balance" },
  detox:             { icon: RefreshCw,   label: "Detox Support" },
  "joint-health":    { icon: Bone,        label: "Joint Support" },
  recovery:          { icon: Timer,       label: "Recovery" },
  strength:          { icon: Dumbbell,    label: "Strength" },
  hydration:         { icon: Droplets,    label: "Hydration" },
  multivitamin:      { icon: Pill,        label: "Complete Formula" },
  vitamin:           { icon: Pill,        label: "Vitamins" },
  mineral:           { icon: FlaskConical, label: "Minerals" },
}

// ── Keyword → icon for benefit text fallback ─────────────────────────────────
function benefitLabel(text: string): string {
  const cleaned = text
    .replace(/\s+/g, " ")
    .replace(/[.:;]+$/g, "")
    .trim()

  if (cleaned.length <= 34) return cleaned

  const beforeDash = cleaned.split(/\s[—–-]\s/)[0]?.trim()
  if (beforeDash && beforeDash.length <= 34) return beforeDash

  const words = cleaned.split(" ").slice(0, 4).join(" ")
  return words.length > 34 ? `${words.slice(0, 31).trim()}...` : words
}

function iconFromBenefitText(text: string): GridItem {
  const l = text.toLowerCase()
  const label = benefitLabel(text)
  if (/energy|endurance|vitality|fuel/.test(l))       return { icon: Zap,         label, sourceText: text }
  if (/sleep|rest|relax|calm|night/.test(l))          return { icon: Moon,        label, sourceText: text }
  if (/focus|cognit|brain|mental|clarity/.test(l))    return { icon: Brain,       label, sourceText: text }
  if (/heart|cardio|blood/.test(l))                   return { icon: Heart,       label, sourceText: text }
  if (/immune|immunit|defense|protect/.test(l))       return { icon: ShieldCheck, label, sourceText: text }
  if (/gut|digest|probiotic|microbiome/.test(l))      return { icon: Leaf,        label, sourceText: text }
  if (/antioxid|cellular|longevity/.test(l))          return { icon: Sparkles,    label, sourceText: text }
  if (/metabol|thermogen|weight|fat/.test(l))         return { icon: Flame,       label, sourceText: text }
  if (/muscle|strength|athletic|sport|workout/.test(l)) return { icon: Dumbbell, label, sourceText: text }
  if (/hydrat|water|fluid/.test(l))                   return { icon: Droplets,    label, sourceText: text }
  if (/recover/.test(l))                              return { icon: Timer,       label, sourceText: text }
  if (/hormone|stress|cortisol/.test(l))              return { icon: Activity,    label, sourceText: text }
  return { icon: Sparkles, label: text.slice(0, 18), sourceText: text }
}

const NODE_TEMPLATES = [
  {
    key: "complete",
    match: /complete|multi|wellness|daily|vitamin/,
    icon: Pill,
    label: "Complete Daily Coverage",
    eyebrow: "Foundation support",
    terms: [
      "vitamin a",
      "vitamin c",
      "vitamin d",
      "vitamin e",
      "vitamin k",
      "thiamin",
      "riboflavin",
      "niacin",
      "vitamin b6",
      "folate",
      "vitamin b12",
      "biotin",
      "pantothenic",
    ],
    summary:
      "A broad daily baseline for people who want one formula covering major vitamin needs instead of piecing together several separate products.",
    details: [
      "Best for filling common nutrition gaps from busy schedules, limited food variety, or inconsistent meal planning.",
      "The label-backed value is breadth: multiple core micronutrients are grouped into one daily serving.",
      "Use it as a foundation, then add more targeted supplements only when your goals or clinician guidance call for them.",
    ],
  },
  {
    key: "mineral",
    match: /mineral|bone|electrolyte/,
    icon: FlaskConical,
    label: "Essential Minerals",
    eyebrow: "Structure and balance",
    terms: [
      "calcium",
      "magnesium",
      "zinc",
      "selenium",
      "copper",
      "manganese",
      "chromium",
      "molybdenum",
      "iodine",
      "potassium",
    ],
    summary:
      "Minerals help round out the formula with nutrients tied to normal enzyme function, bone maintenance, thyroid support, and electrolyte balance.",
    details: [
      "Minerals often work alongside vitamins, so seeing both on the same facts panel is useful when comparing daily formulas.",
      "Zinc and selenium are especially relevant when users care about immune, antioxidant, and men's wellness positioning.",
      "Amounts matter: the expanded facts below show the listed label amounts when available.",
    ],
  },
  {
    key: "immune",
    match: /immune|immunity|defense|shield/,
    icon: ShieldCheck,
    label: "Immune Defense",
    eyebrow: "Everyday resilience",
    terms: ["vitamin c", "vitamin d", "zinc", "selenium", "vitamin a", "vitamin e"],
    summary:
      "Immune support is represented through nutrients commonly used in daily formulas to support normal immune system function.",
    details: [
      "This is daily support language, not a promise to prevent or treat illness.",
      "The most useful comparison points are whether the formula includes vitamin C, vitamin D, zinc, selenium, and antioxidant vitamins.",
      "Pair with sleep, protein intake, hydration, and consistent meals for a more complete immune-support routine.",
    ],
  },
  {
    key: "antioxidant",
    match: /antioxid|cellular|free radical|longevity/,
    icon: Sparkles,
    label: "Antioxidant Network",
    eyebrow: "Cellular protection",
    terms: [
      "vitamin c",
      "vitamin e",
      "selenium",
      "zinc",
      "manganese",
      "lycopene",
      "lutein",
      "green tea",
    ],
    summary:
      "Antioxidant support helps explain the formula's role in defending cells from everyday oxidative stress.",
    details: [
      "Look for classic antioxidant nutrients like vitamins C and E, selenium, zinc, manganese, or plant-based antioxidant extracts.",
      "This benefit is about nutritional support for normal cellular defense systems.",
      "The label facts make the claim easier to evaluate because users can see the specific antioxidant-related nutrients present.",
    ],
  },
  {
    key: "prostate",
    match: /prostate|men|male/,
    icon: Activity,
    label: "Prostate and Men's Wellness",
    eyebrow: "Targeted male support",
    terms: [
      "prostate",
      "saw palmetto",
      "pygeum",
      "pumpkin",
      "lycopene",
      "zinc",
      "selenium",
      "beta-sitosterol",
    ],
    summary:
      "This node focuses on men's wellness ingredients and minerals often associated with prostate-focused daily support.",
    details: [
      "The strongest product representation comes from prostate-specific botanicals or minerals shown directly on the label.",
      "Zinc, selenium, lycopene, saw palmetto, pumpkin seed, and similar ingredients are useful comparison points.",
      "Anyone managing a prostate condition or taking medication should check with a healthcare professional before use.",
    ],
  },
  {
    key: "energy",
    match: /energy|vitality|performance|metabol|fuel/,
    icon: Zap,
    label: "Energy Metabolism",
    eyebrow: "Daily vitality",
    terms: [
      "thiamin",
      "riboflavin",
      "niacin",
      "vitamin b6",
      "vitamin b12",
      "biotin",
      "pantothenic",
      "chromium",
    ],
    summary:
      "Energy support is represented by B vitamins and related nutrients that help the body convert food into usable energy.",
    details: [
      "This is not stimulant energy. It is nutritional support for normal energy metabolism.",
      "B-complex coverage is one of the clearest signals to review when comparing multivitamins for daily vitality.",
      "Consistency matters more than taking extra servings, so follow the label directions.",
    ],
  },
  {
    key: "heart",
    match: /heart|cardio|circulat|blood/,
    icon: Heart,
    label: "Heart and Circulation",
    eyebrow: "Cardio support",
    terms: ["folate", "vitamin b6", "vitamin b12", "magnesium", "potassium", "coq10", "omega"],
    summary:
      "Cardio support is represented through nutrients that contribute to normal cardiovascular and metabolic function.",
    details: [
      "Useful facts to look for include folate, B6, B12, magnesium, potassium, omega ingredients, or CoQ10.",
      "This node helps users separate general daily support from disease-treatment claims.",
      "Review the listed amounts and consult a clinician if you manage blood pressure, cholesterol, or heart medication.",
    ],
  },
  {
    key: "brain",
    match: /brain|focus|cognitive|clarity|mental/,
    icon: Brain,
    label: "Focus and Nervous System",
    eyebrow: "Mental performance",
    terms: ["vitamin b6", "vitamin b12", "folate", "magnesium", "choline", "bacopa", "ginkgo"],
    summary:
      "Cognitive support is represented by nutrients involved in normal nervous system function and mental energy.",
    details: [
      "For a multivitamin, the strongest signals are usually B vitamins, magnesium, choline, or named nootropic botanicals.",
      "This benefit is most relevant for users looking for steady nutritional support rather than a stimulant effect.",
      "The facts panel below keeps the explanation tied to what the product actually lists.",
    ],
  },
  {
    key: "botanical",
    match: /herbal|botanical|extract|plant|adaptogen/,
    icon: Leaf,
    label: "Botanical Extracts",
    eyebrow: "Plant-based additions",
    terms: ["extract", "root", "berry", "leaf", "fruit", "herb", "saw palmetto", "green tea"],
    summary:
      "Botanical ingredients can add targeted support beyond standard vitamins and minerals.",
    details: [
      "Extracts are worth reviewing by name because their purpose varies widely by plant.",
      "This section helps shoppers connect each plant ingredient to the product's broader support story.",
      "Check warnings carefully if you take medication, are pregnant or nursing, or have a medical condition.",
    ],
  },
]

function formatFact(row: SupplementFactRow): string {
  const amount = row.amount ? ` - ${row.amount}` : ""
  const dv = row.dv ? ` (${row.dv} DV)` : ""
  return `${row.label}${amount}${dv}`
}

function findFacts(
  supplementFacts: SupplementFactsData | null | undefined,
  terms: string[],
  claimText?: string | null
): string[] {
  if (!supplementFacts?.rows.length) return []

  // Build search terms: template terms + significant words from the claim text
  const claimWords = claimText
    ? claimText
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 3)
    : []

  const normalizedTerms = [
    ...terms.map((t) => t.toLowerCase()),
    ...claimWords,
  ]

  const seen = new Set<string>()

  return supplementFacts.rows
    .filter((row) => {
      const label = row.label.toLowerCase()
      return normalizedTerms.some((term) => label.includes(term))
    })
    .map(formatFact)
    .filter((fact) => {
      if (seen.has(fact)) return false
      seen.add(fact)
      return true
    })
    .slice(0, 6)
}

function buildBenefitNode(
  item: GridItem,
  benefits: string[],
  supplementFacts: SupplementFactsData | null | undefined
): BenefitNode {
  const context = [item.label, item.sourceText].filter(Boolean).join(" ").toLowerCase()
  const template =
    NODE_TEMPLATES.find((node) => node.match.test(context)) ?? NODE_TEMPLATES[0]

  const sourceClaim =
    item.sourceText ??
    benefits.find((benefit) => template.match.test(benefit.toLowerCase())) ??
    null

  // Search template terms first; also pass claim text so product-specific
  // ingredient names (e.g. "L-Glutamine", "NAD+") get matched even when they
  // don't appear in the generic template term list.
  const facts = findFacts(supplementFacts, template.terms, sourceClaim)
  const hasFacts = facts.length > 0
  const factCount = supplementFacts?.rows.length ?? 0

  return {
    icon: template.icon ?? item.icon,
    label: sourceClaim ? benefitLabel(sourceClaim) : template.label,
    eyebrow: template.eyebrow,
    summary: sourceClaim ? sourceClaim : template.summary,
    metric:
      hasFacts
        ? `${facts.length} label fact${facts.length === 1 ? "" : "s"} matched`
        : sourceClaim
          ? "Supliful claim"
          : `${factCount} label fact${factCount === 1 ? "" : "s"}`,
    facts,
    hasFacts,
    details: template.details,
    sourceClaim,
  }
}

function dedupeNodes(nodes: BenefitNode[]): BenefitNode[] {
  const seen = new Set<string>()
  return nodes.filter((node) => {
    if (seen.has(node.label)) return false
    seen.add(node.label)
    return true
  })
}

interface ProductHighlightsProps {
  productTitle: string
  description: string
  tags: string[]
  benefits: string[]
  supplementFacts?: SupplementFactsData | null
}

export default function ProductHighlights({
  productTitle,
  description,
  tags,
  benefits,
  supplementFacts,
}: ProductHighlightsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // ── Use case chips (tag-based, max 4) ───────────────────────────────────
  const useCaseChips = tags
    .map((t) => TAG_GRID[t.toLowerCase().trim()])
    .filter((x): x is GridItem => Boolean(x))
    .slice(0, 4)

  // ── Benefit nodes (6 max) ────────────────────────────────────────────────
  // Primary: Supliful benefit copy, then tags when benefit copy is sparse.
  const seenLabels = new Set<string>()
  const benefitItems: GridItem[] = []
  for (const b of benefits) {
    const item = iconFromBenefitText(b)
    if (!seenLabels.has(item.label)) {
      seenLabels.add(item.label)
      benefitItems.push(item)
    }
    if (benefitItems.length >= 6) break
  }

  const tagItems: GridItem[] = []
  if (benefitItems.length < 6) {
    for (const t of tags) {
      const item = TAG_GRID[t.toLowerCase().trim()]
      if (!seenLabels.has(item.label)) {
        seenLabels.add(item.label)
        tagItems.push({ ...item, sourceText: t })
      }
      if (benefitItems.length + tagItems.length >= 6) break
    }
  }

  const gridItems = [...benefitItems, ...tagItems].slice(0, 6)

  const benefitNodes = useMemo(() => {
    const initialNodes = gridItems.map((item) =>
      buildBenefitNode(item, benefits, supplementFacts)
    )
    return dedupeNodes(initialNodes).slice(0, 6)
  }, [benefits, gridItems, supplementFacts])

  const activeNode = benefitNodes[Math.min(activeIndex, benefitNodes.length - 1)]
  const descriptionLead = description.trim().split(/(?<=[.!?])\s+/)[0] ?? ""
  const proofPoints = [
    supplementFacts?.servingSize ? `Serving size: ${supplementFacts.servingSize}` : null,
    supplementFacts?.rows.length ? `${supplementFacts.rows.length} listed Supplement Facts` : null,
    benefits.length ? `${benefits.length} Supliful benefit claim${benefits.length === 1 ? "" : "s"}` : null,
  ].filter(Boolean)

  return (
    <div className="mt-5 space-y-5">

      {/* ── Use case chips ────────────────────────────────────────────────
          Animated pill tags showing product categories / target use cases
      ──────────────────────────────────────────────────────────────────── */}
      {useCaseChips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {useCaseChips.map(({ icon: Icon, label }, i) => (
            <div
              key={label}
              className="animate-fade-in-up flex items-center gap-1.5 px-3 py-1.5 rounded-full select-none"
              style={{
                animationDelay: `${80 + i * 70}ms`,
                animationFillMode: "both",
                border: "1px solid rgba(168,209,255,0.13)",
                background: "rgba(168,209,255,0.04)",
              }}
            >
              <Icon
                className="w-3 h-3 flex-shrink-0"
                style={{ color: "var(--vt-accent-blue)" }}
                strokeWidth={1.75}
              />
              <span
                className="text-xs font-medium tracking-wide"
                style={{ color: "var(--vt-text-soft)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── Interactive benefit nodes ─────────────────────────────────────
          Clickable bubbles expand into a data-rich formula explanation.
      ──────────────────────────────────────────────────────────────────── */}
      {benefitNodes.length > 0 && activeNode && (
        <div
          className="rounded-[28px] p-3 sm:p-4"
          style={{
            border: "1px solid var(--vt-line)",
            background:
              "radial-gradient(circle at 50% 0%, rgba(168,209,255,0.10), transparent 38%), rgba(255,255,255,0.014)",
          }}
        >
          <div className="mb-4 rounded-[22px] p-4 sm:p-5" style={{
            border: "1px solid rgba(168,209,255,0.12)",
            background: "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012))",
          }}>
            <div className="max-w-2xl">
              <p className="label-xs" style={{ color: "var(--vt-muted-2)" }}>
                Personalized Formula Guide
              </p>
              <h2
                className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl"
                style={{ color: "var(--vt-text)" }}
              >
                What {productTitle} is built to support
              </h2>
              <p className="mt-3 text-sm leading-7" style={{ color: "var(--vt-muted)" }}>
                {descriptionLead ||
                  "This chart turns the product's Supliful benefit copy and Supplement Facts into a quick buying guide."}{" "}
                Tap each bubble to compare the claim, the relevant label facts, and what that means before adding it to your routine.
              </p>
            </div>
            {proofPoints.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {proofPoints.map((point) => (
                  <span
                    key={point}
                    className="rounded-full px-3 py-1.5 text-[0.68rem] font-medium"
                    style={{
                      color: "var(--vt-text-soft)",
                      border: "1px solid var(--vt-line)",
                      background: "rgba(255,255,255,0.025)",
                    }}
                  >
                    {point}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {benefitNodes.map(({ icon: Icon, label, metric }, i) => {
              const selected = i === activeIndex
              return (
                <button
                  key={`${label}-${i}`}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveIndex(i)}
                  className={[
                    "animate-fade-in-up group relative min-h-[104px] rounded-full px-3 py-4 text-center",
                    "flex flex-col items-center justify-center gap-2 outline-none",
                    "transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-white/40",
                    selected
                      ? "z-10 -translate-y-2 scale-[1.04]"
                      : "translate-y-0 hover:-translate-y-1 hover:scale-[1.02]",
                  ].join(" ")}
                  style={{
                    animationDelay: `${200 + i * 60}ms`,
                    animationFillMode: "both",
                    border: selected
                      ? "1px solid rgba(168,209,255,0.44)"
                      : "1px solid var(--vt-line)",
                    background: selected
                      ? "radial-gradient(circle at 50% 15%, rgba(221,239,255,0.22), rgba(168,209,255,0.07) 48%, rgba(255,255,255,0.025) 100%)"
                      : "radial-gradient(circle at 50% 0%, rgba(168,209,255,0.09), rgba(255,255,255,0.016) 58%)",
                    boxShadow: selected
                      ? "0 18px 45px rgba(0,0,0,0.34), 0 0 26px rgba(168,209,255,0.13)"
                      : "0 10px 28px rgba(0,0,0,0.20)",
                  }}
                >
                  <span
                    className="absolute inset-2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  />
                  <span
                    className="relative flex h-9 w-9 items-center justify-center rounded-full"
                    style={{
                      background: "rgba(168,209,255,0.08)",
                      border: "1px solid rgba(168,209,255,0.14)",
                    }}
                  >
                    <Icon
                      className="h-4 w-4"
                      style={{ color: "var(--vt-accent-blue)" }}
                      strokeWidth={1.6}
                    />
                  </span>
                  <span
                    className="relative text-xs font-semibold leading-tight sm:text-[0.8rem]"
                    style={{ color: "var(--vt-text-soft)" }}
                  >
                    {label}
                  </span>
                  <span className="relative text-[0.62rem] leading-tight" style={{ color: "var(--vt-muted-2)" }}>
                    {metric}
                  </span>
                </button>
              )
            })}
          </div>

          <div
            className="mt-3 rounded-[24px] p-4 sm:p-5 transition-all duration-300"
            style={{
              border: "1px solid rgba(168,209,255,0.13)",
              background:
                "linear-gradient(180deg, rgba(18,25,37,0.94), rgba(11,16,23,0.96))",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="label-xs" style={{ color: "var(--vt-accent-blue)" }}>
                  {activeNode.eyebrow}
                </p>
                <h2
                  className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl"
                  style={{ color: "var(--vt-text)" }}
                >
                  {activeNode.label}
                </h2>
                <p className="mt-3 text-sm leading-7" style={{ color: "var(--vt-muted)" }}>
                  {activeNode.summary}
                </p>

                <div className="mt-4 space-y-2">
                  {activeNode.details.map((detail) => (
                    <p
                      key={detail}
                      className="rounded-2xl px-3 py-2 text-xs leading-6 sm:text-sm"
                      style={{
                        color: "var(--vt-text-soft)",
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid var(--vt-line-soft)",
                      }}
                    >
                      {detail}
                    </p>
                  ))}
                </div>
              </div>

              <div
                className="rounded-[20px] p-4"
                style={{
                  border: "1px solid var(--vt-line)",
                  background: "rgba(255,255,255,0.018)",
                }}
              >
                <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--vt-text-soft)" }}
                  >
                    Full label below
                  </p>
                  <p
                    className="text-xs leading-5 max-w-[180px]"
                    style={{ color: "var(--vt-muted-2)" }}
                  >
                    See the Supplement Facts section for every ingredient and amount.
                  </p>
                  <div className="flex flex-col items-center gap-0.5 mt-1">
                    {[0, 1, 2].map((i) => (
                      <ChevronDown
                        key={i}
                        className="h-4 w-4 animate-bounce"
                        style={{
                          color: "var(--vt-accent-blue)",
                          animationDelay: `${i * 120}ms`,
                          opacity: 1 - i * 0.28,
                        }}
                        strokeWidth={2}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
