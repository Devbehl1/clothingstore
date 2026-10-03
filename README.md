# THREADR — storefront

Premium Gen-Z streetwear & custom-print storefront. Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Lucide. No backend — cart lives in `localStorage`, orders go out as a pre-filled WhatsApp message.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
npm run lint
```

Deploys to Vercel as-is. Set `NEXT_PUBLIC_SITE_URL` to the production URL for correct canonical/OG/sitemap links.

## Where to change things

| What | Where |
| --- | --- |
| Brand name, tagline, **WhatsApp number**, Instagram, email, free-shipping threshold, announcements | `lib/config.ts` (`STORE_CONFIG`) |
| Logo mark | `components/layout/Logo.tsx` |
| Products (name, price, MRP, sizes, colours, images, badge…) | `lib/products.ts` |
| WhatsApp message format | `lib/whatsapp.ts` |
| Checkout validation | `lib/validation.ts` |
| Colours, fonts, animations | `app/globals.css`, `app/layout.tsx` |
| Product / lifestyle images | `public/images/products`, `public/images/lifestyle` (Unsplash/Cloudinary URLs also allowed in `next.config.ts`) |

## Architecture

```
app/                 routes: /, /shop, /product/[slug], /custom, /about (+ sitemap, robots, 404)
components/
  layout/            AnnouncementBar, Navbar, Footer, Logo
  home/              Hero, Marquee, FeaturedDrop, EditorialSection, CustomPrintSection, WhyThreadr, FeedSection, FinalCta
  shop/              ProductCard, ProductGrid, CategoryFilter, ProductCollection
  product/           ProductGallery, ProductPurchasePanel, SizeGuide, ProductAccordions, CustomOrderForm
  cart/              CartProvider, CartDrawer, CheckoutModal, MobileBagButton
lib/                 config, products (async data access), cart-store, whatsapp, validation, types, format
```

All product reads go through the async functions in `lib/products.ts` (`getAllProducts`, `getProductBySlug`, …). To move to a CMS/database later, replace their bodies with fetch/DB calls — pages and components don't change. Likewise, `lib/whatsapp.ts` is the only place that knows how an order is submitted.
