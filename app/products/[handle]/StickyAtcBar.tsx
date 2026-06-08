"use client"

import React, { useEffect, useState } from "react"
import { Minus, Plus, ShoppingBag } from "lucide-react"
import { useCart } from "@/context/CartContext"
import type { ShopifyProduct } from "@/lib/shopify"

interface StickyAtcBarProps {
  product: ShopifyProduct
  price: string
  title: string
}

/**
 * Sticky add-to-cart bar.
 * Desktop: fixed to top of viewport, fades in 200ms after the hero scrolls
 * out of view, and hides again when the footer sentinel enters the viewport.
 * Mobile: pinned to the bottom of the viewport and always visible.
 */
export default function StickyAtcBar({ product, price, title }: StickyAtcBarProps) {
  const variants = product.variants.edges.map((e) => e.node)
  const variant = variants[0]
  const image = product.images.edges[0]?.node

  const [quantity, setQuantity] = useState(1)
  const [show, setShow] = useState(false)
  const { addToCart, isLoading } = useCart()

  useEffect(() => {
    const hero = document.getElementById("vt-hero-sentinel")
    const footer = document.getElementById("vt-footer-sentinel")
    const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches

    let pastHero = false
    let atFooter = false
    const update = () => setShow(!isDesktop() || (pastHero && !atFooter))

    const heroObs = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0
        update()
      },
      { threshold: 0 }
    )
    const footerObs = new IntersectionObserver(
      ([entry]) => {
        atFooter = entry.isIntersecting
        update()
      },
      { threshold: 0 }
    )

    if (hero) heroObs.observe(hero)
    if (footer) footerObs.observe(footer)
    update()
    window.addEventListener("resize", update)

    return () => {
      heroObs.disconnect()
      footerObs.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [])

  const handleAdd = async () => {
    if (!variant?.availableForSale) return
    await addToCart(variant.id, quantity, {
      title: product.title,
      variantTitle: variant.title,
      price: variant.price,
      image: image?.url ?? "",
      handle: product.handle,
    })
  }

  const soldOut = !variant?.availableForSale

  return (
    <div
      className="fixed left-0 right-0 z-50 bottom-0 top-auto border-t lg:bottom-auto lg:top-0 lg:border-t-0 lg:border-b"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(-8px)",
        pointerEvents: show ? "auto" : "none",
        transition: "opacity 200ms ease, transform 200ms ease",
        background: "var(--vt-surface-3)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderColor: "var(--vt-line)",
      }}
      aria-hidden={!show}
    >
      <div className="vt-container flex items-center gap-3 py-3">
        {/* Name */}
        <p
          className="min-w-0 flex-1 truncate font-semibold"
          style={{ fontSize: "var(--vt-text-sm)", color: "var(--vt-text)" }}
        >
          {title}
        </p>

        {/* Price */}
        <p
          className="hidden sm:block font-semibold flex-shrink-0"
          style={{ fontSize: "var(--vt-text-base)", color: "var(--vt-text)" }}
        >
          {price}
        </p>

        {/* Quantity stepper */}
        <div
          className="hidden sm:flex items-center rounded-sm flex-shrink-0"
          style={{ border: "1px solid var(--vt-line-strong)" }}
        >
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="px-3 py-2 transition-colors"
            style={{ color: "var(--vt-muted)" }}
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span
            className="px-2 text-sm font-medium min-w-[28px] text-center"
            style={{ color: "var(--vt-text)" }}
          >
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="px-3 py-2 transition-colors"
            style={{ color: "var(--vt-muted)" }}
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAdd}
          disabled={isLoading || soldOut}
          className="flex items-center justify-center gap-2 rounded-sm bg-white text-black font-medium px-5 py-2.5 text-sm tracking-wide transition-transform duration-200 hover:scale-[1.02] hover:bg-white/90 disabled:opacity-40 flex-shrink-0 flex-1 sm:flex-initial"
        >
          {isLoading ? (
            "Adding..."
          ) : soldOut ? (
            "Sold Out"
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  )
}
