import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return Policy",
  description: "Ventality Return & Refund Policy",
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

          <h2>Damaged, Defective, or Incorrect Orders</h2>
          <p>
            If you receive a damaged, defective, or incorrect product, we will make it right at no
            cost to you. All such claims must be submitted within{" "}
            <strong className="text-white/70">30 days of the delivery date</strong>.
          </p>
          <p>
            To file a claim, email <strong className="text-white/70">contact@ventality.health</strong>{" "}
            with your order number and clear photographs of the product and packaging. Upon review
            and approval, we will ship a replacement within 3 business days or issue a full refund
            to your original payment method.
          </p>

          <h2>Lost Packages</h2>
          <p>
            If your package is lost in transit, all claims must be submitted{" "}
            <strong className="text-white/70">no later than 30 days after the estimated delivery
            date</strong>. Contact us at contact@ventality.health with your order number and we will
            investigate with the carrier and arrange a replacement or refund as appropriate.
          </p>

          <h2>30-Day Satisfaction Guarantee</h2>
          <p>
            We stand behind the quality of every product we sell. If you are not satisfied with
            your purchase for any reason, contact us within{" "}
            <strong className="text-white/70">30 days of delivery</strong> and we will work with you
            to resolve it — whether that means a replacement, store credit, or a refund. Refunds are
            applied to your original payment method and typically process within 5–7 business days.
          </p>
          <p>
            Because our products are custom-manufactured to order, we ask that you contact us{" "}
            <em>before</em> attempting to return any product. Do not send products back to our
            fulfillment center without prior authorization — unauthorized returns cannot be
            processed.
          </p>

          <h2>Non-Refundable Situations</h2>
          <p>
            The following situations are outside the scope of our return and refund policy:
          </p>
          <p>
            <strong className="text-white/70">Incorrect address:</strong> If an order is
            undeliverable due to an address error provided by the customer, we cannot issue a
            refund. Reshipment to a corrected address will incur an additional shipping fee.
          </p>
          <p>
            <strong className="text-white/70">Unclaimed packages:</strong> Packages that are
            not collected and are returned to our facility are the customer&apos;s responsibility.
            Reshipment is available at the customer&apos;s expense.
          </p>
          <p>
            <strong className="text-white/70">Claims submitted after 30 days:</strong> We are
            unable to accept claims for refunds, replacements, or exchanges after the 30-day window
            has passed.
          </p>
          <p>
            <strong className="text-white/70">Customs rejection (international orders):</strong>{" "}
            If a package is refused or rejected at customs, Ventality cannot issue a refund. It is
            the responsibility of international customers to be aware of their country&apos;s
            import regulations and to pay any applicable duties upon delivery.
          </p>

          <h2>Refund Processing</h2>
          <p>
            Approved refunds are applied to your original payment method within 5–7 business days.
            If you requested a cash refund and have not seen it after this period, please check with
            your credit card company or bank, as processing times can vary. If the issue persists,
            contact us at contact@ventality.health.
          </p>
          <p>
            Original shipping costs (where applicable) are non-refundable unless the return is due
            to an error on our part.
          </p>

          <h2>Contact</h2>
          <p>
            For return and refund inquiries, email{" "}
            <strong className="text-white/70">contact@ventality.health</strong> with your order number
            and a brief description of the issue.
          </p>
        </div>
      </div>
    </div>
  );
}
