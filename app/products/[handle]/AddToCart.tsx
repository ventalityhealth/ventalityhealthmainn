"use client";

import React, { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import type { ShopifyProduct } from "@/lib/shopify";

interface AddToCartProps {
  product: ShopifyProduct;
}

export default function AddToCart({ product }: AddToCartProps) {
  const variants = product.variants.edges.map((e) => e.node);
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isLoading } = useCart();

  const selectedVariant = variants.find((v) => v.id === selectedVariantId);
  const image = product.images.edges[0]?.node;

  const handleAdd = async () => {
    if (!selectedVariant?.availableForSale) return;
    await addToCart(selectedVariantId, quantity, {
      title: product.title,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      image: image?.url ?? "",
      handle: product.handle,
    });
  };

  return (
    <div className="space-y-5">
      {/* Variant selector */}
      {variants.length > 1 && (
        <div>
          <p className="text-white/40 text-xs label-xs mb-3">Option</p>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariantId(variant.id)}
                disabled={!variant.availableForSale}
                className={`px-4 py-2 rounded-sm text-sm border transition-all ${
                  selectedVariantId === variant.id
                    ? "border-white bg-white text-black font-medium"
                    : variant.availableForSale
                    ? "border-white/15 text-white/60 hover:border-white/30 hover:text-white"
                    : "border-white/8 text-white/20 cursor-not-allowed line-through"
                }`}
              >
                {variant.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <p className="text-white/40 text-xs label-xs mb-3">Quantity</p>
        <div className="flex items-center border border-white/15 rounded-sm w-fit">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2.5 text-white/50 hover:text-white transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 py-2.5 text-white text-sm font-medium min-w-[40px] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2.5 text-white/50 hover:text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add to cart */}
      <Button
        onClick={handleAdd}
        disabled={isLoading || !selectedVariant?.availableForSale}
        className="w-full bg-white text-black hover:bg-white/90 font-medium py-3 h-auto tracking-wide rounded-sm disabled:opacity-40"
      >
        {isLoading ? (
          "Adding..."
        ) : !selectedVariant?.availableForSale ? (
          "Sold Out"
        ) : (
          <>
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add to Cart
          </>
        )}
      </Button>
    </div>
  );
}
