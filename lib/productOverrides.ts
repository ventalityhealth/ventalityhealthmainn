/**
 * Manual supplement-facts overrides, keyed by Shopify product handle (lowercase).
 *
 * Used when the product's descriptionHtml has no parseable <table>.
 * HTML-parsed data always takes priority — overrides only fill empty fields.
 *
 * New fields (stats, ingredientDetails, bestFor, howToUse, pairings, faq)
 * power the redesigned product page 8-section template.
 */

import type { ParsedProductContent } from "@/lib/parseProductHtml"

// ── Extended type definitions ─────────────────────────────────────────────────

export interface ProductStat {
  label: string
  value: string
}

export interface IngredientDetail {
  description: string
  supports: string[]
}

export interface ProductPairing {
  handle: string
  name: string
  rationale: string
}

export interface FaqItem {
  q: string
  a: string
}

/** One row in the Section 3 product-description block (icon + claim + sentence). */
export interface DescriptionRow {
  icon: string
  claim: string
  sentence: string
}

/** One Section 4 benefit card (outcome-led headline + ingredient callout). */
export interface BenefitCard {
  icon: string
  headline: string
  ingredient: string
  description: string
}

/** Scannable Section 6 "How To Use" fields. */
export interface HowToUseStructured {
  serving: string
  when: string
  with: string
  note: string
  supply: string
}

/** Static featured pull quote for the hero (rendered only when reviews exist). */
export interface BestReviewQuote {
  text: string
  name: string
  initial: string
}

type Override = Partial<
  Pick<ParsedProductContent, "supplementFacts" | "ingredients" | "warnings" | "benefits"> & {
    stats: ProductStat[]
    ingredientDetails: Record<string, IngredientDetail>
    bestFor: string[]
    howToUse: string
    pairings: ProductPairing[]
    faq: FaqItem[]
    tagline: string
    descriptionRows: DescriptionRow[]
    benefitCards: BenefitCard[]
    checkFirst: string[]
    howToUseStructured: HowToUseStructured
    bestReviewQuote: BestReviewQuote
  }
>

// ── Shared NAD+ override (covers both "nad-plus" and "nad" handles) ───────────

const NAD_OVERRIDE: Override = {
  benefits: [
    "NAD+ 500 mg — Nicotinamide Adenine Dinucleotide is the coenzyme powering mitochondrial ATP production and sirtuin activation — proteins linked to DNA repair, epigenetic regulation, and longevity. NAD+ levels decline ~50% between age 20 and 60.",
    "Quercetin Dihydrate 250 mg — A senolytic flavonoid that selectively clears damaged senescent cells accumulating with age. Inhibits inflammatory cytokines and works synergistically with NAD+ to amplify cellular rejuvenation.",
    "Japanese Knotweed Extract 150 mg (98% Resveratrol) — Among the highest-purity resveratrol sources available. Activates SIRT1 — a sirtuin that mimics caloric restriction — and supports mitochondrial biogenesis, vascular endothelial health, and neuroinflammation reduction.",
    "Longevity Triad — NAD+, Quercetin, and Resveratrol target aging pathways independently: NAD biosynthesis, senescent-cell clearance, and sirtuin activation. Three complementary mechanisms in one capsule.",
  ],
  supplementFacts: {
    servingSize: "2 Capsules",
    servingsPerContainer: "30",
    rows: [
      { label: "NAD+ (Nicotinamide Adenine Dinucleotide)", amount: "500 mg", dv: "**" },
      { label: "Quercetin Dihydrate Extract (Sophora japonica)(whole flower bud)", amount: "250 mg", dv: "**" },
      { label: "Japanese Knotweed Extract (98% resveratrol)(Polygonum cuspidatum)(root)", amount: "150 mg", dv: "**" },
    ],
  },
  ingredients:
    "HPMC (vegetable capsule), MCC (microcrystalline cellulose), Brown Rice Flour, Olive Oil, Silicon Dioxide, Magnesium Stearate",
  warnings:
    "Keep out of reach of children. Consult a healthcare provider before use if you are pregnant, nursing, have a medical condition, or are taking blood thinners, immunosuppressants, or medications metabolised by CYP3A4 enzymes (quercetin may inhibit this pathway). Not intended for individuals under 18.",
  stats: [
    { label: "Serving Size", value: "2 Capsules" },
    { label: "Servings", value: "30" },
    { label: "Active Ingredients", value: "3" },
    { label: "Format", value: "Vegetable Capsule" },
    { label: "Made In", value: "USA" },
  ],
  tagline: "NAD+, quercetin, and resveratrol. Three longevity pathways. One daily capsule.",
  descriptionRows: [
    {
      icon: "zap",
      claim: "Refill the cellular fuel that age drains",
      sentence: "NAD+ powers mitochondrial energy and the sirtuins behind cellular repair — levels fall roughly 50% between age 20 and 60.*",
    },
    {
      icon: "refresh",
      claim: "Help clear the cells that slow you down",
      sentence: "Quercetin is a senolytic flavonoid that supports the body in managing aging senescent cells and their inflammatory signals.*",
    },
    {
      icon: "sparkles",
      claim: "Switch on your longevity pathways",
      sentence: "98% resveratrol activates SIRT1 — the sirtuin that mimics caloric restriction at the cellular level.*",
    },
    {
      icon: "heart",
      claim: "Three mechanisms, working in parallel",
      sentence: "NAD biosynthesis, senescent-cell clearance, and sirtuin activation target aging from independent angles.*",
    },
    {
      icon: "check",
      claim: "Vegetable capsule · 98% resveratrol purity · COA on request",
      sentence: "",
    },
  ],
  benefitCards: [
    {
      icon: "zap",
      headline: "Cellular energy that ages slower",
      ingredient: "NAD+ 500 mg",
      description: "Fuels mitochondrial ATP output and the sirtuins behind cellular repair.*",
    },
    {
      icon: "refresh",
      headline: "Inflammation kept in check",
      ingredient: "Quercetin 250 mg",
      description: "A senolytic flavonoid that supports clearance of aging, inflammatory cells.*",
    },
    {
      icon: "sparkles",
      headline: "Longevity pathways, activated",
      ingredient: "98% Resveratrol 150 mg",
      description: "Triggers SIRT1 to mimic the cellular effects of caloric restriction.*",
    },
    {
      icon: "heart",
      headline: "Whole-body vitality",
      ingredient: "Longevity Triad",
      description: "Three complementary pathways target cellular aging together.*",
    },
  ],
  checkFirst: [
    "You take blood thinners, immunosuppressants, or CYP3A4-metabolized medications — quercetin can inhibit that pathway, so check with your provider first.",
    "You have a hormone-sensitive condition — consult your provider before use.",
  ],
  howToUseStructured: {
    serving: "2 Capsules per serving",
    when: "Morning, with a meal",
    with: "6–8 oz of water",
    note: "Effects are cumulative — sirtuin activation and senescent-cell clearance build over weeks. Take daily and don't expect acute effects.",
    supply: "30 servings per container",
  },
  bestReviewQuote: {
    text: "Three months in and my afternoon energy dips have faded — I'm not reaching for a third coffee at 3pm anymore.",
    name: "Daniel",
    initial: "R",
  },
  ingredientDetails: {
    "NAD+ (Nicotinamide Adenine Dinucleotide)": {
      description:
        "Coenzyme present in every living cell, central to mitochondrial ATP production and sirtuin activation. NAD+ levels decline roughly 50% between age 20 and 60 — supplementation replenishes the pool that longevity-associated proteins (sirtuins) require to function. Sirtuins govern DNA repair, cellular stress response, and epigenetic regulation.",
      supports: ["Mitochondrial Energy", "Sirtuin Activation", "DNA Repair", "Longevity"],
    },
    "Quercetin Dihydrate Extract (Sophora japonica)(whole flower bud)": {
      description:
        "A potent flavonoid with senolytic properties — it selectively targets and eliminates senescent ('zombie') cells that accumulate with age and secrete chronic inflammatory signals. Independently inhibits inflammatory cytokines and works synergistically with NAD+ to amplify cellular rejuvenation and immune regulation.",
      supports: ["Senescent Cell Clearance", "Anti-Inflammatory", "Immune Modulation", "Cellular Health"],
    },
    "Japanese Knotweed Extract (98% resveratrol)(Polygonum cuspidatum)(root)": {
      description:
        "Standardized to 98% resveratrol — among the highest-purity botanical sources commercially available. Resveratrol activates SIRT1, mimicking caloric restriction at the cellular level. Also supports mitochondrial biogenesis, endothelial vascular integrity, and reduction of neuroinflammation.",
      supports: ["SIRT1 Activation", "Mitochondrial Biogenesis", "Cardiovascular Health", "Neuroprotection"],
    },
  },
  bestFor: [
    "Long-term cellular health and longevity support",
    "Mitochondrial energy and metabolic efficiency",
    "Inflammation management and cellular repair",
    "Proactive aging support from the 30s onward",
  ],
  howToUse:
    "Take 2 capsules daily with a meal. Consistent daily use is essential — the cellular mechanisms this formula targets (sirtuin activation, senolytic clearance) are cumulative and require sustained supplementation. Do not expect acute effects.",
  pairings: [
    {
      handle: "shilajit-adaptogen-complex",
      name: "Shilajit Adaptogen",
      rationale:
        "Shilajit's fulvic acid supports the same mitochondrial electron transport chain that NAD+ powers — directly synergistic at the cellular energy level.",
    },
    {
      handle: "adaptogen-vitality-gummies",
      name: "Adaptogen Vitality",
      rationale:
        "Adaptogens enhance the body's capacity to utilize the mitochondrial energy that NAD+ production enables.",
    },
    {
      handle: "complete-multivitamin",
      name: "Complete Multivitamin",
      rationale:
        "A complete micronutrient baseline ensures NAD+-dependent enzymes have all required cofactors available.",
    },
  ],
  faq: [
    {
      q: "Is NAD+ supplementation effective?",
      a: "Research on direct NAD+ supplementation is active and promising for mitochondrial function and sirtuin activation. NMN and NR precursors have broader clinical trial evidence; direct NAD+ is under ongoing study. Individual bioavailability varies. Most users track changes over 8–12 weeks or via biomarkers.",
    },
    {
      q: "Who should take this?",
      a: "Most relevant for adults in their 30s and older, when NAD+ decline is measurable. Also useful for anyone focused on cellular longevity, inflammation management, or mitochondrial performance regardless of age.",
    },
    {
      q: "Are there drug interactions?",
      a: "Yes. Quercetin inhibits CYP3A4 enzymes, which metabolize many common medications. If you take blood thinners, immunosuppressants, or CYP3A4-processed medications, consult your healthcare provider before use.",
    },
    {
      q: "Why NAD+ directly instead of NMN or NR?",
      a: "NMN and NR are precursors the body converts into NAD+. This formula pairs NAD+ with quercetin and resveratrol to support both NAD+ availability and the sirtuin pathways it feeds. Direct vs. precursor bioavailability varies by individual.",
    },
    {
      q: "Is this third-party tested?",
      a: "Yes. Manufactured in a cGMP-certified, FDA-registered facility. A Certificate of Analysis is available on request — email coa@ventality.com.",
    },
  ],
}

