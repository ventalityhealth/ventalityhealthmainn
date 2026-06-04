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
  /**
   * Fallback keywords checked against product title + description
   * when no tag match is found. Case-insensitive substring match.
   */
  keywords?: string[];
}

export const BENEFIT_FILTERS: BenefitFilter[] = [
  {
    key: "recovery",
    label: "Recovery",
    description: "Faster repair, less downtime",
    icon: Zap,
    tags: [
      "recovery", "muscle-recovery", "repair", "performance",
      "amino-acid", "amino acids", "protein", "muscle", "creatine",
      "glutamine", "l-glutamine",
    ],
    /** Keywords checked against product title + description */
    keywords: ["recovery", "glutamine", "creatine", "muscle", "amino", "repair"],
  },
  {
    key: "sleep",
    label: "Sleep",
    description: "Deep, restorative rest",
    icon: Moon,
    tags: [
      "sleep", "sleep-support", "rest", "melatonin",
      "sleep formula", "sleep-formula", "relaxation",
    ],
    keywords: ["sleep", "melatonin", "rest", "passionflower", "chamomile", "theanine"],
  },
  {
    key: "immunity",
    label: "Immune Support",
    description: "Fortify your defenses",
    icon: Shield,
    tags: [
      "immunity", "immune-support", "antioxidant", "immune",
      "vitamin-c", "zinc", "elderberry", "chaga",
    ],
    keywords: ["immune", "immunity", "antioxidant", "chaga", "zinc"],
  },
  {
    key: "energy",
    label: "Energy & Focus",
    description: "Clarity and sustained output",
    icon: Brain,
    tags: [
      "energy", "focus", "cognitive", "adaptogen", "mushroom", "nootropic",
      "lions-mane", "lion's-mane", "lion mane", "reishi", "performance",
      "vitality", "brain",
    ],
    keywords: ["energy", "focus", "cognitive", "adaptogen", "vitality", "lion", "reishi", "mushroom", "clarity"],
  },
  {
    key: "gut",
    label: "Gut Health",
    description: "The foundation of wellbeing",
    icon: Leaf,
    tags: [
      "gut", "gut-health", "probiotic", "digestive", "l-glutamine",
      "glutamine", "intestinal", "digestion",
    ],
    keywords: ["gut", "glutamine", "probiotic", "digestive", "intestinal", "l-glutamine"],
  },
  {
    key: "calm",
    label: "Stress & Calm",
    description: "Blunt cortisol, stay sharp",
    icon: Wind,
    tags: [
      "stress-relief", "relaxation", "calm", "adaptogen", "ashwagandha",
      "reishi", "mushroom", "anxiety", "cortisol",
    ],
    keywords: ["stress", "calm", "relax", "adaptogen", "ashwagandha", "reishi", "cortisol", "passionflower"],
  },
  {
    key: "body",
    label: "Body Composition",
    description: "Lean, strong, defined",
    icon: Activity,
    tags: [
      "weight-management", "thermogenic", "fat-loss", "metabolism",
      "body-composition", "lean", "fat loss",
    ],
    keywords: ["thermogenic", "fat", "metabolism", "body composition", "lean", "weight"],
  },
  {
    key: "daily",
    label: "Daily Wellness",
    description: "Baseline support for life",
    icon: Sun,
    tags: [
      "wellness", "vitamin-d", "magnesium", "omega", "multivitamin", "mineral",
      "daily", "foundation", "general wellness", "vitamins",
    ],
    keywords: ["vitamin", "magnesium", "omega", "daily", "wellness", "mineral"],
  },
  {
    key: "joint",
    label: "Joint & Skin",
    description: "Rebuild from the inside out",
    icon: Droplets,
    tags: [
      "collagen", "joint-health", "skin", "cartilage", "connective-tissue",
      "joints", "collagen peptides", "hyaluronic",
    ],
    keywords: ["collagen", "joint", "skin", "cartilage", "connective"],
  },
  {
    key: "heart",
    label: "Heart Health",
    description: "Long-term cardiovascular care",
    icon: Heart,
    tags: [
      "cardiovascular", "heart", "omega", "cholesterol", "blood-pressure",
      "omega-3", "epa", "dha", "fish-oil",
    ],
    keywords: ["omega", "cardiovascular", "heart", "cholesterol", "epa", "dha", "fish oil"],
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
