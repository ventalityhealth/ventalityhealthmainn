"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/shopify";

export default function CartDrawer() {
  const { cart, localCart, isOpen, closeCart, updateLine, removeLine, isLoading } =
    useCart();

  const isLive = Boolean(process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN);

  const liveLines = cart?.lines?.edges?.map((e) => e.node) ?? [];
  const subtotal = isLive
    ? formatPrice(
        cart?.cost?.subtotalAmount?.amount ?? "0",
        cart?.cost?.subtotalAmount?.currencyCode
      )
    : formatPrice(
        localCart.reduce(
          (sum, i) => sum + parseFloat(i.price.amount) * i.quantity,
          0
        )
      );

  const checkoutUrl = cart?.checkoutUrl;
  const isEmpty = isLive ? liveLines.length === 0 : localCart.length === 0;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="flex flex-col w-full sm:max-w-md bg-[#0f0f0f] border-l border-white/10 p-0"
      >
        <SheetHeader className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-white text-base font-medium tracking-wide">
              Your Cart
            </SheetTitle>
            <button
              onClick={closeCart}
              className="text-white/40 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </SheetHeader>

        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
            <ShoppingBag className="w-12 h-12 text-white/20" />
            <p className="text-white/40 text-sm">Your cart is empty.</p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="inline-flex items-center justify-center border border-white/20 text-white hover:bg-white/5 text-sm px-4 py-2 rounded-sm transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {isLive
                ? liveLines.map((line) => (
                    <CartItemLive
                      key={line.id}
                      line={line}
                      onUpdate={updateLine}
                      onRemove={removeLine}
                      disabled={isLoading}
                    />
                  ))
                : localCart.map((item) => (
                    <CartItemLocal
                      key={item.variantId}
                      item={item}
                      onUpdate={updateLine}
                      onRemove={removeLine}
                      disabled={isLoading}
                    />
                  ))}
            </div>

            <div className="px-6 py-5 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Subtotal</span>
                <span className="text-white font-medium">{subtotal}</span>
              </div>
              <p className="text-white/30 text-xs">
                Shipping and taxes calculated at checkout.
              </p>
              {isLive && checkoutUrl ? (
                <a
                  href={checkoutUrl}
                  className="block w-full"
                  onClick={closeCart}
                >
                  <Button className="w-full bg-white text-black hover:bg-white/90 font-medium tracking-wide">
                    Checkout
                  </Button>
                </a>
              ) : (
                <Button
                  className="w-full bg-white text-black hover:bg-white/90 font-medium tracking-wide"
                  disabled
                >
                  Checkout (Connect Shopify)
                </Button>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CartItemLive({
  line,
  onUpdate,
  onRemove,
  disabled,
}: {
  line: {
    id: string;
    quantity: number;
    merchandise: {
      id: string;
      title: string;
      price: { amount: string; currencyCode: string };
      product: {
        title: string;
        handle: string;
        images: { edges: { node: { url: string; altText: string | null } }[] };
      };
    };
  };
  onUpdate: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  disabled: boolean;
}) {
  const image = line.merchandise.product.images.edges[0]?.node.url;
  return (
    <div className="flex gap-4">
      <div className="w-16 h-16 rounded bg-[#1a1a1a] border border-white/10 overflow-hidden flex-shrink-0">
          {image && (
          <Image
            src={image}
            alt={line.merchandise.product.title}
            width={64}
            height={64}
            className="w-full h-full object-cover mix-blend-multiply"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">
          {line.merchandise.product.title}
        </p>
        <p className="text-white/40 text-xs mt-0.5">{line.merchandise.title}</p>
        <p className="text-white/60 text-sm mt-1">
          {formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border border-white/10 rounded">
            <button
              disabled={disabled}
              onClick={() => onUpdate(line.id, line.quantity - 1)}
              className="px-2 py-1 text-white/60 hover:text-white transition-colors disabled:opacity-40"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-2 text-white text-sm">{line.quantity}</span>
            <button
              disabled={disabled}
              onClick={() => onUpdate(line.id, line.quantity + 1)}
              className="px-2 py-1 text-white/60 hover:text-white transition-colors disabled:opacity-40"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <button
            disabled={disabled}
            onClick={() => onRemove(line.id)}
            className="text-white/30 hover:text-white/60 text-xs transition-colors disabled:opacity-40"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

function CartItemLocal({
  item,
  onUpdate,
  onRemove,
  disabled,
}: {
  item: {
    variantId: string;
    quantity: number;
    title: string;
    variantTitle: string;
    price: { amount: string; currencyCode: string };
    image: string;
    handle: string;
  };
  onUpdate: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="w-16 h-16 rounded bg-[#1a1a1a] border border-white/10 overflow-hidden flex-shrink-0">
        {item.image && (
          <Image
            src={item.image}
            alt={item.title}
            width={64}
            height={64}
            className="w-full h-full object-cover mix-blend-multiply"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">{item.title}</p>
        <p className="text-white/40 text-xs mt-0.5">{item.variantTitle}</p>
        <p className="text-white/60 text-sm mt-1">
          {formatPrice(item.price.amount, item.price.currencyCode)}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border border-white/10 rounded">
            <button
              disabled={disabled}
              onClick={() => onUpdate(item.variantId, item.quantity - 1)}
              className="px-2 py-1 text-white/60 hover:text-white transition-colors disabled:opacity-40"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-2 text-white text-sm">{item.quantity}</span>
            <button
              disabled={disabled}
              onClick={() => onUpdate(item.variantId, item.quantity + 1)}
              className="px-2 py-1 text-white/60 hover:text-white transition-colors disabled:opacity-40"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <button
            disabled={disabled}
            onClick={() => onRemove(item.variantId)}
            className="text-white/30 hover:text-white/60 text-xs transition-colors disabled:opacity-40"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
