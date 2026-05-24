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
            This Privacy Policy describes how Ventality (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
            collects, uses, and shares information when you visit or make a purchase from our
            website (&ldquo;Site&rdquo;).
          </p>

          <h2>Information We Collect</h2>
          <p>
            When you visit the Site, we automatically collect certain information about your
            device, including information about your web browser, IP address, time zone, and
            some of the cookies installed on your device.
          </p>
          <p>
            When you make a purchase, we collect your name, billing and shipping address,
            payment information (processed securely by Shopify), email address, and phone
            number.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            We use the Order Information that we collect generally to fulfill any orders placed
            through the Site, to communicate with you about your order, to screen orders for
            potential risk or fraud, and to provide you with information or advertising relating
            to our products or services.
          </p>

          <h2>Sharing Your Information</h2>
          <p>
            We share your Personal Information with third parties to help us use your Personal
            Information as described above. We use Shopify to power our online store — you can
            read more about how Shopify uses your Personal Information at{" "}
            <a href="https://www.shopify.com/legal/privacy" className="text-white/60 hover:text-white">
              https://www.shopify.com/legal/privacy
            </a>
            .
          </p>

          <h2>Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our Site and
            hold certain information. You can instruct your browser to refuse all cookies or to
            indicate when a cookie is being sent.
          </p>

          <h2>Your Rights</h2>
          <p>
            If you are a European resident, you have the right to access personal information
            we hold about you and to ask that your personal information be corrected, updated,
            or deleted. To exercise this right, contact us at contact@ventality.health.
          </p>

          <h2>Data Retention</h2>
          <p>
            When you place an order through the Site, we will maintain your Order Information
            for our records unless and until you ask us to delete this information.
          </p>

          <h2>Contact Us</h2>
          <p>
            For more information about our privacy practices, questions, or complaints, contact
            us by email at contact@ventality.health.
          </p>
        </div>
      </div>
    </div>
  );
}
