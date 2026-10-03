import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { ProductAccordions } from "@/components/product/ProductAccordions";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { STORE_CONFIG } from "@/lib/config";

const CATEGORY_LABEL = { tees: "TEES", oversized: "OVERSIZED", hoodies: "HOODIES", custom: "CUSTOM" } as const;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  const title = `${product.name} — ${formatPrice(product.price)}`;
  return {
    title,
    description: `${product.tagline} ${product.description}`,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: `${title} | ${STORE_CONFIG.brandName}`,
      description: product.tagline,
      images: product.images.map((img) => ({ url: img.src, alt: img.alt })),
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const related = await getRelatedProducts(product, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.id,
    brand: { "@type": "Brand", name: STORE_CONFIG.brandName },
    image: product.images.map((img) => new URL(img.src, STORE_CONFIG.siteUrl).toString()),
    color: product.colors.map((c) => c.name).join(", "),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: STORE_CONFIG.currency,
      availability: "https://schema.org/InStock",
      url: new URL(`/product/${product.slug}`, STORE_CONFIG.siteUrl).toString(),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="lg:container-x lg:pt-6">
        <nav aria-label="Breadcrumb" className="label hidden gap-2 pb-4 text-smoke lg:flex">
          <Link href="/" className="hover:text-ink">
            HOME
          </Link>
          /
          <Link href="/shop" className="hover:text-ink">
            SHOP
          </Link>
          /<span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-12 lg:gap-10 xl:gap-16">
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} name={product.name} />
          </div>

          <div className="container-x pt-6 lg:col-span-5 lg:px-0 lg:pt-0">
            <div className="lg:sticky lg:top-24 lg:pb-10">
              <div className="flex items-center gap-3">
                <span className="label text-smoke">{CATEGORY_LABEL[product.category]}</span>
                {product.badge && <span className="label bg-ink px-2 py-0.5 !text-[0.6rem] text-paper">{product.badge}</span>}
              </div>
              <h1 className="display mt-3 text-[13vw] leading-[0.85] sm:text-6xl xl:text-7xl">{product.name}</h1>
              <p className="mt-3 text-lg text-smoke">{product.tagline}</p>

              <div className="mt-6">
                <ProductPurchasePanel product={product} />
              </div>

              <p className="label mt-6 flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-accent" aria-hidden="true" />
                PRINTED WITH CARE IN INDIA.
              </p>
              <ul className="mt-6 grid grid-cols-3 border-y border-ink/15 text-center">
                {["FREE SHIPPING ₹999+", "EASY WHATSAPP ORDER", "MADE IN SMALL BATCHES"].map((t) => (
                  <li key={t} className="label border-r border-ink/15 px-1 py-4 !text-[0.6rem] leading-relaxed last:border-r-0">
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <ProductAccordions product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section aria-labelledby="related-title" className="container-x py-20 lg:py-32">
        <div className="flex items-end justify-between">
          <h2 id="related-title" className="display text-6xl lg:text-8xl">
            PAIRS WELL
            <br />
            WITH<span className="text-accent">.</span>
          </h2>
          <Link href="/shop" className="label border-b border-ink pb-1">
            VIEW ALL
          </Link>
        </div>
        <div className="mt-10">
          <ProductGrid products={related} />
        </div>
      </section>
    </>
  );
}
