"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: ShopifyProduct;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart();
  const image = product.images.edges[0]?.node;
  const firstVariant = product.variants.edges[0]?.node;
  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!firstVariant?.availableForSale) return;
    addToCart(firstVariant.id, 1, {
      title: product.title,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      image: image?.url ?? "",
      handle: product.handle,
    });
  };

  return (
    <Link
      href={`/products/${product.handle}`}
      className={cn(
        "group relative flex flex-col bg-[#0f0f0f] border border-white/8 rounded-sm overflow-hidden hover:border-white/20 transition-all duration-300",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square bg-[#1a1a1a] overflow-hidden">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white/10 text-xs label-xs">{product.title}</span>
          </div>
        )}

        {/* Quick add */}
        <button
          onClick={handleQuickAdd}
          disabled={!firstVariant?.availableForSale}
          className={cn(
            "absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center",
            "opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0",
            "transition-all duration-200",
            "hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed"
          )}
          aria-label="Quick add to cart"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
        </button>

        {/* Out of stock */}
        {!firstVariant?.availableForSale && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="label-xs text-white/60">Sold Out</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-4 py-3.5 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-white text-sm font-medium leading-tight truncate">
            {product.title}
          </p>
          {product.variants.edges.length > 1 && (
            <p className="text-white/35 text-xs mt-0.5">
              {product.variants.edges.length} options
            </p>
          )}
        </div>
        <p className="text-white/70 text-sm font-medium whitespace-nowrap flex-shrink-0">
          {price}
        </p>
      </div>
    </Link>
  );
}
