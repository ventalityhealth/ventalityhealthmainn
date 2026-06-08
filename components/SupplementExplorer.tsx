"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Ingredient {
  name: string;
  dose: string;
  support: string;
}

interface Benefit {
  title: string;
  body: string;
}

interface Product {
  id: string;
  name: string;
  tagline: string;
  categories: string[];
  description: string;
  benefits: Benefit[];
  bestFor: string[];
  pairsWithHandle: string;
  pairsWithName: string;
  ingredients: Ingredient[];
  trustBadges: string[];
  use: string;
  timeline: string;
  whoFor: string;
  handle: string;
}

// ── Product Data ──────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    id: "l-glutamine",
    name: "L-Glutamine",
    tagline: "Foundational amino acid for recovery & gut integrity",
    categories: ["Amino Acid", "Recovery", "Gut Health"],
    description:
      "The most abundant amino acid in the body. L-Glutamine provides foundational support for muscle recovery, gut integrity, and day-to-day immune function — in a single, unflavored powder with nothing added.",
    benefits: [
      {
        title: "Muscle Recovery",
        body: "Replenishes glutamine depleted during exercise to accelerate tissue repair and reduce soreness.",
      },
      {
        title: "Gut Integrity",
        body: "Maintains intestinal lining barrier function and mucosal health under daily stress.",
      },
      {
        title: "Immune Support",
        body: "Fuels key immune cells including lymphocytes and macrophages for day-to-day defense.",
      },
      {
        title: "Daily Maintenance",
        body: "Sustains systemic glutamine levels that decline under physical or psychological stress.",
      },
    ],
    bestFor: ["Post-workout recovery", "Gut sensitivity", "Daily wellness"],
    pairsWithHandle: "adaptogen-vitality-gummies",
    pairsWithName: "Adaptogen Vitality",
    ingredients: [
      {
        name: "L-Glutamine",
        dose: "3.3g per serving",
        support: "Pharmaceutical-grade, unflavored free-form amino acid",
      },
      {
        name: "No Fillers",
        dose: "Zero additives",
        support: "No artificial flavors, colors, or sweeteners added",
      },
      {
        name: "30 Servings",
        dose: "3.5 oz / 99g net",
        support: "Single-ingredient powder — nothing else in the container",
      },
    ],
    trustBadges: ["No Fillers", "30 Servings", "Unflavored"],
    use: "Mix 1 scoop (3.3g) into 8–12 oz of water or your preferred beverage. Use daily.",
    timeline:
      "Most users notice improved recovery and reduced muscle soreness within 2–4 weeks of consistent daily use.",
    whoFor:
      "Athletes, active individuals, and anyone supporting gut health or immune function. Ideal as a foundational daily supplement with no flavor or additives to manage.",
    handle: "l-glutamine",
  },
  {
    id: "adaptogen-vitality",
    name: "Adaptogen Vitality",
    tagline: "Functional mushroom blend for clarity & stress resilience",
    categories: ["Adaptogen", "Cognitive", "Stress Support"],
    description:
      "A mushroom-forward adaptogen blend in a daily gummy format. Designed for people who want cognitive clarity, stress resilience, and steady vitality without stimulants — formulated from functional mushrooms and botanical adaptogens.",
    benefits: [
      {
        title: "Cognitive Clarity",
        body: "Lion's Mane supports neurotrophin production for sharper, sustained mental focus.",
      },
      {
        title: "Stress Resilience",
        body: "Reishi modulates the stress response without sedation or stimulant side effects.",
      },
      {
        title: "Immune Function",
        body: "Chaga delivers beta-glucans and polysaccharides that prime and reinforce immune readiness.",
      },
      {
        title: "Steady Energy",
        body: "Stimulant-free vitality through adaptogenic mushroom synergy that builds over time.",
      },
    ],
    bestFor: ["Mental performance", "Stress management", "Stimulant-free energy"],
    pairsWithHandle: "sleep-formula-capsules",
    pairsWithName: "Sleep Formula",
    ingredients: [
      {
        name: "Lion's Mane",
        dose: "500mg per serving",
        support: "Supports cognitive function and neuroplasticity via NGF pathways",
      },
      {
        name: "Chaga",
        dose: "250mg per serving",
        support: "Antioxidant-rich, immune-supporting fungal adaptogen",
      },
      {
        name: "Reishi",
        dose: "250mg per serving",
        support: "Promotes stress modulation and calm, non-sedating energy",
      },
      {
        name: "Functional Mushroom Blend",
        dose: "35 servings / 4.6 oz",
        support: "Orange-flavored daily gummy format — no stimulants",
      },
    ],
    trustBadges: ["No Stimulants", "35 Servings", "Gummy Format"],
    use: "Take 1–2 gummies per day. Can be taken at any time with or without food.",
    timeline:
      "Adaptogens build cumulatively — expect noticeable effects after 3–6 weeks of consistent daily use.",
    whoFor:
      "Anyone seeking cognitive support, stress resilience, and daily vitality without caffeine or stimulants. Well-suited for those with demanding schedules or high mental workloads.",
    handle: "adaptogen-vitality-gummies",
  },
  {
    id: "sleep-formula",
    name: "Sleep Formula",
    tagline: "Multi-compound sleep support — non-habit forming",
    categories: ["Sleep", "Recovery", "Relaxation"],
    description:
      "A multi-compound sleep support formula combining botanicals and relaxation-promoting compounds. Formulated for those who want to support healthy sleep onset and rest quality — non-habit forming, stimulant-free.",
    benefits: [
      {
        title: "Sleep Onset",
        body: "Melatonin and botanical compounds help you fall asleep faster and more naturally.",
      },
      {
        title: "Calm & Relaxation",
        body: "L-Theanine and Passionflower ease the mental transition from wakefulness into rest.",
      },
      {
        title: "Overnight Recovery",
        body: "Deep sleep phases support muscle repair, hormone regulation, and cognitive consolidation.",
      },
      {
        title: "Morning Readiness",
        body: "Wake without grogginess or sedating residue — no dependency risk with consistent use.",
      },
    ],
    bestFor: ["Sleep onset support", "Wind-down routine", "Recovery nights"],
    pairsWithHandle: "l-glutamine",
    pairsWithName: "L-Glutamine",
    ingredients: [
      {
        name: "Passionflower Extract",
        dose: "300mg per serving",
        support: "Traditional botanical for calm and relaxation at bedtime",
      },
      {
        name: "Chamomile Extract",
        dose: "200mg per serving",
        support: "Relaxation-promoting herbal botanical, widely studied for sleep",
      },
      {
        name: "L-Theanine",
        dose: "100mg per serving",
        support: "Supports mental relaxation without sedation or drowsiness",
      },
      {
        name: "Melatonin",
        dose: "1mg per serving",
        support: "Helps regulate the natural sleep-wake cycle gently",
      },
    ],
    trustBadges: ["Non-Habit Forming", "Stimulant-Free", "30 Servings"],
    use: "Take 2 capsules 30–60 minutes before sleep. Do not exceed recommended dose.",
    timeline:
      "Sleep quality typically improves within 1–2 weeks. For best results, use consistently for 30 days.",
    whoFor:
      "Those with occasional sleeplessness, active individuals optimizing overnight recovery, and anyone building a consistent and healthy sleep routine.",
    handle: "sleep-formula-capsules",
  },
];

