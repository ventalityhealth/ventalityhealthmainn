import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Ventality Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <p className="label-sm text-white/30 mb-3">Legal</p>
        <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-white/30 text-sm mb-10">Last updated: May 2026</p>

        <div className="prose prose-sm prose-invert max-w-none text-white/50 leading-relaxed space-y-8
          [&_h2]:text-white/80 [&_h2]:font-medium [&_h2]:text-base [&_h2]:mt-8 [&_h2]:mb-3
          [&_p]:leading-relaxed [&_p]:mb-4">

          <p>
            This Privacy Policy describes how Ventality (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
            &ldquo;our&rdquo;) collects, uses, and shares information when you visit or make a
            purchase from our website (&ldquo;Site&rdquo;).
          </p>

          <h2>Information We Collect</h2>
          <p>
            When you visit the Site, we automatically collect certain information about your
            device, including your web browser, IP address, time zone, and cookies installed on
            your device.
          </p>
          <p>
            When you make a purchase or attempt a purchase, we collect your name, billing and
            shipping address, payment information (processed securely by Shopify Payments),
            email address, and phone number (&ldquo;Order Information&rdquo;).
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            We use Order Information to fulfill orders placed through the Site, communicate with
            you about your order, screen orders for potential risk or fraud, and — where you have
            opted in — provide you with information about our products and promotions.
          </p>

          <h2>Sharing Your Information</h2>
          <p>
            We share your personal information with trusted third parties only as necessary to
            operate our business:
          </p>
          <p>
            <strong className="text-white/70">Shopify</strong> powers our online store and payment
            processing. You can read Shopify&apos;s privacy policy at{" "}
            <a href="https://www.shopify.com/legal/privacy" className="text-white/60 hover:text-white">
              shopify.com/legal/privacy
            </a>
            .
          </p>
          <p>
            <strong className="text-white/70">Supliful (Brand On Demand Inc.)</strong> is our
            fulfillment partner. When you place an order, your name, shipping address, and order
            details are shared with Supliful solely for the purpose of manufacturing and shipping
            your products. Supliful does not use your information for marketing purposes. Their
            privacy policy is available at{" "}
            <a href="https://supliful.com/privacy-policy" className="text-white/60 hover:text-white">
              supliful.com/privacy-policy
            </a>
            .
          </p>
          <p>
            We do not sell your personal information to any third parties.
          </p>

          <h2>Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our Site and
            maintain certain information (such as your shopping cart). You can instruct your
            browser to refuse all cookies or to notify you when a cookie is being sent, though
            some features of the Site may not function properly without cookies.
          </p>

          <h2>Your Rights</h2>
          <p>
            If you are a resident of the European Economic Area (EEA) or California, you have the
            right to access, correct, update, or request deletion of the personal information we
            hold about you. To exercise any of these rights, contact us at
            contact@ventality.health.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain your Order Information for our records unless and until you request its
            deletion, subject to any legal obligations that may require us to retain certain
            data for specified periods.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this
            page with an updated &ldquo;Last updated&rdquo; date.
          </p>

          <h2>Contact Us</h2>
          <p>
            For questions, privacy requests, or complaints, contact us at{" "}
            <strong className="text-white/70">contact@ventality.health</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
