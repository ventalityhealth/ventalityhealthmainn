import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";

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
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-white/35 hover:text-white text-sm mb-10 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> All Articles
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="label-xs text-white/30">{post.category}</span>
            <span className="text-white/15">·</span>
            <span className="label-xs text-white/30">{post.readTime}</span>
            <span className="text-white/15">·</span>
            <span className="label-xs text-white/30">{post.date}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="text-white/45 text-lg leading-relaxed mt-5">{post.excerpt}</p>
          <div className="flex items-center gap-2 mt-6">
            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/40">
              V
            </span>
            <span className="text-white/35 text-xs">{post.author}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-10" />

        {/* Content */}
        <div className="prose prose-sm prose-invert max-w-none text-white/60 leading-relaxed
          [&_h2]:text-white [&_h2]:font-semibold [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-3
          [&_h3]:text-white/80 [&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-2
          [&_strong]:text-white/80 [&_strong]:font-medium
          [&_p]:text-white/55 [&_p]:leading-relaxed [&_p]:mb-4
          [&_ul]:text-white/50 [&_ul]:space-y-1
          [&_li]:leading-relaxed
          ">
          {post.content.split("\n").map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return <br key={i} />;
            if (trimmed.startsWith("**") && trimmed.endsWith("**") && !trimmed.slice(2, -2).includes("**")) {
              return <h2 key={i}>{trimmed.slice(2, -2)}</h2>;
            }
            if (trimmed.startsWith("- ")) {
              return <li key={i}>{trimmed.slice(2)}</li>;
            }
            return <p key={i}>{trimmed}</p>;
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-4 border border-white/8 rounded-sm bg-white/[0.01]">
          <p className="text-white/25 text-xs leading-relaxed">
            <strong className="text-white/35">FDA Disclaimer:</strong>{" "}
            The information in this article is for educational purposes only and
            is not intended as medical advice. These statements have not been
            evaluated by the Food and Drug Administration. Supplements are not
            intended to diagnose, treat, cure, or prevent any disease. Always
            consult your healthcare provider before starting any supplement
            regimen.
          </p>
        </div>
      </div>

      {/* Related articles */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="label-sm text-white/30 mb-8">More Articles</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group p-5 border border-white/8 rounded-sm hover:border-white/20 hover:bg-white/[0.02] transition-all"
              >
                <p className="label-xs text-white/25 mb-2">{rel.category}</p>
                <h3 className="text-white/70 font-medium text-sm leading-snug group-hover:text-white transition-colors">
                  {rel.title}
                </h3>
                <p className="text-white/30 text-xs mt-1">{rel.readTime}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
