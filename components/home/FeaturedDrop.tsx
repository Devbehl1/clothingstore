import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/shop/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "./SectionHeading";
import { STORE_CONFIG } from "@/lib/config";

const OFFSETS = ["", "lg:mt-28", "lg:mt-10", "lg:mt-40"];

export function FeaturedDrop({ products }: { products: Product[] }) {
  return (
    <section id="drop" aria-labelledby="drop-title" className="scroll-mt-16 py-20 lg:py-32">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="01">THE LATEST</SectionLabel>
            <h2 id="drop-title" className="display mt-4 text-[26vw] sm:text-[20vw] lg:text-[13rem] xl:text-[15rem]">
              {STORE_CONFIG.currentDrop}
            </h2>
          </div>
          <div className="flex items-end justify-between gap-6 lg:col-span-5 lg:flex-col lg:items-end lg:pb-6">
            <p className="max-w-[16rem] text-2xl font-medium leading-tight tracking-tight lg:text-right lg:text-3xl">
              Your next favourite tee.
            </p>
            <Link href="/shop" className="label group flex shrink-0 items-center gap-2 border-b border-ink pb-1">
              VIEW ALL <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile: swipeable rail. Desktop: staggered editorial grid. */}
      <ul className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 sm:scroll-px-6 sm:px-6 lg:container-x lg:mt-16 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible">
        {products.map((product, i) => (
          <li key={product.id} className={`w-[72vw] shrink-0 snap-start sm:w-[44vw] lg:w-auto ${OFFSETS[i % 4]}`}>
            <Reveal delay={i * 90}>
              <ProductCard product={product} index={i} sizes="(min-width: 1024px) 25vw, 72vw" aspect="aspect-[3/4]" />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
