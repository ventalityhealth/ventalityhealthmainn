import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const SHOP_LINKS = [
  { href: "/shop", label: "All Products" },
  { href: "/shop?tag=wellness", label: "Wellness" },
  { href: "/shop?tag=performance", label: "Performance" },
  { href: "/shop?tag=weight-management", label: "Weight Management" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/shipping", label: "Shipping Policy" },
  { href: "/returns", label: "Return Policy" },
];

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Ventality"
                width={28}
                height={28}
                className="w-7 h-7 object-contain mix-blend-screen"
              />
              <span className="text-white font-semibold text-lg tracking-[0.08em] uppercase">
                Ventality
              </span>
            </Link>
            <p className="text-white/35 text-sm leading-relaxed mt-4 max-w-[200px]">
              Premium supplements formulated for performance. Manufactured in
              cGMP-compliant, FDA-registered facilities.
            </p>
          </div>

          {/* Shop */}
          <div>
            <p className="label-xs text-white/35 mb-4">Shop</p>
            <ul className="space-y-2.5">
              {SHOP_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="label-xs text-white/35 mb-4">Company</p>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="label-xs text-white/35 mb-4">Legal</p>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-white/8" />

        <div className="space-y-3">
          <p className="text-white/20 text-xs leading-relaxed max-w-3xl">
            <strong className="text-white/30">FDA Disclaimer:</strong>{" "}
            These statements have not been evaluated by the Food and Drug
            Administration. These products are not intended to diagnose, treat,
            cure, or prevent any disease. Always consult your healthcare provider
            before starting any new supplement regimen.
          </p>
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Ventality. All rights reserved. Products
            manufactured in cGMP-compliant, FDA-registered facilities.
          </p>
        </div>
      </div>
    </footer>
  );
}
