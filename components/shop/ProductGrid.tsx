import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { Reveal } from "@/components/ui/Reveal";

export function ProductGrid({ products, priorityCount = 0 }: { products: Product[]; priorityCount?: number }) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-y-14">
      {products.map((product, i) => (
        <Reveal as="li" key={product.id} delay={(i % 4) * 80}>
          <ProductCard product={product} priority={i < priorityCount} index={i} />
        </Reveal>
      ))}
    </ul>
  );
}
