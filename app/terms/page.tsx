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
        <p className="text-white/30 text-sm mb-10">Last updated: May 26, 2026</p>

        <div className="prose prose-sm prose-invert max-w-none text-white/50 leading-relaxed space-y-8
          [&_h2]:text-white/80 [&_h2]:font-medium [&_h2]:text-base [&_h2]:mt-8 [&_h2]:mb-3
          [&_p]:leading-relaxed [&_p]:mb-4">

          <h2>1. Agreement to Terms</h2>
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement
            between you (&ldquo;Customer,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;) and
            Ventality (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), operating at
            ventality.health. By accessing or using our Site or purchasing from us, you agree to
            be bound by these Terms. If you do not agree, please do not use our Site.
          </p>
          <p>
            You must be at least 18 years of age to use this Site or place an order. By using this
            Site, you represent and warrant that you are 18 or older and legally capable of
            entering into a binding contract.
          </p>

          <h2>2. Products and Services</h2>
          <p>
            Ventality sells branded health and wellness supplements. All products are manufactured
            and fulfilled through Supliful (Brand On Demand, Inc.), a third-party dropshipping
            platform. Products are produced to order and are subject to availability.
          </p>
          <p>
            We reserve the right to modify, suspend, or discontinue any product or service at any
            time without notice. Prices are subject to change without notice.
          </p>
          <p>
            Product descriptions, images, and information are provided for general informational
            purposes. We make no representations that the information is complete, accurate, or up
            to date, though we strive to ensure accuracy.
          </p>

          <h2>3. Orders and Payment</h2>
          <p>
            By placing an order, you represent that the information you provide is accurate and
            that you are authorized to use the payment method provided. All orders are subject to
            acceptance and availability.
          </p>
          <p>
            We accept major credit and debit cards through our secure payment processor. Payment is
            charged at the time of purchase. We will not process or ship any order until full
            payment is received.
          </p>
          <p>
            We reserve the right to refuse or cancel any order at our discretion, including orders
            that appear fraudulent, that contain errors, or where product availability has changed.
          </p>

          <h2>4. Fulfillment and Production</h2>
          <p>
            Our products are fulfilled by Supliful, our third-party production and logistics
            partner. Because products are produced to order:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-white/50">
            <li>Production times are estimates and are not guaranteed.</li>
            <li>
              Once an order has been sent to production, it cannot be modified or canceled.
            </li>
            <li>
              We are not responsible for orders placed with incorrect shipping addresses. If you
              provide an incorrect address and the package is returned, you will be responsible for
              any reshipment costs.
            </li>
          </ul>
          <p>
            If you have an issue with your order, you must contact us at{" "}
            <a href="mailto:contact@ventality.health" className="text-white/60 hover:text-white">
              contact@ventality.health
            </a>{" "}
            within 30 days of delivery (or within 30 days of the estimated delivery date if the
            order has not arrived).
          </p>

          <h2>5. Returns, Refunds, and Replacements</h2>
          <p>
            Because our products are custom-produced to order, we do not accept returns once an
            order has been placed and sent to production.
          </p>
          <p>
            Replacements may be issued if, after investigation, a product is found to be defective.
            Please contact us at{" "}
            <a href="mailto:contact@ventality.health" className="text-white/60 hover:text-white">
              contact@ventality.health
            </a>{" "}
            with a description of the issue, photos (if applicable), and your order details.
          </p>
          <p>
            Refunds are only issued if a replacement order is also found to be defective.
          </p>
          <p>
            We are not responsible for and will not issue refunds or replacements for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-white/50">
            <li>Orders with incorrect destination addresses provided by the customer</li>
            <li>
              Orders that are lost or undeliverable due to the customer&apos;s failure to be
              available at the delivery address or failure to pay import duties
            </li>
            <li>Orders where tracking confirms delivery</li>
          </ul>
          <p>
            If your order has not arrived within 30 calendar days of the estimated delivery date,
            please contact us within that same 30-day window for assistance.
          </p>

          <h2>6. Health Disclaimers and Regulatory Compliance</h2>
          <p>
            Our products are dietary supplements. They are not intended to diagnose, treat, cure,
            or prevent any disease. Statements about our products have not been evaluated by the
            Food and Drug Administration.
          </p>
          <p>
            You should consult a qualified healthcare professional before using any supplement,
            particularly if you are pregnant, nursing, taking medications, or have a medical
            condition.
          </p>
          <p>
            You are responsible for ensuring that any product you purchase is legal and permitted
            for use in your jurisdiction. We make no representations that products are appropriate
            or available in all locations.
          </p>

          <h2>7. Intellectual Property</h2>
          <p>
            All content on the Site — including text, graphics, logos, images, and software — is
            the property of Ventality or its licensors and is protected by applicable intellectual
            property laws. You may not reproduce, distribute, or create derivative works from our
            content without express written permission.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Ventality, its owners, employees, and
            affiliates shall not be liable for any indirect, incidental, consequential, or punitive
            damages arising out of or related to your use of the Site or products, even if advised
            of the possibility of such damages.
          </p>
          <p>
            Our total liability for any claim arising out of your use of the Site or purchase of
            products shall not exceed the amount you paid for the specific order in question.
          </p>

          <h2>9. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Ventality and its officers,
            employees, and affiliates from any claims, damages, losses, or expenses (including
            reasonable attorneys&rsquo; fees) arising from your violation of these Terms, your use
            of the Site, or your violation of any law or the rights of any third party.
          </p>

          <h2>10. Warranty Disclaimer</h2>
          <p className="uppercase text-white/40 text-xs leading-relaxed">
            The site and products are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
            without warranties of any kind, either express or implied, including but not limited to
            implied warranties of merchantability, fitness for a particular purpose, or
            non-infringement. We do not warrant that the site will be uninterrupted, error-free, or
            free of viruses or other harmful components.
          </p>

          <h2>11. Governing Law and Dispute Resolution</h2>
          <p>
            These Terms shall be governed by the laws of the State of Texas, without regard to its
            conflict of laws principles. Any disputes arising from these Terms or your use of the
            Site that cannot be resolved through direct communication shall be resolved through
            binding arbitration in Tarrant County, Texas, in accordance with the rules of the
            American Arbitration Association.
          </p>
          <p>
            Any cause of action arising out of or relating to these Terms must be commenced within
            one (1) year after the cause of action accrues; otherwise it is permanently barred.
          </p>

          <h2>12. Changes to Terms</h2>
          <p>
            We reserve the right to update or modify these Terms at any time. Changes are effective
            immediately upon posting. Your continued use of the Site following any change
            constitutes your acceptance of the new Terms.
          </p>

          <h2>13. Contact</h2>
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
