import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Evidence-based articles on supplements, nutrition science, and human performance from the Ventality editorial team.",
};

const CATEGORIES = ["All", "Science", "Wellness", "Performance"];

export default function BlogPage() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="label-sm text-white/30 mb-2">Journal</p>
          <h1 className="text-4xl font-semibold text-white tracking-tight">
            Science &amp; Formulation
          </h1>
          <p className="text-white/40 text-sm mt-3 max-w-lg">
            Evidence-based articles on supplements, nutrition science, and
            human performance. No hype — just research.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group block mb-16 p-8 border border-white/10 rounded-sm bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="label-xs text-white/30">{featured.category}</span>
                <span className="text-white/15">·</span>
                <span className="label-xs text-white/30">{featured.readTime}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-tight group-hover:text-white/80 transition-colors">
                {featured.title}
              </h2>
              <p className="text-white/45 text-sm leading-relaxed mt-4">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-2 mt-6 text-white/40 group-hover:text-white text-sm transition-colors">
                Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="w-full aspect-video bg-white/[0.03] border border-white/8 rounded-sm flex items-center justify-center">
                <span className="label-xs text-white/15">{featured.category}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Article grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col border border-white/8 rounded-sm bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-[16/9] bg-white/[0.03] border-b border-white/8 flex items-center justify-center">
                <span className="label-xs text-white/15">{post.category}</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="label-xs text-white/25">{post.category}</span>
                  <span className="text-white/10">·</span>
                  <span className="label-xs text-white/25">{post.readTime}</span>
                </div>
                <h3 className="text-white font-medium text-base leading-snug group-hover:text-white/80 transition-colors flex-1">
                  {post.title}
                </h3>
                <p className="text-white/35 text-xs leading-relaxed mt-2 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-1.5 mt-4 text-white/25 group-hover:text-white/60 text-xs transition-colors">
                  Read <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
