import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getProducts, MOCK_PRODUCTS, type ShopifyProduct } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse Ventality's full catalog of premium supplements — wellness, performance, and body composition formulas.",
};

export const revalidate = 60;

const TABS = [
  { key: "all", label: "All Products" },
  { key: "wellness", label: "Wellness" },
  { key: "performance", label: "Performance" },
  { key: "weight-management", label: "Body Composition" },
];

interface ShopPageProps {
  searchParams: Promise<{ q?: string; tag?: string }>;
}

async function getAllProducts(): Promise<ShopifyProduct[]> {
  const data = await getProducts(50);
  if (data?.edges && data.edges.length > 0) {
    return data.edges.map((e) => e.node);
  }
  return MOCK_PRODUCTS;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { q, tag } = await searchParams;
  const allProducts = await getAllProducts();

  let filtered = allProducts;

  if (q) {
    const lower = q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.tags.some((t) => t.toLowerCase().includes(lower))
    );
  }

  if (tag && tag !== "all") {
    filtered = filtered.filter((p) => p.tags.includes(tag));
  }

  const activeTab = tag ?? "all";

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="label-sm text-white/30 mb-2">Catalog</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
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
      </div>

      {/* Filter tabs */}
      {!q && (
        <div className="border-b border-white/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8 overflow-x-auto scrollbar-none">
              {TABS.map((tab) => (
                <Link
                  key={tab.key}
                  href={tab.key === "all" ? "/shop" : `/shop?tag=${tab.key}`}
                  className={`py-4 text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? "border-white text-white"
                      : "border-transparent text-white/40 hover:text-white/70"
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-white/30 text-lg mb-4">No products found.</p>
            <Link
              href="/shop"
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              View all products
            </Link>
          </div>
        ) : (
          <>
            <p className="text-white/25 text-xs label-xs mb-8">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
