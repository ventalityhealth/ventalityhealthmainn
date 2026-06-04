/**
 * shop-config.ts
 *
 * Single source of truth for all shop-page filter configuration.
 *
 * To add a new benefit:
 *   1. Add an entry to BENEFIT_FILTERS with the Shopify tag(s) that map to it.
 *   2. Tag your product in Shopify with one of those tags.
 *   Done — the product auto-appears in that benefit bucket.
 *
 * To add a new format:
 *   Add a string to FORMAT_FILTERS that matches part of the product title or a tag.
 */

import {
  Zap,
  Moon,
  Shield,
  Brain,
  Leaf,
  Wind,
  Activity,
  Sun,
  Droplets,
  Heart,
  type LucideIcon,
} from "lucide-react";

export interface BenefitFilter {
  key: string;
  label: string;
  description: string;
  icon: LucideIcon;
  /** Shopify tags that map a product into this benefit bucket */
  tags: string[];
}

export const BENEFIT_FILTERS: BenefitFilter[] = [
  {
    key: "recovery",
    label: "Recovery",
    description: "Faster repair, less downtime",
    icon: Zap,
    tags: ["recovery", "muscle-recovery", "repair"],
  },
  {
    key: "sleep",
    label: "Sleep",
    description: "Deep, restorative rest",
    icon: Moon,
    tags: ["sleep", "sleep-support", "rest", "melatonin"],
  },
  {
    key: "immunity",
    label: "Immune Support",
    description: "Fortify your defenses",
    icon: Shield,
    tags: ["immunity", "immune-support", "antioxidant"],
  },
  {
    key: "energy",
    label: "Energy & Focus",
    description: "Clarity and sustained output",
    icon: Brain,
    tags: ["energy", "focus", "cognitive", "adaptogen", "mushroom", "nootropic"],
  },
  {
    key: "gut",
    label: "Gut Health",
    description: "The foundation of wellbeing",
    icon: Leaf,
    tags: ["gut", "gut-health", "probiotic", "digestive", "l-glutamine"],
  },
  {
    key: "calm",
    label: "Stress & Calm",
    description: "Blunt cortisol, stay sharp",
    icon: Wind,
    tags: ["stress-relief", "relaxation", "calm", "adaptogen", "ashwagandha"],
  },
  {
    key: "body",
    label: "Body Composition",
    description: "Lean, strong, defined",
    icon: Activity,
    tags: ["weight-management", "thermogenic", "fat-loss", "metabolism"],
  },
  {
    key: "daily",
    label: "Daily Wellness",
    description: "Baseline support for life",
    icon: Sun,
    tags: ["wellness", "vitamin-d", "magnesium", "omega", "multivitamin", "mineral"],
  },
  {
    key: "joint",
    label: "Joint & Skin",
    description: "Rebuild from the inside out",
    icon: Droplets,
    tags: ["collagen", "joint-health", "skin", "cartilage", "connective-tissue"],
  },
  {
    key: "heart",
    label: "Heart Health",
    description: "Long-term cardiovascular care",
    icon: Heart,
    tags: ["cardiovascular", "heart", "omega", "cholesterol", "blood-pressure"],
  },
];

export const FORMAT_FILTERS = [
  "Capsules",
  "Powder",
  "Gummies",
  "Softgels",
  "Liquid",
];

export const CATEGORY_FILTERS = [
  { key: "wellness", label: "Wellness" },
  { key: "performance", label: "Performance" },
  { key: "weight-management", label: "Body Composition" },
];

export const SORT_OPTIONS = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "az", label: "A–Z" },
];

/**
 * Detects the format of a product from its title and variant titles.
 * Used for the format filter.
 */
export function detectFormat(
  title: string,
  variantTitles: string[],
  tags: string[]
): string | null {
  const haystack = [title, ...variantTitles, ...tags]
    .join(" ")
    .toLowerCase();

  if (haystack.includes("gumm")) return "Gummies";
  if (haystack.includes("softgel")) return "Softgels";
  if (haystack.includes("liquid") || haystack.includes("tincture")) return "Liquid";
  if (haystack.includes("powder") || haystack.includes("scoop")) return "Powder";
  if (
    haystack.includes("capsule") ||
    haystack.includes("capsul") ||
    haystack.includes("tablet")
  )
    return "Capsules";

  return null;
}
