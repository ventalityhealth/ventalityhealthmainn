import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Ventality Shipping Policy — Free shipping on all US orders.",
};

export default function ShippingPage() {
  return (
    <div className="pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <p className="label-sm text-white/30 mb-3">Legal</p>
        <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">Shipping Policy</h1>
        <p className="text-white/30 text-sm mb-10">Last updated: May 2026</p>

        <div className="prose prose-sm prose-invert max-w-none text-white/50 leading-relaxed space-y-8
          [&_h2]:text-white/80 [&_h2]:font-medium [&_h2]:text-base [&_h2]:mt-8 [&_h2]:mb-3
          [&_p]:leading-relaxed [&_p]:mb-4">

          <h2>Free Shipping</h2>
          <p>
            We offer <strong className="text-white/70">free standard shipping on all orders</strong> within
            the contiguous United States. No minimum order value required — free shipping is applied
            automatically at checkout.
          </p>
          <p>
            Please note: free shipping does not apply to Alaska, Hawaii, or international destinations.
          </p>

          <h2>Order Processing &amp; Fulfillment</h2>
          <p>
            All orders are fulfilled through our US-based fulfillment partner. After your order is
            placed, please allow <strong className="text-white/70">2–5 business days</strong> for
            order processing and fulfillment before your package ships. You will receive a shipping
            confirmation email with a tracking number once your order has been dispatched.
          </p>
          <p>
            Orders cannot be modified or cancelled once they have been accepted into our fulfillment
            system.
          </p>

          <h2>US Domestic Shipping Times</h2>
          <p>
            All domestic orders are shipped via USPS from our US fulfillment center.
          </p>
          <p>
            <strong className="text-white/70">Standard (Free):</strong> 2–4 business days after
            dispatch via USPS Ground Advantage. Total estimated delivery: 4–9 business days from
            order placement.
          </p>
          <p>
            <strong className="text-white/70">Express:</strong> 1–3 business days after dispatch via
            USPS Priority. Express shipping is available at additional cost and may be offered at
            checkout.
          </p>
          <p>
            Shipping to <strong className="text-white/70">Alaska and Hawaii is currently
            unavailable.</strong>
          </p>

          <h2>International Shipping</h2>
          <p>
            We ship internationally to select countries via FedEx, typically within
            <strong className="text-white/70"> 3–5 business days</strong> after dispatch. Available
            destinations include:
          </p>
          <p>
            <strong className="text-white/70">Zone 1 — Canada</strong>
            <br />
            <strong className="text-white/70">Zone 2 — Europe:</strong> Belgium, Denmark, Finland,
            France, Iceland, Italy, Liechtenstein, Luxembourg, Malta, Monaco, Netherlands, Norway,
            Portugal, Sweden, United Kingdom
            <br />
            <strong className="text-white/70">Zone 3:</strong> Australia, Bulgaria, Croatia, Cyprus,
            Czech Republic, Estonia, Hungary, Indonesia, Latvia, Lithuania, Macau, New Zealand,
            Philippines, Poland, Romania, Slovakia, Slovenia, South Korea, Thailand, Vietnam
          </p>
          <p>
            All international orders are shipped under <strong className="text-white/70">Delivery
            Duties Unpaid (DDU)</strong> terms. This means the recipient is responsible for any
            customs duties, import taxes, or carrier-imposed fees upon delivery. Ventality has no
            control over these charges and cannot predict their amount. Customs clearance may add
            additional time to international delivery estimates.
          </p>
          <p>
            International shipping rates are calculated at checkout based on destination and package
            weight.
          </p>

          <h2>Order Tracking</h2>
          <p>
            Once your order ships, you will receive an email with your tracking number. You can
            track your package directly through the USPS website (domestic) or FedEx website
            (international). Please allow up to 24 hours for tracking information to update after
            you receive your confirmation email.
          </p>

          <h2>Shipping Delays</h2>
          <p>
            Ventality is not responsible for delays caused by carriers, weather events, customs
            processing, or other circumstances outside our control. If your order is significantly
            delayed, please contact us at contact@ventality.health with your order number.
          </p>

          <h2>Contact</h2>
          <p>
            For shipping questions, email <strong className="text-white/70">contact@ventality.health</strong>.
            Please include your order number.
          </p>
        </div>
      </div>
    </div>
  );
}
