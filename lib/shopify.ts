const DOMAIN =
  process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "ventality-2.myshopify.com";
const TOKEN = (process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || "").trim();
const API_URL = `https://${DOMAIN}/api/2024-01/graphql.json`;

async function shopifyFetch<T = unknown>(
  query: string,
  variables: Record<string, unknown> = {},
  tags: string[] = []
): Promise<T | null> {
  if (!TOKEN) return null;
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 3600, tags },
    });
    const responseText = await res.text();
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = JSON.parse(responseText);
    if (json.errors) throw new Error(json.errors[0].message);
    return json.data as T;
  } catch (err) {
    console.error("[Shopify API]", (err as Error).message);
    return null;
  }
}

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: { node: { url: string; altText: string | null } }[] };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        price: { amount: string; currencyCode: string };
        availableForSale: boolean;
        quantityAvailable?: number;
      };
    }[];
  };
  tags: string[];
  vendor: string;
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    product: {
      id: string;
      title: string;
      handle: string;
      images: { edges: { node: { url: string; altText: string | null } }[] };
    };
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: { edges: { node: CartLine }[] };
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
}

// ─── Fragments ───────────────────────────────────────────────────────────────

const PRODUCT_FIELDS = `
  id title handle description
  priceRange { minVariantPrice { amount currencyCode } }
  images(first: 5) { edges { node { url altText } } }
  variants(first: 10) {
    edges {
      node {
        id title
        price { amount currencyCode }
        availableForSale
        quantityAvailable
      }
    }
  }
  tags vendor
`;

const CART_FIELDS = `
  id checkoutUrl totalQuantity
  lines(first: 50) {
    edges {
      node {
        id quantity
        merchandise {
          ... on ProductVariant {
            id title
            price { amount currencyCode }
            product {
              id title handle
              images(first: 1) { edges { node { url altText } } }
            }
          }
        }
      }
    }
  }
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
  }
`;

// ─── Products ────────────────────────────────────────────────────────────────

export async function getProducts(
  first = 24,
  after: string | null = null,
  queryStr: string | null = null
): Promise<{ edges: { node: ShopifyProduct }[]; pageInfo: { hasNextPage: boolean; endCursor: string } } | null> {
  const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[]; pageInfo: { hasNextPage: boolean; endCursor: string } } }>(
    `query GetProducts($first: Int!, $after: String, $query: String) {
      products(first: $first, after: $after, query: $query) {
        pageInfo { hasNextPage endCursor }
        edges { node { ${PRODUCT_FIELDS} } }
      }
    }`,
    { first, after, query: queryStr },
    ["shopify-products"]
  );
  return data?.products ?? null;
}

export async function getProductByHandle(
  handle: string
): Promise<(ShopifyProduct & { descriptionHtml: string }) | null> {
  const data = await shopifyFetch<{ productByHandle: ShopifyProduct & { descriptionHtml: string } }>(
    `query GetProduct($handle: String!) {
      productByHandle(handle: $handle) {
        ${PRODUCT_FIELDS}
        descriptionHtml
      }
    }`,
    { handle },
    ["shopify-products", `shopify-product-${handle}`]
  );
  return data?.productByHandle ?? null;
}

// ─── Cart ────────────────────────────────────────────────────────────────────

export async function createCart(
  lines: { merchandiseId: string; quantity: number }[] = []
): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>(
    `mutation CartCreate($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }`,
    { lines }
  );
  return data?.cartCreate?.cart ?? null;
}

export async function cartLinesAdd(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(
    `mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }`,
    { cartId, lines }
  );
  return data?.cartLinesAdd?.cart ?? null;
}

export async function cartLinesUpdate(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>(
    `mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }`,
    { cartId, lines }
  );
  return data?.cartLinesUpdate?.cart ?? null;
}

export async function cartLinesRemove(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(
    `mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }`,
    { cartId, lineIds }
  );
  return data?.cartLinesRemove?.cart ?? null;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart }>(
    `query GetCart($cartId: ID!) {
      cart(id: $cartId) { ${CART_FIELDS} }
    }`,
    { cartId }
  );
  return data?.cart ?? null;
}

