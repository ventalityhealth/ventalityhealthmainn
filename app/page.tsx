import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import TrustBar from "@/components/TrustBar";
import ProductCard from "@/components/ProductCard";
import SupplementExplorer from "@/components/SupplementExplorer";
import ConversionSequence from "@/components/ConversionSequence";
import { getProducts, MOCK_PRODUCTS } from "@/lib/shopify";

export const revalidate = 60;

async function getFeaturedProducts() {
  const data = await getProducts(4);
  if (data?.edges && data.edges.length > 0) {
    return data.edges.map((e) => e.node);
  }
  return MOCK_PRODUCTS.slice(0, 4);
}


export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      {/*
        Desktop: hero-products.webp (7768×3236, 2.4:1) — object-cover object-right
        Mobile:  hero-products-mobile.jpg (768×1024, portrait) — object-cover object-center
        Section height is viewport-relative, not aspect-ratio locked, so it fills well at all sizes.
      */}
      <section
        className="relative w-full flex items-center pt-16 overflow-hidden"
        style={{
          background: "#080C11",
          minHeight: "clamp(560px, 72vh, 860px)",
        }}
      >
        {/* Desktop image — hidden on mobile */}
        <Image
          src="/hero-products.webp"
          alt="Ventality supplements arranged on dark stone and wood."
          fill
          priority
          quality={100}
          className="hidden md:block object-cover object-right"
          sizes="100vw"
        />

        {/* Mobile image — hidden on desktop */}
        <Image
          src="/hero-products-mobile.jpg"
          alt="Ventality supplements arranged on dark stone and wood."
          fill
          priority
          quality={100}
          className="block md:hidden object-cover object-center"
          sizes="100vw"
        />

        {/* Desktop overlay — dark left third for text, clears toward products on right */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(to right, rgba(8,12,17,0.94) 0%, rgba(8,12,17,0.80) 32%, rgba(8,12,17,0.20) 55%, rgba(8,12,17,0.0) 75%)",
          }}
        />

        {/* Mobile overlay — top-heavy so text stays readable over the product image */}
        <div
          className="absolute inset-0 block md:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,12,17,0.88) 0%, rgba(8,12,17,0.60) 40%, rgba(8,12,17,0.30) 70%, rgba(8,12,17,0.10) 100%)",
          }}
        />

        {/* Bottom fade into site bg */}
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: "linear-gradient(to bottom, transparent, #0A0F16)" }}
        />

        {/* Text — absolutely positioned so it doesn't affect section height */}
        <div className="absolute inset-0 flex items-start md:items-center pt-24 md:pt-0">
          <div className="vt-container w-full">
            <div className="max-w-xl">
              <div className="vt-eyebrow mb-8">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--vt-lumen-core)", opacity: 0.7 }}
                />
                cGMP Manufacturing · FDA-Registered Facilities
              </div>

              <h1 className="vt-heading-xl mb-6">
                Built on{" "}
                <span style={{ fontStyle: "italic", fontWeight: 300 }}>science.</span>
                <br />
                Backed by{" "}
                <span style={{ fontStyle: "italic", fontWeight: 300 }}>results.</span>
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

      {/* ── Supplement Explorer ─────────────────────────────────── */}
      <SupplementExplorer />

      {/* ── Horizon divider ────────────────────────────────────── */}
      <div className="vt-container">
        <hr className="vt-horizon" />
      </div>

      {/* ── Workbench / Philosophy section ─────────────────────── */}
      <section className="vt-section">
        <div className="vt-container">
          {/* Single framed panel — text left, image right */}
          <div
            className="vt-panel overflow-hidden grid lg:grid-cols-2 lg:min-h-[480px]"
            style={{ padding: 0 }}
          >
            {/* Left — editorial copy */}
            <div
              className="flex flex-col justify-center p-6 sm:p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/8"
            >
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
              <Link href="/about" className="vt-button-secondary" style={{ display: "inline-flex", alignSelf: "flex-start" }}>
                Learn more about Ventality
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right — lifestyle image flush inside the frame */}
            <div className="relative min-h-[320px] lg:min-h-0">
              {/* Desktop landscape */}
              <Image
                src="/lifestyle-desktop.jpg"
                alt="Ventality — disciplined daily routine"
                fill
                className="hidden md:block object-cover object-center"
                sizes="50vw"
              />
              {/* Mobile portrait */}
              <Image
                src="/lifestyle-mobile.jpg"
                alt="Ventality — disciplined daily routine"
                fill
                className="block md:hidden object-cover object-bottom"
                sizes="100vw"
              />
              {/* Left-edge fade into the panel divider on desktop */}
              <div
                className="absolute inset-0 hidden md:block"
                style={{
                  background:
                    "linear-gradient(to right, rgba(10,15,22,0.45) 0%, transparent 30%)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Horizon divider ────────────────────────────────────── */}
      <div className="vt-container">
        <hr className="vt-horizon" />
      </div>

      {/* ── Conversion Sequence ─────────────────────────────────── */}
      <ConversionSequence />

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
