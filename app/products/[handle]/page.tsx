import React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, ShieldCheck, FlaskConical, Building2, Package, Truck } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  getProductByHandle,
  getProducts,
  MOCK_PRODUCTS,
  formatPrice,
  getProductBenefits,
} from "@/lib/shopify"
import { parseProductHtml } from "@/lib/parseProductHtml"
import { applyOverride } from "@/lib/productOverrides"
import AddToCart from "./AddToCart"
import ProductGallery from "./ProductGallery"
import ProductHighlights from "./ProductHighlights"
import SupplementFacts from "./SupplementFacts"
import ScrollReveal from "./ScrollReveal"

export const revalidate = 60

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

  const descriptionHtml = (product as { descriptionHtml?: string }).descriptionHtml ?? ""
  const parsed = applyOverride(handle, parseProductHtml(descriptionHtml))

  // Use Supliful-provided benefits; fall back to tag-based benefit copy
  const benefitLines =
    parsed.benefits.length > 0 ? parsed.benefits : getProductBenefits(product)

  const hasWhatsInside =
    parsed.supplementFacts !== null ||
    parsed.ingredients !== null ||
    parsed.warnings !== null

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
        <nav className="flex items-center gap-2 text-xs text-white/30 mb-10 overflow-hidden">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
          <Link href="/shop" className="hover:text-white transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
          <span className="text-white/50 truncate">{product.title}</span>
        </nav>

        {/* ── Hero: Gallery + Info ───────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Gallery */}
          <div
            className="animate-fade-in-up"
            style={{ animationFillMode: "both" }}
          >
            <ProductGallery images={images} title={product.title} />
          </div>

          {/* Info column */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "120ms", animationFillMode: "both" }}
          >

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {product.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-white/5 text-white/40 border-0 label-xs px-2 py-0.5 capitalize"
                  >
                    {tag.replace(/-/g, " ")}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight break-words"
              style={{ color: "var(--vt-text)" }}
            >
              {product.title}
            </h1>

            {/* Price */}
            <p
              className="mt-3 font-semibold"
              style={{
                fontSize: "var(--vt-text-2xl)",
                color: "var(--vt-text)",
              }}
            >
              {price}
            </p>

            {/* ── Animated product highlights ────────────────────────────
                Hook sentence + use-case chips + icon benefit grid
            ─────────────────────────────────────────────────────────── */}
            <ProductHighlights
              productTitle={product.title}
              description={product.description}
              tags={product.tags}
              benefits={benefitLines}
              supplementFacts={parsed.supplementFacts}
            />

            {/* ── Trust badges ───────────────────────────────────────────── */}
            <div
              className="rounded-xl grid grid-cols-3 gap-px mb-8 overflow-hidden"
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

            {/* ── Add to cart ─────────────────────────────────────────────── */}
            <AddToCart product={product} />

            {/* ── Accordion: Usage + Shipping ─────────────────────────────── */}
            <Accordion className="mt-10">

              <AccordionItem value="usage" className="border-white/10">
                <AccordionTrigger className="text-white/70 hover:text-white text-sm tracking-wide py-4 gap-3">
                  <div className="flex items-center gap-2.5">
                    <Package className="w-4 h-4 flex-shrink-0 opacity-50" strokeWidth={1.5} />
                    Usage &amp; Dosing
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/50 text-sm leading-relaxed pb-4 pl-6">
                  Follow the serving size and directions printed on the product label.
                  Do not exceed the recommended dose. If you are pregnant, nursing,
                  have a medical condition, or are taking medications, consult your
                  healthcare provider before use.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping" className="border-white/10">
                <AccordionTrigger className="text-white/70 hover:text-white text-sm tracking-wide py-4 gap-3">
                  <div className="flex items-center gap-2.5">
                    <Truck className="w-4 h-4 flex-shrink-0 opacity-50" strokeWidth={1.5} />
                    Shipping &amp; Fulfillment
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/50 text-sm leading-relaxed pb-4 pl-6">
                  Orders are typically processed and shipped within 2–5 business days.
                  Standard domestic shipping takes 5–10 business days after dispatch.
                  Expedited options may be available at checkout. For full details, see
                  our{" "}
                  <Link
                    href="/shipping"
                    className="text-white/60 underline hover:text-white"
                  >
                    Shipping Policy
                  </Link>
                  .
                </AccordionContent>
              </AccordionItem>

            </Accordion>

            {/* FDA Disclaimer */}
            <p
              className="text-white/20 text-xs leading-relaxed mt-8 p-4 rounded-xl"
              style={{
                border: "1px solid var(--vt-line-soft)",
                background: "rgba(255,255,255,0.01)",
              }}
            >
              <strong className="text-white/30">FDA Disclaimer:</strong>{" "}
              These statements have not been evaluated by the Food and Drug
              Administration. This product is not intended to diagnose, treat,
              cure, or prevent any disease. Consult your healthcare provider
              before use.
            </p>

          </div>
        </div>

        {/* ── What's Inside ─────────────────────────────────────────────────
            Full-width section that reveals on scroll.
            Only rendered when we have structured content from the HTML.
        ─────────────────────────────────────────────────────────────────── */}
        {hasWhatsInside && (
          <ScrollReveal className="mt-24">
            {/* Divider */}
            <div className="h-px mb-16" style={{ background: "var(--vt-horizon-line)" }} />

            {/* Section header */}
            <div className="mb-10">
              <span className="label-xs" style={{ color: "var(--vt-muted-2)" }}>
                Full Transparency
              </span>
              <h2
                className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight"
                style={{ color: "var(--vt-text)" }}
              >
                What&apos;s Inside
              </h2>
              <p
                className="mt-2 text-sm"
                style={{ color: "var(--vt-muted)" }}
              >
                Every ingredient, every amount — exactly as listed on the label.
              </p>
            </div>

            {/* Content grid */}
            <div className="grid lg:grid-cols-5 gap-8 items-start">

              {/* Supplement facts — wider column */}
              {parsed.supplementFacts && (
                <div className="lg:col-span-3">
                  <ScrollReveal delay={80}>
                    <SupplementFacts
                      data={parsed.supplementFacts}
                      ingredients={null}
                      warnings={null}
                    />
                  </ScrollReveal>
                </div>
              )}

              {/* Ingredients + Warnings — narrower column */}
              <div
                className={
                  parsed.supplementFacts
                    ? "lg:col-span-2 space-y-6"
                    : "lg:col-span-5 space-y-6"
                }
              >
                <ScrollReveal delay={160}>
                  <SupplementFacts
                    data={null}
                    ingredients={parsed.ingredients}
                    warnings={parsed.warnings}
                  />
                </ScrollReveal>
              </div>

            </div>
          </ScrollReveal>
        )}

      </div>
    </div>
  )
}