// ── Tab types ─────────────────────────────────────────────────────────────────

type TabId = "overview" | "formula" | "howtouse";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "formula", label: "Formula" },
  { id: "howtouse", label: "How To Use" },
];

// ── Tab content components ────────────────────────────────────────────────────

function OverviewContent({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-5">
      {/* 2×2 benefit grid */}
      <div className="grid grid-cols-2 gap-3">
        {product.benefits.map((b) => (
          <div
            key={b.title}
            className="rounded-xl p-4"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid var(--vt-line)",
            }}
          >
            <p
              className="text-sm font-semibold mb-1.5"
              style={{ color: "var(--vt-text)" }}
            >
              {b.title}
            </p>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--vt-muted)", lineHeight: 1.6 }}
            >
              {b.body}
            </p>
          </div>
        ))}
      </div>

      {/* Best For */}
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: "var(--vt-muted-2)" }}
        >
          Best For
        </p>
        <div className="flex flex-wrap gap-2">
          {product.bestFor.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs"
              style={{
                border: "1px solid var(--vt-line-strong)",
                color: "var(--vt-text-soft)",
                background: "rgba(168,209,255,0.05)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Pairs Well With */}
      <div
        className="flex items-center justify-between rounded-xl px-4 py-3"
        style={{
          background: "rgba(168,209,255,0.04)",
          border: "1px solid rgba(168,209,255,0.12)",
        }}
      >
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-0.5"
            style={{ color: "var(--vt-muted-2)" }}
          >
            Pairs Well With
          </p>
          <p
            className="text-sm font-medium"
            style={{ color: "var(--vt-text)" }}
          >
            {product.pairsWithName}
          </p>
        </div>
        <Link
          href={`/products/${product.pairsWithHandle}`}
          className="flex items-center gap-1 transition-opacity duration-200 hover:opacity-70"
          style={{
            color: "var(--vt-accent-blue)",
            fontSize: "var(--vt-text-xs)",
            textDecoration: "none",
          }}
        >
          View <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Shop CTA */}
      <div>
        <Link
          href={`/products/${product.handle}`}
          className="vt-button-primary"
          style={{ display: "inline-flex", textDecoration: "none" }}
        >
          Shop {product.name} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function FormulaContent({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Ingredient rows */}
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: "var(--vt-muted-2)" }}
        >
          Ingredients &amp; Doses
        </p>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--vt-line)" }}
        >
          {product.ingredients.map((ing, i) => (
            <div
              key={ing.name}
              className="flex items-start gap-4 px-4 py-3.5"
              style={{
                borderTop: i > 0 ? "1px solid var(--vt-line)" : "none",
                background:
                  i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent",
              }}
            >
              <div className="min-w-0 flex-1">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--vt-text)" }}
                >
                  {ing.name}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--vt-muted)", lineHeight: 1.5 }}
                >
                  {ing.support}
                </p>
              </div>
              <span
                className="text-xs font-medium flex-shrink-0 mt-0.5 text-right"
                style={{ color: "var(--vt-accent-blue)" }}
              >
                {ing.dose}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust badges */}
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: "var(--vt-muted-2)" }}
        >
          Quality Assurance
        </p>
        <div className="flex flex-wrap gap-2">
          {product.trustBadges.map((badge) => (
            <span
              key={badge}
              className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5"
              style={{
                border: "1px solid rgba(207,228,212,0.22)",
                color: "var(--vt-success)",
                background: "rgba(207,228,212,0.05)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "var(--vt-success)" }}
              />
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function HowToUseContent({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Suggested use */}
      <div
        className="rounded-xl p-4"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid var(--vt-line)",
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: "var(--vt-muted-2)" }}
        >
          Suggested Use
        </p>
        <p
          className="text-sm"
          style={{ color: "var(--vt-text-soft)", lineHeight: 1.7 }}
        >
          {product.use}
        </p>
      </div>

      {/* Expectation timeline */}
      <div
        className="rounded-xl p-4"
        style={{
          background: "rgba(168,209,255,0.04)",
          border: "1px solid rgba(168,209,255,0.12)",
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: "var(--vt-muted-2)" }}
        >
          What to Expect
        </p>
        <p
          className="text-sm"
          style={{ color: "var(--vt-text-soft)", lineHeight: 1.7 }}
        >
          {product.timeline}
        </p>
      </div>

      {/* Who it's for */}
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: "var(--vt-muted-2)" }}
        >
          Who It&rsquo;s For
        </p>
        <p
          className="text-sm"
          style={{ color: "var(--vt-muted)", lineHeight: 1.7 }}
        >
          {product.whoFor}
        </p>
      </div>

      {/* FDA disclaimer */}
      <p
        className="text-xs"
        style={{
          color: "var(--vt-muted-2)",
          borderTop: "1px solid var(--vt-line-soft)",
          paddingTop: "14px",
          marginTop: "4px",
          lineHeight: 1.5,
        }}
      >
        *These statements have not been evaluated by the Food and Drug
        Administration. This product is not intended to diagnose, treat, cure,
        or prevent any disease.
      </p>
    </div>
  );
}

