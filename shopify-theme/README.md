# Ventality — Shopify Theme (Lumen Edge V2)

A standalone Shopify theme port of the Ventality storefront. Implements the same Ventality × Lumen Edge V2 design system used in the Next.js app, but built entirely from Liquid, HTML, CSS, JS, and JSON so it can be uploaded directly to a Shopify store and edited via the Shopify Theme Editor.

## Structure

```
shopify-theme/
├── assets/             CSS, JS, theme images
├── config/             Theme-wide settings (colors, social, footer copy)
├── layout/             theme.liquid — base HTML wrapper
├── locales/            en.default.json translations
├── sections/           Editable sections (header, footer, hero, etc.)
├── snippets/           Reusable Liquid partials (product cards, icons, cart drawer)
└── templates/          JSON templates that compose sections per page
```

## Install

### Option A — Upload as zip

1. Compress the contents of `shopify-theme/` into a `.zip` file (the contents, not the parent folder — the zip should contain `assets/`, `config/`, etc. at its root).
2. In Shopify admin → **Online Store → Themes → Add theme → Upload zip file**.
3. Once uploaded, click **Customize** to edit sections in the Theme Editor.

### Option B — Shopify CLI

```bash
npm install -g @shopify/cli @shopify/theme
cd shopify-theme
shopify theme dev --store your-store.myshopify.com
```

## Editing sections

Every visual section is fully editable in the Shopify Theme Editor:

- **Header** — logo, brand text, primary menu, search/cart toggles
- **Hero** — eyebrow pill, headline, body copy, two CTAs, mini trust dots, featured collection mosaic
- **Featured Products** — choose any collection, override heading/eyebrow
- **Capabilities** — six editable cards, each with an icon, label, body, and link
- **Philosophy** — editorial copy + four stat tiles
- **Offers** — three pricing/positioning cards, any of which can be highlighted
- **Newsletter** — heading, copy, captures via Shopify Customer accounts
- **Footer** — four link columns + FDA disclaimer

## Pages supported

- `index.json` — homepage
- `product.json` — product detail
- `collection.json` — product listing
- `cart.json` — cart page (drawer is global)
- `search.json` — search results
- `page.json` — generic CMS pages (About, FAQ, Shipping, Returns, etc.)
- `blog.json` — blog listing
- `article.json` — single article
- `404.json` — not-found page

## Cart

The cart is fully functional and uses Shopify's Ajax Cart API:

- Quick-add from product cards (`/cart/add.js`)
- Quantity updates from drawer (`/cart/change.js`)
- Auto-refresh when items change
- Slide-out drawer triggered from header
- Standalone cart page also available

## FDA Disclaimer

The footer disclaimer is editable in the theme settings (`Theme settings → Footer`).