// ── Product overrides ─────────────────────────────────────────────────────────

export const PRODUCT_OVERRIDES: Record<string, Override> = {

  // ───────────────────────────────────────────────────────────────────────────
  // L-Glutamine
  // ───────────────────────────────────────────────────────────────────────────
  "l-glutamine": {
    benefits: [
      "Simple Minimalist Formula — Single active ingredient with no unnecessary fillers. Just L-Glutamine and a flow agent (Silicon Dioxide).",
      "Gut Lining Integrity — L-Glutamine is the primary fuel source for intestinal epithelial cells, supporting the structural barrier that separates your gut from your bloodstream.",
      "Muscle Recovery Support — After intense training, plasma glutamine drops significantly. Replenishing with 3–5g post-workout supports protein synthesis and reduces muscle breakdown.",
      "Immune System Fuel — Rapidly dividing immune cells rely on glutamine as a primary energy source, especially during periods of stress or illness.",
    ],
    supplementFacts: {
      servingSize: "1 Scoop (3.3 g)",
      servingsPerContainer: "30",
      rows: [
        { label: "L-Glutamine", amount: "3.15 g", dv: "**" },
      ],
    },
    ingredients: "Silicon Dioxide",
    warnings:
      "Keep out of reach of children. Consult a healthcare provider before use if you are pregnant, nursing, have a medical condition, or are taking any medications. Do not use if safety seal is broken or missing.",
    stats: [
      { label: "Serving Size", value: "1 Scoop (3.3g)" },
      { label: "Servings", value: "30" },
      { label: "Net Weight", value: "99 g" },
      { label: "Format", value: "Unflavored Powder" },
      { label: "Made In", value: "USA" },
    ],
    tagline: "One pharmaceutical-grade amino acid. Zero fillers. Recovery, gut, and immune support in a single scoop.",
    descriptionRows: [
      {
        icon: "timer",
        claim: "Bounce back faster after hard training",
        sentence: "Intense exercise drops plasma glutamine — replenishing it supports protein synthesis and reduces muscle breakdown.*",
      },
      {
        icon: "leaf",
        claim: "Strengthen the gut barrier you can't see",
        sentence: "L-Glutamine is the primary fuel for intestinal lining cells that keep the gut wall intact.*",
      },
      {
        icon: "shield",
        claim: "Feed your immune system when it's working hardest",
        sentence: "Rapidly dividing immune cells burn through glutamine during stress, training, and illness.*",
      },
      {
        icon: "droplets",
        claim: "Mixes clear, tastes like nothing",
        sentence: "Unflavored free-form powder dissolves into water, juice, or a shake without grit or aftertaste.",
      },
      {
        icon: "check",
        claim: "Unflavored powder · single active ingredient · COA on request",
        sentence: "",
      },
    ],
    benefitCards: [
      {
        icon: "timer",
        headline: "Faster post-workout recovery",
        ingredient: "L-Glutamine 3.15 g",
        description: "Replenishes the plasma glutamine that intense training depletes.*",
      },
      {
        icon: "leaf",
        headline: "A stronger gut lining",
        ingredient: "L-Glutamine 3.15 g",
        description: "Primary fuel source for the intestinal cells that maintain barrier integrity.*",
      },
      {
        icon: "shield",
        headline: "Immune support under stress",
        ingredient: "L-Glutamine 3.15 g",
        description: "Powers the rapidly dividing immune cells that demand glutamine.*",
      },
      {
        icon: "droplets",
        headline: "Clean, minimalist formula",
        ingredient: "Silicon Dioxide only",
        description: "Just the active and a flow agent — no fillers, flavors, or dyes.*",
      },
    ],
    checkFirst: [
      "You already take a recovery blend or BCAA formula — check whether it already includes glutamine to avoid stacking the same amino acid.",
      "You have a serious liver or kidney condition — consult your provider before adding free-form amino acids.",
    ],
    howToUseStructured: {
      serving: "1 Scoop (3.3 g) per serving",
      when: "Daily — post-workout on training days",
      with: "8–12 oz of water, juice, or a shake",
      note: "Dissolves clear with no flavor to manage. Results are cumulative, not acute — use every day.",
      supply: "30 servings per container",
    },
    bestReviewQuote: {
      text: "My gut issues calmed down within two weeks and my post-leg-day soreness is noticeably shorter now.",
      name: "Marcus",
      initial: "T",
    },
    ingredientDetails: {
      "L-Glutamine": {
        description:
          "The most abundant amino acid in the body — and the first depleted by training, illness, or chronic stress. At 3.15g per serving, this pharmaceutical-grade dose replenishes post-exercise plasma levels and directly fuels two critical cell populations: intestinal epithelial cells (gut lining integrity) and rapidly-dividing immune cells (lymphocytes, macrophages).",
        supports: ["Muscle Recovery", "Gut Integrity", "Immune Function"],
      },
    },
    bestFor: [
      "Post-workout muscle recovery and soreness reduction",
      "Gut lining support and intestinal barrier health",
      "Immune function during high-stress or training periods",
      "Daily foundational amino acid maintenance",
    ],
    howToUse:
      "Mix 1 level scoop (3.3g) into 8–12 oz of water, juice, or your preferred beverage. No flavor to manage — it dissolves clear. Can be added to protein shakes or smoothies. Take once daily, every day — results are cumulative, not acute.",
    pairings: [
      {
        handle: "adaptogen-vitality-gummies",
        name: "Adaptogen Vitality",
        rationale:
          "Adaptogens lower the cortisol that blunts glutamine-driven recovery — the two work from opposite ends of the stress-recovery equation.",
      },
      {
        handle: "sleep-formula",
        name: "Sleep Formula",
        rationale:
          "Muscle protein synthesis and gut repair peak during deep sleep — pairing targets the same recovery window from two directions.",
      },
      {
        handle: "shilajit-adaptogen-complex",
        name: "Shilajit Adaptogen",
        rationale:
          "Shilajit's mitochondrial support compounds glutamine's role in cellular energy production and tissue repair.",
      },
    ],
    faq: [
      {
        q: "Is this third-party tested?",
        a: "Yes. Manufactured in a cGMP-certified, FDA-registered facility. A Certificate of Analysis is available on request — email coa@ventality.com.",
      },
      {
        q: "When will I notice results?",
        a: "Most people report improved post-workout recovery and reduced soreness within 2–4 weeks of consistent daily use. Gut-related benefits — reduced bloating, improved digestion — are often noticed within the first 1–2 weeks.",
      },
      {
        q: "Can I take this with other supplements?",
        a: "Yes. L-Glutamine is well-tolerated alongside protein powders, creatine, BCAAs, and adaptogens. No known interactions with common supplement stacks.",
      },
      {
        q: "How much should I take, and when?",
        a: "One 3.3g scoop daily is the standard dose. On training days, post-workout is ideal — that's when plasma glutamine is most depleted. There's no need to cycle it; consistent daily use produces the best results.",
      },
      {
        q: "Does this contain allergens?",
        a: "No. This product contains only L-Glutamine and Silicon Dioxide (inactive flow agent). Free from gluten, dairy, soy, tree nuts, and artificial additives.",
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // Adaptogen Vitality Gummies
  // ───────────────────────────────────────────────────────────────────────────
  "adaptogen-vitality-gummies": {
    benefits: [
      "Functional Mushroom Complex — Four evidence-supported mushroom extracts (Lion's Mane, Shiitake, Chaga, Maitake) at 87 mg each, chosen for their complementary roles in cognition, immune defence, and cellular resilience.",
      "Lion's Mane for Nerve Growth — Contains hericenones and erinacines that may stimulate Nerve Growth Factor (NGF), supporting neuroplasticity and memory formation.",
      "Chaga & Maitake Antioxidant Duo — Chaga is among the highest-ORAC botanicals measured; Maitake provides beta-glucans linked to immune modulation and balanced blood glucose response.",
      "Convenient Daily Delivery — 10 kcal per gummy, naturally flavored with Orange, colored from Beta Carotene. No artificial dyes or synthetic sweeteners.",
    ],
    supplementFacts: {
      servingSize: "1 Gummy",
      servingsPerContainer: "35",
      rows: [
        { label: "Calories", amount: "10 kcal", dv: undefined },
        { label: "Total Carbohydrate", amount: "3 g", dv: "1%" },
        { label: "Total Sugars", amount: "2 g", dv: "***", indented: true },
        { label: "Includes 2 g Added Sugars", amount: "", dv: "4%", indented: true },
        { label: "Lion's Mane Extract", amount: "87 mg", dv: "***" },
        { label: "Shiitake Extract", amount: "87 mg", dv: "***" },
        { label: "Chaga Extract", amount: "87 mg", dv: "***" },
        { label: "Maitake Extract", amount: "87 mg", dv: "***" },
      ],
    },
    ingredients:
      "Organic Cane Sugar, Tapioca Syrup, Purified Water, Citrus Pectin, Citric Acid, Orange Natural Flavor, Sodium Citrate, Color from Beta Carotene",
    warnings:
      "Keep out of reach of children. Consult a healthcare provider before use if you are pregnant, nursing, have a medical condition, or are taking immunosuppressant medications. Not intended for use by individuals with mushroom allergies.",
    stats: [
      { label: "Serving Size", value: "1 Gummy" },
      { label: "Servings", value: "35" },
      { label: "Active Mushrooms", value: "4" },
      { label: "Format", value: "Orange Gummy" },
      { label: "Made In", value: "USA" },
    ],
    tagline: "Four functional mushrooms. Stimulant-free focus and immune support. One orange gummy a day.",
    descriptionRows: [
      {
        icon: "brain",
        claim: "Sharper focus without the caffeine crash",
        sentence: "Lion's Mane supplies hericenones and erinacines that support Nerve Growth Factor and neuroplasticity.*",
      },
      {
        icon: "shield",
        claim: "Daily immune backup from two angles",
        sentence: "Shiitake and Maitake beta-glucans support macrophage and natural killer cell activity.*",
      },
      {
        icon: "sparkles",
        claim: "Protect your cells from everyday stress",
        sentence: "Chaga is among the highest-ORAC botanicals ever measured, delivering broad antioxidant coverage.*",
      },
      {
        icon: "leaf",
        claim: "Energy that builds over weeks, not hours",
        sentence: "Adaptogenic mushrooms work cumulatively — no stimulants, no jitters, no crash.*",
      },
      {
        icon: "check",
        claim: "Orange gummy · no artificial dyes or sweeteners · COA on request",
        sentence: "",
      },
    ],
    benefitCards: [
      {
        icon: "brain",
        headline: "Clearer thinking, day to day",
        ingredient: "Lion's Mane 87 mg",
        description: "Supports Nerve Growth Factor and the brain's capacity to form new connections.*",
      },
      {
        icon: "shield",
        headline: "Built-in immune defense",
        ingredient: "Shiitake + Maitake 87 mg each",
        description: "Beta-glucans that activate macrophages and natural killer cells.*",
      },
      {
        icon: "sparkles",
        headline: "Cellular antioxidant shield",
        ingredient: "Chaga 87 mg",
        description: "One of the highest-ORAC botanicals measured, defending against oxidative stress.*",
      },
      {
        icon: "leaf",
        headline: "Calm, stimulant-free energy",
        ingredient: "4-Mushroom Complex",
        description: "Adaptogenic support that builds steadily without caffeine.*",
      },
    ],
    checkFirst: [
      "You have a mushroom allergy — this formula is built entirely around four mushroom extracts.",
      "You take immunosuppressant medication — these mushrooms modulate immune activity, so consult your provider first.",
    ],
    howToUseStructured: {
      serving: "1 Gummy per serving",
      when: "Any time — morning or evening",
      with: "With or without food",
      note: "Adaptogens are cumulative. Commit to 3–4 weeks of daily use before judging results.",
      supply: "35 servings per container",
    },
    bestReviewQuote: {
      text: "I take one with breakfast and my focus through the afternoon is noticeably steadier — no coffee jitters.",
      name: "Priya",
      initial: "S",
    },
    ingredientDetails: {
      "Lion's Mane Extract": {
        description:
          "Contains hericenones and erinacines — small molecules that cross the blood-brain barrier and stimulate Nerve Growth Factor (NGF) synthesis. NGF drives neuroplasticity: the brain's capacity to form new connections, repair existing ones, and consolidate memory. The most studied cognitive functional mushroom.",
        supports: ["Cognitive Function", "Neuroplasticity", "Focus & Memory"],
      },
      "Shiitake Extract": {
        description:
          "Rich in lentinan, a beta-1,3-glucan that activates macrophages and natural killer cells. One of the most extensively researched culinary mushrooms for immune support and cellular health. Complements Lion's Mane with immune-focused activity.",
        supports: ["Immune Defense", "Cellular Health"],
      },
      "Chaga Extract": {
        description:
          "Among the highest ORAC-rated botanicals ever measured. Provides antioxidant protection through melanin complexes and polysaccharides that defend cells from cumulative oxidative stress. Supports immune function through a different pathway than Shiitake.",
        supports: ["Antioxidant Protection", "Immune Support"],
      },
      "Maitake Extract": {
        description:
          "Beta-glucan source studied for immune modulation and balanced blood glucose response. Known as 'Hen of the Woods' — the fourth mushroom in this formula, rounding out immune coverage with metabolic support.",
        supports: ["Immune Modulation", "Metabolic Balance"],
      },
    },
    bestFor: [
      "Mental performance and sustained daily focus",
      "Stress resilience without stimulants or caffeine",
      "Daily immune function and cellular defense",
      "Energy that builds over weeks, not hours",
    ],
    howToUse:
      "Take 1–2 gummies per day. No timing restriction — take with or without food, morning or evening. Adaptogens work cumulatively: commit to at least 3–4 weeks before evaluating results. Consistent daily use produces the most reliable outcomes.",
    pairings: [
      {
        handle: "sleep-formula",
        name: "Sleep Formula",
        rationale:
          "Adaptogens lower the cortisol that impairs sleep onset — pairing creates a complete daytime stress management and nighttime recovery loop.",
      },
      {
        handle: "l-glutamine",
        name: "L-Glutamine",
        rationale:
          "Glutamine fuels the gut and immune cells that adaptogens help regulate — a synergistic physical-cognitive foundation stack.",
      },
      {
        handle: "nad-plus",
        name: "NAD+",
        rationale:
          "NAD+ drives the mitochondrial energy production that adaptogens help the body access and utilize more efficiently.",
      },
    ],
    faq: [
      {
        q: "How long until I notice a difference?",
        a: "Adaptogens are cumulative, not acute. Most people notice improved stress tolerance and mental clarity after 3–4 weeks. Cognitive effects typically peak at 6–8 weeks of consistent daily use.",
      },
      {
        q: "Is this safe to take every day long-term?",
        a: "Yes. These functional mushroom extracts are among the most extensively studied daily supplements globally. The formula is stimulant-free and non-habit-forming.",
      },
      {
        q: "Can I take this with coffee or other adaptogens?",
        a: "Yes. The formula works alongside caffeine and other adaptogen products without interaction. If taking immunosuppressant medications, consult your provider first — these mushrooms modulate immune activity.",
      },
      {
        q: "How much sugar is in each gummy?",
        a: "Each gummy has 10 kcal and 2g of added sugar from organic cane sugar and tapioca syrup — far less than most gummy supplements. There are no artificial dyes or synthetic sweeteners; the orange color comes from Beta Carotene.",
      },
      {
        q: "Does this contain allergens?",
        a: "Contains no gluten, dairy, or soy. Not suitable for individuals with mushroom allergies. Contains orange natural flavor and color from Beta Carotene.",
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // Shilajit Adaptogen Complex
  // ───────────────────────────────────────────────────────────────────────────
  "shilajit-adaptogen-complex": {
    benefits: [
      "Shilajit 30:1 Extract (400 mg) — A concentrated resin sourced from Himalayan rock formations, delivering fulvic acid and dibenzo-α-pyrones. Traditionally used to support energy, testosterone, and mitochondrial function.",
      "Ashwagandha Root 30:1 (100 mg) — Clinically studied adaptogen (Withania somnifera) shown to lower cortisol, reduce perceived stress, and support testosterone and VO₂ max in active adults.",
      "Sea Moss 20:1 Extract (100 mg) — Chondrus crispus provides a natural source of iodine, potassium, and fucoidan, supporting thyroid function and electrolyte balance.",
      "Tongkat Ali 300:1 Root Extract (100 mg) — Eurycoma longifolia at a high concentration ratio. Research associates it with improved free testosterone, libido, and exercise-induced fatigue recovery.",
    ],
    supplementFacts: {
      servingSize: "1 Capsule",
      servingsPerContainer: "30",
      rows: [
        { label: "Shilajit Extract 30:1 (Asphaltum)(Stone)", amount: "400 mg", dv: "**" },
        { label: "Ashwagandha Root Extract 30:1 (Withania somnifera)", amount: "100 mg", dv: "**" },
        { label: "Sea Moss Extract 20:1 (Chondrus crispus)(algae)", amount: "100 mg", dv: "**" },
        { label: "Tongkat Ali Root Extract 300:1 (Eurycoma longifolia)", amount: "100 mg", dv: "**" },
      ],
    },
    ingredients: "HPMC (vegetable capsule), Nu-FLOW®, Olive Oil",
    warnings:
      "Keep out of reach of children. Not recommended for individuals with hormone-sensitive conditions. Consult a healthcare provider before use if pregnant, nursing, or taking medications. This product has not been evaluated for use in individuals under 18.",
    stats: [
      { label: "Serving Size", value: "1 Capsule" },
      { label: "Servings", value: "30" },
      { label: "Active Ingredients", value: "4" },
      { label: "Format", value: "Vegetable Capsule" },
      { label: "Made In", value: "USA" },
    ],
    tagline: "Himalayan shilajit, ashwagandha, sea moss, and tongkat ali. Four adaptogens. One capsule daily.",
    descriptionRows: [
      {
        icon: "zap",
        claim: "Power your cells at the source",
        sentence: "Shilajit's fulvic acid escorts nutrients into mitochondria and supports ATP synthesis.*",
      },
      {
        icon: "activity",
        claim: "Lower the stress that drains your edge",
        sentence: "Ashwagandha is the most studied adaptogen for cortisol regulation and stress resilience.*",
      },
      {
        icon: "dumbbell",
        claim: "Support healthy testosterone and drive",
        sentence: "Tongkat ali at 300:1 is linked to free testosterone, libido, and fatigue recovery in active adults.*",
      },
      {
        icon: "leaf",
        claim: "Round it out with thyroid and minerals",
        sentence: "Sea moss adds natural iodine and potassium to support thyroid and electrolyte balance.*",
      },
      {
        icon: "check",
        claim: "Vegetable capsule · high-ratio extracts · COA on request",
        sentence: "",
      },
    ],
    benefitCards: [
      {
        icon: "zap",
        headline: "Energy from the mitochondria up",
        ingredient: "Shilajit 30:1, 400 mg",
        description: "Fulvic acid and dibenzo-α-pyrones support cellular ATP production.*",
      },
      {
        icon: "activity",
        headline: "Calm under pressure",
        ingredient: "Ashwagandha 30:1, 100 mg",
        description: "Modulates the HPA axis to support cortisol and stress resilience.*",
      },
      {
        icon: "dumbbell",
        headline: "Drive and hormonal support",
        ingredient: "Tongkat Ali 300:1, 100 mg",
        description: "Linked to free testosterone, libido, and fatigue recovery.*",
      },
      {
        icon: "leaf",
        headline: "Thyroid and mineral balance",
        ingredient: "Sea Moss 20:1, 100 mg",
        description: "Natural iodine and potassium support thyroid and electrolytes.*",
      },
    ],
    checkFirst: [
      "You have a hormone-sensitive condition — this formula is built to influence testosterone and the HPA axis, so consult your provider before use.",
      "You're sensitive to alertness late in the day — take it in the morning, as some users feel more energized.",
    ],
    howToUseStructured: {
      serving: "1 Capsule per serving",
      when: "Morning, with a meal",
      with: "6–8 oz of water",
      note: "Morning use is preferred — some report alertness that can affect sleep if taken late. Effects build over 2–4 weeks.",
      supply: "30 servings per container",
    },
    bestReviewQuote: {
      text: "Steadier energy through the whole day and my gym sessions feel less draining after about a month on it.",
      name: "Jordan",
      initial: "M",
    },
    ingredientDetails: {
      "Shilajit Extract 30:1 (Asphaltum)(Stone)": {
        description:
          "Mineral resin exuded from Himalayan rock formations, concentrated 30:1. Delivers fulvic acid — a carrier molecule that escorts nutrients into mitochondria — and dibenzo-α-pyrones that support mitochondrial electron transport and ATP synthesis. Traditionally used across Ayurvedic medicine for energy, cognitive function, and male hormonal support.",
        supports: ["Mitochondrial Energy", "Testosterone Support", "Cognitive Function"],
      },
      "Ashwagandha Root Extract 30:1 (Withania somnifera)": {
        description:
          "The most evidence-backed adaptogen for stress physiology, concentrated 30:1. Clinical trials demonstrate cortisol reductions up to 27%, improved Perceived Stress Scale scores, and support for testosterone and VO₂ max in active adults. Works by modulating the HPA axis — the body's primary hormonal stress-response pathway.",
        supports: ["Cortisol Reduction", "Stress Resilience", "Testosterone", "Exercise Performance"],
      },
      "Sea Moss Extract 20:1 (Chondrus crispus)(algae)": {
        description:
          "20:1 extract of Irish Sea Moss — a natural source of iodine, potassium, and fucoidan. Iodine directly supports thyroid hormone synthesis (T3/T4); fucoidan provides anti-inflammatory mucopolysaccharide activity and gut mucosal support.",
        supports: ["Thyroid Function", "Electrolyte Balance", "Gut Health"],
      },
      "Tongkat Ali Root Extract 300:1 (Eurycoma longifolia)": {
        description:
          "At 300:1 extraction — among the highest concentration ratios commercially available. Research links Eurycoma longifolia to improvements in free testosterone, libido, the cortisol:testosterone ratio (stress-performance marker), and fatigue recovery in exercise contexts. Works partly by inhibiting SHBG binding of free testosterone.",
        supports: ["Free Testosterone", "Libido", "Stress Tolerance", "Fatigue Recovery"],
      },
    },
    bestFor: [
      "Male hormonal health and testosterone optimization",
      "Mitochondrial energy and chronic fatigue reduction",
      "Stress resilience and cortisol regulation",
      "Athletic performance and physical recovery",
    ],
    howToUse:
      "Take 1 capsule daily with a meal. Morning use is preferred — some users report increased alertness that may affect sleep if taken late in the day. Not recommended for individuals with hormone-sensitive conditions or under 18. Effects build over 2–4 weeks of consistent use.",
    pairings: [
      {
        handle: "l-glutamine",
        name: "L-Glutamine",
        rationale:
          "Glutamine supports the muscle repair and immune function that Shilajit's energy and hormonal output help drive.",
      },
      {
        handle: "nad-plus",
        name: "NAD+",
        rationale:
          "Both target mitochondrial function from complementary angles — NAD+ upstream at coenzyme level, Shilajit at electron transport.",
      },
      {
        handle: "brain-focus-formula",
        name: "Brain & Focus Formula",
        rationale:
          "Shilajit's fulvic acid enhances cellular nutrient uptake, amplifying the absorption of the nootropic stack.",
      },
    ],
    faq: [
      {
        q: "Is this safe for long-term use?",
        a: "The four ingredients have documented traditional and clinical safety profiles for daily use in healthy adults. Not recommended for those with hormone-sensitive conditions or under 18. Consult a provider if you take prescription medications.",
      },
      {
        q: "How long until I feel a difference?",
        a: "Ashwagandha's cortisol-lowering effects are typically measurable within 4–8 weeks. Tongkat Ali and Shilajit effects on energy and testosterone are often reported within 2–4 weeks of consistent use.",
      },
      {
        q: "Can women take this?",
        a: "The formula is designed primarily for male hormonal health. Women may use it, though the testosterone-supporting ingredients (Tongkat Ali, Shilajit) are less relevant. Avoid during pregnancy or nursing.",
      },
      {
        q: "Does this contain stimulants?",
        a: "No stimulants. Reported energy improvements are attributable to improved mitochondrial function and cortisol regulation — not caffeine or stimulant compounds.",
      },
      {
        q: "Why take shilajit and tongkat ali together?",
        a: "They work on different systems that reinforce each other: shilajit supports mitochondrial energy production, while tongkat ali and ashwagandha support the hormonal and stress pathways that govern how that energy is used. Sea moss adds the thyroid and mineral base underneath both.",
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // Sleep Formula
  // ───────────────────────────────────────────────────────────────────────────
  "sleep-formula": {
    benefits: [
      "Multi-Pathway Sleep Support — Seven botanicals and amino acids work across GABA receptors, serotonin pathways, and melatonin signalling so multiple sleep barriers are addressed in one capsule.",
      "Valerian Root Extract (150 mg) — The most-studied sleep botanical; valerenic acid inhibits GABA breakdown, promoting the same calming mechanism as sleep medications without dependency.",
      "Melatonin (2 mg) — A low, physiologically appropriate dose that signals the brain's pineal gland to initiate the sleep cycle without suppressing natural melatonin production over time.",
      "GABA + L-Tryptophan Synergy — GABA (100 mg) reduces neural excitability; L-Tryptophan (100 mg) is the dietary precursor to serotonin and eventually melatonin, supporting downstream sleep chemistry.",
      "Calming Botanical Trio — Chamomile (apigenin), Lemon Balm (rosmarinic acid), and Passion Flower (chrysin) each bind GABA-A receptors to quiet a racing mind before sleep.",
    ],
    supplementFacts: {
      servingSize: "2 Capsules",
      servingsPerContainer: "30",
      rows: [
        { label: "Valerian Extract (root)", amount: "150 mg", dv: "***" },
        { label: "Chamomile Extract (flower)", amount: "100 mg", dv: "***" },
        { label: "GABA (Gamma-Aminobutyric Acid)", amount: "100 mg", dv: "***" },
        { label: "L-Tryptophan", amount: "100 mg", dv: "***" },
        { label: "Lemon Balm Extract (Melissa officinalis)(stem, leaves, flower)", amount: "100 mg", dv: "***" },
        { label: "Passion Flower Extract (stem, leaves, flower)", amount: "100 mg", dv: "***" },
        { label: "Melatonin", amount: "2 mg", dv: "***" },
      ],
    },
    ingredients: "Gelatin (capsule), Brown Rice Flour",
    warnings:
      "Do not use when operating a vehicle or heavy machinery. May cause drowsiness. Not recommended for use by individuals who are pregnant, nursing, or taking sedative medications or antidepressants. Keep out of reach of children. Consult a healthcare provider before use if you have a medical condition or take prescription medications.",
    stats: [
      { label: "Serving Size", value: "2 Capsules" },
      { label: "Servings", value: "30" },
      { label: "Active Ingredients", value: "7" },
      { label: "Format", value: "Gelatin Capsule" },
      { label: "Made In", value: "USA" },
    ],
    tagline: "Seven botanicals and amino acids. Multi-pathway sleep support. Non-habit-forming.",
    descriptionRows: [
      {
        icon: "moon",
        claim: "Fall asleep without lying there awake",
        sentence: "Valerian's valerenic acid prolongs the calming GABA signal that quiets a busy mind.*",
      },
      {
        icon: "sparkles",
        claim: "Cue your body that it's time to sleep",
        sentence: "A low, physiologic 2 mg of melatonin signals the brain's clock without suppressing natural production.*",
      },
      {
        icon: "leaf",
        claim: "Quiet a racing mind, naturally",
        sentence: "Chamomile, lemon balm, and passion flower each bind GABA-A receptors to ease mental chatter.*",
      },
      {
        icon: "brain",
        claim: "Support the chemistry of deeper rest",
        sentence: "GABA lowers neural excitability while L-tryptophan feeds the serotonin-to-melatonin pathway.*",
      },
      {
        icon: "check",
        claim: "Non-habit-forming · physiologic 2 mg melatonin · COA on request",
        sentence: "",
      },
    ],
    benefitCards: [
      {
        icon: "moon",
        headline: "Fall asleep faster",
        ingredient: "Valerian 150 mg",
        description: "Prolongs the calming GABA signal that eases sleep onset.*",
      },
      {
        icon: "sparkles",
        headline: "A gentle circadian nudge",
        ingredient: "Melatonin 2 mg",
        description: "A low, physiologic dose that signals the sleep cycle without grogginess.*",
      },
      {
        icon: "leaf",
        headline: "A calmer, quieter mind",
        ingredient: "Chamomile + Lemon Balm + Passion Flower",
        description: "Botanicals that bind GABA-A receptors to ease mental tension.*",
      },
      {
        icon: "brain",
        headline: "Better sleep chemistry",
        ingredient: "GABA 100 mg + L-Tryptophan 100 mg",
        description: "Lower neural excitability plus a serotonin and melatonin precursor.*",
      },
    ],
    checkFirst: [
      "You take sedatives, benzodiazepines, or antidepressants — these botanicals act on overlapping pathways, so check with your provider first.",
      "You need to drive or operate machinery soon after — this formula is designed to make you drowsy.",
    ],
    howToUseStructured: {
      serving: "2 Capsules per serving",
      when: "30–60 minutes before bed",
      with: "6–8 oz of water",
      note: "Do not exceed 2 capsules per night, and don't drive or operate machinery after taking. Nightly use is more reliable than occasional use.",
      supply: "30 servings per container",
    },
    bestReviewQuote: {
      text: "I fall asleep in about twenty minutes now instead of staring at the ceiling, and I wake up clear-headed — not groggy.",
      name: "Elena",
      initial: "V",
    },
    ingredientDetails: {
      "Valerian Extract (root)": {
        description:
          "The most extensively studied sleep botanical. Valerenic acid inhibits GABA-transaminase — the enzyme that clears GABA from synapses — effectively prolonging the calming signal. Works via the same receptor pathway as benzodiazepines, without dependency risk or morning residue.",
        supports: ["Sleep Onset", "Deep Relaxation", "GABA Activity"],
      },
      "Chamomile Extract (flower)": {
        description:
          "Apigenin, chamomile's primary flavonoid, binds GABA-A receptors with mild affinity — producing anxiolytic and sedative-adjacent effects without dependency. The most widely used sleep botanical across cultures, with thousands of years of documented use.",
        supports: ["Relaxation", "Sleep Onset", "Anxiety Relief"],
      },
      "GABA (Gamma-Aminobutyric Acid)": {
        description:
          "The brain's principal inhibitory neurotransmitter. Supplemental GABA reduces neural excitability in the central nervous system — quieting the mental activity and sympathetic arousal that delay sleep onset in people who struggle to 'switch off' at night.",
        supports: ["CNS Calm", "Sleep Onset", "Mental Quieting"],
      },
      "L-Tryptophan": {
        description:
          "An essential amino acid and the direct dietary precursor to serotonin — which the pineal gland converts downstream to melatonin. By supporting the endogenous melatonin synthesis pathway, L-Tryptophan addresses sleep at its biochemical root, not just as a downstream signal.",
        supports: ["Melatonin Synthesis", "Serotonin Pathway", "Sleep Chemistry"],
      },
      "Lemon Balm Extract (Melissa officinalis)(stem, leaves, flower)": {
        description:
          "Rosmarinic acid, lemon balm's active compound, inhibits GABA-transaminase similarly to valerian — amplifying GABA's calming signal through the same mechanism. Traditionally combined with valerian for compounding, synergistic relaxation and sleep-onset support.",
        supports: ["GABA Enhancement", "Relaxation", "Anxiety Relief"],
      },
      "Passion Flower Extract (stem, leaves, flower)": {
        description:
          "Chrysin, passionflower's active flavonoid, modulates GABA-A receptors and reduces neural excitability. Supports the mental transition from wakefulness to rest without the morning grogginess or physical dependency associated with pharmaceutical sleep aids.",
        supports: ["Sleep Onset", "Mental Calm", "GABA Modulation"],
      },
      "Melatonin": {
        description:
          "A hormone produced naturally by the pineal gland in response to darkness. At 2mg — a physiologically appropriate dose below the threshold linked to natural production suppression — it directly signals the suprachiasmatic nucleus (the brain's clock) to initiate the sleep cycle.",
        supports: ["Circadian Rhythm", "Sleep-Wake Cycle", "Sleep Onset"],
      },
    },
    bestFor: [
      "Difficulty falling asleep or racing thoughts at bedtime",
      "Active individuals optimizing overnight muscle and tissue repair",
      "Those building a consistent, sustainable sleep routine",
      "Shift workers managing irregular or disrupted sleep schedules",
    ],
    howToUse:
      "Take 2 capsules 30–60 minutes before your target sleep time. Do not exceed 2 capsules per night. Do not operate vehicles or heavy machinery after taking. Effects are cumulative — consistent nightly use produces more reliable results than occasional use.",
    pairings: [
      {
        handle: "l-glutamine",
        name: "L-Glutamine",
        rationale:
          "Muscle protein synthesis and gut repair peak during deep sleep — glutamine fuels the recovery that this formula unlocks.",
      },
      {
        handle: "adaptogen-vitality-gummies",
        name: "Adaptogen Vitality",
        rationale:
          "Adaptogens reduce daytime cortisol — lower evening cortisol directly improves sleep onset speed and sleep quality.",
      },
      {
        handle: "shilajit-adaptogen-complex",
        name: "Shilajit Adaptogen",
        rationale:
          "Morning Shilajit for energy and hormonal function + evening Sleep Formula creates a complete daily performance and recovery cycle.",
      },
    ],
    faq: [
      {
        q: "Will I feel groggy in the morning?",
        a: "At 2mg melatonin — a low, physiologically appropriate dose — morning grogginess is uncommon. The botanical compounds work through relaxation pathways, not sedation. Most users report cleaner wake-ups compared to conventional OTC sleep aids.",
      },
      {
        q: "Can I take this every night long-term?",
        a: "Yes. This formula is non-habit-forming. None of the ingredients create physiological dependency at recommended doses. Consistent nightly use is the intended usage pattern.",
      },
      {
        q: "Can I take this with other medications?",
        a: "Do not combine with sedative medications, benzodiazepines, or antidepressants without consulting your healthcare provider. Botanical-drug interactions exist with sedating medication classes.",
      },
      {
        q: "Why only 2mg of melatonin?",
        a: "Research suggests 0.5–3mg is the effective range for most adults. Higher doses do not produce proportionally better sleep — and excess melatonin may suppress natural production over time. 2mg is intentionally conservative.",
      },
      {
        q: "When exactly should I take it?",
        a: "Take 2 capsules 30–60 minutes before your target sleep time, ideally as part of a consistent wind-down routine. Avoid screens after dosing so the melatonin signal isn't competing with bright light.",
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // Brain & Focus Formula
  // ───────────────────────────────────────────────────────────────────────────
  "brain-focus-formula": {
    benefits: [
      "Full B-Complex for Neurotransmitter Synthesis — B6 (706% DV), B12, Folate, Thiamin, and Riboflavin drive the methylation and conversion reactions the brain needs to produce dopamine, serotonin, and acetylcholine.",
      "617 mg Proprietary Nootropic Blend — Includes DMAE, Bacopa monnieri, Phosphatidylserine, Huperzine A, and DHA — a layered stack targeting memory encoding, recall speed, and sustained focus.",
      "Choline (50 mg) + DMAE — Both are precursors to acetylcholine, the primary neurotransmitter for learning and working memory. Choline supports cell membrane integrity; DMAE may increase acetylcholine availability.",
      "Antioxidant Brain Shield — Green Tea Extract, Grape Seed Extract, Bilberry, and Grapefruit Seed Extract provide polyphenols that protect neurons from oxidative stress linked to cognitive decline.",
      "Magnesium (50 mg) + Zinc (10 mg) — Magnesium regulates NMDA receptor activity critical for synaptic plasticity; Zinc deficiency is directly associated with impaired memory and mood regulation.",
    ],
    supplementFacts: {
      servingSize: "2 Capsules",
      servingsPerContainer: "30",
      rows: [
        { label: "Vitamin A (as Beta-Carotene)", amount: "122 mcg RAE", dv: "14%" },
        { label: "Vitamin C (as Ascorbic Acid)", amount: "125 mg", dv: "139%" },
        { label: "Vitamin D (as Cholecalciferol)", amount: "3 mcg", dv: "15%" },
        { label: "Vitamin E (as DL-Alpha Tocopheryl Acetate)", amount: "14 mg", dv: "93%" },
        { label: "Thiamin (as Thiamine Mononitrate)", amount: "3 mg", dv: "250%" },
        { label: "Riboflavin (as B2)", amount: "1.7 mg", dv: "131%" },
        { label: "Niacin (as Niacin)", amount: "12.5 mg NE", dv: "78%" },
        { label: "Vitamin B6 (as Pyridoxine HCl)", amount: "12 mg", dv: "706%" },
        { label: "Folate (400 mcg Folic Acid)", amount: "680 mcg DFE", dv: "170%" },
        { label: "Biotin", amount: "3 mcg", dv: "10%" },
        { label: "Pantothenic Acid (as D-Calcium Pantothenate)", amount: "12 mg", dv: "240%" },
        { label: "Choline (as Choline Bitartrate)", amount: "50 mg", dv: "9%" },
        { label: "Calcium (as Calcium Carbonate)", amount: "20 mg", dv: "2%" },
        { label: "Iron (as Ferrous Fumarate)", amount: "1 mg", dv: "6%" },
        { label: "Magnesium (as Magnesium Oxide)", amount: "50 mg", dv: "12%" },
        { label: "Zinc (as Zinc Oxide)", amount: "10 mg", dv: "91%" },
        { label: "Selenium (as Selenium Amino Acid Chelate)", amount: "50 mcg", dv: "91%" },
        { label: "Copper (as Copper Gluconate)", amount: "0.052 mg", dv: "6%" },
        { label: "Manganese (as Manganese Amino Acid Chelate)", amount: "0.4 mg", dv: "17%" },
        { label: "Chromium (as Chromium Picolinate)", amount: "12 mcg", dv: "34%" },
        { label: "Molybdenum", amount: "10 mcg", dv: "22%" },
        { label: "Potassium (as Potassium Citrate)", amount: "94 mg", dv: "2%" },
        {
          label:
            "Proprietary Nootropic Blend — DMAE Bitartrate, L-Glutamine HCl, Glutamic Acid, Green Tea Extract, Bacopa Extract, Inositol, Bilberry Fruit Extract, GABA, Grape Seed Extract, Grapefruit Seed Extract, Olive Leaf, Cassia Bark Extract, Licorice Root Extract, Boron, DHA 14%, Vanadium, Phosphatidylserine, Huperzine A",
          amount: "617 mg",
          dv: "**",
        },
      ],
    },
    ingredients:
      "Rice Flour, Hypromellose (vegetable capsule), Magnesium Stearate, Silicon Dioxide. Contains: Soy & Fish (Tuna Fish).",
    warnings:
      "Keep out of reach of children. Contains Soy and Fish (Tuna). Consult a healthcare provider before use if pregnant, nursing, have epilepsy, a neurological condition, or are taking cholinesterase inhibitors, antidepressants, or blood thinners. Not intended for individuals under 18.",
    stats: [
      { label: "Serving Size", value: "2 Capsules" },
      { label: "Servings", value: "30" },
      { label: "Active Compounds", value: "22+" },
      { label: "Format", value: "Vegetable Capsule" },
      { label: "Made In", value: "USA" },
    ],
    tagline: "A full B-complex plus a 617 mg nootropic blend. Focus, memory, and recall in two capsules.",
    descriptionRows: [
      {
        icon: "brain",
        claim: "Hold your focus through the long stretch",
        sentence: "A layered nootropic stack with DMAE and Huperzine A supports acetylcholine for sustained attention.*",
      },
      {
        icon: "sparkles",
        claim: "Remember more of what you take in",
        sentence: "Bacopa monnieri is studied for improving memory encoding speed over 8–12 weeks.*",
      },
      {
        icon: "zap",
        claim: "Fuel the chemistry behind clear thinking",
        sentence: "B6 at 706% DV drives dopamine, serotonin, and acetylcholine synthesis.*",
      },
      {
        icon: "shield",
        claim: "Protect neurons from everyday wear",
        sentence: "Green tea, grape seed, and bilberry polyphenols guard neurons against oxidative stress.*",
      },
      {
        icon: "check",
        claim: "Vegetable capsule · 617 mg nootropic blend · COA on request",
        sentence: "",
      },
    ],
    benefitCards: [
      {
        icon: "brain",
        headline: "Sustained, stimulant-free focus",
        ingredient: "Nootropic Blend 617 mg",
        description: "DMAE and Huperzine A support acetylcholine for steady attention.*",
      },
      {
        icon: "sparkles",
        headline: "Sharper memory and recall",
        ingredient: "Bacopa Monnieri",
        description: "Studied for improving memory encoding speed with consistent use.*",
      },
      {
        icon: "zap",
        headline: "Neurotransmitter support",
        ingredient: "Vitamin B6 706% DV",
        description: "Drives dopamine, serotonin, and acetylcholine production.*",
      },
      {
        icon: "shield",
        headline: "A protective antioxidant shield",
        ingredient: "Green Tea + Grape Seed + Bilberry",
        description: "Polyphenols that defend neurons from oxidative stress.*",
      },
    ],
    checkFirst: [
      "You have a soy or fish allergy — this formula contains soy and fish (tuna) from its DHA source.",
      "You take cholinesterase inhibitors, antidepressants, or blood thinners, or have a neurological condition — consult your provider first.",
    ],
    howToUseStructured: {
      serving: "2 Capsules per serving",
      when: "Morning or midday, with a meal",
      with: "6–8 oz of water",
      note: "Take at the same time daily. Allow 4–8 weeks for Bacopa monnieri to reach full effect. Do not exceed 2 capsules per 24 hours.",
      supply: "30 servings per container",
    },
    bestReviewQuote: {
      text: "Around week six my recall at work clearly improved — names and details stick now without the caffeine spikes I used to rely on.",
      name: "Aaron",
      initial: "K",
    },
    ingredientDetails: {
      "Vitamin B6 (as Pyridoxine HCl)": {
        description:
          "Critical coenzyme for dopamine, serotonin, and GABA synthesis — the three neurotransmitters most directly tied to focus, mood, and mental calm. At 706% DV, this elevated dose supports the full neurotransmitter production pipeline, particularly relevant under sustained cognitive demand.",
        supports: ["Dopamine Synthesis", "Serotonin Pathway", "Focus & Mood", "GABA Production"],
      },
      "Choline (as Choline Bitartrate)": {
        description:
          "Dietary precursor to acetylcholine — the primary neurotransmitter for attention, learning, and working memory. Also supports phosphatidylcholine synthesis, which maintains the structural integrity of neuronal cell membranes and synaptic signaling efficiency.",
        supports: ["Acetylcholine Production", "Working Memory", "Cell Membrane Health"],
      },
      "Magnesium (as Magnesium Oxide)": {
        description:
          "Regulates NMDA receptor activity — the receptor type critical for long-term potentiation (LTP), the cellular mechanism underlying memory encoding. Magnesium deficiency is directly linked to impaired recall, mood instability, and degraded sleep quality.",
        supports: ["Synaptic Plasticity", "Memory Encoding", "Mood Regulation"],
      },
      "Zinc (as Zinc Oxide)": {
        description:
          "Essential cofactor in over 300 enzymatic reactions, including those governing neurotransmitter metabolism and synaptic signaling. Zinc deficiency is associated with measurably impaired cognitive performance, reduced working memory, and mood dysregulation.",
        supports: ["Cognitive Function", "Neurotransmitter Metabolism", "Mood Stability"],
      },
      "Proprietary Nootropic Blend — DMAE Bitartrate, L-Glutamine HCl, Glutamic Acid, Green Tea Extract, Bacopa Extract, Inositol, Bilberry Fruit Extract, GABA, Grape Seed Extract, Grapefruit Seed Extract, Olive Leaf, Cassia Bark Extract, Licorice Root Extract, Boron, DHA 14%, Vanadium, Phosphatidylserine, Huperzine A": {
        description:
          "A 617mg layered nootropic stack: DMAE and Huperzine A raise acetylcholine availability; Bacopa monnieri improves memory encoding speed (effect peaks at 8–12 weeks); Phosphatidylserine maintains neural membrane fluidity for efficient signal transmission; DHA provides the omega-3 structural fat the brain is built from; antioxidant botanicals (Green Tea, Grape Seed, Grapefruit Seed) protect neurons from oxidative damage.",
        supports: ["Memory Encoding", "Acetylcholine Support", "Neural Protection", "Sustained Focus"],
      },
    },
    bestFor: [
      "Students and professionals in high cognitive-demand roles",
      "Memory consolidation and information recall speed",
      "Sustained focus without stimulant energy spikes",
      "Comprehensive daily brain nutritional coverage",
    ],
    howToUse:
      "Take 2 capsules daily with a meal. Morning or midday use is recommended — nootropic compounds work best taken consistently at the same time. Do not exceed 2 capsules per 24 hours. Allow 4–8 weeks for Bacopa monnieri to reach full effect.",
    pairings: [
      {
        handle: "sleep-formula",
        name: "Sleep Formula",
        rationale:
          "Memory consolidation happens during sleep — this formula and Sleep Formula target the same cognitive outcome from different points in the day.",
      },
      {
        handle: "nad-plus",
        name: "NAD+",
        rationale:
          "NAD+ drives the mitochondrial energy that cognitive work demands — a direct upstream support for the same performance goals.",
      },
      {
        handle: "shilajit-adaptogen-complex",
        name: "Shilajit Adaptogen",
        rationale:
          "Shilajit's fulvic acid enhances cellular nutrient uptake, amplifying the absorption efficiency of this formula's micronutrient matrix.",
      },
    ],
    faq: [
      {
        q: "How long before I notice cognitive improvements?",
        a: "Some effects — B-vitamin support, choline — activate within the first week. Bacopa monnieri, the most researched memory ingredient in the blend, shows measurable improvements in controlled studies after 8–12 weeks. Give the full formula at least 4–6 weeks before evaluating.",
      },
      {
        q: "Can I take this with caffeine?",
        a: "Yes. The formula contains no stimulants and is commonly used alongside coffee or tea. The nootropic stack supports sustained attention without requiring caffeine.",
      },
      {
        q: "Are there allergen warnings I should know about?",
        a: "Yes — this product contains Soy and Fish (Tuna Fish), derived from the DHA 14% in the proprietary blend. Not suitable for those with soy or fish allergies.",
      },
      {
        q: "Is Huperzine A safe for daily use?",
        a: "Huperzine A has a long half-life. Some practitioners recommend cycling (5 days on, 2 days off) for extended use. Consult your healthcare provider, especially if you take cholinesterase inhibitors or have a neurological condition.",
      },
      {
        q: "Can I stack this with the Sleep Formula?",
        a: "Yes — they target the same cognitive goal from opposite ends of the day. Take Brain & Focus in the morning or midday for daytime performance, and Sleep Formula at night, since memory consolidation happens during deep sleep.",
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // NAD+
  // ───────────────────────────────────────────────────────────────────────────
  "nad-plus": NAD_OVERRIDE,
  "nad": NAD_OVERRIDE,

  // ───────────────────────────────────────────────────────────────────────────
  // Complete Multivitamin
  // ───────────────────────────────────────────────────────────────────────────
  "complete-multivitamin": {
    benefits: [
      "Full Vitamin & Mineral Matrix — 20 micronutrients covering vitamins A, C, D, E, and the complete B-complex alongside key minerals: Magnesium, Zinc, Selenium, Copper, Manganese, Chromium, and Molybdenum.",
      "Prostate & Men's Health Support Blend (170 mg) — Includes Lycopene (antioxidant carotenoid linked to prostate health), Saw Palmetto (DHT support), and Stinging Nettle Root. Targeted support for men's long-term wellness.",
      "Immune Support Blend (110 mg) — Echinacea purpurea, Beta-Glucan, Spirulina, and Garlic work through different immune pathways: innate immunity activation, natural killer cell support, and antimicrobial activity.",
      "Antioxidant & Energy Fruit Blend (190 mg) — Green Tea, Hawthorn Berry, Bilberry, Grape Seed, Pomegranate, and Black Currant deliver a broad polyphenol spectrum for cellular protection and sustained vitality.",
      "Biotin (300 mcg, 1000% DV) + B12 (27 mcg, 1125% DV) — Two nutrients commonly deficient in busy adults. Biotin supports hair, skin, and nail structure; B12 is essential for red blood cell formation and energy metabolism.",
    ],
    supplementFacts: {
      servingSize: "2 Capsules",
      servingsPerContainer: "30",
      rows: [
        { label: "Vitamin A (as Beta-Carotene)", amount: "600 mcg RAE", dv: "67%" },
        { label: "Vitamin C (as Ascorbic Acid)", amount: "150 mg", dv: "167%" },
        { label: "Calcium (as Calcium Carbonate)", amount: "50 mg", dv: "4%" },
        { label: "Vitamin D (as Cholecalciferol)", amount: "10 mcg", dv: "50%" },
        { label: "Vitamin E (as DL-Alpha Tocopheryl Acetate)", amount: "13.5 mg", dv: "90%" },
        { label: "Vitamin B1 (as Thiamine Mononitrate)", amount: "7 mg", dv: "583%" },
        { label: "Vitamin B2 (as Riboflavin)", amount: "7.5 mg", dv: "577%" },
        { label: "Vitamin B3 (as Niacin)", amount: "30 mg NE", dv: "188%" },
        { label: "Vitamin B6 (as Pyridoxine HCl)", amount: "7.5 mg", dv: "167%" },
        { label: "Folate (400 mcg Folic Acid)", amount: "667 mcg DFE", dv: "167%" },
        { label: "Vitamin B12 (as Cyanocobalamin)", amount: "27 mcg", dv: "1125%" },
        { label: "Biotin", amount: "300 mcg", dv: "1000%" },
        { label: "Vitamin B5 (as D-Calcium Pantothenate)", amount: "10 mg", dv: "200%" },
        { label: "Magnesium (as Magnesium Oxide)", amount: "50 mg", dv: "12%" },
        { label: "Zinc (as Zinc Oxide)", amount: "15 mg", dv: "136%" },
        { label: "Selenium (as Selenium Amino Acid Chelate)", amount: "30 mcg", dv: "55%" },
        { label: "Copper (as Copper Gluconate)", amount: "2 mg", dv: "222%" },
        { label: "Manganese (as Manganese Amino Acid Chelate)", amount: "2 mg", dv: "87%" },
        { label: "Chromium (as Chromium Picolinate)", amount: "120 mcg", dv: "343%" },
        { label: "Molybdenum", amount: "75 mcg", dv: "167%" },
        {
          label:
            "Health Support Blend — Lutein, Lycopene, Stinging Nettle Extract, Saw Palmetto",
          amount: "170 mg",
          dv: "**",
        },
        {
          label: "Immune Support Blend — Echinacea Extract, Beta Glucan, Spirulina, Garlic",
          amount: "110 mg",
          dv: "**",
        },
        {
          label:
            "Antioxidant & Energy Blend — Green Tea Extract, Hawthorn Berries, Cinnamon Bark Extract, Bilberry Fruit Extract, Grape Seed Extract, Black Currant Fruit Extract, Pomegranate Fruit Extract",
          amount: "190 mg",
          dv: "**",
        },
      ],
    },
    ingredients:
      "Rice Flour, Hypromellose (vegetable capsule), Magnesium Stearate, Silicon Dioxide",
    warnings:
      "Keep out of reach of children. Consult a healthcare provider before use if you are pregnant, nursing, have a medical condition, or are taking medications. Do not exceed recommended dose. Store in a cool, dry place.",
    stats: [
      { label: "Serving Size", value: "2 Capsules" },
      { label: "Servings", value: "30" },
      { label: "Active Nutrients", value: "20+" },
      { label: "Format", value: "Vegetable Capsule" },
      { label: "Made In", value: "USA" },
    ],
    tagline: "20+ vitamins and minerals plus targeted men's health, immune, and antioxidant blends. Two capsules daily.",
    descriptionRows: [
      {
        icon: "pill",
        claim: "Cover your nutritional gaps in one step",
        sentence: "A complete vitamin and mineral matrix replaces juggling multiple separate bottles.*",
      },
      {
        icon: "zap",
        claim: "Support real daily energy, not a buzz",
        sentence: "B12 at 1125% DV and a full B-complex fuel red blood cell formation and energy metabolism.*",
      },
      {
        icon: "activity",
        claim: "Targeted support for men's health",
        sentence: "Saw palmetto, lycopene, and stinging nettle root back prostate and DHT metabolism.*",
      },
      {
        icon: "shield",
        claim: "Daily immune and antioxidant backup",
        sentence: "Echinacea, beta-glucan, and a seven-source polyphenol blend support immunity and cellular defense.*",
      },
      {
        icon: "check",
        claim: "Vegetable capsule · 20+ active nutrients · COA on request",
        sentence: "",
      },
    ],
    benefitCards: [
      {
        icon: "pill",
        headline: "Complete daily coverage",
        ingredient: "20+ Vitamins & Minerals",
        description: "A full micronutrient matrix in two capsules.*",
      },
      {
        icon: "zap",
        headline: "Everyday energy metabolism",
        ingredient: "B12 1125% DV + B-Complex",
        description: "Supports red blood cell formation and energy production.*",
      },
      {
        icon: "activity",
        headline: "Men's health support",
        ingredient: "Saw Palmetto + Lycopene Blend 170 mg",
        description: "Targets prostate health and DHT metabolism.*",
      },
      {
        icon: "shield",
        headline: "Immune and antioxidant defense",
        ingredient: "Immune + Antioxidant Blends 300 mg",
        description: "Echinacea, beta-glucan, and a broad polyphenol spectrum.*",
      },
    ],
    checkFirst: [
      "You already take therapeutic-dose individual vitamins — check for overlap, since several nutrients here run well above 100% DV.",
      "You need iron — this formula contains none, so supplement separately if your provider recommends it.",
    ],
    howToUseStructured: {
      serving: "2 Capsules per serving",
      when: "Morning, with a meal",
      with: "A meal containing dietary fat",
      note: "Fat-soluble vitamins (A, D, E) absorb better with dietary fat. Take with breakfast, not on an empty stomach, to avoid B-vitamin nausea.",
      supply: "30 servings per container",
    },
    bestReviewQuote: {
      text: "Replaced four separate bottles with this and my energy through the workday has been more consistent ever since.",
      name: "Greg",
      initial: "L",
    },
    ingredientDetails: {
      "Vitamin D (as Cholecalciferol)": {
        description:
          "The hormone-vitamin that regulates calcium absorption, immune gene expression, and mood via serotonin pathway modulation. Widespread deficiency in indoor populations makes this one of the highest-priority daily supplements. At 50% DV, supports baseline sufficiency without over-supplementation risk.",
        supports: ["Bone Density", "Immune Regulation", "Mood & Serotonin"],
      },
      "Vitamin B12 (as Cyanocobalamin)": {
        description:
          "Essential for red blood cell formation, DNA synthesis, and myelin sheath maintenance around nerve fibers. At 1125% DV — the elevated dose compensates for variable absorption rates, particularly in older adults and plant-based eaters where B12 deficiency is most prevalent.",
        supports: ["Energy Metabolism", "Neurological Health", "Red Blood Cell Formation"],
      },
      "Biotin": {
        description:
          "Cofactor for carboxylase enzymes governing fatty acid synthesis and amino acid metabolism. At 1000% DV, addresses dietary shortfalls that commonly manifest as degraded hair structure, brittle nails, and skin integrity issues.",
        supports: ["Hair & Nail Structure", "Fatty Acid Metabolism", "Skin Health"],
      },
      "Health Support Blend — Lutein, Lycopene, Stinging Nettle Extract, Saw Palmetto": {
        description:
          "Lutein protects macular photoreceptors from blue-light oxidative damage; Lycopene provides antioxidant carotenoid coverage linked to prostate and cardiovascular health; Saw Palmetto and Stinging Nettle root support DHT metabolism and urinary flow in men.",
        supports: ["Eye Health", "Prostate Support", "Antioxidant Protection"],
      },
      "Immune Support Blend — Echinacea Extract, Beta Glucan, Spirulina, Garlic": {
        description:
          "Four immune activation pathways in one blend: Echinacea stimulates innate immune cytokine production; Beta Glucan primes natural killer cells and macrophages; Spirulina provides phycocyanin with anti-inflammatory antioxidant activity; Garlic's allicin delivers antimicrobial and immune-modulatory properties.",
        supports: ["Innate Immunity", "Natural Killer Cell Activity", "Antimicrobial Defense"],
      },
      "Antioxidant & Energy Blend — Green Tea Extract, Hawthorn Berries, Cinnamon Bark Extract, Bilberry Fruit Extract, Grape Seed Extract, Black Currant Fruit Extract, Pomegranate Fruit Extract": {
        description:
          "Seven botanical sources delivering a broad polyphenol spectrum covering flavonoids, anthocyanins, proanthocyanidins, and catechins. Collectively protects cells from cumulative oxidative stress, supports mitochondrial efficiency, vascular integrity, and the antioxidant breadth that single-source supplements cannot match.",
        supports: ["Oxidative Stress Protection", "Cardiovascular Health", "Mitochondrial Support"],
      },
    },
    bestFor: [
      "Comprehensive daily micronutrient coverage in two capsules",
      "Men's health: prostate, energy, and immune support",
      "Filling dietary gaps without managing multiple separate supplements",
      "Long-term antioxidant and cellular protection",
    ],
    howToUse:
      "Take 2 capsules daily with a meal containing dietary fat — fat-soluble vitamins (A, D, E) absorb significantly better with food. Take at the same time each day. A multivitamin is a foundation, not a replacement for a varied diet.",
    pairings: [
      {
        handle: "nad-plus",
        name: "NAD+",
        rationale:
          "The micronutrient matrix here ensures all NAD+-dependent enzyme cofactors are present — a direct upstream support for cellular energy.",
      },
      {
        handle: "l-glutamine",
        name: "L-Glutamine",
        rationale:
          "Multivitamins cover micronutrient breadth; glutamine adds targeted amino acid support for gut integrity, immune function, and muscle recovery.",
      },
      {
        handle: "adaptogen-vitality-gummies",
        name: "Adaptogen Vitality",
        rationale:
          "Vitamins and minerals power the cellular machinery that adaptogens help regulate — a complete daily foundation stack.",
      },
    ],
    faq: [
      {
        q: "Should I take this with food?",
        a: "Yes — fat-soluble vitamins (A, D, E, K) absorb significantly better with dietary fat. Take with any meal that includes fat. Avoid taking on an empty stomach to prevent nausea from the B-vitamin complex.",
      },
      {
        q: "Why is B12 at 1125% DV?",
        a: "B12 absorption is highly variable — stomach acid, intrinsic factor, and gut health all affect uptake. The elevated dose compensates for poor absorbers and ensures sufficient circulating levels. At this dose, there is no known toxicity risk — excess B12 is water-soluble and excreted.",
      },
      {
        q: "Does this contain iron?",
        a: "No iron listed in this formula. If iron supplementation is a concern, check with your healthcare provider about your specific needs.",
      },
      {
        q: "Is this formulated specifically for men?",
        a: "It works as a complete multivitamin for most adults, but the Health Support Blend (saw palmetto, lycopene, stinging nettle) targets prostate and DHT-related concerns that are most relevant to men. There's no iron, which also suits most men's needs.",
      },
      {
        q: "Are there allergen risks?",
        a: "Made in a cGMP-certified, FDA-registered facility with allergen controls. Contains no gluten, dairy, soy, or common allergens in the base formula.",
      },
    ],
  },
}

/**
 * Merges a handle-specific override into the parsed content.
 * Fields already parsed from the product HTML take priority.
 * Extended fields (stats, ingredientDetails, bestFor, howToUse, pairings, faq)
 * are accessed directly via PRODUCT_OVERRIDES in page.tsx.
 */
export function applyOverride(
  handle: string,
  parsed: ParsedProductContent
): ParsedProductContent {
  const override = PRODUCT_OVERRIDES[handle.toLowerCase()]
  if (!override) return parsed

  return {
    benefits:
      parsed.benefits.length > 0
        ? parsed.benefits
        : (override.benefits ?? parsed.benefits),
    supplementFacts:
      parsed.supplementFacts !== null
        ? parsed.supplementFacts
        : (override.supplementFacts ?? null),
    ingredients:
      parsed.ingredients !== null
        ? parsed.ingredients
        : (override.ingredients ?? null),
    warnings:
      parsed.warnings !== null
        ? parsed.warnings
        : (override.warnings ?? null),
  }
}
