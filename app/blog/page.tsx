import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { BLOG_POSTS, CATEGORY_COLORS } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog — Ventality",
  description:
    "Evidence-based articles on supplements, nutrition science, and human performance from the Ventality editorial team.",
};

const CATEGORIES = ["All", "Science", "Wellness", "Performance"];

interface BlogPageProps {
  searchParams: Promise<{ cat?: string }>;
}

function PullQuoteCard({
  post,
  large = false,
}: {
  post: (typeof BLOG_POSTS)[number];
  large?: boolean;
}) {
  const color = CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS["Science"];
  return (
    <div
      className="relative w-full h-full flex flex-col justify-between overflow-hidden"
      style={{
        background: `radial-gradient(circle at 70% 30%, ${color.bg.replace("0.07", "0.14")}, transparent 60%), ${color.bg}`,
        borderLeft: `1px solid ${color.border}`,
        padding: large ? "32px 28px" : "24px 20px",
        minHeight: large ? "280px" : "180px",
      }}
    >
      {/* Decorative grid dots */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${color.border} 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
          opacity: 0.35,
        }}
      />

      {/* Category chip */}
      <div className="relative flex items-center justify-between mb-4">
        <span
          className="label-xs px-2 py-1 rounded-sm"
          style={{
            color: color.text,
            background: color.bg.replace("0.07", "0.18"),
            border: `1px solid ${color.border}`,
          }}
        >
          {post.category}
        </span>
        <span className="label-xs" style={{ color: color.text, opacity: 0.5 }}>
          {post.readTime}
        </span>
      </div>

      {/* Pull quote */}
      <blockquote
        className="relative flex-1"
        style={{
          color: color.text,
          fontSize: large ? "clamp(0.9rem, 1.8vw, 1.1rem)" : "0.85rem",
          fontStyle: "italic",
          lineHeight: 1.5,
          fontWeight: 400,
          opacity: 0.85,
        }}
      >
        &ldquo;{post.pullQuote}&rdquo;
      </blockquote>

      {/* Key stats */}
      {post.keyStats.length > 0 && (
        <div
          className="relative flex gap-4 mt-5 pt-4"
          style={{ borderTop: `1px solid ${color.border}` }}
        >
          {post.keyStats.map((stat) => (
            <div key={stat.label}>
              <p
                className="font-semibold leading-none"
                style={{
                  color: color.text,
                  fontSize: large ? "1.1rem" : "0.9rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </p>
              <p
                className="mt-0.5"
                style={{
                  color: color.text,
                  fontSize: "0.65rem",
                  opacity: 0.55,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { cat } = await searchParams;
  const activeCategory = cat ?? "All";

  const filtered =
    activeCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const totalWords = BLOG_POSTS.reduce(
    (sum, p) => sum + p.content.split(" ").length,
    0
  );
  const totalMinutes = Math.round(totalWords / 200);

  return (
    <div className="pt-16">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="label-sm text-white/30 mb-2">Journal</p>
              <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight break-words">
                Science &amp; Formulation
              </h1>
              <p className="text-white/40 text-sm mt-3 max-w-lg leading-relaxed">
                Evidence-based articles on supplements, nutrition science, and
                human performance. No hype — just research.
              </p>
            </div>

            {/* Stats panel */}
            <div className="flex gap-6 flex-shrink-0">
              <div className="text-center">
                <p className="text-white font-semibold text-xl leading-none">
                  {BLOG_POSTS.length}
                </p>
                <p className="label-xs text-white/30 mt-1">Articles</p>
              </div>
              <div
                className="text-center pl-6"
                style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="text-white font-semibold text-xl leading-none">
                  {totalMinutes}
                </p>
                <p className="label-xs text-white/30 mt-1">Min of reading</p>
              </div>
              <div
                className="text-center pl-6"
                style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="text-white font-semibold text-xl leading-none">
                  {CATEGORIES.length - 1}
                </p>
                <p className="label-xs text-white/30 mt-1">Categories</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category tabs ───────────────────────────────────────── */}
      <div className="border-b border-white/8 sticky top-16 z-10 bg-[#0B1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 overflow-x-auto scrollbar-none">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={cat === "All" ? "/blog" : `/blog?cat=${cat}`}
                className={`py-4 text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeCategory === cat
                    ? "border-white text-white"
                    : "border-transparent text-white/40 hover:text-white/70"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 text-white/20">
                    ({BLOG_POSTS.filter((p) => p.category === cat).length})
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-white/30 text-lg mb-4">No articles in this category yet.</p>
            <Link href="/blog" className="text-white/50 hover:text-white text-sm transition-colors">
              View all articles
            </Link>
          </div>
        ) : (
          <>
            {/* ── Featured post ──────────────────────────────────── */}
            {featured && (
              <div className="mb-14">
                <p className="label-xs text-white/25 mb-5">Featured</p>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group block border border-white/10 rounded-xl bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.035] transition-all duration-300 overflow-hidden"
                >
                  <div className="grid md:grid-cols-2 min-h-[320px]">
                    {/* Left — text */}
                    <div className="p-7 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/8">
                      <div>
                        <div className="flex items-center gap-3 mb-5 flex-wrap">
                          <span
                            className="label-xs px-2 py-0.5 rounded-sm"
                            style={{
                              color: CATEGORY_COLORS[featured.category]?.text,
                              background: CATEGORY_COLORS[featured.category]?.bg.replace("0.07", "0.18"),
                              border: `1px solid ${CATEGORY_COLORS[featured.category]?.border}`,
                            }}
                          >
                            {featured.category}
                          </span>
                          <span className="flex items-center gap-1 label-xs text-white/30">
                            <Clock className="w-3 h-3" />
                            {featured.readTime}
                          </span>
                          <span className="label-xs text-white/20">{featured.date}</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-snug group-hover:text-white/85 transition-colors break-words">
                          {featured.title}
                        </h2>

                        <p className="text-white/45 text-sm leading-relaxed mt-4">
                          {featured.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-5">
                          {featured.tags.map((tag) => (
                            <span
                              key={tag}
                              className="label-xs px-2 py-0.5 rounded-sm text-white/25 border border-white/8"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-8 text-white/40 group-hover:text-white text-sm transition-colors">
                        Read article{" "}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>

                    {/* Right — pull-quote visual */}
                    <PullQuoteCard post={featured} large />
                  </div>
                </Link>
              </div>
            )}

            {/* ── Article grid ───────────────────────────────────── */}
            {rest.length > 0 && (
              <>
                <p className="label-xs text-white/25 mb-6">
                  {activeCategory === "All" ? "All Articles" : activeCategory} ·{" "}
                  {rest.length} more
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((post) => {
                    const color =
                      CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS["Science"];
                    return (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col border border-white/8 rounded-xl bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300 overflow-hidden"
                      >
                        {/* Visual header — pull-quote panel */}
                        <PullQuoteCard post={post} />

                        {/* Card body */}
                        <div className="p-5 flex flex-col flex-1 border-t border-white/8">
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <span
                              className="label-xs"
                              style={{ color: color.text }}
                            >
                              {post.category}
                            </span>
                            <span className="text-white/15">·</span>
                            <span className="label-xs text-white/30 flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" />
                              {post.readTime}
                            </span>
                            <span className="text-white/15">·</span>
                            <span className="label-xs text-white/20">
                              {post.date}
                            </span>
                          </div>

                          <h3 className="text-white font-medium text-base leading-snug group-hover:text-white/80 transition-colors break-words">
                            {post.title}
                          </h3>

                          <p className="text-white/35 text-xs leading-relaxed mt-2 line-clamp-2 flex-1">
                            {post.excerpt}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1 label-xs px-1.5 py-0.5 rounded-sm text-white/20 border border-white/6"
                              >
                                <Tag className="w-2 h-2" />
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-1.5 mt-5 text-white/25 group-hover:text-white/60 text-xs transition-colors">
                            Read article{" "}
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}

        {/* ── FDA Disclaimer ──────────────────────────────────────── */}
        <div className="mt-16 pt-8 border-t border-white/8">
          <p className="text-white/20 text-xs leading-relaxed max-w-3xl">
            <strong className="text-white/30">Editorial Note:</strong> All articles on this
            site are for educational and informational purposes only. These statements have
            not been evaluated by the Food and Drug Administration. Supplements are not
            intended to diagnose, treat, cure, or prevent any disease. Always consult a
            qualified healthcare provider before beginning any supplement regimen.
          </p>
        </div>
      </div>
    </div>
  );
}
