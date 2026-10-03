import type { Metadata } from "next";
import Image from "next/image";
import { CustomPrintSection } from "@/components/home/CustomPrintSection";
import { Marquee } from "@/components/home/Marquee";
import { CustomOrderForm } from "@/components/product/CustomOrderForm";
import { STORE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Custom Print",
  description: `Your design, artwork, meme or idea — printed on premium tees and hoodies by ${STORE_CONFIG.brandName}. Start a custom order on WhatsApp.`,
  alternates: { canonical: "/custom" },
};

const FAQ = [
  {
    q: "What can I send?",
    a: "Anything — PNG, JPG, PDF, AI, a screenshot, a sketch, a reference from Pinterest. If it’s low-res, we’ll tell you and help clean it up.",
  },
  {
    q: "Can I print on the back or sleeves?",
    a: "Yes. Front, back, sleeves or all of them. We’ll show you placement on the mockup before printing.",
  },
  {
    q: "Do you do bulk orders?",
    a: "Yes — college fests, events, crews, small brands. Send quantities on WhatsApp and we’ll share pricing.",
  },
  {
    q: "How long does it take?",
    a: "We confirm timelines on WhatsApp once we’ve seen your design — it depends on the print method and quantity.",
  },
];

export default function CustomPage() {
  return (
    <>
      <section className="container-x pb-12 pt-8 lg:pb-20 lg:pt-14">
        <div className="label flex justify-between border-b border-ink/15 pb-3 text-smoke">
          <span>CUSTOM PRINT STUDIO</span>
          <span className="text-ink">TEES · OVERSIZED · HOODIES</span>
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <h1 className="display text-[22vw] leading-[0.8] lg:col-span-8 lg:text-[12.5vw] 2xl:text-[13rem]">
            MAKE IT
            <br />
            <span className="text-accent">YOURS.</span>
          </h1>
          <p className="max-w-sm text-lg leading-snug lg:col-span-4 lg:pb-4">
            Your art. Your inside joke. Your band, your crew, your fest. Printed on the same heavy cotton as our drops.
          </p>
        </div>
      </section>

      <div className="container-x grid grid-cols-3 gap-2">
        {[
          { src: "/images/products/custom-2.jpg", alt: "Blank tee on a hanger, ready for your print" },
          { src: "/images/lifestyle/heart.jpg", alt: "Custom printed white tee with a broken-heart graphic" },
          { src: "/images/products/custom-3.jpg", alt: "Close-up of a small custom chest print" },
        ].map((img, i) => (
          <div key={img.src} className={`relative overflow-hidden bg-bone ${i === 1 ? "aspect-[3/4] translate-y-8" : "aspect-[3/4]"}`}>
            <Image src={img.src} alt={img.alt} fill sizes="33vw" className="object-cover" />
          </div>
        ))}
      </div>

      <div className="pt-12">
        <CustomPrintSection showPageLink={false} />
      </div>

      <Marquee tone="accent" items={["YOUR ART", "YOUR MEME", "YOUR RULES", "WE PRINT IT"]} />

      <section className="container-x grid gap-14 py-20 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-6">
          <h2 className="display text-6xl lg:text-8xl">
            TELL US
            <br />
            THE IDEA<span className="text-accent">.</span>
          </h2>
          <p className="mt-4 max-w-md text-smoke">
            Fill this in and we&apos;ll open WhatsApp with everything pre-written. Attach your design in the chat.
          </p>
          <div className="mt-10">
            <CustomOrderForm />
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <h2 className="label">GOOD TO KNOW</h2>
          <div className="mt-4 border-t border-ink">
            {FAQ.map((item) => (
              <details key={item.q} className="group border-b border-ink/15">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold tracking-tight">
                  {item.q}
                  <span className="text-2xl font-light transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="pb-6 pr-8 text-ink/70">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
