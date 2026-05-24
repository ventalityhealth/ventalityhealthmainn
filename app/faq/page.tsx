import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Ventality products, shipping, returns, and manufacturing standards.",
};

const FAQ_ITEMS = [
  {
    q: "Where are Ventality products manufactured?",
    a: "All products are manufactured in cGMP-compliant, FDA-registered facilities. This means every batch is produced under standardized quality control procedures that meet federal manufacturing regulations for dietary supplements.",
  },
  {
    q: "Are Certificates of Analysis available?",
    a: "Yes. Certificates of Analysis (COAs) are available upon request for any product in our catalog. A COA confirms the identity, potency, and purity of a product batch as tested by the manufacturing facility. Contact us at contact@ventality.health to request one.",
  },
  {
    q: "What does 'cGMP-compliant' mean?",
    a: "cGMP stands for current Good Manufacturing Practice — a set of regulations enforced by the FDA (21 CFR Part 111) that govern the production, testing, and quality assurance of dietary supplements. Compliance means the facility maintains documented procedures, equipment standards, personnel training, and batch testing.",
  },
  {
    q: "Are Ventality products FDA-approved?",
    a: "The FDA does not 'approve' dietary supplements the way it approves drugs. The FDA does regulate supplement manufacturing and labeling. Our products are manufactured in FDA-registered facilities and comply with FDA labeling requirements. Any claims on our products are limited to structure/function claims as permitted under DSHEA, accompanied by the required FDA disclaimer.",
  },
  {
    q: "What health claims do you make?",
    a: "We only make structure/function claims — statements describing how a nutrient or ingredient affects the structure or function of the body. These claims are substantiated by available scientific literature. We do not make disease treatment, prevention, or cure claims. All products include the FDA-mandated disclaimer.",
  },
  {
    q: "How long does shipping take?",
    a: "Orders are typically processed within 2–5 business days. Standard domestic shipping takes an additional 5–10 business days. Expedited options may be available at checkout. For full details, see our Shipping Policy.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a 30-day satisfaction guarantee. If you're not satisfied with a product for any reason, contact us within 30 days of delivery for a return or exchange. See our Return Policy for full terms.",
  },
  {
    q: "Are products suitable for vegetarians or vegans?",
    a: "It depends on the specific product. Some products use bovine-derived ingredients (such as collagen, or gelatin capsules), while others are plant-based. Check the ingredient list on the individual product page or contact us for clarification on a specific product.",
  },
  {
    q: "Can I take multiple products together?",
    a: "Most of our products can be combined safely, but we always recommend consulting your healthcare provider before starting any new supplement protocol, especially if you have a medical condition, are pregnant or nursing, or take prescription medications.",
  },
  {
    q: "How do I contact Ventality?",
    a: "Email us at contact@ventality.health. We aim to respond within 1–2 business days.",
  },
];

export default function FAQPage() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="label-sm text-white/30 mb-3">Support</p>
          <h1 className="text-4xl font-semibold text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-white/40 text-base mt-4 leading-relaxed">
            Answers to common questions about our products, standards, and
            policies. Can&apos;t find what you&apos;re looking for?{" "}
            <Link href="/contact" className="text-white/60 underline hover:text-white">
              Contact us.
            </Link>
          </p>
        </div>

        <div className="max-w-3xl">
          <Accordion className="space-y-0">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-white/10 first:border-t"
              >
                <AccordionTrigger className="text-white/80 hover:text-white text-left text-sm sm:text-base font-medium py-5 pr-0 no-underline hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-white/45 text-sm leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
