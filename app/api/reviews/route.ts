import { NextRequest, NextResponse } from "next/server"
import { sql, type ReviewRow } from "@/lib/db"
import { getCustomer } from "@/lib/shopify"

export const runtime = "edge"

// ── GET /api/reviews?handle=... ───────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const handle = req.nextUrl.searchParams.get("handle")
  if (!handle) {
    return NextResponse.json({ error: "handle is required" }, { status: 400 })
  }

  try {
    const rows = await sql`
      SELECT id, product_handle, customer_name, rating, title, body, verified, created_at
      FROM product_reviews
      WHERE product_handle = ${handle}
      ORDER BY created_at DESC
      LIMIT 100
    ` as ReviewRow[]

    const count = rows.length
    const avg =
      count > 0
        ? Math.round((rows.reduce((s, r) => s + r.rating, 0) / count) * 10) / 10
        : 0

    const dist = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: rows.filter((r) => r.rating === star).length,
    }))

    return NextResponse.json({ reviews: rows, count, avg, dist })
  } catch (err) {
    console.error("[reviews GET]", err)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

// ── POST /api/reviews ─────────────────────────────────────────────────────────

interface ReviewPayload {
  handle: string
  rating: number
  title: string
  body: string
  token: string
}

export async function POST(req: NextRequest) {
  let payload: ReviewPayload
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { handle, rating, title, body, token } = payload

  // Validate fields
  if (!handle || !title?.trim() || !body?.trim()) {
    return NextResponse.json({ error: "handle, title, and body are required" }, { status: 400 })
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "rating must be an integer between 1 and 5" }, { status: 400 })
  }
  if (!token) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  // Verify customer token with Shopify
  let customerName = "Anonymous"
  try {
    const data = (await getCustomer(token)) as {
      customer?: { firstName?: string; lastName?: string; id?: string }
    }
    if (!data?.customer) {
      return NextResponse.json({ error: "Invalid or expired session. Please sign in again." }, { status: 401 })
    }
    const { firstName = "", lastName = "" } = data.customer
    customerName = [firstName, lastName[0] ? lastName[0] + "." : ""].filter(Boolean).join(" ").trim() || "Verified Customer"
  } catch {
    return NextResponse.json({ error: "Could not verify authentication" }, { status: 401 })
  }

  // Sanitise inputs
  const cleanTitle = title.trim().slice(0, 120)
  const cleanBody = body.trim().slice(0, 2000)

  try {
    const [row] = await sql`
      INSERT INTO product_reviews (product_handle, customer_name, rating, title, body, verified)
      VALUES (${handle}, ${customerName}, ${rating}, ${cleanTitle}, ${cleanBody}, true)
      RETURNING id, product_handle, customer_name, rating, title, body, verified, created_at
    ` as ReviewRow[]

    return NextResponse.json({ review: row }, { status: 201 })
  } catch (err) {
    console.error("[reviews POST]", err)
    return NextResponse.json({ error: "Failed to save review" }, { status: 500 })
  }
}
