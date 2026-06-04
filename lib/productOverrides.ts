/**
 * Manual supplement-facts overrides, keyed by Shopify product handle (lowercase).
 *
 * Used when the product's descriptionHtml has no parseable <table>.
 * HTML-parsed data always takes priority — overrides only fill empty fields.
 */

import type { ParsedProductContent } from "@/lib/parseProductHtml"

type Override = Partial<
  Pick<ParsedProductContent, "supplementFacts" | "ingredients" | "warnings" | "benefits">
>

export const PRODUCT_OVERRIDES: Record<string, Override> = {

  // ─────────────────────────────────────────────────────────────────────────
  // L-Glutamine
  // ─────────────────────────────────────────────────────────────────────────
  "l-glutamine": {
    benefits: [
      "Simple Minimalist Formula — Single active ingredient with no unnecessary fillers. Just L-Glutamine and a flow agent (Silicon Dioxide).",
      "Gut Lining Integrity — L-Glutamine is the primary fuel source for intestinal epithelial cells, supporting the structural barrier that separates your gut from your bloodstream.",
      "Muscle Recovery Support — After intense training, plasma glutamine drops significantly. Replenishing with 3–5 g post-workout supports protein synthesis and reduces muscle breakdown.",
      "Immune System Fuel — Rapidly dividing immune cells rely on glutamine as a primary energy source, especially during periods of stress or illness.",
    ],
    supplementFacts: {
      servingSize: "1 Scoop (3.3 g)",
      servingsPerContainer: "30",
      rows: [
        {
          label: "L-Glutamine",
          amount: "3.15 g",
          dv: "**",
        },
      ],
    },
    ingredients: "Silicon Dioxide",
    warnings:
      "Keep out of reach of children. Consult a healthcare provider before use if you are pregnant, nursing, have a medical condition, or are taking any medications. Do not use if safety seal is broken or missing.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Adaptogen Vitality Gummies
  // ─────────────────────────────────────────────────────────────────────────
  "adaptogen-vitality-gummies": {
    benefits: [
      "Functional Mushroom Complex — Four evidence-supported mushroom extracts (Lion's Mane, Shiitake, Chaga, Maitake) at 87 mg each, chosen for their complementary roles in cognition, immune defence, and cellular resilience.",
      "Lion's Mane for Nerve Growth — Lion's Mane (Hericium erinaceus) contains hericenones and erinacines that may stimulate Nerve Growth Factor (NGF), supporting neuroplasticity and memory formation.",
      "Chaga & Maitake Antioxidant Duo — Chaga is among the highest-ORAC botanicals measured; Maitake (Grifola frondosa) provides beta-glucans linked to immune modulation and balanced blood glucose response.",
      "Convenient Daily Delivery — 10 kcal per gummy, naturally flavoured with Orange and coloured from Beta Carotene. No artificial dyes or synthetic sweeteners.",
    ],
    supplementFacts: {
      servingSize: "1 Gummy",
      servingsPerContainer: "30",
      rows: [
        { label: "Calories", amount: "10 kcal", dv: undefined },
        { label: "Total Carbohydrate", amount: "3 g", dv: "1%" },
        { label: "Total Sugars", amount: "2 g", dv: "***", indented: true },
        {
          label: "Includes 2 g Added Sugars",
          amount: "",
          dv: "4%",
          indented: true,
        },
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
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Shilajit Adaptogen Complex
  // ─────────────────────────────────────────────────────────────────────────
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
        {
          label: "Shilajit Extract 30:1 (Asphaltum)(Stone)",
          amount: "400 mg",
          dv: "**",
        },
        {
          label: "Ashwagandha Root Extract 30:1 (Withania somnifera)",
          amount: "100 mg",
          dv: "**",
        },
        {
          label: "Sea Moss Extract 20:1 (Chondrus crispus)(algae)",
          amount: "100 mg",
          dv: "**",
        },
        {
          label: "Tongkat Ali Root Extract 300:1 (Eurycoma longifolia)",
          amount: "100 mg",
          dv: "**",
        },
      ],
    },
    ingredients: "HPMC (vegetable capsule), Nu-FLOW®, Olive Oil",
    warnings:
      "Keep out of reach of children. Not recommended for individuals with hormone-sensitive conditions. Consult a healthcare provider before use if pregnant, nursing, or taking medications. This product has not been evaluated for use in individuals under 18.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Sleep Formula
  // ─────────────────────────────────────────────────────────────────────────
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
        {
          label: "GABA (Gamma-Aminobutyric Acid)",
          amount: "100 mg",
          dv: "***",
        },
        { label: "L-Tryptophan", amount: "100 mg", dv: "***" },
        {
          label: "Lemon Balm Extract (Melissa officinalis)(stem, leaves, flower)",
          amount: "100 mg",
          dv: "***",
        },
        {
          label: "Passion Flower Extract (stem, leaves, flower)",
          amount: "100 mg",
          dv: "***",
        },
        { label: "Melatonin", amount: "2 mg", dv: "***" },
      ],
    },
    ingredients: "Gelatin (capsule), Brown Rice Flour",
    warnings:
      "Do not use when operating a vehicle or heavy machinery. May cause drowsiness. Not recommended for use by individuals who are pregnant, nursing, or taking sedative medications or antidepressants. Keep out of reach of children. Consult a healthcare provider before use if you have a medical condition or take prescription medications.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Brain & Focus Formula
  // ─────────────────────────────────────────────────────────────────────────
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
        {
          label: "Folate (400 mcg Folic Acid)",
          amount: "680 mcg DFE",
          dv: "170%",
        },
        { label: "Biotin", amount: "3 mcg", dv: "10%" },
        {
          label: "Pantothenic Acid (as D-Calcium Pantothenate)",
          amount: "12 mg",
          dv: "240%",
        },
        { label: "Choline (as Choline Bitartrate)", amount: "50 mg", dv: "9%" },
        { label: "Calcium (as Calcium Carbonate)", amount: "20 mg", dv: "2%" },
        { label: "Iron (as Ferrous Fumarate)", amount: "1 mg", dv: "6%" },
        { label: "Magnesium (as Magnesium Oxide)", amount: "50 mg", dv: "12%" },
        { label: "Zinc (as Zinc Oxide)", amount: "10 mg", dv: "91%" },
        {
          label: "Selenium (as Selenium Amino Acid Chelate)",
          amount: "50 mcg",
          dv: "91%",
        },
        { label: "Copper (as Copper Gluconate)", amount: "0.052 mg", dv: "6%" },
        {
          label: "Manganese (as Manganese Amino Acid Chelate)",
          amount: "0.4 mg",
          dv: "17%",
        },
        {
          label: "Chromium (as Chromium Picolinate)",
          amount: "12 mcg",
          dv: "34%",
        },
        { label: "Molybdenum", amount: "10 mcg", dv: "22%" },
        { label: "Potassium (as Potassium Citrate)", amount: "94 mg", dv: "2%" },
        {
          label: "Proprietary Nootropic Blend — DMAE Bitartrate, L-Glutamine HCl, Glutamic Acid, Green Tea Extract, Bacopa Extract, Inositol, Bilberry Fruit Extract, GABA, Grape Seed Extract, Grapefruit Seed Extract, Olive Leaf, Cassia Bark Extract, Licorice Root Extract, Boron, DHA 14%, Vanadium, Phosphatidylserine, Huperzine A",
          amount: "617 mg",
          dv: "**",
        },
      ],
    },
    ingredients:
      "Rice Flour, Hypromellose (vegetable capsule), Magnesium Stearate, Silicon Dioxide. Contains: Soy & Fish (Tuna Fish).",
    warnings:
      "Keep out of reach of children. Contains Soy and Fish (Tuna). Consult a healthcare provider before use if pregnant, nursing, have epilepsy, a neurological condition, or are taking cholinesterase inhibitors, antidepressants, or blood thinners. Not intended for individuals under 18.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // NAD+ (Nicotinamide Adenine Dinucleotide + Quercetin + Resveratrol)
  // ─────────────────────────────────────────────────────────────────────────
  "nad-plus": {
    benefits: [
      "NAD+ 500 mg — Nicotinamide Adenine Dinucleotide is a coenzyme present in every living cell, central to energy production in the mitochondria and the activation of sirtuins — proteins linked to longevity and DNA repair.",
      "Quercetin Dihydrate 250 mg (Sophora japonica) — A potent flavonoid and senolytic agent that selectively clears damaged senescent cells. Works synergistically with NAD+ to amplify cellular rejuvenation and reduce chronic low-grade inflammation.",
      "Japanese Knotweed Extract 150 mg (98% Resveratrol) — One of the highest-concentration resveratrol sources available. Resveratrol activates SIRT1, a sirtuin that mimics the cellular effects of caloric restriction and supports mitochondrial biogenesis.",
      "Longevity Triad — NAD+, Quercetin, and Resveratrol each target aging pathways independently (NAD biosynthesis, senescence clearance, and sirtuin activation), making this a comprehensive anti-aging support stack.",
    ],
    supplementFacts: {
      servingSize: "2 Capsules",
      servingsPerContainer: "30",
      rows: [
        {
          label: "NAD+ (Nicotinamide Adenine Dinucleotide)",
          amount: "500 mg",
          dv: "**",
        },
        {
          label: "Quercetin Dihydrate Extract (Sophora japonica)(whole flower bud)",
          amount: "250 mg",
          dv: "**",
        },
        {
          label: "Japanese Knotweed Extract (98% resveratrol)(Polygonum cuspidatum)(root)",
          amount: "150 mg",
          dv: "**",
        },
      ],
    },
    ingredients:
      "HPMC (vegetable capsule), MCC (microcrystalline cellulose), Brown Rice Flour, Olive Oil, Silicon Dioxide, Magnesium Stearate",
    warnings:
      "Keep out of reach of children. Consult a healthcare provider before use if you are pregnant, nursing, have a medical condition, or are taking blood thinners, immunosuppressants, or medications metabolised by CYP3A4 enzymes (quercetin may inhibit this pathway). Not intended for individuals under 18.",
  },

  // Also covers "nad" handle variant
  "nad": {
    benefits: [
      "NAD+ 500 mg — Nicotinamide Adenine Dinucleotide is a coenzyme present in every living cell, central to energy production in the mitochondria and the activation of sirtuins — proteins linked to longevity and DNA repair.",
      "Quercetin Dihydrate 250 mg (Sophora japonica) — A potent flavonoid and senolytic agent that selectively clears damaged senescent cells. Works synergistically with NAD+ to amplify cellular rejuvenation and reduce chronic low-grade inflammation.",
      "Japanese Knotweed Extract 150 mg (98% Resveratrol) — One of the highest-concentration resveratrol sources available. Resveratrol activates SIRT1, a sirtuin that mimics the cellular effects of caloric restriction and supports mitochondrial biogenesis.",
      "Longevity Triad — NAD+, Quercetin, and Resveratrol each target aging pathways independently (NAD biosynthesis, senescence clearance, and sirtuin activation), making this a comprehensive anti-aging support stack.",
    ],
    supplementFacts: {
      servingSize: "2 Capsules",
      servingsPerContainer: "30",
      rows: [
        {
          label: "NAD+ (Nicotinamide Adenine Dinucleotide)",
          amount: "500 mg",
          dv: "**",
        },
        {
          label: "Quercetin Dihydrate Extract (Sophora japonica)(whole flower bud)",
          amount: "250 mg",
          dv: "**",
        },
        {
          label: "Japanese Knotweed Extract (98% resveratrol)(Polygonum cuspidatum)(root)",
          amount: "150 mg",
          dv: "**",
        },
      ],
    },
    ingredients:
      "HPMC (vegetable capsule), MCC (microcrystalline cellulose), Brown Rice Flour, Olive Oil, Silicon Dioxide, Magnesium Stearate",
    warnings:
      "Keep out of reach of children. Consult a healthcare provider before use if you are pregnant, nursing, have a medical condition, or are taking blood thinners, immunosuppressants, or medications metabolised by CYP3A4 enzymes (quercetin may inhibit this pathway). Not intended for individuals under 18.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Complete Multivitamin
  // ─────────────────────────────────────────────────────────────────────────
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
        {
          label: "Vitamin A (as Beta-Carotene)",
          amount: "600 mcg RAE",
          dv: "67%",
        },
        { label: "Vitamin C (as Ascorbic Acid)", amount: "150 mg", dv: "167%" },
        { label: "Calcium (as Calcium Carbonate)", amount: "50 mg", dv: "4%" },
        { label: "Vitamin D (as Cholecalciferol)", amount: "10 mcg", dv: "50%" },
        {
          label: "Vitamin E (as DL-Alpha Tocopheryl Acetate)",
          amount: "13.5 mg",
          dv: "90%",
        },
        {
          label: "Vitamin B1 (as Thiamine Mononitrate)",
          amount: "7 mg",
          dv: "583%",
        },
        { label: "Vitamin B2 (as Riboflavin)", amount: "7.5 mg", dv: "577%" },
        { label: "Vitamin B3 (as Niacin)", amount: "30 mg NE", dv: "188%" },
        {
          label: "Vitamin B6 (as Pyridoxine HCl)",
          amount: "7.5 mg",
          dv: "167%",
        },
        {
          label: "Folate (400 mcg Folic Acid)",
          amount: "667 mcg DFE",
          dv: "167%",
        },
        {
          label: "Vitamin B12 (as Cyanocobalamin)",
          amount: "27 mcg",
          dv: "1125%",
        },
        { label: "Biotin", amount: "300 mcg", dv: "1000%" },
        {
          label: "Vitamin B5 (as D-Calcium Pantothenate)",
          amount: "10 mg",
          dv: "200%",
        },
        { label: "Magnesium (as Magnesium Oxide)", amount: "50 mg", dv: "12%" },
        { label: "Zinc (as Zinc Oxide)", amount: "15 mg", dv: "136%" },
        {
          label: "Selenium (as Selenium Amino Acid Chelate)",
          amount: "30 mcg",
          dv: "55%",
        },
        { label: "Copper (as Copper Gluconate)", amount: "2 mg", dv: "222%" },
        {
          label: "Manganese (as Manganese Amino Acid Chelate)",
          amount: "2 mg",
          dv: "87%",
        },
        {
          label: "Chromium (as Chromium Picolinate)",
          amount: "120 mcg",
          dv: "343%",
        },
        { label: "Molybdenum", amount: "75 mcg", dv: "167%" },
        {
          label: "Health Support Blend — Lutein, Lycopene, Stinging Nettle Extract, Saw Palmetto",
          amount: "170 mg",
          dv: "**",
        },
        {
          label: "Immune Support Blend — Echinacea Extract, Beta Glucan, Spirulina, Garlic",
          amount: "110 mg",
          dv: "**",
        },
        {
          label: "Antioxidant & Energy Blend — Green Tea Extract, Hawthorn Berries, Cinnamon Bark Extract, Bilberry Fruit Extract, Grape Seed Extract, Black Currant Fruit Extract, Pomegranate Fruit Extract",
          amount: "190 mg",
          dv: "**",
        },
      ],
    },
    ingredients:
      "Rice Flour, Hypromellose (vegetable capsule), Magnesium Stearate, Silicon Dioxide",
    warnings:
      "Keep out of reach of children. Consult a healthcare provider before use if you are pregnant, nursing, have a medical condition, or are taking medications. Do not exceed recommended dose. Store in a cool, dry place.",
  },

}

/**
 * Merges a handle-specific override into the parsed content.
 * Fields already parsed from the product HTML take priority.
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
