"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { CategoryFilter, type CategoryValue } from "./CategoryFilter";
import { ProductCard } from "./ProductCard";

interface ProductCollectionProps {
  products: Product[];
  initialCategory?: CategoryValue;
  heading?: React.ReactNode;
}

export function ProductCollection({ products, initialCategory = "all", heading }: ProductCollectionProps) {
  const [category, setCategory] = useState<CategoryValue>(initialCategory);

  const counts = useMemo(() => {
    const c: Record<CategoryValue, number> = { all: products.length, tees: 0, oversized: 0, hoodies: 0, custom: 0 };
    products.forEach((p) => c[p.category]++);
    return c;
  }, [products]);

  const visible = category === "all" ? products : products.filter((p) => p.category === category);

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        {heading}
        <CategoryFilter value={category} onChange={setCategory} counts={counts} />
      </div>
      <ul key={category} className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:mt-12 lg:grid-cols-4 lg:gap-y-14">
        {visible.map((product, i) => (
          <li key={product.id} className="animate-fade" style={{ animationDelay: `${Math.min(i, 7) * 50}ms` }}>
            <ProductCard product={product} index={i} />
          </li>
        ))}
      </ul>
      {visible.length === 0 && <p className="mt-12 text-smoke">Nothing here yet — next drop loading.</p>}
    </div>
  );
}
