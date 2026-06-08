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