// ─── Customer Auth ───────────────────────────────────────────────────────────

export async function customerCreate(input: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}) {
  return shopifyFetch<unknown>(
    `mutation CustomerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id email firstName lastName }
        customerUserErrors { code field message }
      }
    }`,
    { input }
  );
}

export async function customerAccessTokenCreate(input: {
  email: string;
  password: string;
}) {
  return shopifyFetch<unknown>(
    `mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken { accessToken expiresAt }
        customerUserErrors { code field message }
      }
    }`,
    { input }
  );
}

export async function customerAccessTokenDelete(customerAccessToken: string) {
  return shopifyFetch<unknown>(
    `mutation CustomerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        userErrors { field message }
      }
    }`,
    { customerAccessToken }
  );
}

export async function getCustomer(customerAccessToken: string) {
  return shopifyFetch<unknown>(
    `query GetCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id firstName lastName email phone
        orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
          edges {
            node {
              id name orderNumber
              totalPrice { amount currencyCode }
              processedAt fulfillmentStatus financialStatus
              lineItems(first: 3) {
                edges { node { title quantity } }
              }
            }
          }
        }
      }
    }`,
    { customerAccessToken }
  );
}

// ─── Utilities ───────────────────────────────────────────────────────────────

export function formatPrice(
  amount: string | number,
  currencyCode = "USD"
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(String(amount || 0)));
}

export function getProductImage(product: ShopifyProduct): string {
  return product?.images?.edges?.[0]?.node?.url || "";
}

// ─── Mock Products (fallback when no Shopify token) ──────────────────────────

