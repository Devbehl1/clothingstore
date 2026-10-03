/**
 * Single source of truth for brand + store settings.
 * Change the brand name, WhatsApp number or socials here and the whole site updates.
 */
export const STORE_CONFIG = {
  brandName: "THREADR",
  tagline: "WEAR YOUR MOOD.",
  description:
    "Affordable streetwear. Loud ideas. Printed for you. Oversized tees, graphic tees, hoodies and custom prints made in India.",
  /** International format, digits only — no "+", spaces or dashes. */
  whatsappNumber: "91XXXXXXXXXX",
  instagram: "@threadr",
  instagramUrl: "https://instagram.com/threadr",
  email: "hello@threadr.in",
  /** Used for canonical URLs + Open Graph. Set NEXT_PUBLIC_SITE_URL on Vercel. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://threadr.vercel.app",
  currency: "INR",
  freeShippingThreshold: 999,
  announcements: [
    "FREE SHIPPING ABOVE ₹999",
    "DROP 01 IS LIVE",
    "ORDER IN 30 SECONDS ON WHATSAPP",
  ],
  currentDrop: "DROP 01",
} as const;

export const NAV_LINKS = [
  { label: "SHOP", href: "/shop" },
  { label: "CUSTOM PRINT", href: "/custom" },
  { label: "ABOUT", href: "/about" },
] as const;
