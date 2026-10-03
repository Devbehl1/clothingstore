import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { FeaturedDrop } from "@/components/home/FeaturedDrop";
import { EditorialSection } from "@/components/home/EditorialSection";
import { CustomPrintSection } from "@/components/home/CustomPrintSection";
import { WhyThreadr } from "@/components/home/WhyThreadr";
import { FeedSection } from "@/components/home/FeedSection";
import { FinalCta } from "@/components/home/FinalCta";
import { SectionLabel } from "@/components/home/SectionHeading";
import { ProductCollection } from "@/components/shop/ProductCollection";
import { getAllProducts, getFeaturedProducts } from "@/lib/products";

export default async function HomePage() {
  const [featured, all] = await Promise.all([getFeaturedProducts(4), getAllProducts()]);

  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedDrop products={featured} />
      <EditorialSection />
      <CustomPrintSection />
      <Marquee tone="accent" items={["YOUR ART", "YOUR MEME", "YOUR RULES", "WE PRINT IT"]} />
      <WhyThreadr />
      <section aria-labelledby="collection-title" className="bg-bone/50 py-20 lg:py-32">
        <div className="container-x">
          <ProductCollection
            products={all}
            heading={
              <div>
                <SectionLabel index="05">SHOP BY MOOD</SectionLabel>
                <h2 id="collection-title" className="display mt-5 text-[17vw] sm:text-[13vw] lg:text-[8.5rem]">
                  THE COLLECTION
                </h2>
              </div>
            }
          />
        </div>
      </section>
      <FeedSection />
      <FinalCta />
    </>
  );
}
