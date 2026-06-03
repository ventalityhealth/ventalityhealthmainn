/**
 * Resolves Shopify cart checkoutUrl for headless storefront.
 * Shopify returns checkout on the store primary domain (ventality.health).
 * That path must be served by this app via next.config rewrites to Shopify.
 */
export function resolveCheckoutUrl(
  checkoutUrl: string | undefined
): string | undefined {
  if (!checkoutUrl) return undefined;

  try {
    const url = new URL(checkoutUrl);

    const override = process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_DOMAIN?.trim();
    if (override) {
      url.hostname = override.replace(/^https?:\/\//, "").replace(/\/$/, "");
    }

    // Local dev: keep checkout on localhost so /cart rewrite proxy applies
    if (
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1")
    ) {
      return `${window.location.origin}${url.pathname}${url.search}`;
    }

    return url.toString();
  } catch {
    return checkoutUrl;
  }
}
