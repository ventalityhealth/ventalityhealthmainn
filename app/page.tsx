import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  FlaskConical,
  Zap,
  Leaf,
  ShieldCheck,
  Microscope,
  Layers,
  Sparkles,
} from "lucide-react";
import TrustBar from "@/components/TrustBar";
import ProductCard from "@/components/ProductCard";
import { getProducts, MOCK_PRODUCTS } from "@/lib/shopify";

export const revalidate = 60;

async function getFeaturedProducts() {
  const data = await getProducts(4);
  if (data?.edges && data.edges.length > 0) {
    return data.edges.map((e) => e.node);
  }
  return MOCK_PRODUCTS.slice(0, 4);
}

/* ── Capability card data ─────────────────────────────────────── */
const CAPABILITIES = [
  {
    icon: Leaf,
    label: "Wellness Foundations",
    body: "Vitamins, minerals, and daily essentials that support the body's baseline function.",
    tag: "wellness",
  },
  {
    icon: Zap,
    label: "Performance",
    body: "Science-backed formulas to support strength, endurance, and active recovery.",
    tag: "performance",
  },
  {
    icon: FlaskConical,
    label: "Body Composition",
    body: "Metabolic support compounds for active individuals with defined physique goals.",
    tag: "weight-management",
  },
  {
    icon: Microscope,
    label: "Ingredient Transparency",
    body: "Every compound listed by exact form and dose. No blends. No proprietary obfuscation.",
    tag: "transparency",
  },
  {
    icon: ShieldCheck,
    label: "cGMP & FDA-Registered",
    body: "All products manufactured under strict cGMP conditions in FDA-registered facilities.",
    tag: "compliance",
  },
  {
    icon: Layers,
    label: "Stackable Routines",
    body: "Products formulated to work together. Build a routine that compounds over time.",
    tag: "stacks",
  },
];

