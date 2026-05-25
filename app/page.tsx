import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, FlaskConical, Zap, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f0f14]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left copy */}
            <div>
              <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                <span className="label-xs text-white/50">
                  cGMP Manufacturing · FDA-Registered Facilities
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-white">
                Built on{" "}
                <span className="relative">
                  <span className="italic font-light">science.</span>
                </span>
                <br />
                Backed by{" "}
                <span className="italic font-light">results.</span>
              </h1>

              <p className="text-white/45 text-lg leading-relaxed mt-6 max-w-lg">
                Premium supplements formulated from evidence-backed ingredients.
                Every product manufactured in cGMP-compliant, FDA-registered
                facilities — nothing more, nothing less.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  href="/shop"
                  className="inline-flex items-center bg-white text-black hover:bg-white/90 font-medium px-8 py-3 tracking-wide rounded-sm transition-colors text-sm"
                >
                  Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center text-white/50 hover:text-white hover:bg-white/5 font-medium px-6 py-3 tracking-wide rounded-sm border border-white/10 transition-colors text-sm"
                >
                  Our Philosophy
                </Link>
              </div>

              {/* Mini trust */}
              <div className="flex flex-wrap gap-6 mt-12">
                {[
                  "COA Available",
                  "FDA-Registered",
                  "cGMP Certified",
                  "30-Day Guarantee",
                ].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="text-white/35 text-xs tracking-wide">{t}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right — product grid mosaic */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {featured.slice(0, 4).map((product, i) => {
                const image = product.images.edges[0]?.node;
                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.handle}`}
                    className="group relative overflow-hidden rounded-sm border border-white/8 bg-[#131319] hover:border-white/20 transition-all duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden bg-[#f5f5f3]">
                      {image ? (
                        <Image
                          src={image.url}
                          alt={image.altText ?? product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 1200px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#18181f] flex items-center justify-center">
                          <span className="text-white/10 label-xs text-center px-4">
                            {product.title}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#0b0b0e]/85 to-transparent">
                      <p className="text-white text-xs font-medium truncate">
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

      {/* Trust Bar */}
      <TrustBar />

      {/* Featured Products */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="label-sm text-white/30 mb-2">Catalog</p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                Featured Products
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors"
            >
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 sm:hidden text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition-colors"
            >
              View all products <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Category Strip */}
      <section className="py-16 border-y border-white/8 bg-[#0b0b0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="label-sm text-white/30 mb-8 text-center">
            Shop by Goal
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                tag: "wellness",
                label: "Wellness",
                description:
                  "Vitamins, minerals, and foundational support for everyday health.",
                icon: Leaf,
              },
              {
                tag: "performance",
                label: "Performance",
                description:
                  "Science-backed formulas to support strength, endurance, and recovery.",
                icon: Zap,
              },
              {
                tag: "weight-management",
                label: "Body Composition",
                description:
                  "Metabolic support formulas for active individuals with defined goals.",
                icon: FlaskConical,
              },
            ].map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.tag}
                  href={`/shop?tag=${cat.tag}`}
                  className="group flex flex-col p-6 border border-white/8 rounded-sm bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <Icon className="w-6 h-6 text-white/30 group-hover:text-white/60 transition-colors mb-4" strokeWidth={1.5} />
                  <h3 className="text-white font-medium mb-2">{cat.label}</h3>
                  <p className="text-white/40 text-sm leading-relaxed flex-1">
                    {cat.description}
                  </p>
                  <div className="flex items-center gap-1.5 mt-4 text-white/30 group-hover:text-white/60 transition-colors">
                    <span className="text-xs tracking-wide">Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Strip */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="label-sm text-white/30 mb-4">Philosophy</p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight">
                No marketing claims.
                <br />
                Only what the science supports.
              </h2>
              <p className="text-white/45 text-base leading-relaxed mt-6">
                Every product in our catalog is sourced from a single,
                carefully selected supplier and manufactured under strict
                cGMP-compliant conditions in FDA-registered facilities. We do
                not make health claims that exceed what the current body of
                evidence supports.
              </p>
              <p className="text-white/45 text-base leading-relaxed mt-4">
                Certificates of Analysis are available upon request for any
                product. What you read on the label is what you get.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mt-8 transition-colors group"
              >
                Learn more about Ventality
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  stat: "cGMP",
                  label: "Compliant Manufacturing",
                  sub: "All products",
                },
                {
                  stat: "FDA",
                  label: "Registered Facilities",
                  sub: "Every supplier",
                },
                {
                  stat: "COA",
                  label: "Certificate of Analysis",
                  sub: "On request",
                },
                {
                  stat: "30-Day",
                  label: "Satisfaction Guarantee",
                  sub: "No questions asked",
                },
              ].map((item) => (
                <div
                  key={item.stat}
                  className="p-5 border border-white/8 rounded-sm bg-white/[0.02]"
                >
                  <p className="text-white text-2xl font-semibold tracking-tight">
                    {item.stat}
                  </p>
                  <p className="text-white/60 text-sm font-medium mt-1 leading-tight">
                    {item.label}
                  </p>
                  <p className="text-white/25 text-xs mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <p className="label-sm text-white/30 mb-3">Stay Informed</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Evidence-based updates.
              <br />
              No noise.
            </h2>
            <p className="text-white/40 text-sm mt-4 leading-relaxed">
              New products, science reviews, and formulation updates. No spam —
              unsubscribe anytime.
            </p>
            <form
              action={`mailto:contact@ventality.health?subject=Newsletter Signup`}
              method="get"
              className="flex gap-2 mt-8 max-w-md mx-auto"
            >
              <input
                type="email"
                name="body"
                placeholder="your@email.com"
                required
                className="flex-1 bg-white/5 border border-white/10 rounded-sm px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-white text-black text-sm font-medium rounded-sm hover:bg-white/90 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-white/20 text-xs mt-3">
              By subscribing you agree to our Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
