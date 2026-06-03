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
        <p className="text-white/30 text-sm mb-10">Last updated: May 26, 2026</p>

        <div className="prose prose-sm prose-invert max-w-none text-white/50 leading-relaxed space-y-8
          [&_h2]:text-white/80 [&_h2]:font-medium [&_h2]:text-base [&_h2]:mt-8 [&_h2]:mb-3
          [&_p]:leading-relaxed [&_p]:mb-4">

          <h2>Overview</h2>
          <p>
            At Ventality, all orders are produced and fulfilled by our manufacturing and logistics
            partner, Supliful. Because every product is made to order, please review this policy
            carefully before purchasing.
          </p>

          <h2>Processing Time</h2>
          <p>
            All orders require a production period before shipment. Estimated production times are
            typically <strong className="text-white/70">2–5 business days</strong> from the time
            payment is confirmed, though this may vary based on demand and product type. Production
            time estimates are not guaranteed.
          </p>
          <p>
            Once your order has been sent to production, it <strong className="text-white/70">cannot
            be modified or canceled</strong>.
          </p>

          <h2>Shipping Zones and Rates</h2>
          <p>
            <strong className="text-white/70">United States (North America)</strong>
          </p>

          {/* US Shipping Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-6 text-white/60 font-medium">Shipping Method</th>
                  <th className="text-left py-2 pr-6 text-white/60 font-medium">Estimated Delivery</th>
                  <th className="text-left py-2 text-white/60 font-medium">Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-6 text-white/50">Economy</td>
                  <td className="py-2 pr-6 text-white/50">3–5 business days</td>
                  <td className="py-2 text-white/70 font-medium">FREE</td>
                </tr>
                <tr>
                  <td className="py-2 pr-6 text-white/50">Express</td>
                  <td className="py-2 pr-6 text-white/50">1–2 business days</td>
                  <td className="py-2 text-white/50">$9.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong className="text-white/70">International</strong> (Australia, Belgium, Canada,
            and 33+ additional countries)
          </p>

          {/* International Shipping Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-6 text-white/60 font-medium">Shipping Method</th>
                  <th className="text-left py-2 pr-6 text-white/60 font-medium">Estimated Delivery</th>
                  <th className="text-left py-2 text-white/60 font-medium">Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-6 text-white/50">Economy</td>
                  <td className="py-2 pr-6 text-white/50">4–7 business days</td>
                  <td className="py-2 text-white/70 font-medium">FREE</td>
                </tr>
                <tr>
                  <td className="py-2 pr-6 text-white/50">Express</td>
                  <td className="py-2 pr-6 text-white/50">1–2 business days</td>
                  <td className="py-2 text-white/50">$12.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Delivery times are estimates from the date of shipment and do not include production
            time.
          </p>

          <h2>Tracking Your Order</h2>
          <p>
            Once your order has shipped, you will receive a shipping confirmation email with
            tracking information. Please allow up to 24 hours for tracking details to update in
            the carrier&apos;s system.
          </p>

          <h2>International Shipping</h2>
          <p>We ship to many international destinations. Please note:</p>
          <ul className="list-disc pl-5 space-y-1 text-white/50">
            <li>
              Import duties, taxes, and customs fees are the sole responsibility of the customer.
              These charges vary by country and are not included in your order total or shipping fee.
            </li>
            <li>
              International delivery estimates do not account for customs processing delays, which
              are outside our control.
            </li>
            <li>
              If a package is undeliverable due to the customer&apos;s failure to be available,
              failure to pay import duties, or an incorrect/incomplete address, and the package is
              destroyed or abandoned by the carrier, we cannot issue a refund or replacement for
              that order.
            </li>
          </ul>

          <h2>Incorrect or Undeliverable Addresses</h2>
          <p>
            Please double-check your shipping address before placing an order. If an order is
            returned to our fulfillment center due to an incorrect address:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-white/50">
            <li>We will contact you to arrange reshipment.</li>
            <li>
              You will be responsible for all reshipment costs, including the original shipping
              cost plus a service/handling fee.
            </li>
            <li>
              If you do not provide an updated address within 30 calendar days of being notified,
              we reserve the right to discard the returned package with no refund or replacement
              obligation.
            </li>
          </ul>
          <p>
            We cannot guarantee that a package with an incorrect address will be returned to us
            rather than lost or destroyed by the carrier.
          </p>

          <h2>Lost or Delayed Orders</h2>
          <p>
            If your order has not arrived within 30 calendar days of the estimated delivery date,
            please contact us at{" "}
            <a href="mailto:contact@ventality.health" className="text-white/60 hover:text-white">
              contact@ventality.health
            </a>{" "}
            within that same 30-day window. We will investigate and work with our fulfillment
            partner to resolve the issue.
          </p>
          <p>
            We are not responsible for delays caused by weather, carrier disruptions, customs
            processing, or other factors outside our control. We cannot issue refunds or
            replacements for orders where the carrier&apos;s tracking information confirms delivery
            to the address provided.
          </p>

          <h2>Split Shipping</h2>
          <p>
            Some orders containing multiple products may be shipped separately due to our
            fulfillment process. You may receive multiple shipments for a single order — each with
            its own tracking number.
          </p>

          <h2>Contact Us</h2>
          <p>
            For any shipping-related questions or concerns, please reach out to us:
          </p>
          <p>
            Ventality<br />
            12650 N Beach St, Ste 114 #7242<br />
            Fort Worth, TX 76244<br />
            Email:{" "}
            <a href="mailto:contact@ventality.health" className="text-white/60 hover:text-white">
              contact@ventality.health
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
