import type { Metadata } from "next";
import { ProductCollection } from "@/components/shop/ProductCollection";
import { Marquee } from "@/components/home/Marquee";
import { getAllProducts } from "@/lib/products";
import { STORE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Shop",
  description: `Shop ${STORE_CONFIG.currentDrop}: oversized tees, graphic tees, hoodies and custom prints from ₹599. Order in seconds on WhatsApp.`,
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const products = await getAllProducts();
  const minPrice = Math.min(...products.map((p) => p.price));

  return (
    <>
      <section className="container-x pb-20 pt-8 lg:pb-32 lg:pt-14">
        <div className="label flex justify-between border-b border-ink/15 pb-3 text-smoke">
          <span>{STORE_CONFIG.currentDrop} — ALL PIECES</span>
          <span className="text-ink">{products.length} STYLES · FROM ₹{minPrice}</span>
        </div>
        <ProductCollection
          products={products}
          heading={
            <div className="mt-6 lg:mt-10">
              <h1 className="display text-[30vw] leading-[0.8] lg:text-[16rem]">
                SHOP<span className="text-accent">.</span>
              </h1>
              <p className="mt-4 max-w-sm text-lg leading-snug text-smoke">
                Heavy cotton, loud prints, honest prices. Tap + on any piece to add it in one go.
              </p>
            </div>
          }
        />
      </section>
      <Marquee />
    </>
  );
}
