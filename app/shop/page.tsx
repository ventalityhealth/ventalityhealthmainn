import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { X } from "lucide-react";
import ShopContent from "@/components/ShopContent";
import { getProducts, MOCK_PRODUCTS, type ShopifyProduct } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Shop — Ventality",
  description:
    "Browse Ventality's full catalog of premium supplements — wellness, performance, and body composition formulas.",
};

export const revalidate = 60;

interface ShopPageProps {
  searchParams: Promise<{ q?: string }>;
}

async function getAllProducts(): Promise<ShopifyProduct[]> {
  const data = await getProducts(50);
  if (data?.edges && data.edges.length > 0) {
    return data.edges.map((e) => e.node);
  }
  return MOCK_PRODUCTS;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { q } = await searchParams;
  const allProducts = await getAllProducts();

  /* Search filtering is still server-side for simplicity */
  const products = q
    ? allProducts.filter((p) => {
        const lower = q.toLowerCase();
        return (
          p.title.toLowerCase().includes(lower) ||
          p.description.toLowerCase().includes(lower) ||
          p.tags.some((t) => t.toLowerCase().includes(lower))
        );
      })
    : allProducts;

  return (
    <div className="pt-16">
      {/* ── Page header ──────────────────────────────────────────── */}
      <div className="border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="label-sm text-white/30 mb-2">Catalog</p>
              <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight break-words">
                {q ? (
                  <>
                    Results for{" "}
                    <span className="italic font-light">&ldquo;{q}&rdquo;</span>
                  </>
                ) : (
                  "Shop"
                )}
              </h1>
              {q && (
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1.5 text-white/35 hover:text-white text-sm mt-3 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear search
                </Link>
              )}
            </div>

            {!q && (
              <p className="text-white/25 text-sm">
                {allProducts.length} product{allProducts.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Benefit strip + filters + grid (client) ──────────────── */}
      <ShopContent products={products} searchQuery={q} />
    </div>
  );
}
