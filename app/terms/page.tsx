import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Ventality Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <p className="label-sm text-white/30 mb-3">Legal</p>
        <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">Terms of Service</h1>
        <p className="text-white/30 text-sm mb-10">Last updated: May 2026</p>

        <div className="prose prose-sm prose-invert max-w-none text-white/50 leading-relaxed space-y-8
          [&_h2]:text-white/80 [&_h2]:font-medium [&_h2]:text-base [&_h2]:mt-8 [&_h2]:mb-3
          [&_p]:leading-relaxed [&_p]:mb-4">

          <p>
            By accessing or using this Site, you agree to be bound by these Terms of Service.
            Please read them carefully. If you do not agree to these terms, do not use the Site.
          </p>

          <h2>Use of the Site</h2>
          <p>
            You agree to use this Site only for lawful purposes and in a manner that does not
            infringe the rights of others. You may not use our products for any illegal or
            unauthorized purpose.
          </p>

          <h2>Products, Pricing &amp; Availability</h2>
          <p>
            Prices for products are subject to change without notice. We reserve the right to
            discontinue any product at any time. All products are manufactured to order by our
            third-party fulfillment partner, Supliful (Brand On Demand Inc.), and are subject to
            their production and inventory availability. We shall not be liable to you or any
            third party for any modification, suspension, or discontinuance of a product or service.
          </p>
          <p>
            In the event a product is listed at an incorrect price due to a typographical error,
            we reserve the right to refuse or cancel orders placed for that product.
          </p>

          <h2>Order Fulfillment</h2>
          <p>
            Orders are fulfilled by Supliful from US-based fulfillment centers. By placing an
            order, you authorize us to share your name, shipping address, and order details with
            Supliful solely for fulfillment purposes. Fulfillment typically takes 2–5 business days
            before shipment.
          </p>

          <h2>Shipping</h2>
          <p>
            We offer free standard shipping on all orders within the contiguous United States.
            Shipping to Alaska, Hawaii, and internationally may be available at additional cost.
            Estimated delivery times are not guaranteed and may be affected by carrier delays,
            customs processing, or other factors outside our control. Full details are available
            in our{" "}
            <a href="/shipping" className="text-white/60 hover:text-white">
              Shipping Policy
            </a>
            .
          </p>

          <h2>Returns &amp; Refunds</h2>
          <p>
            Our return and refund policy is governed by the terms set out in our{" "}
            <a href="/returns" className="text-white/60 hover:text-white">
              Return Policy
            </a>
            . Claims for damaged, defective, or incorrect orders must be submitted within 30 days
            of delivery.
          </p>

          <h2>Health Disclaimer</h2>
          <p>
            The information on this Site is provided for educational and informational purposes
            only and is not intended as medical advice. Our products are dietary supplements and
            are not intended to diagnose, treat, cure, or prevent any disease. Always consult a
            qualified healthcare provider before starting any new supplement regimen,
            particularly if you are pregnant, nursing, have a medical condition, or are taking
            medications.
          </p>
          <p>
            These statements have not been evaluated by the Food and Drug Administration.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            The Site and its original content, features, and functionality are owned by Ventality
            and are protected by applicable intellectual property laws. You may not reproduce,
            distribute, or create derivative works from any content on this Site without our
            express written permission.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, Ventality shall not be liable for
            any indirect, incidental, special, consequential, or punitive damages arising out of
            your use of or inability to use the Site or products, even if advised of the
            possibility of such damages. Our total liability to you for any claim arising from
            your use of the Site or purchase of products shall not exceed the amount paid by you
            for the relevant product.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the
            United States, without regard to conflict of law provisions.
          </p>

          <h2>Changes to These Terms</h2>
          <p>
            We reserve the right to update these Terms at any time. Continued use of the Site
            after changes are posted constitutes your acceptance of the revised Terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these Terms of Service should be sent to{" "}
            <strong className="text-white/70">contact@ventality.health</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
