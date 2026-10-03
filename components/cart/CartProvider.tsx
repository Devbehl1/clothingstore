"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { cartStore, makeLineId } from "@/lib/cart-store";
import type { CartItem, Product, Size } from "@/lib/types";
import { cartTotal } from "@/lib/whatsapp";

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, size: Size, quantity?: number, color?: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;
  /** Items currently being checked out (cart, or a single "buy now" item). */
  checkoutItems: CartItem[] | null;
  openCheckout: (items?: CartItem[]) => void;
  closeCheckout: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function toCartItem(product: Product, size: Size, quantity = 1, color?: string): CartItem {
  const colorName = color ?? product.colors[0]?.name ?? "Default";
  return {
    lineId: makeLineId(product.id, size, colorName),
    productId: product.id,
    slug: product.slug,
    name: product.name,
    image: product.images[0]?.src ?? "",
    price: product.price,
    size,
    color: colorName,
    quantity,
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutSource, setCheckoutSource] = useState<CartItem[] | "cart" | null>(null);

  const addItem = useCallback((product: Product, size: Size, quantity = 1, color?: string) => {
    cartStore.add(toCartItem(product, size, quantity, color));
    setIsOpen(true);
  }, []);

  const openCheckout = useCallback((override?: CartItem[]) => {
    setCheckoutSource(override ?? "cart");
    setIsOpen(false);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      subtotal: cartTotal(items),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      setQuantity: cartStore.setQuantity,
      removeItem: cartStore.remove,
      clearCart: cartStore.clear,
      checkoutItems: checkoutSource === "cart" ? items : checkoutSource,
      openCheckout,
      closeCheckout: () => setCheckoutSource(null),
    }),
    [items, isOpen, addItem, checkoutSource, openCheckout],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
