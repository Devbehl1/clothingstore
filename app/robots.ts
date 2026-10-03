import type { MetadataRoute } from "next";
import { STORE_CONFIG } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${STORE_CONFIG.siteUrl}/sitemap.xml`,
  };
}
