"use client";

import { CATEGORIES } from "@/lib/products";
import type { Category } from "@/lib/types";

export type CategoryValue = Category | "all";

interface CategoryFilterProps {
  value: CategoryValue;
  onChange: (value: CategoryValue) => void;
  counts: Record<CategoryValue, number>;
}

export function CategoryFilter({ value, onChange, counts }: CategoryFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter by category"
      className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0"
    >
      {CATEGORIES.map((cat) => {
        const active = cat.value === value;
        return (
          <button
            key={cat.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(cat.value)}
            className={`label flex h-10 shrink-0 items-center gap-2 rounded-full border px-5 font-medium transition-colors duration-300 ${
              active ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"
            }`}
          >
            {cat.label}
            <sup className={`text-[0.6rem] ${active ? "text-accent" : "text-smoke"}`}>{counts[cat.value]}</sup>
          </button>
        );
      })}
    </div>
  );
}
