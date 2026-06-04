import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Clock, Tag, ArrowRight } from "lucide-react";
import { BLOG_POSTS, CATEGORY_COLORS } from "@/lib/blog-data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return { title: `${post.title} — Ventality`, description: post.excerpt };
}

function parseContent(content: string) {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const color = CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS["Science"];
  const related = BLOG_POSTS.filter(
    (p) => p.slug !== slug && p.category === post.category
  ).slice(0, 3);
  const fallbackRelated = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);
  const relatedPosts = related.length > 0 ? related : fallbackRelated;

  const lines = parseContent(post.content);

  return (
    <div className="pt-16">
      {/* ── Article hero header ─────────────────────────────────── */}
      <div
        className="border-b border-white/8"
        style={{
          background: `radial-gradient(circle at 80% 50%, ${color.bg.replace("0.07", "0.12")}, transparent 55%), #0B1017`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-white/35 hover:text-white text-sm mb-10 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> All Articles
          </Link>

          <div className="grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-20 items-start">
            {/* Left — article meta + title */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span
                  className="label-xs px-2.5 py-1 rounded-sm"
                  style={{
                    color: color.text,
                    background: color.bg.replace("0.07", "0.2"),
                    border: `1px solid ${color.border}`,
                  }}
                >
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 label-xs text-white/30">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
                <span className="label-xs text-white/25">{post.date}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight break-words">
                {post.title}
              </h1>

              <p className="text-white/50 text-lg leading-relaxed mt-6 max-w-2xl">
                {post.excerpt}
              </p>

              {/* Author row */}
              <div className="flex items-center gap-3 mt-8">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                  style={{
                    background: color.bg.replace("0.07", "0.25"),
                    border: `1px solid ${color.border}`,
                    color: color.text,
                  }}
                >
                  V
                </div>
                <div>
                  <p className="text-white/60 text-sm font-medium">{post.author}</p>
                  <p className="text-white/25 text-xs">Ventality Health</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 label-xs px-2 py-1 rounded-sm text-white/30 border border-white/8"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — data panel */}
            <div
              className="rounded-xl overflow-hidden border"
              style={{ borderColor: color.border }}
            >
              {/* Pull quote */}
              <div
                className="p-6 relative"
                style={{ background: color.bg.replace("0.07", "0.12") }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle, ${color.border} 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                    opacity: 0.3,
                  }}
                />
                <p
                  className="relative text-sm italic leading-relaxed"
                  style={{ color: color.text, opacity: 0.85 }}
                >
                  &ldquo;{post.pullQuote}&rdquo;
                </p>
              </div>

              {/* Key stats */}
              <div
                className="border-t"
                style={{ borderColor: color.border }}
              >
                {post.keyStats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between px-6 py-4"
                    style={{
                      borderTop: i > 0 ? `1px solid ${color.border}` : undefined,
                      background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent",
                    }}
                  >
                    <span
                      className="label-xs"
                      style={{ color: color.text, opacity: 0.5 }}
                    >
                      {stat.label}
                    </span>
                    <span
                      className="font-semibold text-sm"
                      style={{ color: color.text }}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Article body ────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="space-y-0">
          {lines.map((line, i) => {
            if (line.startsWith("**") && line.endsWith("**") && !line.slice(2, -2).includes("**")) {
              return (
                <h2
                  key={i}
                  className="text-white font-semibold text-xl mt-10 mb-3 first:mt-0 tracking-tight"
                >
                  {line.slice(2, -2)}
                </h2>
              );
            }
            if (line.startsWith("- ")) {
              return (
                <li
                  key={i}
                  className="text-white/55 text-sm leading-relaxed ml-4 mb-1.5 list-disc"
                >
                  {line.slice(2)}
                </li>
              );
            }
            if (line.startsWith("*") && line.endsWith("*")) {
              return (
                <p
                  key={i}
                  className="text-white/25 text-xs leading-relaxed italic mt-8 pt-6 border-t border-white/8"
                >
                  {line.slice(1, -1)}
                </p>
              );
            }
            return (
              <p
                key={i}
                className="text-white/55 text-sm sm:text-base leading-[1.85] mb-5"
              >
                {line}
              </p>
            );
          })}
        </div>

        {/* FDA Disclaimer */}
        <div className="mt-14 p-5 border border-white/8 rounded-xl bg-white/[0.015]">
          <p className="text-white/25 text-xs leading-relaxed">
            <strong className="text-white/35">FDA Disclaimer:</strong>{" "}
            The information in this article is for educational purposes only and is not intended
            as medical advice. These statements have not been evaluated by the Food and Drug
            Administration. Supplements are not intended to diagnose, treat, cure, or prevent
            any disease. Always consult your healthcare provider before starting any supplement
            regimen.
          </p>
        </div>
      </div>

      {/* ── Related articles ────────────────────────────────────── */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <p className="label-sm text-white/30">More Articles</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-white/35 hover:text-white text-sm transition-colors"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {relatedPosts.map((rel) => {
              const relColor = CATEGORY_COLORS[rel.category] ?? CATEGORY_COLORS["Science"];
              return (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group border border-white/8 rounded-xl overflow-hidden hover:border-white/20 hover:bg-white/[0.02] transition-all"
                >
                  {/* Mini pull-quote banner */}
                  <div
                    className="px-5 py-4 relative"
                    style={{ background: relColor.bg }}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: `radial-gradient(circle, ${relColor.border} 1px, transparent 1px)`,
                        backgroundSize: "18px 18px",
                        opacity: 0.25,
                      }}
                    />
                    <p
                      className="relative text-xs italic leading-snug line-clamp-2"
                      style={{ color: relColor.text, opacity: 0.8 }}
                    >
                      &ldquo;{rel.pullQuote}&rdquo;
                    </p>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="label-xs" style={{ color: relColor.text }}>
                        {rel.category}
                      </span>
                      <span className="text-white/15">·</span>
                      <span className="label-xs text-white/25">{rel.readTime}</span>
                    </div>
                    <h3 className="text-white/70 font-medium text-sm leading-snug group-hover:text-white transition-colors break-words">
                      {rel.title}
                    </h3>
                    <p className="text-white/30 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                    <div className="flex items-center gap-1 mt-4 text-white/25 group-hover:text-white/60 text-xs transition-colors">
                      Read article <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
