"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { ProductImage } from "@/lib/types";

/** Desktop: stacked editorial gallery. Mobile: swipeable full-bleed slider with progress. */
export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = railRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="relative">
      {/* Mobile slider */}
      <div className="lg:hidden">
        <div
          ref={railRef}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
          aria-label={`${name} images`}
        >
          {images.map((img, i) => (
            <div key={img.src} className="relative aspect-[4/5] w-full shrink-0 snap-center bg-bone">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="100vw"
                preload={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="absolute inset-x-4 bottom-4 flex gap-1.5" aria-hidden="true">
            {images.map((img, i) => (
              <span
                key={img.src}
                className={`h-[3px] flex-1 transition-colors duration-300 ${i === active ? "bg-paper" : "bg-paper/35"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop editorial stack */}
      <div className="hidden gap-3 lg:grid lg:grid-cols-2">
        {images.map((img, i) => (
          <div
            key={img.src}
            className={`group relative overflow-hidden bg-bone ${
              i === 0 || images.length === 2 ? "col-span-2 aspect-[4/5]" : "aspect-[3/4]"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={i === 0 ? "55vw" : "28vw"}
              preload={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
            />
            <span className="label absolute bottom-3 left-3 bg-paper/90 px-2 py-1 !text-[0.6rem]">
              {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