export const MOCK_PRODUCTS: ShopifyProduct[] = [
  {
    id: "mock-1",
    title: "Omega-3 Complete",
    handle: "omega-3-complete",
    description:
      "High-potency EPA & DHA from sustainably sourced fish oil. 2,000 mg per serving with an optimal EPA:DHA ratio. Manufactured in a cGMP-compliant, FDA-registered facility.",
    priceRange: { minVariantPrice: { amount: "39.99", currencyCode: "USD" } },
    images: {
      edges: [
        {
          node: {
            url: "/products/omega-3-complete.jpg",
            altText: "Omega-3 Complete",
          },
        },
      ],
    },
    variants: {
      edges: [
        {
          node: {
            id: "mock-v1-1",
            title: "60 Softgels",
            price: { amount: "39.99", currencyCode: "USD" },
            availableForSale: true,
          },
        },
        {
          node: {
            id: "mock-v1-2",
            title: "120 Softgels",
            price: { amount: "69.99", currencyCode: "USD" },
            availableForSale: true,
          },
        },
      ],
    },
    tags: ["wellness"],
    vendor: "Ventality",
  },
  {
    id: "mock-2",
    title: "Whey Protein Isolate",
    handle: "whey-protein-isolate",
    description:
      "Cold-processed whey protein isolate delivering 22g of protein per serving. Supports muscle recovery and daily protein intake. No artificial sweeteners — sweetened with stevia.",
    priceRange: { minVariantPrice: { amount: "59.99", currencyCode: "USD" } },
    images: {
      edges: [
        {
          node: {
            url: "/products/whey-protein-pro.jpg",
            altText: "Whey Protein Isolate",
          },
        },
      ],
    },
    variants: {
      edges: [
        {
          node: {
            id: "mock-v2-1",
            title: "Vanilla — 700g",
            price: { amount: "59.99", currencyCode: "USD" },
            availableForSale: true,
          },
        },
        {
          node: {
            id: "mock-v2-2",
            title: "Chocolate — 700g",
            price: { amount: "59.99", currencyCode: "USD" },
            availableForSale: true,
          },
        },
      ],
    },
    tags: ["performance"],
    vendor: "Ventality",
  },
  {
    id: "mock-3",
    title: "Vitamin D3 + K2",
    handle: "vitamin-d3-k2",
    description:
      "A synergistic pairing of Vitamin D3 and MK-7 K2, formulated for high bioavailability. Supports healthy bones, immune function, and cardiovascular health.",
    priceRange: { minVariantPrice: { amount: "27.99", currencyCode: "USD" } },
    images: {
      edges: [
        {
          node: {
            url: "/products/vitamin-d3-k2.jpg",
            altText: "Vitamin D3 + K2",
          },
        },
      ],
    },
    variants: {
      edges: [
        {
          node: {
            id: "mock-v3-1",
            title: "90 Capsules",
            price: { amount: "27.99", currencyCode: "USD" },
            availableForSale: true,
          },
        },
      ],
    },
    tags: ["wellness"],
    vendor: "Ventality",
  },
  {
    id: "mock-4",
    title: "Pre-Workout Elite",
    handle: "pre-workout-elite",
    description:
      "A focused pre-workout formula built around studied performance ingredients. Designed to support energy, focus, and endurance during training.",
    priceRange: { minVariantPrice: { amount: "44.99", currencyCode: "USD" } },
    images: {
      edges: [
        {
          node: {
            url: "/products/pre-workout-elite.jpg",
            altText: "Pre-Workout Elite",
          },
        },
      ],
    },
    variants: {
      edges: [
        {
          node: {
            id: "mock-v4-1",
            title: "Fruit Punch — 30 Servings",
            price: { amount: "44.99", currencyCode: "USD" },
            availableForSale: true,
          },
        },
        {
          node: {
            id: "mock-v4-2",
            title: "Blue Razz — 30 Servings",
            price: { amount: "44.99", currencyCode: "USD" },
            availableForSale: true,
          },
        },
      ],
    },
    tags: ["performance"],
    vendor: "Ventality",
  },
  {
    id: "mock-5",
    title: "Magnesium Glycinate",
    handle: "magnesium-glycinate",
    description:
      "Highly bioavailable chelated magnesium in the glycinate form. Gentle on the stomach. May support muscle relaxation, sleep quality, and nervous system function.",
    priceRange: { minVariantPrice: { amount: "34.99", currencyCode: "USD" } },
    images: {
      edges: [
        {
          node: {
            url: "/products/magnesium-glycinate.jpg",
            altText: "Magnesium Glycinate",
          },
        },
      ],
    },
    variants: {
      edges: [
        {
          node: {
            id: "mock-v5-1",
            title: "120 Capsules",
            price: { amount: "34.99", currencyCode: "USD" },
            availableForSale: true,
          },
        },
      ],
    },
    tags: ["wellness"],
    vendor: "Ventality",
  },
  {
    id: "mock-6",
    title: "Creatine Monohydrate",
    handle: "creatine-monohydrate",
    description:
      "Pure micronized creatine monohydrate. 5g per serving. The most-studied performance ingredient in sports nutrition — supports strength, power output, and muscle recovery.",
    priceRange: { minVariantPrice: { amount: "29.99", currencyCode: "USD" } },
    images: {
      edges: [
        {
          node: {
            url: "/products/creatine-monohydrate.jpg",
            altText: "Creatine Monohydrate",
          },
        },
      ],
    },
    variants: {
      edges: [
        {
          node: {
            id: "mock-v6-1",
            title: "300g — 60 Servings",
            price: { amount: "29.99", currencyCode: "USD" },
            availableForSale: true,
          },
        },
      ],
    },
    tags: ["performance"],
    vendor: "Ventality",
  },
  {
    id: "mock-7",
    title: "Collagen Peptides",
    handle: "collagen-peptides",
    description:
      "Hydrolyzed bovine collagen peptides (Type I & III). Unflavored powder that mixes instantly into hot or cold drinks. Supports joint comfort and skin health.",
    priceRange: { minVariantPrice: { amount: "49.99", currencyCode: "USD" } },
    images: {
      edges: [
        {
          node: {
            url: "/products/collagen-peptides.jpg",
            altText: "Collagen Peptides",
          },
        },
      ],
    },
    variants: {
      edges: [
        {
          node: {
            id: "mock-v7-1",
            title: "300g Powder",
            price: { amount: "49.99", currencyCode: "USD" },
            availableForSale: true,
          },
        },
      ],
    },
    tags: ["wellness"],
    vendor: "Ventality",
  },
  {
    id: "mock-8",
    title: "Thermogenic Complex",
    handle: "thermogenic-complex",
    description:
      "A focused metabolic support blend featuring studied botanical extracts. Formulated for active individuals looking to support energy expenditure and body composition goals.",
    priceRange: { minVariantPrice: { amount: "44.99", currencyCode: "USD" } },
    images: {
      edges: [
        {
          node: {
            url: "/products/thermogenic-complex.jpg",
            altText: "Thermogenic Complex",
          },
        },
      ],
    },
    variants: {
      edges: [
        {
          node: {
            id: "mock-v8-1",
            title: "60 Capsules",
            price: { amount: "44.99", currencyCode: "USD" },
            availableForSale: true,
          },
        },
      ],
    },
    tags: ["weight-management"],
    vendor: "Ventality",
  },
];

