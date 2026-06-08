"use client"

import React, { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

// ── Types ─────────────────────────────────────────────────────────────────────

interface Review {
  id: number
  customer_name: string
  rating: number
  title: string
  body: string
  verified: boolean
  created_at: string
}

interface ReviewsData {
  reviews: Review[]
  count: number
  avg: number
  dist: { star: number; count: number }[]
}

// ── Star components ───────────────────────────────────────────────────────────

function StarIcon({ filled, half = false, size = 16 }: { filled: boolean; half?: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {half ? (
        <>
          <defs>
            <linearGradient id="half-grad">
              <stop offset="50%" stopColor="#A8D1FF" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M10 1.5l2.35 4.76 5.26.77-3.8 3.71.9 5.24L10 13.27V1.5z"
            fill="#A8D1FF"
          />
          <path
            d="M10 1.5L7.65 6.26l-5.26.77 3.8 3.71-.9 5.24L10 13.27V1.5z"
            fill="rgba(168,209,255,0.12)"
          />
          <path
            d="M10 1.5l2.35 4.76 5.26.77-3.8 3.71.9 5.24L10 13.27 5.25 15.98l.9-5.24L2.35 7.03l5.26-.77L10 1.5z"
            stroke="rgba(168,209,255,0.3)"
            strokeWidth="0.5"
            fill="none"
          />
        </>
      ) : (
        <path
          d="M10 1.5l2.35 4.76 5.26.77-3.8 3.71.9 5.24L10 13.27 5.25 15.98l.9-5.24L2.35 7.03l5.26-.77L10 1.5z"
          fill={filled ? "#A8D1FF" : "rgba(168,209,255,0.12)"}
          stroke={filled ? "none" : "rgba(168,209,255,0.25)"}
          strokeWidth={filled ? 0 : 0.5}
        />
      )}
    </svg>
  )
}

function StarRow({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <StarIcon key={s} filled={s <= rating} size={size} />
      ))}
    </span>
  )
}

function InteractiveStars({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0)

  return (
    <span className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          role="radio"
          aria-checked={s === value}
          aria-label={`${s} star${s > 1 ? "s" : ""}`}
          onClick={() => onChange(s)}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform duration-100 hover:scale-110 focus:outline-none"
        >
          <StarIcon filled={s <= (hover || value)} size={24} />
        </button>
      ))}
    </span>
  )
}

// ── Review card ───────────────────────────────────────────────────────────────

function ReviewCard({ review }: { review: Review }) {
  const date = new Date(review.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid var(--vt-line)",
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <StarRow rating={review.rating} />
          <p
            className="font-semibold text-sm mt-1.5"
            style={{ color: "var(--vt-text)" }}
          >
            {review.title}
          </p>
        </div>
        {review.verified && (
          <span
            className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
            style={{
              border: "1px solid rgba(168,209,255,0.18)",
              color: "var(--vt-accent-blue)",
              background: "rgba(168,209,255,0.05)",
            }}
          >
            Verified
          </span>
        )}
      </div>
      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: "var(--vt-muted)", lineHeight: 1.65 }}
      >
        {review.body}
      </p>
      <p className="text-xs" style={{ color: "var(--vt-muted-2)" }}>
        {review.customer_name} &nbsp;·&nbsp; {date}
      </p>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

const TOKEN_KEY = "vnt_customer_token"

interface ReviewsSectionProps {
  handle: string
}

