"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const STEPS = [
  {
    number: "01",
    eyebrow: "Your entry point",
    headline: "Pick your formula.",
    sub: "Find your starting point.",
    body: "Every routine begins with one decision. Browse our catalog of evidence-backed supplements and choose the formula that fits where you are today. Free shipping. No minimums. No commitment required.",
    proof: ["Free US & international shipping", "cGMP-manufactured", "COA available on request"],
    cta: "Browse Products",
    href: "/shop",
    primary: false,
  },
  {
    number: "02",
    eyebrow: "Multiply your results",
    headline: "Stack what works.",
    sub: "More coverage. One routine.",
    body: "Our formulas are designed to complement each other. Pair L-Glutamine with Adaptogen Vitality for recovery and resilience. Add Sleep Formula and your protocol works around the clock. Better together — always.",
    proof: ["Formulated for compatibility", "Save on bundles", "Purpose-built combinations"],
    cta: "Build Your Stack",
    href: "/shop?tag=bundles",
    primary: true,
  },
  {
    number: "03",
    eyebrow: "Zero risk",
    headline: "Buy with confidence.",
    sub: "We stand behind everything we make.",
    body: "Every order is backed by a 30-day satisfaction guarantee. If you're not satisfied for any reason, reach out and we'll make it right — no hoops, no fine print. cGMP-manufactured, COA available on every product, and free shipping on every order worldwide. No asterisks.",
    proof: ["30-day satisfaction guarantee", "Free US & international shipping", "COA available on every product"],
    cta: "Shop Now",
    href: "/shop",
    primary: false,
  },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Step({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const { ref, inView } = useInView(0.15);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateY(56px)`,
        transition: `opacity 0.75s ease ${index * 0.1}s, transform 0.75s ease ${index * 0.1}s`,
      }}
    >
      <div
        className={`grid lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl`}
        style={{
          border: step.primary
            ? "1px solid rgba(168,209,255,0.18)"
            : "1px solid var(--vt-line)",
          background: step.primary
            ? "radial-gradient(circle at 60% 0%, rgba(168,209,255,0.07) 0%, transparent 55%), rgba(18,24,34,0.9)"
            : "rgba(14,19,27,0.7)",
          boxShadow: step.primary
            ? "0 32px 80px rgba(0,0,0,0.45), 0 0 60px rgba(168,209,255,0.04)"
            : "0 16px 48px rgba(0,0,0,0.3)",
        }}
      >
        {/* Number side */}
        <div
          className={`flex flex-col justify-between p-8 md:p-12 ${isEven ? "" : "lg:order-2"}`}
          style={{
            borderRight: isEven ? "1px solid var(--vt-line)" : "none",
            borderLeft: isEven ? "none" : "1px solid var(--vt-line)",
          }}
        >
          {/* Large step number */}
          <div
            style={{
              fontSize: "clamp(80px, 14vw, 140px)",
              fontWeight: 800,
              letterSpacing: "-0.06em",
              lineHeight: 1,
              color: step.primary
                ? "rgba(168,209,255,0.12)"
                : "rgba(255,255,255,0.05)",
              userSelect: "none",
              marginBottom: "auto",
            }}
          >
            {step.number}
          </div>

          {/* Proof points */}
          <div className="mt-8 space-y-2">
            {step.proof.map((p) => (
              <div key={p} className="flex items-center gap-2.5">
                <span
                  className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{
                    background: step.primary
                      ? "rgba(168,209,255,0.6)"
                      : "var(--vt-line-strong)",
                  }}
                />
                <span
                  style={{
                    fontSize: "var(--vt-text-xs)",
                    color: "var(--vt-muted-2)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {p}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content side */}
        <div
          className={`flex flex-col justify-center p-8 md:p-12 ${isEven ? "" : "lg:order-1"}`}
        >
          <div className="vt-eyebrow mb-5">{step.eyebrow}</div>

          <h3
            className="vt-heading-lg mb-2"
            style={{ letterSpacing: "-0.04em" }}
          >
            {step.headline}
          </h3>

          <p
            className="font-medium mb-5"
            style={{
              color: step.primary
                ? "rgba(168,209,255,0.55)"
                : "var(--vt-muted)",
              fontSize: "var(--vt-text-base)",
            }}
          >
            {step.sub}
          </p>

          <p
            className="vt-copy mb-8"
            style={{ maxWidth: "44ch", lineHeight: 1.75 }}
          >
            {step.body}
          </p>

          <Link
            href={step.href}
            className={step.primary ? "vt-button-primary" : "vt-button-secondary"}
            style={{ display: "inline-flex", alignSelf: "flex-start" }}
          >
            {step.cta} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConversionSequence() {
  const { ref: headerRef, inView: headerInView } = useInView(0.3);

  return (
    <section className="vt-section">
      <div className="vt-container">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center"
          style={{
            marginBottom: "clamp(48px, 6vw, 80px)",
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "none" : "translateY(32px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <div className="vt-eyebrow" style={{ marginBottom: "16px" }}>
            How to start
          </div>
          <h2 className="vt-heading-lg">
            One entry point.
            <br />
            <span style={{ color: "var(--vt-muted)" }}>
              As deep as you want to go.
            </span>
          </h2>
        </div>

        {/* Steps */}
        <div className="space-y-5">
          {STEPS.map((step, i) => (
            <Step key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
