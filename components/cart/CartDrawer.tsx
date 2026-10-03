"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { buttonClasses } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { STORE_CONFIG } from "@/lib/config";
import { useOverlay } from "@/lib/use-lock-body";

export function CartDrawer() {
  const { items, isOpen, closeCart, setQuantity, removeItem, subtotal, count, openCheckout } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  useOverlay(isOpen, closeCart);

  useEffect(() => {
    if (isOpen) panelRef.current?.focus();
  }, [isOpen]);

  const remaining = Math.max(0, STORE_CONFIG.freeShippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / STORE_CONFIG.freeShippingThreshold) * 100);

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? "visible" : "invisible delay-500"}`} aria-hidden={!isOpen}>
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-ink/50 transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        tabIndex={-1}
        className={`absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col bg-paper outline-none transition-transform duration-500 ease-[var(--ease-out-expo)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-ink/10 px-5 py-4 sm:px-7">
          <h2 className="display text-3xl">
            YOUR BAG <span className="text-smoke">({count})</span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close bag"
            className="-mr-2 grid size-10 place-items-center transition-transform duration-300 hover:rotate-90"
          >
            <X size={22} strokeWidth={1.75} />
          </button>
        </header>

        {items.length > 0 && (
          <div className="border-b border-ink/10 px-5 py-3 sm:px-7">
            <p className="label">
              {remaining > 0 ? (
                <>
                  YOU&apos;RE <span className="text-accent">{formatPrice(remaining)}</span> AWAY FROM FREE SHIPPING
                </>
              ) : (
                <>FREE SHIPPING UNLOCKED ✦</>
              )}
            </p>
            <div className="mt-2 h-[3px] bg-ink/10">
              <div
                className="h-full bg-accent transition-[width] duration-700 ease-[var(--ease-out-expo)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center px-5 sm:px-7">
            <p className="display text-[4.5rem] leading-[0.85]">
              EMPTY
              <br />
              <span className="text-accent">FOR NOW.</span>
            </p>
            <p className="mt-4 max-w-xs text-smoke">Your bag is waiting for its main character.</p>
            <Link href="/shop" onClick={closeCart} className={buttonClasses("solid", "mt-8")}>
              SHOP THE DROP <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto overscroll-contain px-5 sm:px-7">
            {items.map((item) => (
              <li key={item.lineId} className="flex gap-4 py-5">
                <Link
                  href={`/product/${item.slug}`}
                  onClick={closeCart}
                  className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden bg-bone"
                >
                  <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeCart}
                      className="text-[0.95rem] font-semibold leading-tight tracking-tight hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="shrink-0 font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                  <p className="label mt-1.5 text-smoke">
                    SIZE {item.size} · {item.color}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <QuantityStepper
                      size="sm"
                      value={item.quantity}
                      min={1}
                      onChange={(q) => setQuantity(item.lineId, q)}
                      label={`Quantity for ${item.name}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(item.lineId)}
                      className="label text-smoke underline-offset-4 transition-colors hover:text-ink hover:underline"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <footer className="border-t border-ink/10 bg-paper px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 sm:px-7">
            <div className="flex items-baseline justify-between">
              <span className="label">SUBTOTAL</span>
              <span className="display text-3xl">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-smoke">Shipping &amp; payment confirmed on WhatsApp.</p>
            <button
              type="button"
              onClick={() => openCheckout()}
              className={buttonClasses("accent", "mt-4 w-full")}
            >
              <WhatsAppIcon size={18} /> ORDER ON WHATSAPP
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
