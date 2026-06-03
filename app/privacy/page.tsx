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
        <p className="text-white/30 text-sm mb-10">Last updated: May 26, 2026</p>

        <div className="prose prose-sm prose-invert max-w-none text-white/50 leading-relaxed space-y-8
          [&_h2]:text-white/80 [&_h2]:font-medium [&_h2]:text-base [&_h2]:mt-8 [&_h2]:mb-3
          [&_p]:leading-relaxed [&_p]:mb-4">

          <h2>1. Introduction</h2>
          <p>
            Welcome to Ventality (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). We
            operate the website ventality.health (the &ldquo;Site&rdquo;). This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you visit
            our Site or make a purchase from us. Please read this policy carefully. If you disagree
            with its terms, please discontinue use of the Site.
          </p>
          <p>
            We reserve the right to make changes to this Privacy Policy at any time and for any
            reason. We will alert you about any changes by updating the &ldquo;Last Updated&rdquo;
            date. You are encouraged to periodically review this Privacy Policy to stay informed of
            updates.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            <strong className="text-white/70">Information You Provide Directly</strong>
          </p>
          <p>
            We may collect personal information that you voluntarily provide when you register an
            account or make a purchase, fill out a form, contact us, or subscribe to communications,
            or participate in promotions or surveys. This information may include your name, email
            address, mailing address, phone number, and payment information (processed securely
            through our payment processors — we do not store full payment card details).
          </p>
          <p>
            <strong className="text-white/70">Information Collected Automatically</strong>
          </p>
          <p>
            When you visit the Site, we may automatically collect certain technical information,
            including your IP address, browser type, operating system, referring URLs, pages
            visited, and time spent on pages. This is collected through cookies and similar
            tracking technologies.
          </p>
          <p>
            <strong className="text-white/70">Information from Third Parties</strong>
          </p>
          <p>
            We may receive information about you from third-party services such as Shopify (our
            e-commerce platform), payment processors, and Supliful (our fulfillment partner), in
            connection with processing and fulfilling your orders.
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-5 space-y-1 text-white/50">
            <li>Process, fulfill, and ship your orders</li>
            <li>Communicate with you about your orders, account, or inquiries</li>
            <li>Send you marketing and promotional communications (where you have opted in)</li>
            <li>Improve our Site, products, and customer experience</li>
            <li>Comply with legal obligations and enforce our terms</li>
            <li>Prevent fraudulent transactions and monitor for suspicious activity</li>
          </ul>

          <h2>4. Sharing of Your Information</h2>
          <p>
            We do not sell your personal information. We may share your information with trusted
            third parties only as necessary to operate our business, including:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-white/50">
            <li>
              <strong className="text-white/70">Shopify</strong> &ndash; our e-commerce platform
              that powers our store and processes transactions
            </li>
            <li>
              <strong className="text-white/70">Supliful (Brand On Demand, Inc.)</strong> &ndash;
              our fulfillment and dropshipping partner, which receives order details (name, shipping
              address, product ordered) to produce and ship your products
            </li>
            <li>
              <strong className="text-white/70">Payment processors</strong> &ndash; to securely
              handle payment transactions
            </li>
            <li>
              <strong className="text-white/70">Shipping carriers</strong> &ndash; to deliver your
              orders
            </li>
            <li>
              <strong className="text-white/70">Analytics and marketing tools</strong> &ndash; to
              help us understand Site usage and reach customers (e.g., Google Analytics, Meta Pixel)
            </li>
            <li>
              <strong className="text-white/70">Legal and regulatory authorities</strong> &ndash;
              where required by law or to protect our rights
            </li>
          </ul>
          <p>
            All third-party service providers are required to maintain the confidentiality of your
            information and are prohibited from using it for any purpose other than those specified.
          </p>

          <h2>5. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies, web beacons, and similar tracking technologies to enhance your
            experience on our Site. Cookies help us remember your preferences, keep your cart
            intact, and understand how visitors use our Site.
          </p>
          <p>
            You may instruct your browser to refuse all cookies or to indicate when a cookie is
            being sent. However, if you do not accept cookies, some portions of our Site may not
            function properly.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to fulfill the purposes
            described in this Privacy Policy, or as required by law (e.g., tax or accounting
            requirements). When we no longer need your data, we will delete or anonymize it.
          </p>

          <h2>7. Your Rights</h2>
          <p>
            Depending on your location, you may have the following rights regarding your personal
            information:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-white/50">
            <li>The right to access the personal information we hold about you</li>
            <li>The right to request correction of inaccurate data</li>
            <li>The right to request deletion of your data (&ldquo;right to be forgotten&rdquo;)</li>
            <li>
              The right to opt out of marketing communications at any time (via the unsubscribe
              link in any email)
            </li>
            <li>
              For California residents: rights under the California Consumer Privacy Act (CCPA),
              including the right to know, delete, and opt out of the sale of personal information
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a href="mailto:contact@ventality.health" className="text-white/60 hover:text-white">
              contact@ventality.health
            </a>
            .
          </p>

          <h2>8. Children&rsquo;s Privacy</h2>
          <p>
            Our Site is not directed to individuals under the age of 18. We do not knowingly
            collect personal information from children. If you believe a child has provided us
            personal information, please contact us immediately and we will take steps to remove it.
          </p>

          <h2>9. Security</h2>
          <p>
            We implement commercially reasonable technical and organizational measures to protect
            your personal information. However, no method of transmission over the Internet or
            electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>10. Third-Party Links</h2>
          <p>
            Our Site may contain links to third-party websites. We are not responsible for the
            privacy practices of those sites and encourage you to review their privacy policies.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please contact us:
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
