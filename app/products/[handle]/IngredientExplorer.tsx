"use client"

import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { IngredientDetail } from "@/lib/productOverrides"

interface SupplementFactRow {
  label: string
  amount: string
  dv?: string
  indented?: boolean
}

interface IngredientExplorerProps {
  rows: SupplementFactRow[]
  ingredientDetails?: Record<string, IngredientDetail>
}

function findDetail(
  label: string,
  details: Record<string, IngredientDetail> | undefined
): IngredientDetail | undefined {
  if (!details) return undefined
  // Exact match first
  if (details[label]) return details[label]
  // Partial match: key starts with same first word as label, or vice versa
  const labelFirst = label.toLowerCase().split(/[\s(,]/)[0]
  for (const [key, val] of Object.entries(details)) {
    const keyFirst = key.toLowerCase().split(/[\s(,]/)[0]
    if (
      keyFirst === labelFirst ||
      label.toLowerCase().includes(keyFirst) ||
      key.toLowerCase().includes(labelFirst)
    ) {
      return val
    }
  }
  return undefined
}

export default function IngredientExplorer({
  rows,
  ingredientDetails,
}: IngredientExplorerProps) {
  if (!rows.length) return null

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: "1px solid var(--vt-line)",
        background:
          "radial-gradient(circle at 50% 0%, rgba(168,209,255,0.04), transparent 40%), rgba(255,255,255,0.015)",
      }}
    >
      <Accordion defaultValue={["item-0"]}>
        {rows.map((row, i) => {
          const detail = findDetail(row.label, ingredientDetails)
          const isLast = i === rows.length - 1

          return (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className={isLast ? "border-b-0" : ""}
              style={{ borderColor: "var(--vt-line)" }}
            >
              <AccordionTrigger
                className="px-5 py-4 hover:no-underline [&>svg]:shrink-0"
                style={{ color: "var(--vt-text-soft)" }}
              >
                <div className="flex items-center justify-between w-full gap-4 pr-3">
                  <span
                    className="text-sm font-medium text-left"
                    style={{
                      color: detail
                        ? "var(--vt-text-soft)"
                        : "var(--vt-muted)",
                      paddingLeft: row.indented ? "1rem" : undefined,
                    }}
                  >
                    {row.label}
                  </span>
                  {row.amount && (
                    <span
                      className="text-xs font-semibold tabular-nums flex-shrink-0"
                      style={{ color: "var(--vt-accent-blue)" }}
                    >
                      {row.amount}
                    </span>
                  )}
                </div>
              </AccordionTrigger>

              <AccordionContent className="[&_a]:no-underline">
                <div className="px-5 pb-5">
                  {detail ? (
                    <div>
                      <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: "var(--vt-muted)", lineHeight: 1.7 }}
                      >
                        {detail.description}
                      </p>
                      <div>
                        <p
                          className="text-xs font-semibold uppercase tracking-wider mb-2"
                          style={{ color: "var(--vt-muted-2)" }}
                        >
                          Supports
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {detail.supports.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-full text-xs"
                              style={{
                                border: "1px solid rgba(168,209,255,0.18)",
                                color: "var(--vt-accent-blue)",
                                background: "rgba(168,209,255,0.06)",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p
                      className="text-xs"
                      style={{ color: "var(--vt-muted-2)", lineHeight: 1.6 }}
                    >
                      {row.amount && <span>{row.amount}</span>}
                      {row.dv && row.dv !== "**" && row.dv !== "***" && (
                        <span className="ml-2 opacity-60">· {row.dv} Daily Value</span>
                      )}
                    </p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
