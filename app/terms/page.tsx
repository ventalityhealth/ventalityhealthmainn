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
            By accessing or using our Site, you agree to be bound by these Terms of Service.
            Please read them carefully. If you do not agree to these terms, do not use the Site.
          </p>

          <h2>Use of the Site</h2>
          <p>
            You agree to use the Site only for lawful purposes and in a manner that does not
            infringe the rights of others. You may not use our products for any illegal or
            unauthorized purpose.
          </p>

          <h2>Products and Pricing</h2>
          <p>
            Prices for products are subject to change without notice. We reserve the right to
            discontinue any product at any time. We shall not be liable to you or any third
            party for any modification, suspension, or discontinuance of the service.
          </p>

          <h2>Health Disclaimer</h2>
          <p>
            The information on this Site is provided for educational purposes only and is not
            intended as medical advice. Our products are dietary supplements and are not
            intended to diagnose, treat, cure, or prevent any disease. Always consult a
            qualified healthcare provider before starting any supplement regimen.
          </p>
          <p>
            All structure/function claims on this Site have not been evaluated by the Food and
            Drug Administration.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            The Site and its original content, features, and functionality are owned by
            Ventality and are protected by applicable intellectual property laws.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            In no event shall Ventality be liable for any indirect, incidental, special,
            consequential, or punitive damages arising out of your use of or inability to use
            the Site or products.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the
            United States, without regard to its conflict of law provisions.
          </p>

          <h2>Contact</h2>
          <p>Questions about the Terms of Service should be sent to contact@ventality.health.</p>
        </div>
      </div>
    </div>
  );
}
