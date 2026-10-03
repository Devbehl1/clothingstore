"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { InstagramIcon } from "@/components/icons/BrandIcons";
import { Logo } from "./Logo";
import { NAV_LINKS, STORE_CONFIG } from "@/lib/config";

export function Navbar() {
  const { count, openCart } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300 ${
          scrolled || menuOpen ? "border-ink/10 bg-paper/90 backdrop-blur-md" : "border-transparent bg-paper"
        }`}
      >
        <nav aria-label="Main" className="container-x grid h-14 grid-cols-[1fr_auto_1fr] items-center lg:h-16">
          <div className="flex items-center gap-8">
            <button
              type="button"
              className="-ml-2 grid size-10 place-items-center lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={22} strokeWidth={1.75} />
            </button>
            <ul className="hidden items-center gap-8 lg:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className="label group relative py-2 font-medium"
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                        pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Logo />

          <div className="flex items-center justify-end gap-1 sm:gap-3">
            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${STORE_CONFIG.brandName} on Instagram`}
              className="hidden size-10 place-items-center transition-colors hover:text-accent sm:grid"
            >
              <InstagramIcon size={19} />
            </a>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open bag, ${count} item${count === 1 ? "" : "s"}`}
              className="label group flex h-10 items-center gap-2 font-medium"
            >
              <span className="hidden sm:inline">BAG</span>
              <span
                className={`grid h-7 min-w-7 place-items-center rounded-full px-2 text-[0.7rem] transition-colors duration-300 ${
                  count > 0 ? "bg-accent text-ink" : "bg-ink text-paper group-hover:bg-accent group-hover:text-ink"
                }`}
              >
                {count}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-paper px-4 pb-8 transition-[opacity,visibility] duration-300 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center">
          <button
            type="button"
            className="-ml-2 grid size-10 place-items-center"
            aria-label="Close menu"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
          >
            <X size={22} strokeWidth={1.75} />
          </button>
          <span onClick={() => setMenuOpen(false)}>
            <Logo />
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-between pt-8">
        <ul className="space-y-1">
          {[{ label: "HOME", href: "/" }, ...NAV_LINKS].map((link, i) => (
            <li key={link.href} className="reveal-line">
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
                className="display block text-[16vw] leading-[0.95]"
                style={menuOpen ? { animation: `rise 0.8s var(--ease-out-expo) ${i * 60}ms both` } : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-end justify-between border-t border-ink/15 pt-5">
          <div>
            <p className="label text-smoke">{STORE_CONFIG.tagline}</p>
            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noreferrer"
              tabIndex={menuOpen ? 0 : -1}
              className="label mt-2 flex items-center gap-2"
            >
              <InstagramIcon size={16} /> {STORE_CONFIG.instagram}
            </a>
          </div>
          <p className="label text-smoke">FREE SHIPPING ₹{STORE_CONFIG.freeShippingThreshold}+</p>
        </div>
        </div>
      </div>
    </>
  );
}
