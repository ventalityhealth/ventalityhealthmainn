"use client";

import React from "react";
import { X, Check } from "lucide-react";
import {
  FORMAT_FILTERS,
  CATEGORY_FILTERS,
  SORT_OPTIONS,
} from "@/lib/shop-config";

export interface FilterState {
  sortBy: string;
  formats: string[];
  categories: string[];
}

interface ShopFiltersPanelProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  /** When true, renders as a full-screen mobile sheet overlay */
  mobileOpen: boolean;
  onMobileClose: () => void;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="label-xs mb-3"
      style={{ color: "var(--vt-muted-2)", letterSpacing: "0.1em" }}
    >
      {children}
    </p>
  );
}

function RadioOption({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 w-full text-left py-1.5 group"
    >
      <span
        className="w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all"
        style={{
          borderColor: checked ? "var(--vt-text)" : "var(--vt-line-strong)",
          background: checked ? "var(--vt-text)" : "transparent",
        }}
      >
        {checked && (
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--vt-bg)" }}
          />
        )}
      </span>
      <span
        className="text-sm transition-colors"
        style={{ color: checked ? "var(--vt-text)" : "var(--vt-muted)" }}
      >
        {label}
      </span>
    </button>
  );
}

function CheckOption({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 w-full text-left py-1.5 group"
    >
      <span
        className="w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0 transition-all"
        style={{
          borderColor: checked ? "var(--vt-text)" : "var(--vt-line-strong)",
          background: checked ? "var(--vt-text)" : "transparent",
        }}
      >
        {checked && <Check className="w-2.5 h-2.5" style={{ color: "var(--vt-bg)" }} />}
      </span>
      <span
        className="text-sm transition-colors"
        style={{ color: checked ? "var(--vt-text)" : "var(--vt-muted)" }}
      >
        {label}
      </span>
    </button>
  );
}

function FilterBody({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const toggleFormat = (f: string) => {
    const next = filters.formats.includes(f)
      ? filters.formats.filter((x) => x !== f)
      : [...filters.formats, f];
    onChange({ ...filters, formats: next });
  };

  const toggleCategory = (c: string) => {
    const next = filters.categories.includes(c)
      ? filters.categories.filter((x) => x !== c)
      : [...filters.categories, c];
    onChange({ ...filters, categories: next });
  };

  return (
    <div className="space-y-7">
      {/* Sort */}
      <div>
        <SectionLabel>Sort by</SectionLabel>
        <div className="space-y-0.5">
          {SORT_OPTIONS.map((opt) => (
            <RadioOption
              key={opt.key}
              label={opt.label}
              checked={filters.sortBy === opt.key}
              onClick={() => onChange({ ...filters, sortBy: opt.key })}
            />
          ))}
        </div>
      </div>

      <div style={{ height: "1px", background: "var(--vt-line)" }} />

      {/* Format */}
      <div>
        <SectionLabel>Format</SectionLabel>
        <div className="space-y-0.5">
          {FORMAT_FILTERS.map((f) => (
            <CheckOption
              key={f}
              label={f}
              checked={filters.formats.includes(f)}
              onClick={() => toggleFormat(f)}
            />
          ))}
        </div>
      </div>

      <div style={{ height: "1px", background: "var(--vt-line)" }} />

      {/* Category */}
      <div>
        <SectionLabel>Category</SectionLabel>
        <div className="space-y-0.5">
          {CATEGORY_FILTERS.map((c) => (
            <CheckOption
              key={c.key}
              label={c.label}
              checked={filters.categories.includes(c.key)}
              onClick={() => toggleCategory(c.key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ShopFiltersPanel({
  filters,
  onChange,
  mobileOpen,
  onMobileClose,
}: ShopFiltersPanelProps) {
  return (
    <>
      {/* ── Desktop sidebar (hidden on mobile) ─────────────────── */}
      <aside className="hidden lg:block w-52 flex-shrink-0">
        <div className="sticky top-32">
          <p
            className="font-medium text-sm mb-6"
            style={{ color: "var(--vt-text-soft)" }}
          >
            Filter
          </p>
          <FilterBody filters={filters} onChange={onChange} />
        </div>
      </aside>

      {/* ── Mobile sheet overlay ────────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.6)" }}
            onClick={onMobileClose}
          />

          {/* Sheet */}
          <div
            className="relative rounded-t-2xl overflow-y-auto"
            style={{
              background: "var(--vt-bg-2)",
              borderTop: "1px solid var(--vt-line)",
              maxHeight: "80vh",
              padding: "24px 20px 40px",
            }}
          >
            {/* Handle + header */}
            <div className="flex items-center justify-between mb-6">
              <p
                className="font-medium text-sm"
                style={{ color: "var(--vt-text-soft)" }}
              >
                Filter &amp; Sort
              </p>
              <button
                onClick={onMobileClose}
                style={{ color: "var(--vt-muted)", background: "none", border: "none", cursor: "pointer" }}
                className="hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FilterBody filters={filters} onChange={onChange} />

            <button
              onClick={onMobileClose}
              className="vt-button-primary w-full mt-8"
              style={{ justifyContent: "center" }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}
