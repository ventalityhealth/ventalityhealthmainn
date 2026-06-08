import React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  FlaskConical,
  Building2,
  ArrowRight,
  Check,
  Star,
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
import { getReviewSummary } from "@/lib/db"
import AddToCart from "./AddToCart"
import StickyAtcBar from "./StickyAtcBar"
import ProductGallery from "./ProductGallery"
import SupplementFacts from "./SupplementFacts"
import ScrollReveal from "./ScrollReveal"
import ProductFAQ from "./ProductFAQ"
import ReviewsSection from "@/components/ReviewsSection"

export const revalidate = 60

type IconComp = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>

// ── String-keyed icon map (for override-driven content) ───────────────────────

const ICON_MAP: Record<string, IconComp> = {
  zap: Zap,
  moon: Moon,
  brain: Brain,
  heart: Heart,
  activity: Activity,
  leaf: Leaf,
  sparkles: Sparkles,
  dumbbell: Dumbbell,
  droplets: Droplets,
  timer: Timer,
  flame: Flame,
  bone: Bone,
  refresh: RefreshCw,
  pill: Pill,
  sun: Sun,
  shield: ShieldCheck,
  flask: FlaskConical,
  check: Check,
}

// ── Benefit icon matcher (fallback for products without overrides) ────────────

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

function iconFor(name: string): IconComp {
  return ICON_MAP[name] ?? Check
}

// ── Inline star row ───────────────────────────────────────────────────────────

function StarRow({ avg, size = 16 }: { avg: number; size?: number }) {
  const rounded = Math.round(avg)
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          strokeWidth={1.5}
          style={{
            width: size,
            height: size,
            color: "var(--vt-accent-blue)",
            fill: i < rounded ? "var(--vt-accent-blue)" : "transparent",
          }}
        />
      ))}
    </span>
  )
}

// ── Section heading ───────────────────────────────────────────────────────────

function SectionHeading({
  eyebrow,
  title,
  className = "mb-8",
}: {
  eyebrow: string
  title: string
  className?: string
}) {
  return (
    <div className={className}>
      <div className="vt-eyebrow mb-3">{eyebrow}</div>
      <h2
        className="font-semibold"
        style={{ fontSize: "1.5rem", letterSpacing: "-0.02em", color: "var(--vt-text)" }}
      >
        {title}
      </h2>
    </div>
  )
}

// ── Pairing resolver — pulls image + price for a paired product handle ────────

