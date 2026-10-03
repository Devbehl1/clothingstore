import type { Metadata, Viewport } from "next";
import { Anton, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutModal } from "@/components/cart/CheckoutModal";
import { MobileBagButton } from "@/components/cart/MobileBagButton";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { STORE_CONFIG } from "@/lib/config";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const title = `${STORE_CONFIG.brandName} — ${STORE_CONFIG.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(STORE_CONFIG.siteUrl),
  title: { default: title, template: `%s | ${STORE_CONFIG.brandName}` },
  description: STORE_CONFIG.description,
  applicationName: STORE_CONFIG.brandName,
  keywords: [
    "streetwear India",
    "oversized t-shirts",
    "graphic tees",
    "custom printed t-shirts",
    "hoodies",
    "Gen-Z fashion",
    STORE_CONFIG.brandName,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: STORE_CONFIG.brandName,
    title,
    description: STORE_CONFIG.description,
    images: [{ url: "/images/products/no-signal-1.jpg", width: 1400, height: 2100, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: STORE_CONFIG.description,
    images: ["/images/products/no-signal-1.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${anton.variable} ${interTight.variable} ${jetbrains.variable}`}>
      <body className="grain flex min-h-dvh flex-col">
        <a
          href="#main"
          className="label sr-only z-[90] bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <CheckoutModal />
          <MobileBagButton />
        </CartProvider>
      </body>
    </html>
  );
}
