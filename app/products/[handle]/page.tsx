import React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ChevronRight,
  ShieldCheck,
  FlaskConical,
  Building2,
  ArrowRight,
  Check,
  Zap,
  Moon,
  Brain,
  Heart,
  Activity,
  Leaf,
  Sparkles,
  Dumbbell,
  Droplets,
  Timer,
  Flame,
  Bone,
  RefreshCw,
  Pill,
  Sun,
} from "lucide-react"
import type { LucideProps } from "lucide-react"
import {
  getProductByHandle,
  getProducts,
  MOCK_PRODUCTS,
  formatPrice,
  getProductBenefits,
} from "@/lib/shopify"
import { parseProductHtml } from "@/lib/parseProductHtml"
import { applyOverride, PRODUCT_OVERRIDES } from "@/lib/productOverrides"
import AddToCart from "./AddToCart"
import ProductGallery from "./ProductGallery"
import SupplementFacts from "./SupplementFacts"
import ScrollReveal from "./ScrollReveal"
import IngredientExplorer from "./IngredientExplorer"
import ProductFAQ from "./ProductFAQ"
import ReviewsSection from "@/components/ReviewsSection"

export const revalidate = 60

type IconComp = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>

// ── Benefit chip tag → icon map ───────────────────────────────────────────────

const TAG_GRID: Record<string, { icon: IconComp; label: string }> = {
  wellness:           { icon: Sun,         label: "Daily Wellness" },
  performance:        { icon: Activity,    label: "Performance" },
  energy:             { icon: Zap,         label: "Energy" },
  immunity:           { icon: ShieldCheck, label: "Immunity" },
  "immune-support":   { icon: ShieldCheck, label: "Immune Defense" },
  sleep:              { icon: Moon,        label: "Better Sleep" },
  relaxation:         { icon: Moon,        label: "Relaxation" },
  focus:              { icon: Brain,       label: "Focus & Clarity" },
  cognitive:          { icon: Brain,       label: "Cognitive Support" },
  "brain-health":     { icon: Brain,       label: "Brain Health" },
  adaptogen:          { icon: Leaf,        label: "Adaptogenic" },
  mushroom:           { icon: Sparkles,    label: "Functional Mushrooms" },
  "weight-management":{ icon: Flame,       label: "Weight Management" },
  thermogenic:        { icon: Flame,       label: "Thermogenic" },
  collagen:           { icon: Sparkles,    label: "Skin & Joints" },
  protein:            { icon: Dumbbell,    label: "Protein" },
  omega:              { icon: Heart,       label: "Heart & Brain" },
  "vitamin-d":        { icon: Sun,         label: "Bone Health" },
  magnesium:          { icon: Moon,        label: "Recovery" },
  probiotic:          { icon: Leaf,        label: "Gut Health" },
  gut:                { icon: Leaf,        label: "Gut Health" },
  antioxidant:        { icon: Sparkles,    label: "Antioxidant" },
  "stress-relief":    { icon: Brain,       label: "Stress Relief" },
  hormone:            { icon: Activity,    label: "Hormone Balance" },
  detox:              { icon: RefreshCw,   label: "Detox Support" },
  "joint-health":     { icon: Bone,        label: "Joint Support" },
  recovery:           { icon: Timer,       label: "Recovery" },
  strength:           { icon: Dumbbell,    label: "Strength" },
  hydration:          { icon: Droplets,    label: "Hydration" },
  multivitamin:       { icon: Pill,        label: "Complete Formula" },
  vitamin:            { icon: Pill,        label: "Vitamins" },
  mineral:            { icon: FlaskConical, label: "Minerals" },
}

// ── Benefit icon matcher (for S4 breakdown cards) ─────────────────────────────

