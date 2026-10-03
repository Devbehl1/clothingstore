"use client";

import { useState } from "react";
import { Ruler, X } from "lucide-react";
import type { Category } from "@/lib/types";
import { useOverlay } from "@/lib/use-lock-body";

const CHARTS: Record<"tee" | "oversized" | "hoodie", { head: string[]; rows: (string | number)[][] }> = {
  tee: {
    head: ["SIZE", "CHEST (IN)", "LENGTH (IN)", "SHOULDER (IN)"],
    rows: [
      ["S", 38, 27, 17],
      ["M", 40, 28, 18],
      ["L", 42, 29, 19],
      ["XL", 44, 30, 20],
      ["XXL", 46, 31, 21],
    ],
  },
  oversized: {
    head: ["SIZE", "CHEST (IN)", "LENGTH (IN)", "SHOULDER (IN)"],
    rows: [
      ["XS", 42, 27, 20],
      ["S", 44, 28, 21],
      ["M", 46, 29, 22],
      ["L", 48, 30, 23],
      ["XL", 50, 31, 24],
    ],
  },
  hoodie: {
    head: ["SIZE", "CHEST (IN)", "LENGTH (IN)", "SLEEVE (IN)"],
    rows: [
      ["XS", 40, 25, 24],
      ["S", 42, 26, 25],
      ["M", 44, 27, 25.5],
      ["L", 46, 28, 26],
      ["XL", 48, 29, 26.5],
      ["XXL", 50, 30, 27],
    ],
  },
};

export function SizeGuide({ category }: { category: Category }) {
  const [open, setOpen] = useState(false);
  useOverlay(open, () => setOpen(false));
  const chart = CHARTS[category === "hoodies" ? "hoodie" : category === "oversized" ? "oversized" : "tee"];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="label flex items-center gap-1.5 underline-offset-4 hover:underline"
      >
        <Ruler size={14} /> SIZE GUIDE
      </button>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
          <div className="absolute inset-0 animate-[fade_0.3s_ease_both] bg-ink/60" onClick={() => setOpen(false)} />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="size-guide-title"
            className="relative w-full max-w-lg animate-[fade_0.4s_var(--ease-out-expo)_both] bg-paper p-6 sm:p-8"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close size guide"
              autoFocus
              className="absolute right-3 top-3 grid size-10 place-items-center"
            >
              <X size={20} />
            </button>
            <h2 id="size-guide-title" className="display text-5xl">
              SIZE GUIDE
            </h2>
            <p className="mt-2 text-sm text-smoke">Garment measurements, laid flat. Between sizes? Size up for more slouch.</p>
            <table className="mt-6 w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ink">
                  {chart.head.map((h) => (
                    <th key={h} scope="col" className="label py-2 pr-2 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chart.rows.map((row) => (
                  <tr key={row[0]} className="border-b border-ink/10">
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row" className="py-2.5 pr-2 font-semibold">
                          {cell}
                        </th>
                      ) : (
                        <td key={i} className="py-2.5 pr-2 tabular-nums">
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="label mt-5 text-smoke">MODEL IS 6&apos;0&quot; / 183CM AND WEARS SIZE L.</p>
          </div>
        </div>
      )}
    </>
  );
}
