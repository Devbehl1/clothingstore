import Link from "next/link";
import { STORE_CONFIG } from "@/lib/config";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/BrandIcons";
import { whatsappUrl } from "@/lib/whatsapp";

const LINKS = [
  { label: "SHOP", href: "/shop" },
  { label: "CUSTOM PRINT", href: "/custom" },
  { label: "ABOUT", href: "/about" },
];

export function Footer() {
  const year = 2026;
  return (
    <footer className="bg-ink text-paper">
      <div className="container-x pt-16 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label text-accent">{STORE_CONFIG.tagline}</p>
            <p className="mt-5 max-w-sm text-lg leading-snug text-paper/70">
              Affordable streetwear and custom prints, made in small batches in India. New drops every month.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 lg:col-span-7 lg:grid-cols-3">
            <div>
              <p className="label text-paper/40">EXPLORE</p>
              <ul className="mt-4 space-y-2">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="label transition-colors hover:text-accent">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label text-paper/40">CONTACT</p>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href={whatsappUrl(`Hey ${STORE_CONFIG.brandName} 👋`)}
                    target="_blank"
                    rel="noreferrer"
                    className="label inline-flex items-center gap-2 transition-colors hover:text-accent"
                  >
                    <WhatsAppIcon size={14} /> WHATSAPP
                  </a>
                </li>
                <li>
                  <a href={`mailto:${STORE_CONFIG.email}`} className="label transition-colors hover:text-accent">
                    {STORE_CONFIG.email.toUpperCase()}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="label text-paper/40">FOLLOW</p>
              <a
                href={STORE_CONFIG.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="label mt-4 inline-flex items-center gap-2 transition-colors hover:text-accent"
              >
                <InstagramIcon size={14} /> INSTAGRAM
              </a>
            </div>
          </nav>
        </div>

        <p
          aria-hidden="true"
          className="display mt-16 select-none pb-[0.08em] text-center text-[26.5vw] leading-[0.78] text-paper lg:mt-24 2xl:text-[25rem]"
        >
          {STORE_CONFIG.brandName}
        </p>

        <div className="flex flex-col gap-2 border-t border-paper/15 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-paper/50">
            © {year} {STORE_CONFIG.brandName}
          </p>
          <p className="label text-paper/50">PRINTED WITH CARE IN INDIA</p>
        </div>
      </div>
    </footer>
  );
}