function getBenefitIcon(text: string): IconComp {
  const l = text.toLowerCase()
  if (/energy|endurance|vitality|fuel|power|electro/.test(l)) return Zap
  if (/sleep|rest|relax|calm|night/.test(l)) return Moon
  if (/focus|cognit|brain|mental|clarity|memory|nootropic/.test(l)) return Brain
  if (/heart|cardio|blood|circulat/.test(l)) return Heart
  if (/immune|immunit|defense|protect|shield/.test(l)) return ShieldCheck
  if (/gut|digest|probiotic|microbiome|stomach/.test(l)) return Leaf
  if (/antioxid|cellular|longevity|free radical/.test(l)) return Sparkles
  if (/metabol|thermogen|weight|fat/.test(l)) return Activity
  if (/muscle|strength|athletic|sport|perform|workout|train/.test(l)) return Dumbbell
  if (/hydrat|water|fluid/.test(l)) return Droplets
  if (/recover/.test(l)) return Timer
  if (/hormone|stress|cortisol|adaptogen/.test(l)) return Activity
  return Check
}

// ── Section divider ───────────────────────────────────────────────────────────

function Divider() {
  return (
    <div
      className="h-px mb-14"
      style={{ background: "var(--vt-horizon-line)" }}
    />
  )
}

// ── Page params ───────────────────────────────────────────────────────────────

interface ProductPageProps {
  params: Promise<{ handle: string }>
}

