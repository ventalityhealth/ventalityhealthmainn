import Link from "next/link";

type Props = {
  params: Promise<{ path: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/**
 * Shopify checkout URLs land on /cart/c/{id} on the store primary domain.
 * When primary domain is ventality.health but DNS serves this Next app, Shopify
 * checkout cannot render until primary domain is myshopify.com OR DNS routes
 * /cart to Shopify. This page replaces a bare 404 with actionable guidance.
 */
export default async function CartCheckoutPage({ params, searchParams }: Props) {
  const { path } = await params;
  const sp = await searchParams;
  const segment = path.join("/");
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    if (typeof v === "string") qs.set(k, v);
    else if (Array.isArray(v)) v.forEach((x) => qs.append(k, x));
  }
  const query = qs.toString();
  const myshopifyCheckout = `https://ventality-2.myshopify.com/cart/c/${segment}${query ? `?${query}` : ""}`;

  return (
    <div className="vt-container py-24 max-w-xl">
      <p className="vt-eyebrow mb-4">Checkout</p>
      <h1 className="vt-heading-lg mb-4">Almost there</h1>
      <p className="vt-copy mb-6">
        Your cart is ready, but checkout must be completed on Shopify&apos;s secure
        servers. If you see this page, your store&apos;s domain settings need a
        one-time update in Shopify Admin.
      </p>
      <ol
        className="vt-copy mb-8 space-y-2 list-decimal pl-5"
        style={{ color: "var(--vt-muted)" }}
      >
        <li>
          In Shopify Admin go to <strong style={{ color: "var(--vt-text-soft)" }}>Settings → Domains</strong>
        </li>
        <li>
          Set <strong style={{ color: "var(--vt-text-soft)" }}>ventality-2.myshopify.com</strong> as the primary domain
        </li>
        <li>
          Ensure <strong style={{ color: "var(--vt-text-soft)" }}>Online Store password protection</strong> is off
        </li>
      </ol>
      <div className="flex flex-wrap gap-3">
        <a
          href={myshopifyCheckout}
          className="vt-button-primary"
          style={{ display: "inline-flex" }}
        >
          Try checkout on Shopify
        </a>
        <Link href="/shop" className="vt-button-secondary" style={{ display: "inline-flex" }}>
          Back to shop
        </Link>
      </div>
    </div>
  );
}