// ── Selector card (shared between desktop vertical and mobile horizontal) ─────

function SelectorCard({
  product,
  isActive,
  onClick,
  compact,
}: {
  product: Product;
  isActive: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="text-left transition-all duration-200"
      style={{
        width: compact ? "220px" : "100%",
        flexShrink: compact ? 0 : undefined,
        scrollSnapAlign: compact ? "start" : undefined,
        borderRadius: "14px",
        padding: compact ? "14px" : "16px",
        background: isActive
          ? "rgba(168,209,255,0.06)"
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${isActive ? "rgba(168,209,255,0.18)" : "var(--vt-line)"}`,
        borderLeft: `3px solid ${isActive ? "var(--vt-accent-blue)" : "transparent"}`,
      }}
    >
      <p
        className="text-sm font-semibold mb-1"
        style={{
          color: isActive ? "var(--vt-text)" : "var(--vt-text-soft)",
        }}
      >
        {product.name}
      </p>
      <p
        className="text-xs mb-2.5"
        style={{
          color: "var(--vt-muted-2)",
          lineHeight: 1.45,
          display: compact ? "-webkit-box" : undefined,
          WebkitLineClamp: compact ? 2 : undefined,
          WebkitBoxOrient: compact ? "vertical" : undefined,
          overflow: compact ? "hidden" : undefined,
        }}
      >
        {product.tagline}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {(compact ? product.categories.slice(0, 2) : product.categories).map(
          (cat) => (
            <span
              key={cat}
              style={{
                border: "1px solid var(--vt-line)",
                color: "var(--vt-muted-2)",
                background: "rgba(255,255,255,0.02)",
                fontSize: "0.64rem",
                padding: "2px 8px",
                borderRadius: "999px",
                lineHeight: 1.5,
              }}
            >
              {cat}
            </span>
          )
        )}
      </div>
    </button>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function SupplementExplorer() {
  const [activeProduct, setActiveProduct] = useState(PRODUCTS[0].id);
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const product = PRODUCTS.find((p) => p.id === activeProduct) ?? PRODUCTS[0];

  return (
    <section className="vt-section">
      <div className="vt-container">
        {/* Header */}
        <div
          className="text-center"
          style={{ marginBottom: "clamp(36px, 5vw, 56px)" }}
        >
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

        {/* ── Desktop layout (md+): 30/70 two-panel grid ─────────────────── */}
        <div
          className="hidden md:grid gap-6 items-start"
          style={{ gridTemplateColumns: "30% 1fr" }}
        >
          {/* Left panel — vertical selector cards */}
          <div className="flex flex-col gap-2">
            {PRODUCTS.map((p) => (
              <SelectorCard
                key={p.id}
                product={p}
                isActive={activeProduct === p.id}
                onClick={() => setActiveProduct(p.id)}
              />
            ))}
          </div>

          {/* Right panel — 3-tab interface */}
          <div className="vt-panel overflow-hidden flex flex-col">
            {/* Tab bar */}
            <div
              className="flex border-b flex-shrink-0"
              style={{ borderColor: "var(--vt-line)" }}
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-5 py-3.5 text-sm font-medium transition-all duration-200"
                  style={{
                    color:
                      activeTab === tab.id
                        ? "var(--vt-text)"
                        : "var(--vt-muted)",
                    borderBottom: `2px solid ${
                      activeTab === tab.id
                        ? "var(--vt-accent-blue)"
                        : "transparent"
                    }`,
                    marginBottom: "-1px",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content — key triggers 200ms fade-in on product or tab change */}
            <div className="p-6 flex-1">
              <div
                key={`${product.id}-${activeTab}`}
                className="animate-fade-in-up"
                style={{ animationDuration: "200ms" }}
              >
                {activeTab === "overview" && (
                  <OverviewContent product={product} />
                )}
                {activeTab === "formula" && (
                  <FormulaContent product={product} />
                )}
                {activeTab === "howtouse" && (
                  <HowToUseContent product={product} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile layout (<md) ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-5 md:hidden">
          {/* Horizontal snap-scroll selector row */}
          <div
            className="flex gap-3 pb-1"
            style={{
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
            }}
          >
            {PRODUCTS.map((p) => (
              <SelectorCard
                key={p.id}
                product={p}
                isActive={activeProduct === p.id}
                onClick={() => setActiveProduct(p.id)}
                compact
              />
            ))}
          </div>

          {/* Right panel — accordion, Overview open by default */}
          <div className="vt-panel overflow-hidden">
            <Accordion defaultValue={["overview"]}>
              <AccordionItem
                value="overview"
                style={{ borderColor: "var(--vt-line)" }}
              >
                <AccordionTrigger
                  className="px-5 py-4 text-sm font-medium hover:no-underline"
                  style={{ color: "var(--vt-text-soft)" }}
                >
                  Overview
                </AccordionTrigger>
                <AccordionContent className="[&_a]:no-underline">
                  <div
                    key={`mob-overview-${product.id}`}
                    className="px-5 pb-5"
                  >
                    <OverviewContent product={product} />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="formula"
                style={{ borderColor: "var(--vt-line)" }}
              >
                <AccordionTrigger
                  className="px-5 py-4 text-sm font-medium hover:no-underline"
                  style={{ color: "var(--vt-text-soft)" }}
                >
                  Formula
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    key={`mob-formula-${product.id}`}
                    className="px-5 pb-5"
                  >
                    <FormulaContent product={product} />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="howtouse"
                style={{ borderColor: "var(--vt-line)" }}
                className="border-b-0"
              >
                <AccordionTrigger
                  className="px-5 py-4 text-sm font-medium hover:no-underline"
                  style={{ color: "var(--vt-text-soft)" }}
                >
                  How To Use
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    key={`mob-howtouse-${product.id}`}
                    className="px-5 pb-5"
                  >
                    <HowToUseContent product={product} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
