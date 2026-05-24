import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Ventality Shipping Policy",
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

          <h2>Processing Time</h2>
          <p>
            Orders are typically processed and shipped within 2–5 business days of order
            placement. You will receive a shipping confirmation email with tracking information
            once your order has shipped.
          </p>

          <h2>Domestic Shipping</h2>
          <p>
            Standard domestic shipping within the United States typically takes 5–10 business
            days after dispatch. Expedited shipping options may be available at checkout,
            subject to carrier availability and your shipping address.
          </p>

          <h2>Shipping Rates</h2>
          <p>
            Shipping rates are calculated at checkout based on your delivery address, the
            weight of your order, and the selected shipping method. Free shipping promotions,
            if available, will be displayed at checkout.
          </p>

          <h2>Order Tracking</h2>
          <p>
            Once your order has shipped, you will receive an email containing your tracking
            number. You can use this number to track your package through the carrier&apos;s
            website.
          </p>

          <h2>Shipping Delays</h2>
          <p>
            Ventality is not responsible for shipping delays caused by carriers, weather
            events, or other circumstances outside of our control. If your order is
            significantly delayed, please contact us at contact@ventality.health.
          </p>

          <h2>International Shipping</h2>
          <p>
            At this time, we primarily ship within the United States. International shipping
            availability varies. Please contact us before ordering if you are outside the US.
            Any applicable customs duties and taxes are the responsibility of the recipient.
          </p>

          <h2>Contact</h2>
          <p>
            For shipping questions, email contact@ventality.health. Please include your order
            number in your message.
          </p>
        </div>
      </div>
    </div>
  );
}
