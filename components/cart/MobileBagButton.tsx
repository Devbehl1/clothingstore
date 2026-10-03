"use client";

import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/format";

/** Floating bag pill for thumbs on mobile. Hidden on product pages (they have their own sticky bar). */
export function MobileBagButton() {
  const { count, subtotal, openCart, isOpen } = useCart();
  const pathname = usePathname();
  const visible = count > 0 && !isOpen && !pathname.startsWith("/product/");

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`View bag, ${count} items`}
      tabIndex={visible ? 0 : -1}
      className={`label fixed inset-x-4 bottom-4 z-30 flex h-14 items-center justify-between rounded-full bg-ink px-6 text-paper shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)] lg:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <span className="flex items-center gap-3">
        <span className="grid size-6 place-items-center rounded-full bg-accent text-ink">{count}</span>
        VIEW BAG
      </span>
      <span>{formatPrice(subtotal)}</span>
    </button>
  );
}
