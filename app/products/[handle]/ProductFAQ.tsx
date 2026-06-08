"use client"

import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { FaqItem } from "@/lib/productOverrides"

const GENERIC_FAQ: FaqItem[] = [
  {
    q: "Is this product third-party tested?",
    a: "Yes. All Ventality products are manufactured in a cGMP-certified, FDA-registered facility with rigorous quality controls. A Certificate of Analysis is available on request — email coa@ventality.com.",
  },
  {
    q: "When will I notice results?",
    a: "This depends on the product and your individual baseline. Most supplements require 2–4 weeks of consistent daily use to produce noticeable effects. Some ingredient categories — like adaptogens and nootropics — build cumulatively and may require 6–8 weeks. See the product's 'How To Use' section for product-specific guidance.",
  },
  {
    q: "Can I take this with other supplements or medications?",
    a: "Most of our supplements are well-tolerated alongside common supplement stacks. If you take prescription medications, are pregnant or nursing, or have a medical condition, consult your healthcare provider before adding any new supplement.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a 30-day satisfaction guarantee on first orders. Contact support@ventality.com within 30 days of delivery — no lengthy process, no runaround.",
  },
  {
    q: "How should I store this product?",
    a: "Store in a cool, dry place away from direct sunlight and humidity. Do not refrigerate unless directed. Keep out of reach of children. Do not use after the expiration date printed on the label.",
  },
]

interface ProductFAQProps {
  faq?: FaqItem[]
  productTitle?: string
}

export default function ProductFAQ({ faq, productTitle: _ }: ProductFAQProps) {
  const items = faq?.length ? faq : GENERIC_FAQ

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: "1px solid var(--vt-line)",
        background: "rgba(255,255,255,0.015)",
      }}
    >
      <Accordion defaultValue={["q-0"]}>
        {items.map((item, i) => (
          <AccordionItem
            key={i}
            value={`q-${i}`}
            className={i === items.length - 1 ? "border-b-0" : ""}
            style={{ borderColor: "var(--vt-line)" }}
          >
            <AccordionTrigger
              className="px-5 py-4 text-sm font-medium text-left hover:no-underline [&>svg]:shrink-0 [&>svg]:flex-shrink-0"
              style={{ color: "var(--vt-text-soft)" }}
            >
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="[&_a]:text-[var(--vt-accent-blue)]">
              <div className="px-5 pb-5">
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--vt-muted)", lineHeight: 1.7 }}
                >
                  {item.a}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
