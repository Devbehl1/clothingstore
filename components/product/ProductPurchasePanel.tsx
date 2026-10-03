"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { toCartItem, useCart } from "@/components/cart/CartProvider";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { buttonClasses } from "@/components/ui/Button";
import { SizeGuide } from "./SizeGuide";
import { discountPercent, formatPrice } from "@/lib/format";
import type { Product, Size } from "@/lib/types";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const { addItem, openCheckout } = useCart();
  const [size, setSize] = useState<Size | null>(null);
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(true);
  const sizesRef = useRef<HTMLFieldSetElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const off = discountPercent(product.price, product.mrp);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setCtaVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const requireSize = (): Size | null => {
    if (size) return size;
    setSizeError(true);
    sizesRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    return null;
  };

  const onAdd = () => {
    const s = requireSize();
    if (s) addItem(product, s, quantity, color);
  };

  const onBuyNow = () => {
    const s = requireSize();
    if (s) openCheckout([toCartItem(product, s, quantity, color)]);
  };

  return (
    <div>
      <div className="flex items-baseline gap-3">
        <p className="display text-4xl">{formatPrice(product.price)}</p>
        {off > 0 && (
          <>
            <p className="text-smoke">
              MRP <span className="line-through">{formatPrice(product.mrp)}</span>
            </p>
            <p className="label bg-accent px-2 py-1 font-semibold">{off}% OFF</p>
          </>
        )}
      </div>
      <p className="mt-1 text-xs text-smoke">Inclusive of all taxes.</p>

      {/* Colour */}
      <fieldset className="mt-8">
        <legend className="label">
          COLOUR — <span className="text-smoke">{color}</span>
        </legend>
        <div className="mt-3 flex gap-2">
          {product.colors.map((c) => (
            <label key={c.name} className="cursor-pointer">
              <input
                type="radio"
                name="color"
                value={c.name}
                checked={color === c.name}
                onChange={() => setColor(c.name)}
                className="peer sr-only"
              />
              <span
                title={c.name}
                className="block size-9 rounded-full border border-ink/20 ring-offset-2 ring-offset-paper transition-shadow peer-checked:ring-2 peer-checked:ring-ink peer-focus-visible:ring-2 peer-focus-visible:ring-accent"
                style={{ backgroundColor: c.hex }}
              />
              <span className="sr-only">{c.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Size */}
      <fieldset ref={sizesRef} className="mt-8" aria-describedby={sizeError ? "size-error" : undefined}>
        <div className="flex items-center justify-between">
          <legend className="label">
            SIZE {size && <span className="text-smoke">— {size}</span>}
          </legend>
          <SizeGuide category={product.category} />
        </div>
        <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
          {product.sizes.map((s) => (
            <label key={s} className="cursor-pointer">
              <input
                type="radio"
                name="size"
                value={s}
                checked={size === s}
                onChange={() => {
                  setSize(s);
                  setSizeError(false);
                }}
                className="peer sr-only"
              />
              <span className="label grid h-12 place-items-center border border-ink/20 !text-[0.75rem] font-medium transition-colors duration-200 hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-accent">
                {s}
              </span>
            </label>
          ))}
        </div>
        {sizeError && (
          <p id="size-error" role="alert" className="mt-2 text-sm text-alert">
            Pick a size first.
          </p>
        )}
      </fieldset>

      {/* Quantity + CTAs */}
      <div ref={ctaRef} className="mt-8 space-y-3">
        <div className="flex gap-3">
          <QuantityStepper value={quantity} onChange={setQuantity} />
          <button type="button" onClick={onAdd} className={buttonClasses("solid", "flex-1")}>
            <ShoppingBag size={16} /> ADD TO BAG
          </button>
        </div>
        <button type="button" onClick={onBuyNow} className={buttonClasses("accent", "w-full")}>
          <WhatsAppIcon size={18} /> ORDER ON WHATSAPP
        </button>
      </div>

      {/* Mobile sticky bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-ink/10 bg-paper/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-500 ease-[var(--ease-out-expo)] lg:hidden ${
          ctaVisible ? "translate-y-full" : "translate-y-0"
        }`}
        aria-hidden={ctaVisible}
      >
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold uppercase">{product.name}</p>
          <p className="text-sm">
            {formatPrice(product.price)} {size && <span className="text-smoke">· {size}</span>}
          </p>
        </div>
        <button
          type="button"
          tabIndex={ctaVisible ? -1 : 0}
          onClick={onAdd}
          className={buttonClasses("solid", "!h-12 !px-5")}
        >
          {size ? "ADD TO BAG" : "SELECT SIZE"}
        </button>
      </div>
    </div>
  );
}
