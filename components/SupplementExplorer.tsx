"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SupportArea {
  label: string;
  level: number; // 1–5
}

interface Ingredient {
  name: string;
  detail: string;
}

interface Product {
  id: string;
  name: string;
  type: string;
  description: string;
  ingredients: Ingredient[];
  support: SupportArea[];
  use: string;
  handle: string;
}

const PRODUCTS: Product[] = [
  {
    id: "l-glutamine",
    name: "L-Glutamine",
    type: "Performance Powder · Dietary Supplement",
    description:
      "The most abundant amino acid in the body. L-Glutamine provides foundational support for muscle recovery, gut integrity, and day-to-day immune function — in a single, unflavored powder with nothing added.",
    ingredients: [
      { name: "L-Glutamine", detail: "3.3g per serving · pharmaceutical grade" },
      { name: "No fillers", detail: "No artificial flavors, colors, or sweeteners" },
      { name: "30 servings", detail: "3.5 oz / 99g net weight" },
    ],
    support: [
      { label: "Muscle Recovery", level: 5 },
      { label: "Gut Health", level: 4 },
      { label: "Immune Support", level: 3 },
      { label: "Daily Maintenance", level: 4 },
    ],
    use: "Mix 1 scoop (3.3g) into 8–12 oz of water or your preferred beverage. Use daily.",
    handle: "l-glutamine",
  },
  {
    id: "adaptogen-vitality",
    name: "Adaptogen Vitality",
    type: "Orange Flavor · Gummies · Dietary Supplement",
    description:
      "A mushroom-forward adaptogen blend in a daily gummy format. Designed for people who want cognitive clarity, stress resilience, and steady vitality without stimulants — formulated from functional mushrooms and botanical adaptogens.",
    ingredients: [
      { name: "Lion's Mane", detail: "Supports cognitive function" },
      { name: "Chaga", detail: "Antioxidant-rich fungal adaptogen" },
      { name: "Reishi", detail: "Supports stress modulation" },
      { name: "Functional Mushroom Blend", detail: "35 servings · 4.6 oz" },
    ],
    support: [
      { label: "Cognitive Vitality", level: 5 },
      { label: "Stress Support", level: 4 },
      { label: "Immune Function", level: 4 },
      { label: "Daily Energy", level: 3 },
    ],
    use: "Take 1–2 gummies per day. Can be taken at any time with or without food.",
    handle: "adaptogen-vitality-gummies",
  },
  {
    id: "sleep-formula",
    name: "Sleep Formula",
    type: "Natural Sleep Support Complex · Capsules",
    description:
      "A multi-compound sleep support formula combining botanicals and relaxation-promoting compounds. Formulated for those who want to support healthy sleep onset and rest quality — non-habit forming, stimulant-free.",
    ingredients: [
      { name: "Passionflower Extract", detail: "Traditional botanical for calm" },
      { name: "Chamomile Extract", detail: "Relaxation-promoting botanical" },
      { name: "L-Theanine", detail: "Supports relaxation without drowsiness" },
      { name: "Melatonin", detail: "Helps regulate the sleep-wake cycle" },
    ],
    support: [
      { label: "Sleep Onset", level: 5 },
      { label: "Calm & Relaxation", level: 5 },
      { label: "Overnight Recovery", level: 4 },
      { label: "Morning Readiness", level: 3 },
    ],
    use: "Take 2 capsules 30–60 minutes before sleep. Do not exceed recommended dose.",
    handle: "sleep-formula-capsules",
  },
];

function SupportBar({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="h-1 flex-1 rounded-full transition-all duration-300"
          style={{
            background:
              i <= level
                ? "rgba(168,209,255,0.65)"
                : "rgba(255,255,255,0.08)",
          }}
        />
      ))}
    </div>
  );
}