/* ── Offer cards ──────────────────────────────────────────────── */
const OFFERS = [
  {
    tier: "Single Product",
    headline: "Start with one.",
    body: "Choose a single, research-backed formula and build your baseline. Free shipping on orders over $50.",
    cta: "Browse Products",
    href: "/shop",
    highlight: false,
  },
  {
    tier: "Curated Stack",
    headline: "Build a routine.",
    body: "Pre-assembled stacks designed around specific goals. Save on multi-product bundles and simplify your protocol.",
    cta: "View Stacks",
    href: "/shop?tag=bundles",
    highlight: true,
  },
  {
    tier: "Full Protocol",
    headline: "Commit to the long game.",
    body: "Subscribe for monthly delivery and lock in the best per-unit pricing. Pause or cancel anytime.",
    cta: "Subscribe & Save",
    href: "/shop",
    highlight: false,
  },
];

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center pt-16 overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 18% 10%, rgba(65,88,124,0.14), transparent 34%)," +
            "radial-gradient(circle at 82% 6%, rgba(112,132,161,0.10), transparent 28%)," +
            "linear-gradient(180deg, #0B1017 0%, #0C111A 40%, #0A0F16 100%)",
        }}
      >
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-48"
          style={{
            background: "linear-gradient(to bottom, transparent, #0A0F16)",
          }}
        />

        <div className="relative vt-container py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <div>
              <div className="vt-eyebrow mb-8">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--vt-lumen-core)", opacity: 0.7 }}
                />
                cGMP Manufacturing · FDA-Registered Facilities
              </div>

              <h1 className="vt-heading-xl mb-6">
                Built on{" "}
                <span style={{ fontStyle: "italic", fontWeight: 300 }}>
                  science.
                </span>
                <br />
                Backed by{" "}
                <span style={{ fontStyle: "italic", fontWeight: 300 }}>
                  results.
                </span>
              </h1>

              <p className="vt-copy max-w-lg mb-10">
                Premium supplements formulated from evidence-backed ingredients.
                Every product manufactured in cGMP-compliant, FDA-registered
                facilities — nothing more, nothing less.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/shop" className="vt-button-primary">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/about" className="vt-button-secondary">
                  Our Philosophy
                </Link>
              </div>

              {/* Mini trust dots */}
              <div className="flex flex-wrap gap-6 mt-10">
                {["COA Available", "FDA-Registered", "cGMP Certified", "30-Day Guarantee"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{ background: "var(--vt-line-strong)" }}
                    />
                    <span
                      style={{
                        fontSize: "var(--vt-text-xs)",
                        color: "var(--vt-muted-2)",
                        letterSpacing: "0.07em",
                      }}
                    >
                      {t}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right — product mosaic */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {featured.slice(0, 4).map((product) => {
                const image = product.images.edges[0]?.node;
                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.handle}`}
                    className="vt-panel vt-panel--interactive group"
                    style={{ display: "block" }}
                  >
                    <div
                      className="relative overflow-hidden"
                      style={{
                        aspectRatio: "1",
                        borderRadius: "var(--vt-radius-card) var(--vt-radius-card) 0 0",
                        background: "#F5F5F3",
                      }}
                    >
                      {image ? (
                        <Image
                          src={image.url}
                          alt={image.altText ?? product.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 1200px) 50vw, 25vw"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{ background: "var(--vt-bg-3)" }}
                        >
                          <span
                            style={{
                              color: "var(--vt-muted-2)",
                              fontSize: "var(--vt-text-xs)",
                              textAlign: "center",
                              padding: "0 16px",
                            }}
                          >
                            {product.title}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p
                        className="truncate"
                        style={{
                          color: "var(--vt-text-soft)",
                          fontSize: "var(--vt-text-sm)",
                          fontWeight: 500,
                        }}
                      >
                        {product.title}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Metrics row ────────────────────────────────────────── */}
      <section className="vt-container" style={{ paddingBottom: "clamp(40px, 5vw, 72px)" }}>
        <div className="vt-kpi-row">
          {[
            { value: "cGMP", label: "Compliant Manufacturing" },
            { value: "FDA", label: "Registered Facilities" },
            { value: "COA", label: "Available on Request" },
            { value: "30-Day", label: "Satisfaction Guarantee" },
          ].map((k) => (
            <div key={k.value} className="vt-kpi">
              <strong>{k.value}</strong>
              <span>{k.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trust Bar ──────────────────────────────────────────── */}
      <TrustBar />

      {/* ── Featured Products ──────────────────────────────────── */}
      <section className="vt-section">
        <div className="vt-container">
          <div
            className="flex items-end justify-between"
            style={{ marginBottom: "clamp(32px, 4vw, 56px)" }}
          >
            <div>
              <p
                className="label-sm mb-2"
                style={{ color: "var(--vt-muted-2)" }}
              >
                Catalog
              </p>
              <h2 className="vt-heading-lg">Featured Products</h2>
            </div>
            <Link
              href="/shop"
              className="vt-catalog-viewall hidden sm:flex items-center gap-1.5 transition-colors"
            >
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 sm:hidden text-center">
            <Link
              href="/shop"
              className="vt-catalog-viewall inline-flex items-center gap-1.5 transition-colors"
            >
              View all products <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Horizon divider ────────────────────────────────────── */}
      <div className="vt-container">
        <hr className="vt-horizon" />
      </div>

      {/* ── Capabilities grid (6 cards) ────────────────────────── */}
      <section className="vt-section">
        <div className="vt-container">
          <div
            className="text-center"
            style={{ marginBottom: "clamp(36px, 5vw, 64px)" }}
          >
            <div className="vt-eyebrow" style={{ marginBottom: "16px" }}>
              <Sparkles className="w-3 h-3" />
              What we cover
            </div>
            <h2 className="vt-heading-lg">
              Every part of your protocol,
              <br />
              <span style={{ color: "var(--vt-muted)" }}>engineered to work together.</span>
            </h2>
          </div>

          <div className="vt-grid-3">
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              return (
                <Link
                  key={cap.tag}
                  href={`/shop?tag=${cap.tag}`}
                  className="vt-panel vt-panel--interactive"
                  style={{ padding: "28px 24px 32px", display: "block" }}
                >
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl mb-5"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--vt-line)",
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: "var(--vt-accent-blue)" }}
                      strokeWidth={1.5}
                    />
                  </div>
                  <p
                    className="font-semibold mb-2"
                    style={{
                      color: "var(--vt-text)",
                      fontSize: "var(--vt-text-base)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {cap.label}
                  </p>
                  <p
                    style={{
                      color: "var(--vt-muted)",
                      fontSize: "var(--vt-text-sm)",
                      lineHeight: 1.6,
                    }}
                  >
                    {cap.body}
                  </p>
                  <div
                    className="flex items-center gap-1.5 mt-5"
                    style={{ color: "var(--vt-muted-2)", fontSize: "var(--vt-text-xs)" }}
                  >
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Horizon divider ────────────────────────────────────── */}
      <div className="vt-container">
        <hr className="vt-horizon" />
      </div>

      {/* ── Workbench / Philosophy section ─────────────────────── */}
      <section className="vt-section">
        <div className="vt-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — editorial copy */}
            <div>
              <div className="vt-eyebrow" style={{ marginBottom: "20px" }}>
                Philosophy
              </div>
              <h2 className="vt-heading-lg" style={{ marginBottom: "20px" }}>
                No marketing claims.
                <br />
                <span style={{ color: "var(--vt-muted)" }}>
                  Only what the science supports.
                </span>
              </h2>
              <p className="vt-copy" style={{ marginBottom: "16px" }}>
                Every product in our catalog is sourced from a single, carefully
                selected supplier and manufactured under strict cGMP-compliant
                conditions in FDA-registered facilities.
              </p>
              <p className="vt-copy" style={{ marginBottom: "32px" }}>
                We do not make health claims that exceed what the current body of
                evidence supports. Certificates of Analysis are available upon
                request. What you read on the label is what you get.
              </p>
              <Link href="/about" className="vt-button-secondary" style={{ display: "inline-flex" }}>
                Learn more about Ventality
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right — stat panels */}
            <div className="vt-grid-2">
              {[
                {
                  stat: "cGMP",
                  label: "Compliant Manufacturing",
                  sub: "All products, every batch",
                },
                {
                  stat: "FDA",
                  label: "Registered Facilities",
                  sub: "Every supplier audited",
                },
                {
                  stat: "COA",
                  label: "Certificate of Analysis",
                  sub: "Available on request",
                },
                {
                  stat: "30-Day",
                  label: "Satisfaction Guarantee",
                  sub: "No questions asked",
                },
              ].map((item) => (
                <div key={item.stat} className="vt-panel" style={{ padding: "24px" }}>
                  <p
                    className="font-bold"
                    style={{
                      fontSize: "1.5rem",
                      letterSpacing: "-0.04em",
                      color: "var(--vt-text)",
                      lineHeight: 1,
                    }}
                  >
                    {item.stat}
                  </p>
                  <p
                    className="font-medium mt-2"
                    style={{
                      fontSize: "var(--vt-text-sm)",
                      color: "var(--vt-text-soft)",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="mt-1"
                    style={{
                      fontSize: "var(--vt-text-xs)",
                      color: "var(--vt-muted-2)",
                    }}
                  >
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Horizon divider ────────────────────────────────────── */}
      <div className="vt-container">
        <hr className="vt-horizon" />
      </div>

      {/* ── Offer cards ────────────────────────────────────────── */}
      <section className="vt-section">
        <div className="vt-container">
          <div
            className="text-center"
            style={{ marginBottom: "clamp(36px, 5vw, 64px)" }}
          >
            <div className="vt-eyebrow" style={{ marginBottom: "16px" }}>
              How to start
            </div>
            <h2 className="vt-heading-lg">
              One entry point.
              <br />
              <span style={{ color: "var(--vt-muted)" }}>As deep as you want to go.</span>
            </h2>
          </div>

          <div className="vt-grid-3">
            {OFFERS.map((offer) => (
              <div
                key={offer.tier}
                className="vt-panel"
                style={{
                  padding: "32px 28px 36px",
                  ...(offer.highlight
                    ? {
                        boxShadow:
                          "inset 0 0 0 1px rgba(168,209,255,0.16), inset 0 1px 0 rgba(168,209,255,0.08), 0 22px 70px rgba(0,0,0,0.38), 0 0 40px rgba(168,209,255,0.06)",
                      }
                    : {}),
                }}
              >
                <p
                  className="vt-eyebrow"
                  style={{ marginBottom: "20px", display: "inline-flex" }}
                >
                  {offer.tier}
                </p>
                <h3
                  className="vt-heading-md"
                  style={{ marginBottom: "12px" }}
                >
                  {offer.headline}
                </h3>
                <p
                  className="vt-body"
                  style={{ marginBottom: "28px", minHeight: "72px" }}
                >
                  {offer.body}
                </p>
                <Link
                  href={offer.href}
                  className={offer.highlight ? "vt-button-primary" : "vt-button-secondary"}
                  style={{ display: "inline-flex" }}
                >
                  {offer.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wide CTA panel ─────────────────────────────────────── */}
      <section className="vt-section">
        <div className="vt-container">
          <div
            className="vt-panel"
            style={{
              padding: "clamp(52px, 8vw, 96px) clamp(32px, 6vw, 80px)",
              background:
                "radial-gradient(circle at 50% 120%, rgba(168,209,255,0.10), transparent 50%)," +
                "radial-gradient(circle at 20% 0%, rgba(65,88,124,0.14), transparent 40%)," +
                "linear-gradient(180deg, rgba(18,25,37,0.96) 0%, rgba(11,17,25,0.98) 100%)",
              textAlign: "center",
            }}
          >
            <div className="vt-eyebrow" style={{ marginBottom: "20px", display: "inline-flex" }}>
              Stay Informed
            </div>
            <h2
              className="vt-heading-lg"
              style={{ marginBottom: "16px", maxWidth: "560px", marginInline: "auto" }}
            >
              Evidence-based updates.
              <br />
              <span style={{ color: "var(--vt-muted)" }}>No noise.</span>
            </h2>
            <p
              className="vt-copy"
              style={{
                marginBottom: "36px",
                maxWidth: "420px",
                marginInline: "auto",
                fontSize: "var(--vt-text-sm)",
              }}
            >
              New products, science reviews, and formulation updates. No spam —
              unsubscribe anytime.
            </p>

            <form
              action={`mailto:contact@ventality.health?subject=Newsletter Signup`}
              method="get"
              className="flex gap-2 justify-center flex-wrap"
              style={{ maxWidth: "460px", margin: "0 auto" }}
            >
              <input
                type="email"
                name="body"
                placeholder="your@email.com"
                required
                style={{
                  flex: "1 1 200px",
                  minWidth: 0,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--vt-line-strong)",
                  borderRadius: "var(--vt-radius-pill)",
                  padding: "0 18px",
                  height: "44px",
                  color: "var(--vt-text)",
                  fontSize: "var(--vt-text-sm)",
                  outline: "none",
                }}
                className="placeholder:opacity-40 focus:border-white/25 transition-colors"
              />
              <button type="submit" className="vt-button-primary" style={{ flex: "0 0 auto" }}>
                Subscribe
              </button>
            </form>

            <p
              className="mt-4"
              style={{
                fontSize: "var(--vt-text-xs)",
                color: "var(--vt-muted-2)",
                opacity: 0.7,
              }}
            >
              By subscribing you agree to our Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
