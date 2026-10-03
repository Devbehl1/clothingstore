import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow swapping local placeholders for a CDN / CMS later.
    remotePatterns: [new URL("https://images.unsplash.com/**"), new URL("https://res.cloudinary.com/**")],
  },
};

export default nextConfig;