export async function generateStaticParams() {
  const data = await getProducts(50)
  const shopifyHandles = data?.edges?.map((e) => ({ handle: e.node.handle })) ?? []
  const mockHandles = MOCK_PRODUCTS.map((p) => ({ handle: p.handle }))
  const all = [...shopifyHandles]
  for (const m of mockHandles) {
    if (!all.find((s) => s.handle === m.handle)) all.push(m)
  }
  return all
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params
  const product =
    (await getProductByHandle(handle)) ??
    MOCK_PRODUCTS.find((p) => p.handle === handle) ??
    null
  if (!product) return { title: "Product Not Found" }
  return {
    title: product.title,
    description: product.description.slice(0, 160),
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params
  const product =
    (await getProductByHandle(handle)) ??
    MOCK_PRODUCTS.find((p) => p.handle === handle) ??
    null

  if (!product) notFound()

  const images = product.images.edges.map((e) => e.node)
  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  )

  const descriptionHtml =
    (product as { descriptionHtml?: string }).descriptionHtml ?? ""
  const parsed = applyOverride(handle, parseProductHtml(descriptionHtml))
  const productOverride = PRODUCT_OVERRIDES[handle.toLowerCase()]

  const benefitLines =
    parsed.benefits.length > 0 ? parsed.benefits : getProductBenefits(product)

  // ── Derived data ────────────────────────────────────────────────────────────

  const useCaseChips = product.tags
    .map((t) => TAG_GRID[t.toLowerCase().trim()])
    .filter((x): x is { icon: IconComp; label: string } => Boolean(x))
    .filter((x, i, arr) => arr.findIndex((y) => y.label === x.label) === i)
    .slice(0, 4)

  const stats = productOverride?.stats?.length
    ? productOverride.stats
    : [
        parsed.supplementFacts?.servingSize
          ? { label: "Serving Size", value: parsed.supplementFacts.servingSize }
          : null,
        parsed.supplementFacts?.servingsPerContainer
          ? { label: "Servings", value: parsed.supplementFacts.servingsPerContainer }
          : null,
        parsed.supplementFacts?.rows.length
          ? { label: "Active Ingredients", value: String(parsed.supplementFacts.rows.length) }
          : null,
      ].filter((s): s is { label: string; value: string } => s !== null)

  const bestForItems: string[] =
    productOverride?.bestFor ??
    product.tags
      .map((t) => TAG_GRID[t.toLowerCase().trim()]?.label)
      .filter((l): l is string => Boolean(l))
      .filter((l, i, arr) => arr.indexOf(l) === i)
      .slice(0, 5)

  const howToUse =
    productOverride?.howToUse ??
    (parsed.supplementFacts?.servingSize
      ? `Take as directed. Serving size: ${parsed.supplementFacts.servingSize}.`
      : "Follow the serving directions on the product label.")

  const pairings = productOverride?.pairings ?? []

  const hasSupplementFacts = parsed.supplementFacts !== null
  const hasWhatsInside =
    parsed.supplementFacts !== null ||
    parsed.ingredients !== null ||
    parsed.warnings !== null

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="vt-page pt-16">

      {/* ── S1: Hero ──────────────────────────────────────────────────────────
          Sticky product image (left) · Chips, title, price, ATC, trust (right)
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="vt-container py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-10 overflow-hidden" style={{ fontSize: "var(--vt-text-xs)" }}>
          <Link href="/" className="transition-colors hover:opacity-80" style={{ color: "var(--vt-muted-2)" }}>
            Home
          </Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: "var(--vt-muted-2)" }} />
          <Link href="/shop" className="transition-colors hover:opacity-80" style={{ color: "var(--vt-muted-2)" }}>
            Shop
          </Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: "var(--vt-muted-2)" }} />
          <span className="truncate" style={{ color: "var(--vt-muted)" }}>{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-[45%_1fr] gap-12 lg:gap-20 items-start">

          {/* Sticky gallery */}
          <div className="lg:sticky lg:top-24 self-start animate-fade-in-up" style={{ animationFillMode: "both" }}>
            <ProductGallery images={images} title={product.title} />
          </div>

          {/* Info column */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "100ms", animationFillMode: "both" }}
          >
            {/* Benefit chips */}
            {useCaseChips.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {useCaseChips.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full select-none"
                    style={{
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

            {/* Title */}
            <h1
              className="font-semibold tracking-tight leading-tight break-words mb-3"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: "var(--vt-text)",
                letterSpacing: "-0.035em",
              }}
            >
              {product.title}
            </h1>

            {/* Price */}
            <p
              className="font-semibold mb-7"
              style={{
                fontSize: "var(--vt-text-2xl)",
                color: "var(--vt-text)",
              }}
            >
              {price}
            </p>

            {/* Add to cart */}
            <div className="mb-7">
              <AddToCart product={product} />
            </div>

            {/* Trust badges */}
            <div
              className="rounded-xl grid grid-cols-3 gap-px mb-5 overflow-hidden"
              style={{
                border: "1px solid var(--vt-line)",
                background: "var(--vt-line)",
              }}
            >
              {[
                { icon: ShieldCheck, label: "cGMP Certified" },
                { icon: Building2, label: "FDA-Registered" },
                { icon: FlaskConical, label: "COA Available" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 text-center py-4 px-2"
                  style={{ background: "var(--vt-bg-2)" }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: "var(--vt-accent-steel)" }}
                    strokeWidth={1.5}
                  />
                  <span
                    className="text-xs leading-tight"
                    style={{ color: "var(--vt-text-soft)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* FDA disclaimer */}
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--vt-muted-2)", lineHeight: 1.55 }}
            >
              *These statements have not been evaluated by the Food and Drug
              Administration. This product is not intended to diagnose, treat,
              cure, or prevent any disease.
            </p>
          </div>
        </div>
      </div>

      {/* ── S2: 5-stat bar ────────────────────────────────────────────────────
          Full-bleed panel with at-a-glance numbers
      ───────────────────────────────────────────────────────────────────────── */}
      {stats.length > 0 && (
        <div style={{ background: "var(--vt-bg-2)", borderTop: "1px solid var(--vt-line)", borderBottom: "1px solid var(--vt-line)" }}>
          <div className="vt-container">
            <div
              className="flex gap-0"
              style={{ overflowX: "auto", scrollbarWidth: "none" }}
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex flex-col justify-center py-6 px-6 flex-shrink-0"
                  style={{
                    borderRight: i < stats.length - 1 ? "1px solid var(--vt-line)" : "none",
                    minWidth: "120px",
                  }}
                >
                  <p
                    className="label-xs mb-1"
                    style={{ color: "var(--vt-muted-2)" }}
                  >
                    {stat.label}
                  </p>
                  <p
                    className="font-semibold"
                    style={{
                      fontSize: "var(--vt-text-lg)",
                      color: "var(--vt-text)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── S3: Ingredient Explorer ───────────────────────────────────────────
          Accordion — one card per supplement-facts row
      ───────────────────────────────────────────────────────────────────────── */}
      {parsed.supplementFacts && parsed.supplementFacts.rows.length > 0 && (
        <section className="vt-section">
          <div className="vt-container">
            <Divider />
            <ScrollReveal>
              <div className="vt-eyebrow mb-3">Full Transparency</div>
              <h2 className="vt-heading-md mb-2" style={{ letterSpacing: "-0.03em" }}>
                Formula Breakdown
              </h2>
              <p className="mb-8" style={{ fontSize: "var(--vt-text-sm)", color: "var(--vt-muted)", lineHeight: 1.6 }}>
                Every active ingredient. What it is, what it does, and why it&rsquo;s here.
              </p>
              <IngredientExplorer
                rows={parsed.supplementFacts.rows}
                ingredientDetails={productOverride?.ingredientDetails}
              />
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── S4: Benefit Breakdown ─────────────────────────────────────────────
          4-column icon + title + description grid
      ───────────────────────────────────────────────────────────────────────── */}
      {benefitLines.length > 0 && (
        <section className="vt-section">
          <div className="vt-container">
            <Divider />
            <ScrollReveal>
              <div className="vt-eyebrow mb-3">What It Supports</div>
              <h2 className="vt-heading-md mb-10" style={{ letterSpacing: "-0.03em" }}>
                Built for this.
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {benefitLines.slice(0, 4).map((benefit, i) => {
                  const parts = benefit.split(/\s[—–]\s/)
                  const title = parts[0]?.trim() ?? benefit.slice(0, 32)
                  const body = parts.slice(1).join(" — ").trim() || benefit
                  const Icon = getBenefitIcon(benefit)

                  return (
                    <ScrollReveal key={i} delay={i * 60}>
                      <div
                        className="rounded-xl h-full"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 0%, rgba(168,209,255,0.06), transparent 48%), rgba(255,255,255,0.02)",
                          boxShadow:
                            "inset 0 0 0 1px rgba(255,255,255,0.07), 0 8px 24px rgba(0,0,0,0.18)",
                          borderLeft: "2px solid var(--vt-accent-blue)",
                          borderRadius: "14px",
                          overflow: "hidden",
                        }}
                      >
                        <div className="p-5">
                          <div
                            className="flex items-center justify-center w-9 h-9 rounded-lg mb-4"
                            style={{
                              background: "rgba(168,209,255,0.08)",
                              border: "1px solid rgba(168,209,255,0.12)",
                            }}
                          >
                            <Icon
                              className="w-4 h-4"
                              style={{ color: "var(--vt-accent-blue)" }}
                              strokeWidth={1.6}
                            />
                          </div>
                          <p
                            className="text-sm font-semibold mb-2 leading-snug"
                            style={{ color: "var(--vt-text)" }}
                          >
                            {title}
                          </p>
                          <p
                            className="text-xs leading-relaxed"
                            style={{ color: "var(--vt-muted)", lineHeight: 1.6 }}
                          >
                            {body}
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>
                  )
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── S5: Best For / How To Use ─────────────────────────────────────────
          2-column split: use-case list + serving instructions
      ───────────────────────────────────────────────────────────────────────── */}
      <section className="vt-section">
        <div className="vt-container">
          <Divider />
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16">

              {/* Best For */}
              <div>
                <div className="vt-eyebrow mb-3">Best For</div>
                <h2
                  className="vt-heading-md mb-7"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Is this right for you?
                </h2>
                <ul className="space-y-3">
                  {bestForItems.length > 0 ? (
                    bestForItems.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full mt-0.5"
                          style={{
                            background: "rgba(168,209,255,0.1)",
                            border: "1px solid rgba(168,209,255,0.2)",
                          }}
                        >
                          <Check
                            className="w-2.5 h-2.5"
                            style={{ color: "var(--vt-accent-blue)" }}
                            strokeWidth={2.5}
                          />
                        </span>
                        <span
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--vt-text-soft)" }}
                        >
                          {item}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm" style={{ color: "var(--vt-muted)" }}>
                      See product details above.
                    </li>
                  )}
                </ul>
              </div>

              {/* How To Use */}
              <div>
                <div className="vt-eyebrow mb-3">How To Use</div>
                <h2
                  className="vt-heading-md mb-7"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Directions
                </h2>
                <div
                  className="rounded-xl p-5"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, rgba(168,209,255,0.06), transparent 40%), rgba(255,255,255,0.02)",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)",
                    borderRadius: "16px",
                  }}
                >
                  {parsed.supplementFacts?.servingSize && (
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
                      style={{
                        border: "1px solid rgba(168,209,255,0.18)",
                        color: "var(--vt-accent-blue)",
                        background: "rgba(168,209,255,0.06)",
                      }}
                    >
                      {parsed.supplementFacts.servingSize} per serving
                    </span>
                  )}
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--vt-text-soft)", lineHeight: 1.7 }}
                  >
                    {howToUse}
                  </p>
                  {parsed.supplementFacts?.servingsPerContainer && (
                    <p
                      className="text-xs mt-4"
                      style={{ color: "var(--vt-muted-2)" }}
                    >
                      {parsed.supplementFacts.servingsPerContainer} servings per container
                    </p>
                  )}
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── S6: Pairing Stack ─────────────────────────────────────────────────
          3-card grid — only shown when pairings data exists
      ───────────────────────────────────────────────────────────────────────── */}
      {pairings.length > 0 && (
        <section className="vt-section">
          <div className="vt-container">
            <Divider />
            <ScrollReveal>
              <div className="vt-eyebrow mb-3">Complete Your Stack</div>
              <h2
                className="vt-heading-md mb-10"
                style={{ letterSpacing: "-0.03em" }}
              >
                Pairs well with
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {pairings.slice(0, 3).map((pair, i) => (
                  <ScrollReveal key={pair.handle} delay={i * 70}>
                    <Link
                      href={`/products/${pair.handle}`}
                      className="vt-panel vt-panel--interactive block p-6 rounded-xl"
                      style={{ textDecoration: "none" }}
                    >
                      <p
                        className="text-sm font-semibold mb-2"
                        style={{ color: "var(--vt-text)" }}
                      >
                        {pair.name}
                      </p>
                      <p
                        className="text-xs leading-relaxed mb-5"
                        style={{ color: "var(--vt-muted)", lineHeight: 1.6 }}
                      >
                        {pair.rationale}
                      </p>
                      <span
                        className="flex items-center gap-1 text-xs font-medium transition-opacity duration-200"
                        style={{ color: "var(--vt-accent-blue)" }}
                      >
                        View product <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── S7: Supplement Facts ──────────────────────────────────────────────
          Full label table + COA link
      ───────────────────────────────────────────────────────────────────────── */}
      {hasWhatsInside && (
        <section className="vt-section">
          <div className="vt-container">
            <Divider />
            <ScrollReveal>
              <div className="vt-eyebrow mb-3">Full Label</div>
              <h2
                className="vt-heading-md mb-10"
                style={{ letterSpacing: "-0.03em" }}
              >
                Supplement Facts
              </h2>
              <div className={hasSupplementFacts ? "grid lg:grid-cols-5 gap-8 items-start" : ""}>
                {parsed.supplementFacts && (
                  <div className="lg:col-span-3">
                    <SupplementFacts
                      data={parsed.supplementFacts}
                      ingredients={null}
                      warnings={null}
                      showCoa
                    />
                  </div>
                )}
                <div
                  className={
                    parsed.supplementFacts
                      ? "lg:col-span-2 space-y-6"
                      : "space-y-6"
                  }
                >
                  <SupplementFacts
                    data={null}
                    ingredients={parsed.ingredients}
                    warnings={parsed.warnings}
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── S8: FAQ ───────────────────────────────────────────────────────────
          5-question accordion — product-specific or generic fallback
      ───────────────────────────────────────────────────────────────────────── */}
      <section className="vt-section">
        <div className="vt-container">
          <Divider />
          <ScrollReveal>
            <div className="vt-eyebrow mb-3">Common Questions</div>
            <h2
              className="vt-heading-md mb-10"
              style={{ letterSpacing: "-0.03em" }}
            >
              FAQ
            </h2>
            <div className="max-w-3xl">
              <ProductFAQ
                faq={productOverride?.faq}
                productTitle={product.title}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── S9: Customer Reviews ──────────────────────────────────────────────
          Star ratings, distribution chart, review cards, add review form
      ───────────────────────────────────────────────────────────────────────── */}
      <section className="vt-section">
        <div className="vt-container">
          <Divider />
          <ScrollReveal>
            <div className="vt-eyebrow mb-3">What Customers Say</div>
            <h2
              className="vt-heading-md mb-10"
              style={{ letterSpacing: "-0.03em" }}
            >
              Reviews
            </h2>
            <div className="max-w-3xl">
              <ReviewsSection handle={handle} />
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
