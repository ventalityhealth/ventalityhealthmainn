# Ventality

Premium supplement storefront — Next.js 16 + Shopify Storefront API + Vercel.

## Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Commerce**: Shopify Storefront API v2024-01 (GraphQL)
- **Fulfillment**: Supliful app on Shopify (dropship, auto-fulfill)
- **Hosting**: Vercel

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd ventalityhealthmainn-1
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Shopify credentials:

```
NEXT_PUBLIC_SHOPIFY_DOMAIN=ventality-2.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your_token_here
```

**Where to get your Storefront token:**
1. Shopify Admin → Settings → Apps and sales channels
2. Click "Develop apps" → Create an app
3. Under "API credentials" → "Storefront API access token"
4. Enable scopes: `unauthenticated_read_product_listings`, `unauthenticated_write_checkouts`, `unauthenticated_read_checkouts`, `unauthenticated_write_customers`, `unauthenticated_read_customers`

### 3. Run locally

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

> **Without a Shopify token:** The site runs in demo mode using 8 mock products. Add your token to see real Shopify catalog and enable checkout.

## Deploy to Vercel

1. Push your repo to GitHub
2. Import project in [vercel.com](https://vercel.com)
3. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SHOPIFY_DOMAIN`
   - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`
4. Deploy

## Supliful Setup

1. Install the [Supliful app](https://apps.shopify.com/supliful) on your Shopify store
2. Browse the Supliful catalog and publish products to your store
3. Products automatically appear on the Ventality site via Shopify Storefront API
4. When customers order, Supliful auto-fulfills the order

## Project Structure

```
app/                    # Next.js App Router pages
  page.tsx              # Home
  shop/                 # Product catalog
  products/[handle]/    # Product detail
  about/                # About page
  blog/                 # Blog (static posts)
  faq/                  # FAQ
  contact/              # Contact
  account/              # Customer account
  privacy/              # Privacy Policy
  terms/                # Terms of Service
  shipping/             # Shipping Policy
  returns/              # Return Policy
components/             # Shared components
  Navbar.tsx
  Footer.tsx
  CartDrawer.tsx
  ProductCard.tsx
  TrustBar.tsx
  ui/                   # shadcn/ui components
context/
  CartContext.tsx        # Cart state (Shopify + local fallback)
  AuthContext.tsx        # Customer auth (Shopify)
lib/
  shopify.ts            # Storefront API client, queries, MOCK_PRODUCTS
  blog-data.ts          # Static blog posts
  utils.ts
```

## Claims Policy

All product copy follows FDA dietary supplement regulations:

- **Allowed**: Structure/function claims ("supports", "promotes", "may help maintain")
- **Not allowed**: Disease claims ("treats", "cures", "prevents" specific conditions)
- **Certifications used**: cGMP-compliant manufacturing, FDA-registered facilities, COA available on request
- **Not claimed**: NSF, USP, Informed Sport, or other independent third-party certifications (Supliful products do not hold these)
- Every product page includes the required FDA disclaimer

## Contact

contact@ventality.health
