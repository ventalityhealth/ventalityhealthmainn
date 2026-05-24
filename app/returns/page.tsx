import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return Policy",
  description: "Ventality 30-Day Satisfaction Guarantee and Return Policy",
};

export default function ReturnsPage() {
  return (
    <div className="pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <p className="label-sm text-white/30 mb-3">Legal</p>
        <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">Return Policy</h1>
        <p className="text-white/30 text-sm mb-10">Last updated: May 2026</p>

        <div className="prose prose-sm prose-invert max-w-none text-white/50 leading-relaxed space-y-8
          [&_h2]:text-white/80 [&_h2]:font-medium [&_h2]:text-base [&_h2]:mt-8 [&_h2]:mb-3
          [&_p]:leading-relaxed [&_p]:mb-4">

          <h2>30-Day Satisfaction Guarantee</h2>
          <p>
            We stand behind our products. If for any reason you are not satisfied with your
            purchase, you may return it within 30 days of delivery for a full refund or
            exchange — no questions asked.
          </p>

          <h2>How to Initiate a Return</h2>
          <p>
            To initiate a return, email us at contact@ventality.health with your order number
            and the reason for your return. Our team will respond within 1–2 business days
            with return instructions.
          </p>

          <h2>Return Conditions</h2>
          <p>
            Products must be returned in their original packaging. Opened products are
            accepted under our satisfaction guarantee within the 30-day window. After 30 days,
            we are unable to process returns.
          </p>

          <h2>Refund Processing</h2>
          <p>
            Once we receive your return, we will process your refund within 5–7 business days.
            Refunds will be applied to your original payment method. Please note that
            shipping costs are non-refundable unless the return is due to our error (e.g.,
            wrong item shipped, damaged product).
          </p>

          <h2>Damaged or Incorrect Orders</h2>
          <p>
            If you receive a damaged or incorrect product, please contact us at
            contact@ventality.health within 7 days of delivery. Include your order number and
            photos of the product and packaging. We will arrange a replacement or full refund
            at no cost to you.
          </p>

          <h2>Contact</h2>
          <p>
            For return and refund questions, contact us at contact@ventality.health.
          </p>
        </div>
      </div>
    </div>
  );
}
