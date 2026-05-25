import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ShieldCheck, FlaskConical, Building2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { getProductByHandle, getProducts, MOCK_PRODUCTS, formatPrice } from "@/lib/shopify";
import AddToCart from "./AddToCart";

export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const data = await getProducts(50);
  const shopifyHandles = data?.edges?.map((e) => ({ handle: e.node.handle })) ?? [];
  const mockHandles = MOCK_PRODUCTS.map((p) => ({ handle: p.handle }));
  const all = [...shopifyHandles];
  for (const m of mockHandles) {
    if (!all.find((s) => s.handle === m.handle)) all.push(m);
  }
  return all;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product =
    (await getProductByHandle(handle)) ??
    MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null;
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.title,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product =
    (await getProductByHandle(handle)) ??
    MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null;

  if (!product) notFound();

  const images = product.images.edges.map((e) => e.node);
  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  );

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-white/30 mb-10">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/50">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative aspect-square bg-[#f5f5f3] rounded-sm overflow-hidden">
              {images[0] ? (
                <Image
                  src={images[0].url}
                  alt={images[0].altText ?? product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white/10 label-xs">{product.title}</span>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.slice(1, 5).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square bg-[#f5f5f3] rounded-sm overflow-hidden border border-white/8"
                  >
                    <Image
                      src={img.url}
                      alt={img.altText ?? `${product.title} ${i + 2}`}
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex gap-2 mb-4">
                {product.tags.slice(0, 2).map((tag) => (
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

            <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight">
              {product.title}
            </h1>

            <p className="text-2xl font-medium text-white mt-4">{price}</p>

            <p className="text-white/45 text-sm leading-relaxed mt-5">
              {product.description}
            </p>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-8 py-6 border-y border-white/8">
              {[
                { icon: ShieldCheck, label: "cGMP Certified" },
                { icon: Building2, label: "FDA-Registered" },
                { icon: FlaskConical, label: "COA Available" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <Icon className="w-5 h-5 text-white/30" strokeWidth={1.5} />
                  <span className="text-white/40 text-xs leading-tight">{label}</span>
                </div>
              ))}
            </div>

            {/* Add to cart */}
            <div className="mt-8">
              <AddToCart product={product} />
            </div>

            {/* FDA Disclaimer */}
            <p className="text-white/20 text-xs leading-relaxed mt-6 p-4 border border-white/5 rounded-sm bg-white/[0.01]">
              <strong className="text-white/30">FDA Disclaimer:</strong>{" "}
              This statement has not been evaluated by the Food and Drug
              Administration. This product is not intended to diagnose, treat,
              cure, or prevent any disease. Consult your healthcare provider
              before use.
            </p>

            {/* Accordion */}
            <Accordion className="mt-8">
              <AccordionItem value="details" className="border-white/10">
                <AccordionTrigger className="text-white/70 hover:text-white text-sm tracking-wide py-4">
                  Product Details
                </AccordionTrigger>
                <AccordionContent className="text-white/45 text-sm leading-relaxed pb-4">
                  {(product as { descriptionHtml?: string }).descriptionHtml ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: (product as { descriptionHtml: string }).descriptionHtml,
                      }}
                      className="prose prose-sm prose-invert max-w-none"
                    />
                  ) : (
                    <p>{product.description}</p>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="usage" className="border-white/10">
                <AccordionTrigger className="text-white/70 hover:text-white text-sm tracking-wide py-4">
                  Usage & Dosing
                </AccordionTrigger>
                <AccordionContent className="text-white/45 text-sm leading-relaxed pb-4">
                  Follow the serving size and directions on the product label. Do not
                  exceed the recommended dose. If you are pregnant, nursing, have a
                  medical condition, or are taking medications, consult your healthcare
                  provider before use.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping" className="border-white/10">
                <AccordionTrigger className="text-white/70 hover:text-white text-sm tracking-wide py-4">
                  Shipping & Fulfillment
                </AccordionTrigger>
                <AccordionContent className="text-white/45 text-sm leading-relaxed pb-4">
                  Orders are typically processed and shipped within 2–5 business days.
                  Standard domestic shipping takes 5–10 business days after dispatch.
                  Expedited options may be available at checkout. For full details, see
                  our{" "}
                  <Link href="/shipping" className="text-white/60 underline hover:text-white">
                    Shipping Policy
                  </Link>
                  .
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
