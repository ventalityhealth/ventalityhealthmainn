import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

export interface ReviewRow {
  id: number
  product_handle: string
  customer_name: string
  rating: number
  title: string
  body: string
  verified: boolean
  created_at: string
}

export interface ReviewSummary {
  count: number
  avg: number
}

/**
 * Server-side aggregate of a product's reviews (count + average rating).
 * Returns zeros on any failure so callers can safely hide review UI when
 * no reviews exist yet.
 */
export async function getReviewSummary(handle: string): Promise<ReviewSummary> {
  try {
    const rows = (await sql`
      SELECT rating FROM product_reviews WHERE product_handle = ${handle}
    `) as { rating: number }[]
    const count = rows.length
    const avg =
      count > 0
        ? Math.round((rows.reduce((s, r) => s + r.rating, 0) / count) * 10) / 10
        : 0
    return { count, avg }
  } catch {
    return { count: 0, avg: 0 }
  }
}