export default function SupplementExplorer() {
  const [active, setActive] = useState(PRODUCTS[0].id);
  const product = PRODUCTS.find((p) => p.id === active) ?? PRODUCTS[0];

  return (
    <section className="vt-section">
      <div className="vt-container">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: "clamp(36px, 5vw, 56px)" }}>
          <div className="vt-eyebrow" style={{ marginBottom: "16px" }}>
            What&rsquo;s inside
          </div>
          <h2 className="vt-heading-lg">
            Know exactly what you&rsquo;re taking.
            <br />
            <span style={{ color: "var(--vt-muted)" }}>
              Select a product to explore.
            </span>
          </h2>
        </div>

        {/* Explorer panel */}
        <div
          className="vt-panel overflow-hidden"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
          }}
        >
          {/* Tab strip */}
          <div
            className="flex border-b"
            style={{ borderColor: "var(--vt-line)" }}
          >
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className="flex-1 px-4 py-4 text-left transition-all duration-200 relative"
                style={{
                  background:
                    active === p.id
                      ? "rgba(255,255,255,0.04)"
                      : "transparent",
                  borderBottom:
                    active === p.id
                      ? "2px solid rgba(168,209,255,0.5)"
                      : "2px solid transparent",
                  marginBottom: "-1px",
                }}
              >
                <p
                  className="font-medium text-sm leading-tight"
                  style={{
                    color:
                      active === p.id
                        ? "var(--vt-text)"
                        : "var(--vt-muted)",
                  }}
                >
                  {p.name}
                </p>
                <p
                  className="text-xs mt-0.5 hidden sm:block"
                  style={{ color: "var(--vt-muted-2)" }}
                >
                  {p.type.split("·")[0].trim()}
                </p>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div
            className="grid md:grid-cols-2 gap-0"
            style={{ minHeight: "360px" }}
          >
            {/* Left — description + use */}
            <div
              className="p-6 md:p-8"
              style={{ borderRight: "1px solid var(--vt-line)" }}
            >
              <p
                className="text-xs font-medium tracking-widest uppercase mb-4"
                style={{ color: "var(--vt-muted-2)" }}
              >
                {product.type}
              </p>
              <p
                className="leading-relaxed mb-6"
                style={{
                  color: "var(--vt-text-soft)",
                  fontSize: "var(--vt-text-sm)",
                  lineHeight: 1.7,
                }}
              >
                {product.description}
              </p>

              {/* Ingredients */}
              <div className="mb-6">
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{ color: "var(--vt-muted-2)" }}
                >
                  Key Ingredients
                </p>
                <div className="space-y-2">
                  {product.ingredients.map((ing) => (
                    <div key={ing.name} className="flex items-start gap-2.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: "rgba(168,209,255,0.5)" }}
                      />
                      <div>
                        <span
                          className="text-sm font-medium"
                          style={{ color: "var(--vt-text-soft)" }}
                        >
                          {ing.name}
                        </span>
                        <span
                          className="text-xs ml-2"
                          style={{ color: "var(--vt-muted-2)" }}
                        >
                          {ing.detail}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested use */}
              <div
                className="rounded-lg p-3"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--vt-line)",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: "var(--vt-muted-2)" }}
                >
                  Suggested Use
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--vt-muted)" }}
                >
                  {product.use}
                </p>
              </div>
            </div>

            {/* Right — support areas + CTA */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-5"
                  style={{ color: "var(--vt-muted-2)" }}
                >
                  Support Areas
                </p>
                <div className="space-y-4">
                  {product.support.map((area) => (
                    <div key={area.label}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span
                          className="text-sm"
                          style={{ color: "var(--vt-text-soft)" }}
                        >
                          {area.label}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: "var(--vt-muted-2)" }}
                        >
                          {["", "Low", "Moderate", "Moderate", "High", "Primary"][area.level]}
                        </span>
                      </div>
                      <SupportBar level={area.level} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <p
                  className="text-xs mb-4"
                  style={{ color: "var(--vt-muted-2)", lineHeight: 1.5 }}
                >
                  *These statements have not been evaluated by the Food and Drug
                  Administration. This product is not intended to diagnose, treat,
                  cure, or prevent any disease.
                </p>
                <Link
                  href={`/products/${product.handle}`}
                  className="vt-button-primary"
                  style={{ display: "inline-flex" }}
                >
                  Shop {product.name} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
