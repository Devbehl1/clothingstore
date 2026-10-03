import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";
import { STORE_CONFIG } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();
  const base = STORE_CONFIG.siteUrl;
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/shop`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/custom`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.5 },
    ...products.map((p) => ({
      url: `${base}/product/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