export default function ReviewsSection({ handle }: ReviewsSectionProps) {
  const { customer } = useAuth()
  const [data, setData] = useState<ReviewsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  // Form state
  const [formRating, setFormRating] = useState(5)
  const [formTitle, setFormTitle] = useState("")
  const [formBody, setFormBody] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const fetchReviews = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/reviews?handle=${encodeURIComponent(handle)}`)
      if (res.ok) {
        const json = await res.json()
        setData(json)
      }
    } finally {
      setLoading(false)
    }
  }, [handle])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formTitle.trim() || !formBody.trim()) {
      setSubmitError("Please add both a title and a review.")
      return
    }

    const token =
      typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null
    if (!token) {
      setSubmitError("Session expired. Please sign in again.")
      return
    }

    setSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          handle,
          rating: formRating,
          title: formTitle.trim(),
          body: formBody.trim(),
          token,
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        setSubmitError(json.error ?? "Something went wrong. Please try again.")
      } else {
        setSubmitSuccess(true)
        setShowForm(false)
        setFormRating(5)
        setFormTitle("")
        setFormBody("")
        await fetchReviews()
      }
    } catch {
      setSubmitError("Network error. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  const avgDisplay = data ? data.avg.toFixed(1) : "—"
  const totalCount = data?.count ?? 0

  return (
    <div>
      {/* Aggregate header */}
      {!loading && data && totalCount > 0 && (
        <div
          className="rounded-2xl p-6 mb-8 flex flex-col sm:flex-row gap-8 items-start"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid var(--vt-line)",
          }}
        >
          {/* Score */}
          <div className="flex-shrink-0 text-center sm:text-left">
            <p
              className="font-semibold leading-none mb-2"
              style={{ fontSize: "3.5rem", color: "var(--vt-text)", letterSpacing: "-0.04em" }}
            >
              {avgDisplay}
            </p>
            <StarRow rating={Math.round(data.avg)} size={18} />
            <p
              className="text-xs mt-2"
              style={{ color: "var(--vt-muted-2)" }}
            >
              {totalCount} review{totalCount !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Distribution bars */}
          <div className="flex-1 w-full space-y-2">
            {data.dist.map(({ star, count }) => {
              const pct = totalCount > 0 ? (count / totalCount) * 100 : 0
              return (
                <div key={star} className="flex items-center gap-3">
                  <span
                    className="text-xs w-4 text-right flex-shrink-0 tabular-nums"
                    style={{ color: "var(--vt-muted-2)" }}
                  >
                    {star}
                  </span>
                  <StarIcon filled size={12} />
                  <div
                    className="flex-1 rounded-full overflow-hidden"
                    style={{ height: 6, background: "rgba(168,209,255,0.08)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        background: "var(--vt-accent-blue)",
                        opacity: 0.7 + (star / 5) * 0.3,
                      }}
                    />
                  </div>
                  <span
                    className="text-xs w-6 tabular-nums text-right flex-shrink-0"
                    style={{ color: "var(--vt-muted-2)" }}
                  >
                    {count}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Write review CTA */}
      <div className="mb-8">
        {!customer ? (
          <div
            className="rounded-xl px-5 py-4 flex items-center justify-between gap-4"
            style={{
              background: "rgba(168,209,255,0.04)",
              border: "1px solid rgba(168,209,255,0.12)",
            }}
          >
            <p className="text-sm" style={{ color: "var(--vt-text-soft)" }}>
              Have you tried this product? Share your experience.
            </p>
            <Link
              href="/account"
              className="text-sm font-medium px-4 py-2 rounded-lg flex-shrink-0 transition-opacity duration-200 hover:opacity-80"
              style={{
                background: "var(--vt-accent-blue)",
                color: "var(--vt-bg)",
              }}
            >
              Sign in to review
            </Link>
          </div>
        ) : submitSuccess ? (
          <div
            className="rounded-xl px-5 py-4"
            style={{
              background: "rgba(168,209,255,0.06)",
              border: "1px solid rgba(168,209,255,0.18)",
            }}
          >
            <p className="text-sm font-medium" style={{ color: "var(--vt-accent-blue)" }}>
              Thank you for your review!
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--vt-muted)" }}>
              Your feedback has been published.
            </p>
          </div>
        ) : !showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="text-sm font-medium px-5 py-2.5 rounded-lg transition-opacity duration-200 hover:opacity-80"
            style={{
              background: "rgba(168,209,255,0.1)",
              border: "1px solid rgba(168,209,255,0.2)",
              color: "var(--vt-accent-blue)",
            }}
          >
            Write a review
          </button>
        ) : (
          // Review form
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-6 space-y-5"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid var(--vt-line)",
            }}
          >
            <div>
              <p
                className="text-sm font-semibold mb-1"
                style={{ color: "var(--vt-text)" }}
              >
                Your rating
              </p>
              <InteractiveStars value={formRating} onChange={setFormRating} />
            </div>

            <div>
              <label
                htmlFor="review-title"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--vt-text-soft)" }}
              >
                Review title
              </label>
              <input
                id="review-title"
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                maxLength={120}
                placeholder="Summarize your experience"
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-colors duration-150"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--vt-line)",
                  color: "var(--vt-text)",
                  caretColor: "var(--vt-accent-blue)",
                }}
                required
              />
            </div>

            <div>
              <label
                htmlFor="review-body"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--vt-text-soft)" }}
              >
                Your review
              </label>
              <textarea
                id="review-body"
                value={formBody}
                onChange={(e) => setFormBody(e.target.value)}
                rows={5}
                maxLength={2000}
                placeholder="What did you notice? How long did you use it? Would you recommend it?"
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-colors duration-150 resize-none"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--vt-line)",
                  color: "var(--vt-text)",
                  caretColor: "var(--vt-accent-blue)",
                }}
                required
              />
              <p
                className="text-xs mt-1 text-right tabular-nums"
                style={{ color: "var(--vt-muted-2)" }}
              >
                {formBody.length} / 2000
              </p>
            </div>

            {submitError && (
              <p className="text-sm" style={{ color: "#FF6B6B" }}>
                {submitError}
              </p>
            )}

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="text-sm font-medium px-5 py-2.5 rounded-lg transition-opacity duration-200 disabled:opacity-50"
                style={{
                  background: "var(--vt-accent-blue)",
                  color: "var(--vt-bg)",
                }}
              >
                {submitting ? "Submitting…" : "Submit review"}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setSubmitError(null) }}
                className="text-sm transition-opacity duration-200 hover:opacity-70"
                style={{ color: "var(--vt-muted)" }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Reviews list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl p-5 animate-pulse"
              style={{ background: "rgba(255,255,255,0.03)", height: 112 }}
            />
          ))}
        </div>
      ) : !data || data.reviews.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--vt-muted)" }}>
          No reviews yet. Be the first to share your experience.
        </p>
      ) : (
        <div className="space-y-4">
          {data.reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      )}
    </div>
  )
}
