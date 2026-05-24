"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { ShopifyCart, CartLine } from "@/lib/shopify";
import {
  createCart,
  cartLinesAdd,
  cartLinesUpdate,
  cartLinesRemove,
  getCart,
} from "@/lib/shopify";

interface LocalCartItem {
  variantId: string;
  quantity: number;
  title: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  image: string;
  handle: string;
}

interface CartContextValue {
  cart: ShopifyCart | null;
  localCart: LocalCartItem[];
  isOpen: boolean;
  isLoading: boolean;
  totalQuantity: number;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (
    variantId: string,
    quantity: number,
    meta?: Omit<LocalCartItem, "variantId" | "quantity">
  ) => Promise<void>;
  updateLine: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_ID_KEY = "vnt_cart_id";
const LOCAL_CART_KEY = "vnt_local_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [localCart, setLocalCart] = useState<LocalCartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isLive = Boolean(process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN);

  // Load persisted cart on mount
  useEffect(() => {
    if (isLive) {
      const cartId = localStorage.getItem(CART_ID_KEY);
      if (cartId) {
        getCart(cartId).then((c) => {
          if (c) setCart(c);
        });
      }
    } else {
      try {
        const saved = localStorage.getItem(LOCAL_CART_KEY);
        if (saved) setLocalCart(JSON.parse(saved));
      } catch {}
    }
  }, [isLive]);

  // Persist local cart
  useEffect(() => {
    if (!isLive) {
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(localCart));
    }
  }, [localCart, isLive]);

  const totalQuantity = isLive
    ? cart?.totalQuantity ?? 0
    : localCart.reduce((sum, item) => sum + item.quantity, 0);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = useCallback(
    async (
      variantId: string,
      quantity: number,
      meta?: Omit<LocalCartItem, "variantId" | "quantity">
    ) => {
      setIsLoading(true);
      try {
        if (isLive) {
          const cartId = localStorage.getItem(CART_ID_KEY);
          if (cartId) {
            const updated = await cartLinesAdd(cartId, [
              { merchandiseId: variantId, quantity },
            ]);
            if (updated) setCart(updated);
          } else {
            const newCart = await createCart([
              { merchandiseId: variantId, quantity },
            ]);
            if (newCart) {
              setCart(newCart);
              localStorage.setItem(CART_ID_KEY, newCart.id);
            }
          }
        } else {
          setLocalCart((prev) => {
            const existing = prev.find((i) => i.variantId === variantId);
            if (existing) {
              return prev.map((i) =>
                i.variantId === variantId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              );
            }
            return [
              ...prev,
              {
                variantId,
                quantity,
                title: meta?.title ?? "Product",
                variantTitle: meta?.variantTitle ?? "",
                price: meta?.price ?? { amount: "0", currencyCode: "USD" },
                image: meta?.image ?? "",
                handle: meta?.handle ?? "",
              },
            ];
          });
        }
        setIsOpen(true);
      } finally {
        setIsLoading(false);
      }
    },
    [isLive]
  );

  const updateLine = useCallback(
    async (lineId: string, quantity: number) => {
      setIsLoading(true);
      try {
        if (isLive && cart) {
          const updated = await cartLinesUpdate(cart.id, [
            { id: lineId, quantity },
          ]);
          if (updated) setCart(updated);
        } else {
          if (quantity <= 0) {
            setLocalCart((prev) => prev.filter((i) => i.variantId !== lineId));
          } else {
            setLocalCart((prev) =>
              prev.map((i) =>
                i.variantId === lineId ? { ...i, quantity } : i
              )
            );
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cart, isLive]
  );

  const removeLine = useCallback(
    async (lineId: string) => {
      setIsLoading(true);
      try {
        if (isLive && cart) {
          const updated = await cartLinesRemove(cart.id, [lineId]);
          if (updated) setCart(updated);
        } else {
          setLocalCart((prev) => prev.filter((i) => i.variantId !== lineId));
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cart, isLive]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        localCart,
        isOpen,
        isLoading,
        totalQuantity,
        openCart,
        closeCart,
        addToCart,
        updateLine,
        removeLine,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
