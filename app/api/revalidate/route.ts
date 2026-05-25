import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (SECRET && secret !== SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  // Optionally scope to a single product handle: ?handle=adaptogen-vitality-gummies
  const handle = searchParams.get("handle");

  if (handle) {
    revalidateTag(`shopify-product-${handle}`);
  } else {
    revalidateTag("shopify-products");
  }

  return NextResponse.json({
    revalidated: true,
    tag: handle ? `shopify-product-${handle}` : "shopify-products",
    now: Date.now(),
  });
}

// Also allow GET for easy manual testing in the browser
export async function GET(req: NextRequest) {
  return POST(req);
}
