import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { buttonClasses } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "./SectionHeading";
import { buildCustomOrderMessage, whatsappUrl } from "@/lib/whatsapp";

const STEPS = [
  { n: "01", title: "SEND IT", body: "Artwork, a meme, a sketch on a napkin — drop it on WhatsApp." },
  { n: "02", title: "SEE IT", body: "We clean it up and send a mockup on your tee or hoodie." },
  { n: "03", title: "WEAR IT", body: "Approve it, we print it, it’s at your door." },
];

export function CustomPrintSection({ showPageLink = true }: { showPageLink?: boolean }) {
  return (
    <section id="custom" aria-labelledby="custom-title" className="scroll-mt-16 py-20 lg:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-6">
        <Reveal className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-bone">
            <Image
              src="/images/products/custom-1.jpg"
              alt="Blank white tee laid flat, ready for your custom print"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            {/* Print area guide */}
            <div className="absolute left-[30%] top-[30%] grid h-[30%] w-[38%] place-items-center border-2 border-dashed border-accent">
              <span className="label bg-accent px-2 py-1 !text-[0.6rem] font-semibold text-ink">YOUR ART HERE</span>
              <span className="absolute -left-1 -top-1 size-2 bg-accent" />
              <span className="absolute -right-1 -top-1 size-2 bg-accent" />
              <span className="absolute -bottom-1 -left-1 size-2 bg-accent" />
              <span className="absolute -bottom-1 -right-1 size-2 bg-accent" />
            </div>
          </div>
          <p className="label mt-3 flex justify-between text-smoke">
            <span>FIG. 01 — BLANK CANVAS</span>
            <span>TEES · OVERSIZED · HOODIES</span>
          </p>
        </Reveal>

        <div className="flex flex-col lg:col-span-6 lg:col-start-7">
          <SectionLabel index="03">CUSTOM PRINT</SectionLabel>
          <h2 id="custom-title" className="display mt-6 text-[15vw] sm:text-[11vw] lg:text-[6.5vw] 2xl:text-[7rem]">
            YOU BRING
            <br />
            THE IDEA<span className="text-accent">.</span>
            <br />
            <span className="text-smoke">WE PRINT IT.</span>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-snug">
            Have your own design, artwork, meme, illustration or idea? Send it to us and we&apos;ll turn it into something you
            can wear.
          </p>

          <ol className="mt-10 border-t border-ink/15">
            {STEPS.map((step) => (
              <li key={step.n} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-ink/15 py-5 sm:grid-cols-[3rem_9rem_1fr]">
                <span className="label pt-1 text-accent">{step.n}</span>
                <span className="display text-3xl">{step.title}</span>
                <span className="col-start-2 text-smoke sm:col-start-3">{step.body}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href={whatsappUrl(buildCustomOrderMessage())}
              target="_blank"
              rel="noreferrer"
              className={buttonClasses("solid", "w-full sm:w-auto")}
            >
              <WhatsAppIcon size={18} /> START A CUSTOM ORDER
            </a>
            {showPageLink && (
              <Link href="/custom" className="label group flex items-center gap-1 border-b border-ink pb-1">
                HOW IT WORKS <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