async function resolvePairing(handle: string) {
  const p =
    (await getProductByHandle(handle)) ??
    MOCK_PRODUCTS.find((m) => m.handle === handle) ??
    null
  if (!p) return { image: null as { url: string; altText: string | null } | null, price: null as string | null }
  return {
    image: p.images.edges[0]?.node ?? null,
    price: formatPrice(
      p.priceRange.minVariantPrice.amount,
      p.priceRange.minVariantPrice.currencyCode
    ),
  }
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

  const reviewSummary = await getReviewSummary(handle)
  const hasReviews = reviewSummary.count > 0

  // ── Derived data ────────────────────────────────────────────────────────────

  const tagline =
    productOverride?.tagline ??
    (product.description ? product.description.split(/\.\s/)[0].trim() : "")

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
        { label: "Made In", value: "USA" },
      ].filter((s): s is { label: string; value: string } => s !== null)

  const descriptionRows =
    productOverride?.descriptionRows ??
    benefitLines.slice(0, 4).map((b) => {
      const parts = b.split(/\s[—–]\s/)
      return {
        icon: "",
        claim: parts[0]?.trim() ?? b,
        sentence: parts.slice(1).join(" — ").trim(),
      }
    })

  const benefitCards =
    productOverride?.benefitCards ??
    benefitLines.slice(0, 4).map((b) => {
      const parts = b.split(/\s[—–]\s/)
      return {
        icon: "",
        headline: parts[0]?.trim() ?? b,
        ingredient: "",
        description: parts.slice(1).join(" — ").trim() || b,
      }
    })

  const bestForItems: string[] = productOverride?.bestFor ?? []
  const checkFirst: string[] = productOverride?.checkFirst ?? []
  const howToUseStructured = productOverride?.howToUseStructured
  const howToUse = productOverride?.howToUse ?? null
  const bestReviewQuote = productOverride?.bestReviewQuote

  const pairings = productOverride?.pairings ?? []
  const pairingCards = await Promise.all(
    pairings.slice(0, 3).map(async (pair) => {
      const resolved = await resolvePairing(pair.handle)
      return { ...pair, image: resolved.image, price: resolved.price }
    })
  )

  const hasSupplementFacts = parsed.supplementFacts !== null
  const hasWhatsInside =
    parsed.supplementFacts !== null ||
    parsed.ingredients !== null ||
    parsed.warnings !== null

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="vt-page pt-16">
      <StickyAtcBar product={product} price={price} title={product.title} />

      {/* ── S1: Hero ────────────────────────────────────────────────────────── */}
      <div className="vt-container py-12">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 mb-8 overflow-hidden"
          style={{ fontSize: "var(--vt-text-xs)" }}
        >
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

        <div className="grid lg:grid-cols-[55%_45%] gap-10 lg:gap-16 items-start">
          {/* Sticky image column */}
          <div
            className="lg:sticky lg:top-24 self-start animate-fade-in-up"
            style={{ animationFillMode: "both" }}
          >
            <ProductGallery images={images} title={product.title} />
          </div>

          {/* Scrolling info column */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "100ms", animationFillMode: "both" }}
          >
            {/* 1. Product name */}
            <h1
              className="font-bold tracking-tight leading-tight break-words mb-3"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.25rem)",
                color: "var(--vt-text)",
                letterSpacing: "-0.035em",
              }}
            >
              {product.title}
            </h1>

            {/* 2. Tagline */}
            {tagline && (
              <p
                className="italic mb-4"
                style={{ fontSize: "14px", color: "var(--vt-muted)", lineHeight: 1.5 }}
              >
                {tagline}
              </p>
            )}

            {/* 3. Star rating + review count */}
            {hasReviews && (
              <Link
                href="#reviews"
                className="inline-flex items-center gap-2 mb-6 transition-opacity hover:opacity-80"
              >
                <StarRow avg={reviewSummary.avg} size={15} />
                <span style={{ fontSize: "14px", color: "var(--vt-text-soft)" }}>
                  {reviewSummary.avg} · {reviewSummary.count}{" "}
                  {reviewSummary.count === 1 ? "review" : "reviews"}
                </span>
                <ChevronDown className="w-3.5 h-3.5" style={{ color: "var(--vt-muted-2)" }} />
              </Link>
            )}

            {/* 4. Price */}
            <p
              className="font-bold mb-6"
              style={{ fontSize: "24px", color: "var(--vt-text)" }}
            >
              {price}
            </p>

            {/* 5 + 6. Quantity selector + Add to cart */}
            <div className="mb-4">
              <AddToCart product={product} />
            </div>

            {/* 7. Micro-trust lines */}
            <div className="flex flex-col gap-1.5 mb-6">
              {["Free US & International Shipping", "30-Day Satisfaction Guarantee"].map((line) => (
                <div key={line} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--vt-accent-blue)" }} strokeWidth={2.5} />
                  <span style={{ fontSize: "13px", color: "var(--vt-text-soft)" }}>{line}</span>
                </div>
              ))}
            </div>

            {/* 8. Three badge row */}
            <div
              className="rounded-xl grid grid-cols-3 gap-px overflow-hidden"
              style={{ border: "1px solid var(--vt-line)", background: "var(--vt-line)" }}
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
                  <Icon className="w-5 h-5" style={{ color: "var(--vt-accent-steel)" }} strokeWidth={1.5} />
                  <span className="text-xs leading-tight" style={{ color: "var(--vt-text-soft)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* 9. Featured pull quote — only when reviews exist */}
            {hasReviews && bestReviewQuote && (
              <div
                className="rounded-xl p-5 mt-5"
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(168,209,255,0.06), transparent 48%), rgba(255,255,255,0.02)",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)",
                }}
              >
                <StarRow avg={5} size={14} />
                <p
                  className="italic mt-3 mb-3"
                  style={{ fontSize: "15px", color: "var(--vt-text-soft)", lineHeight: 1.6 }}
                >
                  &ldquo;{bestReviewQuote.text}&rdquo;
                </p>
                <p style={{ fontSize: "13px", color: "var(--vt-muted-2)" }}>
                  — {bestReviewQuote.name} {bestReviewQuote.initial}.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sentinel — sticky bar fades in once this scrolls past the top */}
      <div id="vt-hero-sentinel" aria-hidden="true" />

      {/* ── S2: Stats bar ───────────────────────────────────────────────────── */}
      {stats.length > 0 && (
        <div
          style={{
            background: "var(--vt-bg-2)",
            borderTop: "1px solid var(--vt-line)",
            borderBottom: "1px solid var(--vt-line)",
          }}
        >
          <div className="vt-container">
            <div
              className="flex gap-0 snap-x"
              style={{ overflowX: "auto", scrollbarWidth: "none" }}
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex flex-col justify-center py-6 px-6 flex-shrink-0 snap-start"
                  style={{
                    borderRight: i < stats.length - 1 ? "1px solid var(--vt-line)" : "none",
                    minWidth: "130px",
                    flex: "1 1 0",
                  }}
                >
                  <p className="label-xs mb-1" style={{ color: "var(--vt-muted-2)" }}>
                    {stat.label}
                  </p>
                  <p
                    className="font-semibold"
                    style={{ fontSize: "var(--vt-text-lg)", color: "var(--vt-text)", letterSpacing: "-0.02em" }}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── S3: Product description block ───────────────────────────────────── */}
      {descriptionRows.length > 0 && (
        <section className="vt-product-section">
          <div className="vt-container" style={{ maxWidth: "920px" }}>
            <ScrollReveal>
              <SectionHeading eyebrow="Why It Works" title="What this does for you" />
              <div className="space-y-5">
                {descriptionRows.map((row, i) => {
                  const isFinal = row.icon === "check"
                  const Icon = row.icon ? iconFor(row.icon) : getBenefitIcon(row.claim)

                  if (isFinal) {
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-4 pt-5"
                        style={{ borderTop: "1px solid var(--vt-line)" }}
                      >
                        <Check
                          className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{ color: "var(--vt-accent-blue)" }}
                          strokeWidth={2}
                        />
                        <p
                          className="font-medium"
                          style={{ fontSize: "15px", color: "var(--vt-text-soft)", lineHeight: 1.6 }}
                        >
                          {row.claim}
                        </p>
                      </div>
                    )
                  }

                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
                        style={{
                          background: "rgba(168,209,255,0.08)",
                          border: "1px solid rgba(168,209,255,0.12)",
                        }}
                      >
                        <Icon className="w-4 h-4" style={{ color: "var(--vt-accent-blue)" }} strokeWidth={1.7} />
                      </div>
                      <div>
                        <p
                          className="font-semibold mb-1"
                          style={{ fontSize: "16px", color: "var(--vt-text)" }}
                        >
                          {row.claim}
                        </p>
                        {row.sentence && (
                          <p style={{ fontSize: "15px", color: "var(--vt-muted)", lineHeight: 1.6 }}>
                            {row.sentence}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── S4: Benefit cards ───────────────────────────────────────────────── */}
      {benefitCards.length > 0 && (
        <section className="vt-product-section">
          <div className="vt-container">
            <ScrollReveal>
              <SectionHeading eyebrow="Benefits" title="Built for this." className="mb-10" />
            </ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {benefitCards.slice(0, 4).map((card, i) => {
                const Icon = card.icon ? iconFor(card.icon) : getBenefitIcon(card.headline)
                return (
                  <ScrollReveal key={i} delay={i * 60}>
                    <div className="vt-benefit-card h-full p-5">
                      <div
                        className="flex items-center justify-center w-9 h-9 rounded-lg mb-4"
                        style={{
                          background: "rgba(168,209,255,0.08)",
                          border: "1px solid rgba(168,209,255,0.12)",
                        }}
                      >
                        <Icon className="w-4 h-4" style={{ color: "var(--vt-accent-blue)" }} strokeWidth={1.6} />
                      </div>
                      <p className="font-semibold mb-1.5 leading-snug" style={{ fontSize: "15px", color: "var(--vt-text)" }}>
                        {card.headline}
                      </p>
                      {card.ingredient && (
                        <p
                          className="font-medium mb-2"
                          style={{ fontSize: "12px", color: "var(--vt-accent-blue)", letterSpacing: "0.01em" }}
                        >
                          {card.ingredient}
                        </p>
                      )}
                      <p style={{ fontSize: "13px", color: "var(--vt-muted)", lineHeight: 1.6 }}>
                        {card.description}
                      </p>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── S5: Is this right for you ───────────────────────────────────────── */}
      {(bestForItems.length > 0 || checkFirst.length > 0) && (
        <section className="vt-product-section">
          <div className="vt-container">
            <ScrollReveal>
              <div
                className="rounded-2xl p-8 md:p-10"
                style={{ background: "var(--vt-bg-3)", border: "1px solid var(--vt-line)" }}
              >
                <div className="grid md:grid-cols-2 gap-10 md:gap-14">
                  {/* This is for you if */}
                  <div>
                    <h3
                      className="font-semibold mb-5"
                      style={{ fontSize: "1.125rem", color: "var(--vt-text)" }}
                    >
                      This is for you if:
                    </h3>
                    <ul className="space-y-3">
                      {bestForItems.slice(0, 4).map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span
                            className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full mt-0.5"
                            style={{
                              background: "rgba(168,209,255,0.1)",
                              border: "1px solid rgba(168,209,255,0.2)",
                            }}
                          >
                            <Check className="w-2.5 h-2.5" style={{ color: "var(--vt-accent-blue)" }} strokeWidth={2.5} />
                          </span>
                          <span style={{ fontSize: "15px", color: "var(--vt-text-soft)", lineHeight: 1.6 }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* You may want to check first if */}
                  {checkFirst.length > 0 && (
                    <div>
                      <h3
                        className="font-semibold mb-5"
                        style={{ fontSize: "1.125rem", color: "var(--vt-text)" }}
                      >
                        You may want to check first if:
                      </h3>
                      <ul className="space-y-3">
                        {checkFirst.slice(0, 2).map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span
                              className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full mt-0.5"
                              style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid var(--vt-line-strong)",
                                color: "var(--vt-muted)",
                                fontSize: "12px",
                                lineHeight: 1,
                              }}
                            >
                              !
                            </span>
                            <span style={{ fontSize: "15px", color: "var(--vt-muted)", lineHeight: 1.6 }}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── S6: How to use ──────────────────────────────────────────────────── */}
      {(howToUseStructured || howToUse) && (
        <section className="vt-product-section">
          <div className="vt-container" style={{ maxWidth: "760px" }}>
            <ScrollReveal>
              <SectionHeading eyebrow="How To Use" title="How to take it" />
              <div
                className="rounded-xl p-6 md:p-7"
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(168,209,255,0.06), transparent 40%), rgba(255,255,255,0.02)",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)",
                }}
              >
                {howToUseStructured ? (
                  <>
                    <span
                      className="inline-block px-3 py-1.5 rounded-full font-medium mb-5"
                      style={{
                        fontSize: "13px",
                        border: "1px solid rgba(168,209,255,0.18)",
                        color: "var(--vt-accent-blue)",
                        background: "rgba(168,209,255,0.06)",
                      }}
                    >
                      {howToUseStructured.serving}
                    </span>
                    <dl className="space-y-3.5">
                      {[
                        { k: "When", v: howToUseStructured.when },
                        { k: "With", v: howToUseStructured.with },
                        { k: "Note", v: howToUseStructured.note },
                        { k: "Supply", v: howToUseStructured.supply },
                      ].map(({ k, v }) => (
                        <div key={k} className="flex flex-col sm:flex-row sm:gap-4">
                          <dt
                            className="label-xs flex-shrink-0 sm:w-20 mb-1 sm:mb-0 sm:pt-0.5"
                            style={{ color: "var(--vt-muted-2)" }}
                          >
                            {k}
                          </dt>
                          <dd style={{ fontSize: "15px", color: "var(--vt-text-soft)", lineHeight: 1.6 }}>
                            {v}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </>
                ) : (
                  <>
                    {parsed.supplementFacts?.servingSize && (
                      <span
                        className="inline-block px-3 py-1.5 rounded-full font-medium mb-4"
                        style={{
                          fontSize: "13px",
                          border: "1px solid rgba(168,209,255,0.18)",
                          color: "var(--vt-accent-blue)",
                          background: "rgba(168,209,255,0.06)",
                        }}
                      >
                        {parsed.supplementFacts.servingSize} per serving
                      </span>
                    )}
                    <p style={{ fontSize: "15px", color: "var(--vt-text-soft)", lineHeight: 1.7 }}>
                      {howToUse}
                    </p>
                  </>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── S7: Pairs well with ─────────────────────────────────────────────── */}
      {pairingCards.length > 0 && (
        <section className="vt-product-section">
          <div className="vt-container">
            <ScrollReveal>
              <SectionHeading eyebrow="Complete Your Stack" title="Pairs well with" className="mb-10" />
            </ScrollReveal>
            <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
              {pairingCards.map((pair, i) => (
                <ScrollReveal key={pair.handle} delay={i * 70} className="min-w-[260px] sm:min-w-0">
                  <Link
                    href={`/products/${pair.handle}`}
                    className="vt-panel vt-panel--interactive block p-5 rounded-xl h-full"
                    style={{ textDecoration: "none" }}
                  >
                    {pair.image && (
                      <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-4 bg-[#f5f5f3]">
                        <Image
                          src={pair.image.url}
                          alt={pair.image.altText ?? pair.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 60vw, 25vw"
                        />
                      </div>
                    )}
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <p className="font-semibold" style={{ fontSize: "15px", color: "var(--vt-text)" }}>
                        {pair.name}
                      </p>
                      {pair.price && (
                        <p className="font-semibold flex-shrink-0" style={{ fontSize: "14px", color: "var(--vt-text-soft)" }}>
                          {pair.price}
                        </p>
                      )}
                    </div>
                    <p className="mb-5" style={{ fontSize: "13px", color: "var(--vt-muted)", lineHeight: 1.6 }}>
                      {pair.rationale}
                    </p>
                    <span
                      className="flex items-center gap-1 font-medium"
                      style={{ fontSize: "13px", color: "var(--vt-accent-blue)" }}
                    >
                      View product <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── S8: Reviews ─────────────────────────────────────────────────────── */}
      <section id="reviews" className="vt-product-section" style={{ scrollMarginTop: "80px" }}>
        <div className="vt-container">
          <ScrollReveal>
            <SectionHeading eyebrow="What Customers Say" title="Reviews" className="mb-10" />
            <div className="max-w-3xl">
              <ReviewsSection handle={handle} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── S9: FAQ ─────────────────────────────────────────────────────────── */}
      <section className="vt-product-section">
        <div className="vt-container">
          <ScrollReveal>
            <SectionHeading eyebrow="Common Questions" title="FAQ" className="mb-10" />
            <div className="max-w-3xl">
              <ProductFAQ faq={productOverride?.faq} productTitle={product.title} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── S10: Supplement facts (researcher detail, kept at the bottom) ───── */}
      {hasWhatsInside && (
        <section className="vt-product-section">
          <div className="vt-container">
            <ScrollReveal>
              <SectionHeading eyebrow="Full Label" title="Supplement Facts" className="mb-10" />
              <div className={hasSupplementFacts ? "grid lg:grid-cols-5 gap-8 items-start" : ""}>
                {parsed.supplementFacts && (
                  <div className="lg:col-span-3">
                    <SupplementFacts data={parsed.supplementFacts} ingredients={null} warnings={null} showCoa />
                  </div>
                )}
                <div className={parsed.supplementFacts ? "lg:col-span-2 space-y-6" : "space-y-6"}>
                  <SupplementFacts data={null} ingredients={parsed.ingredients} warnings={parsed.warnings} />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Sentinel — sticky bar hides once the footer comes into view */}
      <div id="vt-footer-sentinel" aria-hidden="true" />
    </div>
  )
}
