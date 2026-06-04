"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ShopFiltersPanel, { type FilterState } from "@/components/ShopFiltersPanel";
import {
  BENEFIT_FILTERS,
  SORT_OPTIONS,
  detectFormat,
  type BenefitFilter,
} from "@/lib/shop-config";
import type { ShopifyProduct } from "@/lib/shopify";

/** Matches a product to a benefit via tags first, then title/description keywords */
function productMatchesBenefit(p: ShopifyProduct, b: BenefitFilter): boolean {
  const productTags = p.tags.map((t) => t.toLowerCase());
  if (productTags.some((t) => b.tags.includes(t))) return true;
  if (b.keywords && b.keywords.length > 0) {
    const haystack = `${p.title} ${p.description}`.toLowerCase();
    return b.keywords.some((kw) => haystack.includes(kw.toLowerCase()));
  }
  return false;
}

interface ShopContentProps {
  products: ShopifyProduct[];
  /** Pre-filtered by search query on the server; no benefit/filter UI shown */
  searchQuery?: string;
}

const DEFAULT_FILTERS: FilterState = {
  sortBy: "featured",
  formats: [],
  categories: [],
};

export default function ShopContent({ products, searchQuery }: ShopContentProps) {
  const [activeBenefit, setActiveBenefit] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  /* ── Per-benefit product counts (from full, unfiltered list) ── */
  const benefitCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const b of BENEFIT_FILTERS) {
      counts[b.key] = products.filter((p) => productMatchesBenefit(p, b)).length;
    }
    return counts;
  }, [products]);

  /* ── Derived filtered + sorted product list ────────────────── */
  const displayed = useMemo(() => {
    let list = [...products];

    // 1. Benefit filter
    if (activeBenefit) {
      const benefit = BENEFIT_FILTERS.find((b) => b.key === activeBenefit);
      if (benefit) {
        list = list.filter((p) => productMatchesBenefit(p, benefit));
      }
    }

    // 2. Category filter
    if (filters.categories.length > 0) {
      list = list.filter((p) =>
        filters.categories.some((cat) =>
          p.tags.map((t) => t.toLowerCase()).includes(cat)
        )
      );
    }

    // 3. Format filter
    if (filters.formats.length > 0) {
      list = list.filter((p) => {
        const variantTitles = p.variants.edges.map((e) => e.node.title);
        const fmt = detectFormat(p.title, variantTitles, p.tags);
        return fmt ? filters.formats.includes(fmt) : false;
      });
    }

    // 4. Sort
    switch (filters.sortBy) {
      case "price-asc":
        list.sort(
          (a, b) =>
            parseFloat(a.priceRange.minVariantPrice.amount) -
            parseFloat(b.priceRange.minVariantPrice.amount)
        );
        break;
      case "price-desc":
        list.sort(
          (a, b) =>
            parseFloat(b.priceRange.minVariantPrice.amount) -
            parseFloat(a.priceRange.minVariantPrice.amount)
        );
        break;
      case "az":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // "featured" — preserve original order
        break;
    }

    return list;
  }, [products, activeBenefit, filters]);

  /* ── Active filter chips ───────────────────────────────────── */
  const activeChips: { label: string; onRemove: () => void }[] = [];

  if (activeBenefit) {
    const b = BENEFIT_FILTERS.find((x) => x.key === activeBenefit);
    if (b)
      activeChips.push({
        label: b.label,
        onRemove: () => setActiveBenefit(null),
      });
  }
  filters.categories.forEach((cat) => {
    activeChips.push({
      label: cat
        .split("-")
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" "),
      onRemove: () =>
        setFilters((f) => ({
          ...f,
          categories: f.categories.filter((c) => c !== cat),
        })),
    });
  });
  filters.formats.forEach((fmt) => {
    activeChips.push({
      label: fmt,
      onRemove: () =>
        setFilters((f) => ({
          ...f,
          formats: f.formats.filter((x) => x !== fmt),
        })),
    });
  });
  if (filters.sortBy !== "featured") {
    const s = SORT_OPTIONS.find((o) => o.key === filters.sortBy);
    if (s)
      activeChips.push({
        label: s.label,
        onRemove: () => setFilters((f) => ({ ...f, sortBy: "featured" })),
      });
  }

  const hasActiveFilters = activeChips.length > 0;

  const clearAll = () => {
    setActiveBenefit(null);
    setFilters(DEFAULT_FILTERS);
  };

  /* ── Render ────────────────────────────────────────────────── */
  return (
    <>
      {/* ── Benefit strip (hidden during search) ─────────────── */}
      {!searchQuery && (
        <div className="border-b border-white/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p
              className="label-xs mb-4"
              style={{ color: "var(--vt-muted-2)", letterSpacing: "0.1em" }}
            >
              Shop by Goal
            </p>
            <div className="flex gap-2.5 overflow-x-auto scrollbar-none pb-1">
              {BENEFIT_FILTERS.map((b) => {
                const Icon = b.icon;
                const count = benefitCounts[b.key] ?? 0;
                const active = activeBenefit === b.key;
                if (count === 0) return null;
                return (
                  <button
                    key={b.key}
                    onClick={() =>
                      setActiveBenefit(active ? null : b.key)
                    }
                    className="flex-shrink-0 flex items-center gap-2.5 rounded-xl transition-all duration-200 group"
                    style={{
                      padding: "10px 16px",
                      border: active
                        ? "1px solid rgba(168,209,255,0.45)"
                        : "1px solid var(--vt-line)",
                      background: active
                        ? "rgba(168,209,255,0.08)"
                        : "rgba(255,255,255,0.02)",
                      minWidth: "max-content",
                    }}
                  >
                    <Icon
                      className="w-3.5 h-3.5 flex-shrink-0"
                      style={{
                        color: active
                          ? "rgba(168,209,255,0.85)"
                          : "var(--vt-muted-2)",
                      }}
                    />
                    <span
                      className="text-sm font-medium transition-colors"
                      style={{
                        color: active ? "var(--vt-text)" : "var(--vt-muted)",
                      }}
                    >
                      {b.label}
                    </span>
                    <span
                      className="text-xs rounded-full px-1.5 py-0.5 leading-none"
                      style={{
                        background: active
                          ? "rgba(168,209,255,0.15)"
                          : "rgba(255,255,255,0.05)",
                        color: active
                          ? "rgba(168,209,255,0.7)"
                          : "var(--vt-muted-2)",
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Main content: sidebar + grid ─────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Mobile toolbar */}
        {!searchQuery && (
          <div className="flex items-center gap-3 mb-6 lg:hidden flex-wrap">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-2 rounded-lg text-sm transition-colors"
              style={{
                padding: "8px 14px",
                border: "1px solid var(--vt-line)",
                background: hasActiveFilters
                  ? "rgba(168,209,255,0.06)"
                  : "rgba(255,255,255,0.02)",
                color: hasActiveFilters ? "var(--vt-text)" : "var(--vt-muted)",
              }}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filter &amp; Sort
              {hasActiveFilters && (
                <span
                  className="ml-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-semibold"
                  style={{
                    background: "rgba(168,209,255,0.25)",
                    color: "rgba(168,209,255,0.9)",
                  }}
                >
                  {activeChips.length}
                </span>
              )}
            </button>

            {/* Active chips (mobile) */}
            {activeChips.map((chip) => (
              <button
                key={chip.label}
                onClick={chip.onRemove}
                className="flex items-center gap-1.5 rounded-lg text-xs transition-colors"
                style={{
                  padding: "6px 10px",
                  border: "1px solid rgba(168,209,255,0.25)",
                  background: "rgba(168,209,255,0.06)",
                  color: "rgba(168,209,255,0.75)",
                }}
              >
                {chip.label}
                <X className="w-3 h-3" />
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-10 items-start">
          {/* Filter sidebar (desktop) */}
          {!searchQuery && (
            <ShopFiltersPanel
              filters={filters}
              onChange={setFilters}
              mobileOpen={mobileFilterOpen}
              onMobileClose={() => setMobileFilterOpen(false)}
            />
          )}

          {/* Right: chips + grid */}
          <div className="flex-1 min-w-0">
            {/* Active chips (desktop) */}
            {!searchQuery && (
              <div className="hidden lg:flex flex-wrap items-center gap-2 mb-6 min-h-[36px]">
                {activeChips.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={chip.onRemove}
                    className="flex items-center gap-1.5 rounded-lg text-xs transition-all hover:bg-white/5"
                    style={{
                      padding: "5px 10px",
                      border: "1px solid rgba(168,209,255,0.25)",
                      background: "rgba(168,209,255,0.06)",
                      color: "rgba(168,209,255,0.75)",
                    }}
                  >
                    {chip.label}
                    <X className="w-3 h-3" />
                  </button>
                ))}
                {hasActiveFilters && (
                  <button
                    onClick={clearAll}
                    className="text-xs transition-colors hover:text-white"
                    style={{ color: "var(--vt-muted-2)" }}
                  >
                    Clear all
                  </button>
                )}
              </div>
            )}

            {/* Result count */}
            <p
              className="label-xs mb-6"
              style={{ color: "var(--vt-muted-2)" }}
            >
              {displayed.length} product{displayed.length !== 1 ? "s" : ""}
              {activeBenefit && (
                <span style={{ color: "var(--vt-muted-2)", fontWeight: 400 }}>
                  {" "}
                  matching{" "}
                  <span style={{ color: "rgba(168,209,255,0.7)" }}>
                    {BENEFIT_FILTERS.find((b) => b.key === activeBenefit)?.label}
                  </span>
                </span>
              )}
            </p>

            {/* Product grid */}
            {displayed.length === 0 ? (
              <div className="text-center py-24">
                <p
                  className="text-lg mb-4"
                  style={{ color: "var(--vt-muted-2)" }}
                >
                  No products match these filters.
                </p>
                <button
                  onClick={clearAll}
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: "var(--vt-muted)" }}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {displayed.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
