import type { Category, Product, Size } from "./types";

/**
 * Local product catalogue.
 * The async getters below are the only API the UI uses — swap their bodies
 * for a CMS / database call later without touching any component.
 */

const TEE_SIZES: Size[] = ["S", "M", "L", "XL", "XXL"];
const OVERSIZED_SIZES: Size[] = ["XS", "S", "M", "L", "XL"];

const BLACK = { name: "Washed Black", hex: "#141414" };
const WHITE = { name: "Optic White", hex: "#F4F4F0" };
const CREAM = { name: "Bone", hex: "#E9E1D2" };

const img = (file: string, alt: string) => ({ src: `/images/products/${file}`, alt });

const PRODUCTS: Product[] = [
  {
    id: "thr-001",
    name: "NO SIGNAL OVERSIZED TEE",
    slug: "no-signal-oversized-tee",
    price: 699,
    mrp: 999,
    category: "oversized",
    tagline: "Currently unreachable. On purpose.",
    description:
      "For the days you put your phone face-down and mean it. A heavyweight oversized tee with a high-density front print that reads loud without trying too hard.",
    images: [
      img("no-signal-1.jpg", "Model wearing the black No Signal oversized tee against a concrete wall"),
      img("no-signal-2.jpg", "No Signal oversized tee on a hanger"),
    ],
    sizes: OVERSIZED_SIZES,
    colors: [BLACK],
    badge: "BESTSELLER",
    fit: "Oversized, drop shoulder. Size down for a regular fit.",
    printDetails: "High-density screen print on front. Soft-hand finish that won’t crack.",
    featured: true,
  },
  {
    id: "thr-002",
    name: "OFFLINE CLUB TEE",
    slug: "offline-club-tee",
    price: 649,
    mrp: 899,
    category: "tees",
    tagline: "Members only. Wi-Fi not included.",
    description:
      "Membership is free, the only rule is logging off. A clean everyday tee with a bold chest graphic — the one you’ll reach for first.",
    images: [
      img("offline-club-1.jpg", "Model wearing the white Offline Club tee"),
      img("offline-club-2.jpg", "Close-up of the white Offline Club tee"),
    ],
    sizes: TEE_SIZES,
    colors: [WHITE],
    badge: "NEW",
    fit: "Regular fit, true to size.",
    printDetails: "Direct-to-garment chest print. Vibrant ink that sinks into the fabric.",
    featured: true,
  },
  {
    id: "thr-003",
    name: "404 MOOD NOT FOUND",
    slug: "404-mood-not-found",
    price: 699,
    mrp: 999,
    category: "oversized",
    tagline: "Please try again later.",
    description:
      "Error page energy for the days you’re simply not loading. Boxy oversized cut, small chest hit, bigger statement.",
    images: [
      img("404-mood-1.jpg", "Black 404 Mood Not Found oversized tee on a hanger"),
      img("404-mood-2.jpg", "Model wearing the black 404 Mood Not Found tee"),
    ],
    sizes: OVERSIZED_SIZES,
    colors: [BLACK],
    badge: "NEW",
    fit: "Oversized, boxy. Take your usual size for the intended slouch.",
    printDetails: "Puff print chest logo with screen-printed back graphic.",
    featured: true,
  },
  {
    id: "thr-004",
    name: "AFTER HOURS OVERSIZED",
    slug: "after-hours-oversized",
    price: 749,
    mrp: 1099,
    category: "oversized",
    tagline: "Built for 2AM plans.",
    description:
      "The tee for late drives, later conversations and never-ending playlists. 240 GSM cotton that holds its shape night after night.",
    images: [
      img("after-hours-1.jpg", "Model wearing the black After Hours oversized tee outdoors"),
      img("after-hours-2.jpg", "Rack of After Hours oversized tees"),
    ],
    sizes: OVERSIZED_SIZES,
    colors: [BLACK],
    badge: "LOW STOCK",
    fit: "Oversized, drop shoulder, longer body length.",
    printDetails: "Tonal back print with reflective detail. Glows under flash.",
    featured: true,
  },
  {
    id: "thr-005",
    name: "NO PLANS TODAY",
    slug: "no-plans-today",
    price: 599,
    mrp: 799,
    category: "tees",
    tagline: "And honestly? Thriving.",
    description:
      "A soft, breathable tee for doing absolutely nothing — and looking good while at it. Minimal serif typography, maximum attitude.",
    images: [
      img("no-plans-1.jpg", "Model wearing the white No Plans Today tee"),
      img("no-plans-2.jpg", "Model in a cap wearing the No Plans Today tee"),
    ],
    sizes: TEE_SIZES,
    colors: [WHITE],
    fit: "Regular fit, true to size.",
    printDetails: "Water-based screen print. Breathable and super soft to touch.",
  },
  {
    id: "thr-006",
    name: "CHAOS CLUB TEE",
    slug: "chaos-club-tee",
    price: 699,
    mrp: 949,
    category: "tees",
    tagline: "Organised chaos. Mostly chaos.",
    description:
      "For the friend group that never sticks to the plan. A cobalt-on-bone graphic that turns heads in every group photo.",
    images: [
      img("chaos-club-1.jpg", "Bone coloured Chaos Club tee with a blue graphic print"),
      img("chaos-club-2.jpg", "Model wearing a graphic tee in the mountains"),
    ],
    sizes: TEE_SIZES,
    colors: [CREAM, WHITE],
    badge: "BESTSELLER",
    fit: "Relaxed regular fit. Size up for an oversized look.",
    printDetails: "Large-format front screen print in two colours.",
  },
  {
    id: "thr-007",
    name: "LOW BATTERY SOCIAL CLUB",
    slug: "low-battery-social-club",
    price: 649,
    mrp: 899,
    category: "oversized",
    tagline: "Social, but at 12%.",
    description:
      "Shows up, says hi, leaves early. An oversized white tee with a full back print for the introverted extroverts.",
    images: [
      img("low-battery-1.jpg", "Back view of the Low Battery Social Club oversized tee"),
      img("low-battery-2.jpg", "Model wearing a white Low Battery Social Club tee"),
    ],
    sizes: OVERSIZED_SIZES,
    colors: [WHITE],
    fit: "Oversized, drop shoulder.",
    printDetails: "Full back screen print + small front chest logo.",
  },
  {
    id: "thr-008",
    name: "STAY WEIRD HOODIE",
    slug: "stay-weird-hoodie",
    price: 1099,
    mrp: 1599,
    category: "hoodies",
    tagline: "Normal was never the plan.",
    description:
      "A 320 GSM brushed-fleece hoodie with a loud back graphic. Warm enough for Delhi winters, cool enough for everything else.",
    images: [
      img("stay-weird-1.jpg", "Back view of the mustard Stay Weird hoodie with skull graphic"),
      img("stay-weird-2.jpg", "Model wearing a hoodie in a dark stairwell"),
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Mustard", hex: "#D9A21B" }],
    badge: "NEW",
    fit: "Relaxed fit with ribbed cuffs and hem.",
    printDetails: "Oversized back screen print. Embroidered chest hit.",
  },
  {
    id: "thr-009",
    name: "OFF-GRID HOODIE",
    slug: "off-grid-hoodie",
    price: 1149,
    mrp: 1699,
    category: "hoodies",
    tagline: "Location: not sharing.",
    description:
      "Heather grey, heavyweight and quietly confident. Your go-to layer for hill trips, late flights and early classes.",
    images: [img("off-grid-1.jpg", "Back view of a model in the heather grey Off-Grid hoodie outdoors")],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Heather Grey", hex: "#A7A9AC" }],
    fit: "Relaxed fit, roomy hood.",
    printDetails: "Tonal puff print across the back yoke.",
  },
  {
    id: "thr-010",
    name: "SOFT LAUNCH HOODIE",
    slug: "soft-launch-hoodie",
    price: 1099,
    mrp: 1499,
    category: "hoodies",
    tagline: "Hinting, not telling.",
    description:
      "Dusty pink, brushed inside, and made for the era you’re not ready to announce yet.",
    images: [img("soft-launch-1.jpg", "Model wearing the dusty pink Soft Launch hoodie with hood up")],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Dusty Pink", hex: "#E7B7BE" }],
    badge: "NEW",
    fit: "Relaxed, slightly cropped body.",
    printDetails: "Small embroidered chest wordmark.",
  },
  {
    id: "thr-011",
    name: "TOUCH GRASS TEE",
    slug: "touch-grass-tee",
    price: 599,
    mrp: 799,
    category: "tees",
    tagline: "Doctor’s orders.",
    description:
      "A forest-green everyday tee with a tiny pocket print. A gentle reminder, worn on your chest.",
    images: [
      img("touch-grass-1.jpg", "Forest green Touch Grass tee laid flat"),
      img("touch-grass-2.jpg", "Stack of folded THREADR tees in different colours"),
    ],
    sizes: TEE_SIZES,
    colors: [{ name: "Forest", hex: "#1F5C4A" }],
    fit: "Regular fit, true to size.",
    printDetails: "Pocket-size screen print on chest.",
  },
  {
    id: "thr-012",
    name: "YOUR DESIGN HERE TEE",
    slug: "your-design-here-tee",
    price: 799,
    mrp: 999,
    category: "custom",
    tagline: "Your art. Our print. Your rules.",
    description:
      "Send us your artwork, meme, illustration or a rough idea — we’ll set it up, send you a mockup and print it on a premium 220 GSM tee.",
    images: [
      img("custom-1.jpg", "Blank white tee ready for a custom print"),
      img("custom-2.jpg", "White tee hanging against a concrete wall"),
      img("custom-3.jpg", "Close-up of a premium white tee"),
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [WHITE, BLACK],
    badge: "CUSTOM",
    fit: "Choose regular or oversized when you send your design.",
    printDetails: "DTF or screen print depending on your artwork. Front, back or both.",
  },
];

export const CATEGORIES: { label: string; value: Category | "all" }[] = [
  { label: "ALL", value: "all" },
  { label: "TEES", value: "tees" },
  { label: "OVERSIZED", value: "oversized" },
  { label: "HOODIES", value: "hoodies" },
  { label: "CUSTOM", value: "custom" },
];

export async function getAllProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.featured).slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return PRODUCTS.find((p) => p.slug === slug);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const sameCategory = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category);
  const others = PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category);
  return [...sameCategory, ...others].slice(0, limit);
}
