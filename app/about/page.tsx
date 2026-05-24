import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, FlaskConical, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ventality is a premium supplement brand committed to science-backed formulations, cGMP manufacturing, and complete transparency.",
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="border-b border-white/8 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="label-sm text-white/30 mb-4">About Ventality</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-tight">
              Precision over
              <br />
              <span className="italic font-light">promise.</span>
            </h1>
            <p className="text-white/45 text-lg leading-relaxed mt-8">
              The supplement industry is full of inflated claims and proprietary
              blends designed to obscure what&apos;s actually inside. Ventality
              was built as a response to that — a brand grounded in what the
              current body of evidence actually supports, nothing more.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="label-sm text-white/30 mb-12 text-center">
            What we stand for
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Manufacturing Integrity",
                body: "Every product in our catalog is manufactured in a cGMP-compliant, FDA-registered facility. These standards exist to ensure consistency, safety, and potency in every batch.",
              },
              {
                icon: FlaskConical,
                title: "Evidence-Based Formulation",
                body: "We only make structure/function claims supported by peer-reviewed research. We do not exaggerate or fabricate benefits. Certificates of Analysis are available on request.",
              },
              {
                icon: Building2,
                title: "Supply Chain Transparency",
                body: "Our products are sourced from a single, carefully vetted supplier. We can trace every product to its manufacturer and provide documentation for every ingredient.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="space-y-4">
                <div className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-sm">
                  <Icon className="w-5 h-5 text-white/40" strokeWidth={1.5} />
                </div>
                <h3 className="text-white font-medium text-lg">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote/Philosophy */}
      <section className="py-16 border-y border-white/8 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <blockquote className="max-w-2xl mx-auto text-center">
            <p className="text-white/70 text-xl sm:text-2xl font-light italic leading-relaxed">
              &ldquo;If a supplement claim can&apos;t be traced to a peer-reviewed
              study, it doesn&apos;t belong on our label.&rdquo;
            </p>
            <footer className="text-white/30 text-sm mt-6 label-xs">
              Ventality — Brand Philosophy
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Standards detail */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="label-sm text-white/30 mb-4">Our Standards</p>
              <h2 className="text-3xl font-semibold text-white tracking-tight mb-6">
                What cGMP and FDA-registered actually mean
              </h2>
              <div className="space-y-6 text-white/45 text-sm leading-relaxed">
                <p>
                  <strong className="text-white/70">cGMP (current Good Manufacturing Practice)</strong>{" "}
                  refers to a set of regulations enforced by the FDA that govern the
                  manufacturing, testing, and quality control of dietary supplements.
                  cGMP-compliant facilities maintain strict documentation, equipment
                  calibration, employee training, and batch testing protocols.
                </p>
                <p>
                  <strong className="text-white/70">FDA-registered facilities</strong>{" "}
                  are food and supplement manufacturers that are required by law to
                  register with the FDA. Registration allows the FDA to conduct
                  inspections and ensures the facility is operating under federal
                  oversight. Note: the FDA does not &ldquo;approve&rdquo; dietary supplements —
                  this is a regulatory distinction that affects how claims can be made.
                </p>
                <p>
                  <strong className="text-white/70">Certificate of Analysis (COA)</strong>{" "}
                  is a document issued by the manufacturing facility that confirms the
                  identity, potency, and purity of a specific ingredient or product
                  batch. COAs are available upon request for any product we sell.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  label: "cGMP Compliance",
                  description: "Consistent manufacturing standards for every batch.",
                },
                {
                  label: "FDA-Registered Facilities",
                  description:
                    "Federal oversight and inspection eligibility.",
                },
                {
                  label: "Certificate of Analysis",
                  description:
                    "Potency and purity documentation available on request.",
                },
                {
                  label: "30-Day Satisfaction Guarantee",
                  description:
                    "Return any product within 30 days, no questions asked.",
                },
                {
                  label: "FDA-Compliant Labeling",
                  description:
                    "Supplement Facts panels follow 21 CFR Part 111 requirements.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-4 border border-white/8 rounded-sm bg-white/[0.02]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">{item.label}</p>
                    <p className="text-white/40 text-xs mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-white tracking-tight mb-4">
            Ready to shop with confidence?
          </h2>
          <p className="text-white/40 text-sm mb-8">
            Every product in our catalog is documented, tested, and made to standard.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-8 py-3 rounded-sm hover:bg-white/90 transition-colors"
          >
            Browse Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
