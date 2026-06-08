import React from "react"
import type { ParsedProductContent } from "@/lib/parseProductHtml"
import { AlertTriangle } from "lucide-react"

interface SupplementFactsProps {
  data: ParsedProductContent["supplementFacts"]
  ingredients: string | null
  warnings: string | null
  showCoa?: boolean
}

/** Splits a comma-separated ingredient string into individual chips */
function IngredientChips({ raw }: { raw: string }) {
  const chips = raw
    .split(/,\s*/)
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map((chip, i) => (
        <span
          key={i}
          className="inline-block px-2.5 py-1 rounded-full text-xs"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--vt-line)",
            color: "var(--vt-muted)",
          }}
        >
          {chip}
        </span>
      ))}
    </div>
  )
}

export default function SupplementFacts({ data, ingredients, warnings, showCoa }: SupplementFactsProps) {
  return (
    <div className="space-y-6">
      {/* ── Supplement Facts Label ─────────────────────────────────────── */}
      {data && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border: "1px solid var(--vt-line-strong)",
            background: "var(--vt-bg-2)",
          }}
        >
          {/* Header */}
          <div
            className="px-5 py-4"
            style={{ borderBottom: "4px solid var(--vt-line-strong)" }}
          >
            <p
              className="font-bold text-xl tracking-tight"
              style={{ color: "var(--vt-text)" }}
            >
              Supplement Facts
            </p>
            {(data.servingSize || data.servingsPerContainer) && (
              <div className="mt-1 space-y-0.5">
                {data.servingSize && (
                  <p className="text-xs" style={{ color: "var(--vt-muted)" }}>
                    Serving Size: <span style={{ color: "var(--vt-text-soft)" }}>{data.servingSize}</span>
                  </p>
                )}
                {data.servingsPerContainer && (
                  <p className="text-xs" style={{ color: "var(--vt-muted)" }}>
                    Servings Per Container:{" "}
                    <span style={{ color: "var(--vt-text-soft)" }}>{data.servingsPerContainer}</span>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Column headers */}
          {data.rows.length > 0 && (
            <div
              className="flex items-center justify-between px-5 py-2"
              style={{ borderBottom: "2px solid var(--vt-line-strong)" }}
            >
              <span className="label-xs" style={{ color: "var(--vt-muted-2)" }}>
                Amount Per Serving
              </span>
              <span className="label-xs" style={{ color: "var(--vt-muted-2)" }}>
                % Daily Value
              </span>
            </div>
          )}

          {/* Rows */}
          <div>
            {data.rows.map((row, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-5 py-2.5"
                style={{
                  borderBottom:
                    i < data.rows.length - 1 ? "1px solid var(--vt-line-soft)" : "none",
                  paddingLeft: row.indented ? "2rem" : undefined,
                }}
              >
                <span
                  className={`text-sm flex-1 ${row.indented ? "font-normal" : "font-medium"}`}
                  style={{
                    color: row.indented ? "var(--vt-muted)" : "var(--vt-text-soft)",
                  }}
                >
                  {row.label}
                </span>
                <div className="flex items-center gap-6 flex-shrink-0 ml-4">
                  {row.amount && (
                    <span
                      className="text-sm tabular-nums"
                      style={{ color: "var(--vt-text-soft)" }}
                    >
                      {row.amount}
                    </span>
                  )}
                  <span
                    className="text-sm tabular-nums w-10 text-right"
                    style={{ color: row.dv ? "var(--vt-muted)" : "var(--vt-line-strong)" }}
                  >
                    {row.dv ?? "†"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footnote + COA */}
          <div
            className="px-5 py-3 flex items-center justify-between gap-4 flex-wrap"
            style={{ borderTop: "1px solid var(--vt-line)" }}
          >
            <p className="text-xs" style={{ color: "var(--vt-muted-2)" }}>
              † Daily Value not established.
            </p>
            {showCoa && (
              <a
                href="mailto:coa@ventality.com?subject=COA Request"
                className="text-xs flex items-center gap-1 transition-opacity duration-200 hover:opacity-70"
                style={{ color: "var(--vt-accent-blue)", textDecoration: "none" }}
              >
                Request Certificate of Analysis →
              </a>
            )}
          </div>
        </div>
      )}

      {/* ── Other Ingredients ─────────────────────────────────────────── */}
      {ingredients && (
        <div
          className="rounded-2xl p-5"
          style={{
            border: "1px solid var(--vt-line)",
            background: "var(--vt-bg-2)",
          }}
        >
          <p
            className="label-xs mb-3"
            style={{ color: "var(--vt-muted-2)" }}
          >
            Other Ingredients
          </p>
          <IngredientChips raw={ingredients} />
        </div>
      )}

      {/* ── Warnings ──────────────────────────────────────────────────── */}
      {warnings && (
        <div
          className="rounded-2xl p-5 flex gap-3"
          style={{
            border: "1px solid rgba(255,200,100,0.12)",
            background: "rgba(255,200,100,0.03)",
          }}
        >
          <AlertTriangle
            className="w-4 h-4 flex-shrink-0 mt-0.5"
            style={{ color: "rgba(255,200,100,0.45)" }}
            strokeWidth={1.5}
          />
          <div>
            <p
              className="label-xs mb-1.5"
              style={{ color: "rgba(255,200,100,0.45)" }}
            >
              Warnings
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--vt-muted)" }}>
              {warnings}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
