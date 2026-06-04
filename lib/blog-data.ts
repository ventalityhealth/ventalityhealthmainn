export interface KeyStat {
  value: string;
  label: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  tags: string[];
  pullQuote: string;
  keyStats: KeyStat[];
}

export const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  Science: {
    bg: "rgba(168,209,255,0.07)",
    border: "rgba(168,209,255,0.22)",
    text: "#A8D1FF",
  },
  Wellness: {
    bg: "rgba(180,220,195,0.07)",
    border: "rgba(180,220,195,0.22)",
    text: "#B4DCC3",
  },
  Performance: {
    bg: "rgba(255,200,120,0.07)",
    border: "rgba(255,200,120,0.22)",
    text: "#FFC878",
  },
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "l-glutamine-gut-muscle-immunity",
    title: "L-Glutamine: The Amino Acid Your Body Uses Most",
    excerpt:
      "L-Glutamine is the most abundant free amino acid in the human body — and one of the most conditionally essential. Here's what the research shows about its roles in gut integrity, muscle recovery, and immune function.",
    category: "Science",
    date: "Jun 1, 2026",
    readTime: "7 min read",
    author: "Ventality Editorial",
    tags: ["amino acids", "gut health", "recovery", "immunity"],
    pullQuote: "Glutamine is conditionally essential — demand can outpace synthesis under physiological stress.",
    keyStats: [
      { value: "3.3g", label: "Per serving in our formula" },
      { value: "60%", label: "Of free amino acid pool in plasma" },
    ],
    content: `
L-Glutamine is classified as a conditionally essential amino acid. Under normal, non-stressed conditions, the body synthesizes enough to meet demand. Under physiological stress — intensive exercise, illness, surgery, or caloric restriction — endogenous synthesis may fall short, and dietary intake becomes meaningful.

**The role of glutamine in gut integrity**

The epithelial cells lining the small intestine (enterocytes) use glutamine as their primary fuel source. Adequate glutamine availability supports the integrity of the intestinal barrier — the tightly connected layer of cells that regulates what crosses from the gut into systemic circulation. When this barrier is compromised, bacterial endotoxins can enter the bloodstream — a process associated with systemic inflammation.

Research in clinical populations (post-surgical patients, critically ill individuals) shows glutamine supplementation helps maintain intestinal barrier function under extreme stress. Whether this extends meaningfully to healthy, recreationally active individuals is less established, but mechanistically plausible.

**Muscle recovery**

During and after prolonged or intense exercise, plasma glutamine levels decline. This has been proposed as a contributing factor to the transient immunosuppression observed in athletes after high-volume training (the "open window" hypothesis). Several studies show glutamine supplementation can restore plasma levels after exercise, though direct performance benefits are less consistently demonstrated.

Glutamine is also involved in muscle protein metabolism — it donates nitrogen for amino acid synthesis and serves as a precursor for glucose via gluconeogenesis during fasting states.

**Immune function**

Lymphocytes and macrophages — key immune cells — consume glutamine at rates comparable to glucose. During periods of immune challenge or high training volume, glutamine demand from immune cells competes with that of gut and muscle tissue. Supplementation has been studied in the context of infection risk in endurance athletes with mixed but notable findings.

**Standard dosing**

Most research uses doses of 0.1–0.3g per kilogram of body weight. A standard 3–5g daily dose is commonly used in supplementation contexts, typically mixed into water or a beverage and taken post-exercise or with meals.

**What it doesn't do**

Glutamine is not a direct muscle-builder in the same category as leucine or creatine. Claims about dramatic muscle growth from glutamine supplementation are not well-supported in healthy individuals with adequate protein intake. Its value lies in maintenance — supporting the gut, immune system, and recovery infrastructure that performance depends on.

*This statement has not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.*
    `,
  },
  {
    slug: "adaptogenic-mushrooms-stress-response",
    title: "Adaptogens and the Stress Response: What the Science Says",
    excerpt:
      "Lion's Mane, Reishi, and Chaga are among the most-studied functional mushrooms. Each has a distinct proposed mechanism. Here's an evidence-based look at the adaptogen category.",
    category: "Science",
    date: "May 27, 2026",
    readTime: "8 min read",
    author: "Ventality Editorial",
    tags: ["adaptogens", "mushrooms", "cognitive function", "stress"],
    pullQuote: "Adaptogens are defined by their ability to increase non-specific resistance to stress — physical, chemical, or biological.",
    keyStats: [
      { value: "3", label: "Active mushrooms in our blend" },
      { value: "35", label: "Servings per container" },
    ],
    content: `
The term "adaptogen" was coined in Soviet pharmacological research in the 1950s to describe compounds that increase an organism's non-specific resistance to stress — physical, chemical, or biological — without causing major side effects or disrupting normal function. The definition has been refined over decades, but the core concept remains: adaptogens modulate the stress response system rather than simply blocking or stimulating it.

**Lion's Mane (Hericium erinaceus)**

Lion's Mane is a culinary and medicinal mushroom with a growing body of research interest. It contains unique compounds called hericenones and erinacines, which are being studied for their ability to stimulate Nerve Growth Factor (NGF) — a protein involved in the maintenance and growth of neurons.

In vitro and animal studies show these compounds cross the blood-brain barrier and stimulate NGF synthesis in the hippocampus, a region critical for learning and memory. Human clinical data is more limited. A double-blind, placebo-controlled trial in Japanese adults with mild cognitive impairment found significantly improved cognitive scores in the Lion's Mane group after 16 weeks. More studies are needed to replicate these findings in diverse populations.

**Reishi (Ganoderma lucidum)**

Reishi has been used in East Asian traditional medicine for centuries. Modern research has focused on its triterpene and polysaccharide content. Key areas of study include immune modulation and stress adaptation.

Reishi's proposed mechanisms involve interaction with the hypothalamic-pituitary-adrenal (HPA) axis — the body's central stress response system. Some research suggests Reishi may help modulate cortisol rhythm and reduce the physiological impact of sustained stress. It is also among the more extensively studied mushrooms for general immune support.

**Chaga (Inonotus obliquus)**

Chaga is a parasitic fungus that grows primarily on birch trees. It is exceptionally high in antioxidant compounds — its ORAC (oxygen radical absorbance capacity) score is among the highest of any food or supplement studied. Its active compounds include betulinic acid (derived from birch) and a dense array of polyphenols and melanins.

Chaga is primarily studied as an antioxidant and immune-supportive agent. The research base in humans is thinner than for Lion's Mane or Reishi, with much of the data from in vitro and animal models. The antioxidant potential is well-documented; clinical applications in humans require more study.

**What adaptogens are not**

Adaptogens are not stimulants. They do not produce acute energy in the way caffeine or stimulant compounds do. Their proposed effects are generally subtle, cumulative, and stress-context-dependent. This makes them difficult to study (results depend heavily on baseline stress levels of participants) and difficult to perceive in the short term.

**Dosing and format**

Functional mushroom products vary significantly in active compound concentration, extraction method, and whether they use whole mushroom, mycelium, or fruiting body. Hot water extraction (beta-glucan) and alcohol extraction (triterpenes) each capture different compound classes. Products specifying both extraction methods and beta-glucan content offer more transparency.

*This statement has not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.*
    `,
  },
  {
    slug: "sleep-optimization-recovery-variable",
    title: "Sleep and Recovery: The Most Overlooked Variable",
    excerpt:
      "Training, nutrition, and supplementation are often optimized in detail while sleep remains an afterthought. Here's what the research says about sleep's role in recovery — and what may support it.",
    category: "Wellness",
    date: "May 22, 2026",
    readTime: "7 min read",
    author: "Ventality Editorial",
    tags: ["sleep", "recovery", "melatonin", "performance"],
    pullQuote: "Growth hormone secretion peaks during slow-wave sleep — the stage most impacted by poor sleep quality.",
    keyStats: [
      { value: "70%", label: "Of GH released during sleep" },
      { value: "0.3–1mg", label: "Research-supported melatonin dose range" },
    ],
    content: `
Sleep is where most of the adaptation to training actually occurs. Protein synthesis, hormone secretion, glycogen replenishment, and neural consolidation of motor patterns all happen at rates that cannot be replicated during waking hours. Yet sleep is routinely compressed, disrupted, or ignored in discussions of performance optimization.

**What happens during sleep**

Sleep is divided into cycles of roughly 90 minutes, each containing stages of non-REM (N1, N2, N3) and REM sleep. Slow-wave sleep (N3 — deep sleep) is the stage with the most direct relevance to physical recovery:

- Growth hormone (GH) secretion is predominantly nocturnal, with the largest pulse occurring in the first slow-wave cycle of the night. Research estimates 70% of daily GH release occurs during sleep.
- Muscle protein synthesis continues during sleep, provided amino acid availability is adequate.
- Inflammatory markers generated by exercise are down-regulated during slow-wave sleep.

REM sleep is critical for cognitive recovery, memory consolidation, and emotional regulation — all relevant for sustained motivation and technical skill.

**Sleep deprivation and performance**

Even modest sleep restriction (6 hours vs. 8 hours over two weeks) produces cumulative cognitive deficits equivalent to two nights of total sleep deprivation — yet subjects consistently underestimate their impairment. For physical performance, research shows reduced reaction time, decreased anaerobic power output, impaired glucose tolerance, and elevated cortisol levels in sleep-restricted states.

**Melatonin**

Melatonin is not a sedative — it is a circadian signal. The pineal gland secretes melatonin in response to darkness, signaling to the brain and body that it is nighttime. Supplemental melatonin works best when the goal is to shift circadian timing (e.g., jet lag, shift work) or to support sleep onset when endogenous melatonin signaling is disrupted by light exposure.

Critically, effective doses in research are far lower than what most supplements provide. Studies consistently show 0.3–1mg is sufficient to produce the signal; 5–10mg doses (common in many products) may cause oversaturation with a "hangover" effect the following morning. Our Sleep Formula contains melatonin at a research-aligned dose.

**Botanicals: Passionflower, Chamomile, and L-Theanine**

Passionflower (Passiflora incarnata) interacts with GABA-A receptors and has been studied for its anxiolytic and sleep-promoting properties in several small clinical trials. Chamomile's active compound apigenin also binds GABA-A receptors with mild sedative-like effects. L-Theanine promotes alpha wave activity in the brain — associated with calm, wakeful relaxation — and has been shown in multiple studies to improve self-reported sleep quality without inducing drowsiness.

**Practical sleep hygiene**

Supplementation is an adjunct, not a substitute, for behavioral sleep hygiene:
- Consistent sleep and wake times stabilize circadian rhythm more powerfully than any supplement
- Light exposure management (avoiding blue light 1–2 hours before bed) is the most impactful single behavior
- Room temperature in the range of 65–68°F (18–20°C) supports the core temperature drop that facilitates sleep onset

*This statement has not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.*
    `,
  },
  {
    slug: "creatine-what-the-research-says",
    title: "Creatine: What the Research Actually Says",
    excerpt:
      "Creatine monohydrate is the most-studied supplement in sports nutrition. Here's an objective look at the evidence — what it supports, what it doesn't, and what you should know.",
    category: "Science",
    date: "May 20, 2026",
    readTime: "6 min read",
    author: "Ventality Editorial",
    tags: ["creatine", "strength", "performance", "ATP"],
    pullQuote: "Phosphocreatine supplementation increases total stores by 20–40%, directly extending high-intensity output before fatigue.",
    keyStats: [
      { value: "3–5g", label: "Effective daily maintenance dose" },
      { value: "30+ years", label: "Of peer-reviewed research" },
    ],
    content: `
Creatine monohydrate has been the subject of thousands of peer-reviewed studies over the past three decades. It is one of the few supplements with consistently replicated findings across independent research groups.

**What creatine does**

Creatine is a naturally occurring compound synthesized in the liver, kidneys, and pancreas from amino acids glycine, arginine, and methionine. It is also found in animal-based foods. The body stores creatine primarily in skeletal muscle as phosphocreatine.

During high-intensity, short-duration exercise (sprints, heavy lifts, explosive movements), phosphocreatine donates a phosphate group to regenerate ATP — the cell's primary energy currency. Supplementing with creatine monohydrate increases total phosphocreatine stores by roughly 20–40%, which supports a greater capacity to sustain high-intensity output before fatigue sets in.

**Documented effects**

Research consistently shows creatine supplementation may support:
- Strength and power output in resistance training
- Short-burst athletic performance (sprints, jumps, throws)
- Lean mass gains when combined with resistance exercise
- Recovery between sets and sessions

**Standard dosing**

A loading phase (20g/day split into 4 doses for 5–7 days) followed by maintenance (3–5g/day) saturates muscle stores faster. However, simply starting with 3–5g/day achieves the same saturation over 3–4 weeks without loading side effects.

**Safety**

Decades of research have found creatine monohydrate to be well tolerated in healthy adults at standard doses. The reported concern about kidney stress has not been supported by research in healthy individuals.

*This statement has not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.*
    `,
  },
  {
    slug: "magnesium-forms-compared",
    title: "Magnesium Forms Compared: Glycinate, Citrate, Oxide",
    excerpt:
      "Not all magnesium supplements are equivalent. The form matters significantly for absorption and tolerance. Here's how the common forms compare.",
    category: "Science",
    date: "May 15, 2026",
    readTime: "5 min read",
    author: "Ventality Editorial",
    tags: ["magnesium", "bioavailability", "minerals", "sleep"],
    pullQuote: "Magnesium oxide contains 60% elemental magnesium by weight — yet has only ~4% bioavailability in the gut.",
    keyStats: [
      { value: "300+", label: "Enzymatic reactions requiring magnesium" },
      { value: "~4%", label: "Bioavailability of magnesium oxide" },
    ],
    content: `
Magnesium is an essential mineral involved in over 300 enzymatic reactions in the body. It plays roles in muscle and nerve function, protein synthesis, blood glucose regulation, and bone structure. Despite its importance, dietary surveys consistently show a large proportion of adults consume less than the recommended daily amount.

**Why form matters**

Magnesium supplements differ in their elemental magnesium content, absorption rate, and tolerability. The mineral must be bound to another compound for stability — and that compound significantly affects how well it is absorbed and how it behaves in the digestive tract.

**Magnesium Glycinate**

Magnesium bound to glycine, an amino acid. This chelated form is among the most bioavailable and is notably gentle on the digestive system, making it well-suited for individuals with sensitive stomachs. Glycine itself has mild calming properties. A common choice for those prioritizing absorption and tolerability.

**Magnesium Citrate**

Magnesium bound to citric acid. Highly bioavailable and widely available. Has a mild laxative effect at higher doses, which some find helpful and others find disruptive. A practical, cost-effective option for most people.

**Magnesium Oxide**

Contains a high percentage of elemental magnesium by weight (around 60%), but has poor bioavailability compared to organic forms — estimated at roughly 4%. Commonly used in antacids and laxatives. Not the best choice when the goal is to raise serum magnesium levels.

**Summary**

For most people seeking to support magnesium intake as a dietary supplement, glycinate and citrate forms represent better choices than oxide due to their superior absorption profiles.

*This statement has not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.*
    `,
  },
  {
    slug: "omega-3-epa-dha-explained",
    title: "EPA vs. DHA: Understanding Omega-3 Fatty Acids",
    excerpt:
      "Fish oil supplements contain two primary active compounds — EPA and DHA. Each plays a distinct role. Here's what the research distinguishes between them.",
    category: "Science",
    date: "May 10, 2026",
    readTime: "5 min read",
    author: "Ventality Editorial",
    tags: ["omega-3", "EPA", "DHA", "cardiovascular"],
    pullQuote: "EPA and DHA share a name but serve distinct roles — one cardiovascular-focused, one structural and neurological.",
    keyStats: [
      { value: "22", label: "Carbon chain length of DHA" },
      { value: "20", label: "Carbon chain length of EPA" },
    ],
    content: `
Omega-3 fatty acids are a family of polyunsaturated fats. The two most studied forms found in fish oil are eicosapentaenoic acid (EPA) and docosahexaenoic acid (DHA). While often discussed together, they have distinct physiological roles.

**EPA (Eicosapentaenoic Acid)**

EPA is a 20-carbon chain fatty acid. It serves as a precursor to signaling molecules known as eicosanoids, which play roles in inflammatory response and cardiovascular function. Research has focused on EPA for its potential to support healthy triglyceride levels and cardiovascular health.

**DHA (Docosahexaenoic Acid)**

DHA is a 22-carbon chain fatty acid and is the primary structural omega-3 in the brain and retina. It is critical for fetal brain development and is found in high concentrations in neural tissue throughout life. DHA may support cognitive function and visual health.

**Why ratio matters**

Most fish oil supplements provide both EPA and DHA. The ratio varies by product. Some research suggests EPA-dominant formulations may be more relevant for cardiovascular support, while DHA-dominant formulations may be more relevant for cognitive and neurological support.

**Sourcing and oxidation**

Fish oil quality varies significantly. Oxidized fish oil (rancid) may not confer the same benefits and may have adverse effects. Look for products with stated oxidation testing.

*This statement has not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.*
    `,
  },
  {
    slug: "vitamin-d3-k2-synergy",
    title: "D3 and K2: Why These Two Vitamins Work Together",
    excerpt:
      "Vitamin D3 and K2 are often formulated together — and for good reason. Understanding the relationship between them explains why the combination makes physiological sense.",
    category: "Wellness",
    date: "May 5, 2026",
    readTime: "4 min read",
    author: "Ventality Editorial",
    tags: ["vitamin D", "vitamin K2", "calcium", "bone health"],
    pullQuote: "D3 mobilizes calcium; K2 directs it — into bone, not arterial walls. The combination is greater than the sum of its parts.",
    keyStats: [
      { value: "1,000–5,000 IU", label: "Common D3 dosing range" },
      { value: "90–180 mcg", label: "MK-7 K2 in clinical studies" },
    ],
    content: `
Vitamin D3 (cholecalciferol) and Vitamin K2 (menaquinone) are fat-soluble vitamins that share a functional relationship in calcium metabolism — specifically in determining where calcium is directed in the body.

**Vitamin D3 and calcium absorption**

Vitamin D3 is synthesized in skin upon sun exposure and is converted by the liver and kidneys into its active hormonal form. It plays a primary role in promoting intestinal absorption of calcium and phosphorus, and is widely recognized as important for bone mineral density.

**The K2 mechanism**

When calcium absorption is increased by D3, the body must direct that calcium appropriately — into bones and teeth rather than into soft tissues and arterial walls. Vitamin K2 activates two important proteins: osteocalcin (which binds calcium into bone matrix) and matrix Gla protein (which inhibits calcium deposition in arteries). Without adequate K2, there is a theoretical concern that calcium mobilized by D3 may deposit in the wrong places.

**Formulation rationale**

The combination of D3 and K2 in a single supplement is based on this complementary mechanism. The research base for K2's effects is smaller and more recent than D3's, but the theoretical framework is well-supported and the combination is widely used in clinical nutrition.

**Standard doses**

Common formulations provide 1,000–5,000 IU D3 alongside 90–180 mcg MK-7 K2. MK-7 is the preferred K2 form due to its longer half-life compared to MK-4.

*This statement has not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.*
    `,
  },
  {
    slug: "protein-timing-and-muscle-recovery",
    title: "Protein Timing and Muscle Recovery: What the Evidence Shows",
    excerpt:
      "The 'anabolic window' concept has been extensively studied. Here's what the current body of research says about protein timing, daily intake, and muscle recovery.",
    category: "Performance",
    date: "April 28, 2026",
    readTime: "6 min read",
    author: "Ventality Editorial",
    tags: ["protein", "muscle", "recovery", "anabolic window"],
    pullQuote: "Total daily protein intake is the primary driver of outcomes — the 'anabolic window' is hours wide, not minutes.",
    keyStats: [
      { value: "1.6–2.2g", label: "Per kg bodyweight — research consensus" },
      { value: "3–4", label: "Protein meals per day for optimal MPS" },
    ],
    content: `
Protein synthesis — the cellular process by which muscles are repaired and grown in response to training — requires an adequate supply of amino acids. Dietary protein provides those amino acids. The questions of how much, how often, and when remain actively studied topics.

**Daily intake matters most**

The most robust finding in protein research is that total daily protein intake is the primary driver of muscle protein synthesis outcomes. For individuals engaging in resistance training, research generally supports intakes in the range of 1.6–2.2g per kilogram of body weight per day, with some studies suggesting higher intakes may be beneficial in certain contexts.

**The anabolic window — updated understanding**

Early research suggested a narrow "anabolic window" of 30–60 minutes post-exercise where protein consumption was critical. More recent meta-analyses suggest this window is considerably wider — potentially several hours. The practical implication is that consuming protein relatively close to training is reasonable, but rigidly timing intake within a specific window is likely less important than previously assumed.

**Protein quality**

All proteins are not equal. The leucine content of a protein source and its digestibility affect its capacity to stimulate muscle protein synthesis. Whey protein isolate has high leucine content and rapid absorption kinetics, making it a widely studied post-exercise protein source. Plant proteins generally require larger quantities to achieve equivalent leucine delivery.

**Practical guidance**

Distributing protein intake across 3–4 meals throughout the day (rather than consuming most in a single meal) may support more consistent stimulation of muscle protein synthesis over a 24-hour period.

*This statement has not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.*
    `,
  },
  {
    slug: "collagen-peptides-joint-and-skin",
    title: "Collagen Peptides: Joint Support and Skin Health",
    excerpt:
      "Collagen is the most abundant protein in the human body. Hydrolyzed collagen peptides have been the subject of growing research interest. Here's an evidence-based overview.",
    category: "Wellness",
    date: "April 20, 2026",
    readTime: "5 min read",
    author: "Ventality Editorial",
    tags: ["collagen", "joints", "skin", "connective tissue"],
    pullQuote: "Collagen constitutes roughly 30% of total body protein — making it the body's structural backbone at the molecular level.",
    keyStats: [
      { value: "28+", label: "Identified collagen types in the body" },
      { value: "~30%", label: "Of total body protein that is collagen" },
    ],
    content: `
Collagen constitutes roughly 30% of the body's total protein content and is the primary structural protein of connective tissues — cartilage, tendons, ligaments, skin, and bone. Collagen production naturally declines with age, which has driven interest in dietary collagen supplementation.

**Types I and III**

Collagen exists in numerous forms (at least 28 identified types). Type I is the most abundant in the body and is found in skin, tendons, and bone. Type III is found alongside Type I in skin and blood vessels. Hydrolyzed bovine collagen peptides typically provide primarily Type I and III.

**Hydrolyzation and absorption**

Native collagen molecules are too large to be absorbed intact. Hydrolyzed collagen (also called collagen peptides or collagen hydrolysate) is broken into smaller peptide chains through enzymatic processing, which improves absorption. Research has shown that orally ingested collagen peptides are absorbed and accumulate in skin and cartilage tissue.

**Research findings**

Studies on collagen peptides have explored effects on:
- Skin elasticity and hydration (positive findings in multiple randomized controlled trials)
- Joint comfort in physically active populations (several studies show self-reported improvement)
- Bone density support (emerging research, more studies needed)

**Limitations to note**

Research quality varies. Many studies are funded by supplement manufacturers. The field would benefit from more large, independent randomized controlled trials.

*This statement has not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.*
    `,
  },
];