// ─── Product Benefit Copy ─────────────────────────────────────────────────────

const TAG_BENEFIT_MAP: Record<string, string> = {
  adaptogen: "Adapts to your stress load — calm focus on demand",
  mushroom: "Functional mushroom complex validated by traditional & modern science",
  focus: "Clinically-studied ingredients for sustained mental clarity",
  cognitive: "Supports memory, concentration, and cognitive performance",
  energy: "Clean, sustained energy — no crash, no jitters",
  immunity: "Fortifies immune defense at the cellular level",
  "immune-support": "Fortifies immune defense at the cellular level",
  performance: "Engineered to fuel peak athletic output and faster recovery",
  strength: "Builds strength and power output — backed by the most-studied ingredient in sports nutrition",
  recovery: "Accelerates recovery so you train harder, more often",
  wellness: "Daily foundational support for long-term vitality",
  sleep: "Deep, restorative sleep — formulated to last all night",
  relaxation: "Promotes calm and physical relaxation without sedation",
  "weight-management": "Supports healthy metabolism and body composition goals",
  thermogenic: "Fuels fat metabolism with studied botanical extracts",
  collagen: "Rebuilds joints, skin, and connective tissue from within",
  protein: "Premium protein to build and preserve lean muscle",
  omega: "Optimal EPA:DHA ratio for heart, brain, and joint health",
  "vitamin-d": "Powers immune function, bone density, and hormonal balance",
  magnesium: "Replenishes a mineral over 50% of adults are deficient in",
  probiotic: "Rebalances your gut microbiome for digestion and immunity",
  gut: "Targets gut health — the foundation of whole-body wellness",
  antioxidant: "Neutralizes free radicals and supports cellular longevity",
  "stress-relief": "Blunts cortisol and stress response without dulling focus",
  hormone: "Supports healthy hormonal balance and endocrine function",
  detox: "Supports the body's natural detoxification pathways",
  "joint-health": "Cushions joints and supports long-term mobility",
  "brain-health": "Nourishes the brain with the nutrients it actually runs on",
};

/**
 * Returns 2–3 punchy, trust-heavy benefit claims for a product.
 * Derived from product tags with a first-sentence fallback.
 */
export function getProductBenefits(product: ShopifyProduct): string[] {
  const matched: string[] = [];

  for (const tag of product.tags) {
    const key = tag.toLowerCase().trim();
    if (TAG_BENEFIT_MAP[key] && !matched.includes(TAG_BENEFIT_MAP[key])) {
      matched.push(TAG_BENEFIT_MAP[key]);
    }
    if (matched.length >= 3) break;
  }

  if (matched.length > 0) return matched;

  // Fallback: extract up to 2 sentences from the description
  const sentences = product.description
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 2);
  return sentences.length > 0 ? sentences : [product.description];
}
