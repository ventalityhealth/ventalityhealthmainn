import React from "react";
import type { Metadata } from "next";
import { Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ventality — questions about products, orders, or certifications.",
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <p className="label-sm text-white/30 mb-3">Support</p>
            <h1 className="text-4xl font-semibold text-white tracking-tight mb-6">
              Get in Touch
            </h1>
            <p className="text-white/45 text-base leading-relaxed mb-10">
              Questions about a product, your order, or our manufacturing
              standards? We&apos;re here to help.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-5 border border-white/8 rounded-sm bg-white/[0.02]">
                <Mail className="w-5 h-5 text-white/30 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-white text-sm font-medium">Email</p>
                  <a
                    href="mailto:contact@ventality.health"
                    className="text-white/50 hover:text-white text-sm transition-colors mt-0.5 block"
                  >
                    contact@ventality.health
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 border border-white/8 rounded-sm bg-white/[0.02]">
                <Clock className="w-5 h-5 text-white/30 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-white text-sm font-medium">Response Time</p>
                  <p className="text-white/45 text-sm mt-0.5">
                    We aim to respond within 1–2 business days.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-5 border border-white/8 rounded-sm">
              <p className="text-white/40 text-xs label-xs mb-3">Quick Answers</p>
              <ul className="space-y-2 text-sm text-white/45">
                <li>→ COA requests: mention the product name in your email</li>
                <li>→ Returns: see our <a href="/returns" className="text-white/60 underline">Return Policy</a></li>
                <li>→ Shipping questions: see our <a href="/shipping" className="text-white/60 underline">Shipping Policy</a></li>
                <li>→ General questions: check our <a href="/faq" className="text-white/60 underline">FAQ</a></li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div>
            <form
              action="mailto:contact@ventality.health"
              method="get"
              encType="text/plain"
              className="space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block label-xs text-white/35 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Jane"
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25"
                  />
                </div>
                <div>
                  <label className="block label-xs text-white/35 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Smith"
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25"
                  />
                </div>
              </div>

              <div>
                <label className="block label-xs text-white/35 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="jane@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25"
                />
              </div>

              <div>
                <label className="block label-xs text-white/35 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Order inquiry, product question, etc."
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25"
                />
              </div>

              <div>
                <label className="block label-xs text-white/35 mb-2">Message</label>
                <textarea
                  name="body"
                  rows={5}
                  required
                  placeholder="How can we help you?"
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black text-sm font-medium py-3 rounded-sm hover:bg-white/90 transition-colors tracking-wide"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
