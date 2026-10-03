import { Plus } from "lucide-react";
import type { Product } from "@/lib/types";

export function ProductAccordions({ product }: { product: Product }) {
  const sections = [
    { title: "DESCRIPTION", body: product.description, open: true },
    { title: "FIT & SIZE", body: `${product.fit} Available in ${product.sizes.join(", ")}. See the size guide for measurements.` },
    { title: "PRINT DETAILS", body: product.printDetails },
    {
      title: "CARE",
      body: "Machine wash cold, inside out. Do not bleach. Tumble dry low or line dry in shade. Do not iron directly on print.",
    },
  ];

  return (
    <div className="border-t border-ink">
      {sections.map((s) => (
        <details key={s.title} open={s.open} className="group border-b border-ink/15">
          <summary className="label flex cursor-pointer list-none items-center justify-between py-5 font-medium">
            {s.title}
            <Plus size={16} className="transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <p className="pb-6 pr-8 leading-relaxed text-ink/75">{s.body}</p>
        </details>
      ))}
    </div>
  );
}
