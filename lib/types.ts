export type Category = "tees" | "oversized" | "hoodies" | "custom";

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type Badge = "NEW" | "BESTSELLER" | "LOW STOCK" | "CUSTOM";

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  mrp: number;
  category: Category;
  /** One-liner shown on cards + under the title. */
  tagline: string;
  description: string;
  images: ProductImage[];
  sizes: Size[];
  colors: ProductColor[];
  badge?: Badge;
  fit: string;
  printDetails: string;
  featured?: boolean;
}

export interface CartItem {
  /** Unique per product + size + color. */
  lineId: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size: Size;
  color: string;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  note?: string;
}
