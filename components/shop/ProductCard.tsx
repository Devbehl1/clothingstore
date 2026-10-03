"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { discountPercent, formatPrice } from "@/lib/format";
import type { Product, Size } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  /** Eager-load images for above-the-fold cards. */
  priority?: boolean;
  sizes?: string;
  aspect?: string;
  index?: number;
}

export function ProductCard({
  product,
  priority = false,
  sizes = "(min-width: 1024px) 25vw, 50vw",
  aspect = "aspect-[4/5]",
  index,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [picking, setPicking] = useState(false);
  const [added, setAdded] = useState<Size | null>(null);
  const [primary, secondary] = product.images;
  const off = discountPercent(product.price, product.mrp);

  const quickAdd = (size: Size) => {
    addItem(product, size, 1);
    setAdded(size);
    setPicking(false);
    window.setTimeout(() => setAdded(null), 1600);
  };

  return (
    <article className="group relative">
      <div className={`relative overflow-hidden bg-bone ${aspect}`}>
        <Link href={`/product/${product.slug}`} aria-label={product.name} className="absolute inset-0 block">
          <Image
            src={primary.src}
            alt={primary.alt}
            fill
            sizes={sizes}
            loading={priority ? "eager" : "lazy"}
            className="object-cover transition-[transform,opacity] duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
          />
          {secondary && (
            <Image
              src={secondary.src}
              alt=""
              fill
              sizes={sizes}
              loading="lazy"
              className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}
        </Link>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3">
          {product.badge ? (
            <span
              className={`label px-2 py-1 !text-[0.6rem] font-semibold ${
                product.badge === "BESTSELLER" ? "bg-accent text-ink" : "bg-paper text-ink"
              }`}
            >
              {product.badge}
            </span>
          ) : (
            <span />
          )}
          {typeof index === "number" && (
            <span className="label !text-[0.6rem] text-paper mix-blend-difference">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>

        {/* Quick add: hover on desktop, tap "+" on touch. */}
        <div
          className={`absolute inset-x-2 bottom-2 bg-paper/95 backdrop-blur transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)] ${
            picking
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-3 opacity-0 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
          }`}
        >
          <div className="flex items-center justify-between px-3 pt-2">
            <p className="label !text-[0.6rem] text-smoke">QUICK ADD — PICK SIZE</p>
            {picking && (
              <button type="button" aria-label="Close sizes" onClick={() => setPicking(false)} className="-mr-1 p-1">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="grid grid-cols-5 gap-px p-2 pt-1.5">
            {product.sizes.slice(0, 5).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => quickAdd(size)}
                aria-label={`Add ${product.name}, size ${size}, to bag`}
                className="label h-9 !text-[0.7rem] font-medium transition-colors hover:bg-ink hover:text-paper"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPicking((v) => !v)}
          aria-label={`Quick add ${product.name}`}
          aria-expanded={picking}
          className={`absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-paper text-ink shadow-sm transition-[transform,opacity,background-color] duration-300 active:scale-90 [@media(hover:hover)]:hidden ${
            picking ? "pointer-events-none scale-75 opacity-0" : ""
          } ${added ? "!bg-accent" : ""}`}
        >
          {added ? <Check size={18} /> : <Plus size={18} />}
        </button>

        {added && (
          <p
            role="status"
            className="label absolute inset-x-2 bottom-2 hidden animate-[fade_0.3s_ease_both] bg-ink py-3 text-center !text-[0.65rem] text-paper [@media(hover:hover)]:block"
          >
            ADDED · SIZE {added}
          </p>
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[0.85rem] font-semibold uppercase leading-tight tracking-tight sm:text-[0.95rem]">
            <Link href={`/product/${product.slug}`} className="hover:underline hover:underline-offset-4">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 hidden truncate text-sm text-smoke sm:block">{product.tagline}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[0.85rem] font-semibold sm:text-[0.95rem]">{formatPrice(product.price)}</p>
          {off > 0 && (
            <p className="text-xs text-smoke">
              <span className="line-through">{formatPrice(product.mrp)}</span>
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
