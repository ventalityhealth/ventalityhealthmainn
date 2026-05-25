"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const { totalQuantity, openCart } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`;
    }
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b"
            : "border-b border-transparent"
        )}
        style={{
          background: scrolled
            ? "rgba(11,16,23,0.92)"
            : "rgba(11,16,23,0.70)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: scrolled ? "var(--vt-line)" : "transparent",
        }}
      >
        <div
          style={{
            width: "min(1160px, calc(100% - 40px))",
            marginInline: "auto",
          }}
        >
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Ventality"
                width={32}
                height={32}
                className="w-8 h-8 object-contain mix-blend-screen"
              />
              <span
                className="font-semibold uppercase"
                style={{
                  color: "var(--vt-text)",
                  fontSize: "var(--vt-text-base)",
                  letterSpacing: "0.1em",
                }}
              >
                Ventality
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "var(--vt-text-sm)",
                    letterSpacing: "0.01em",
                    color: pathname === link.href
                      ? "var(--vt-text)"
                      : "var(--vt-muted)",
                    transition: "color var(--vt-duration-fast) ease",
                  }}
                  className="hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
                style={{
                  color: "var(--vt-muted)",
                  transition: "color var(--vt-duration-fast) ease",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                className="hover:text-white"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>

              <button
                onClick={openCart}
                aria-label="Open cart"
                style={{
                  position: "relative",
                  color: "var(--vt-muted)",
                  transition: "color var(--vt-duration-fast) ease",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                className="hover:text-white"
              >
                <ShoppingBag className="w-[18px] h-[18px]" />
                {totalQuantity > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 flex items-center justify-center leading-none font-bold"
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "999px",
                      background: "var(--vt-lumen-core)",
                      color: "#0A0F16",
                      fontSize: "10px",
                    }}
                  >
                    {totalQuantity > 9 ? "9+" : totalQuantity}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden"
                aria-label="Toggle menu"
                style={{
                  color: "var(--vt-muted)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4 -mt-1">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--vt-line-strong)",
                    borderRadius: "var(--vt-radius-pill)",
                    padding: "0 16px",
                    height: "40px",
                    color: "var(--vt-text)",
                    fontSize: "var(--vt-text-sm)",
                    outline: "none",
                  }}
                  className="placeholder:opacity-30 focus:border-white/25 transition-colors"
                />
                <button
                  type="submit"
                  className="vt-button-primary"
                  style={{ minHeight: "40px", padding: "0 18px" }}
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t"
            style={{
              background: "rgba(11,16,23,0.97)",
              borderColor: "var(--vt-line)",
            }}
          >
            <nav
              style={{
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "block",
                    padding: "10px 0",
                    fontSize: "var(--vt-text-base)",
                    letterSpacing: "0.01em",
                    color: pathname === link.href
                      ? "var(--vt-text)"
                      : "var(--vt-muted)",
                    transition: "color var(--vt-duration-fast) ease",
                  }}
                  className="hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
