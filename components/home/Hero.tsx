import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { STORE_CONFIG } from "@/lib/config";

const LINES = ["WEAR", "YOUR", "MOOD."];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-x relative pb-10 pt-3 lg:flex lg:min-h-[calc(100svh-6.25rem)] lg:flex-col lg:pb-8 lg:pt-6">
        <div className="label flex items-center justify-between border-b border-ink/15 pb-3 text-smoke">
          <span>{STORE_CONFIG.currentDrop} / SS26</span>
          <span className="hidden sm:inline">OVERSIZED · GRAPHIC · CUSTOM</span>
          <span className="text-ink">TEES FROM ₹599</span>
        </div>

        {/* Campaign image */}
        <div className="relative mt-4 aspect-[6/5] w-full overflow-hidden bg-bone sm:aspect-[16/11] lg:absolute lg:bottom-8 lg:right-[max(2.5rem,6%)] lg:top-[4.25rem] lg:mt-0 lg:aspect-auto lg:w-[38%] xl:w-[34%]">
          <Image
            src="/images/products/no-signal-1.jpg"
            alt="Model wearing the THREADR No Signal oversized tee against raw concrete"
            fill
            preload
            sizes="(min-width: 1280px) 34vw, (min-width: 1024px) 38vw, 100vw"
            className="animate-[fade_1.4s_ease_both] object-cover object-[50%_30%]"
          />
          <Link
            href="/product/no-signal-oversized-tee"
            className="group absolute left-3 top-3 flex items-center gap-3 bg-paper py-2 pl-3 pr-2 transition-colors hover:bg-accent sm:bottom-4 sm:left-4 sm:top-auto"
          >
            <span>
              <span className="label block !text-[0.6rem] text-smoke group-hover:text-ink">WORN HERE</span>
              <span className="block text-sm font-semibold leading-tight">NO SIGNAL TEE — ₹699</span>
            </span>
            <span className="grid size-8 place-items-center bg-ink text-paper">
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:-rotate-45" />
            </span>
          </Link>

          {/* Rotating price sticker */}
          <div className="absolute right-3 top-3 size-24 sm:right-4 sm:top-4 sm:size-28 lg:left-4 lg:right-auto lg:top-4">
            <svg viewBox="0 0 100 100" className="size-full animate-[spin_18s_linear_infinite]" aria-hidden="true">
              <defs>
                <path id="sticker-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
              </defs>
              <circle cx="50" cy="50" r="50" className="fill-accent" />
              <text className="fill-ink font-mono text-[9.5px] font-semibold tracking-[0.18em]">
                <textPath href="#sticker-circle">AFFORDABLE · PRINTED · LOUD · </textPath>
              </text>
            </svg>
            <span className="absolute inset-0 grid place-items-center text-center">
              <span className="display text-[1.35rem] leading-[0.9] sm:text-2xl">
                <span className="block font-mono text-[0.5rem] font-semibold tracking-[0.15em]">FROM</span>
                ₹599
              </span>
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="relative mt-4 flex-1 sm:mt-6 lg:mt-0 lg:flex lg:flex-col lg:justify-center">
          <h1
            id="hero-title"
            className="display relative z-10 text-[24vw] leading-[0.8] text-paper mix-blend-difference sm:text-[20vw] lg:text-[clamp(8rem,17vw,19rem)] lg:leading-[0.78]"
          >
            {LINES.map((line, i) => (
              <span key={line} className={`reveal-line ${i === 1 ? "lg:pl-[12vw]" : ""}`}>
                <span style={{ animationDelay: `${150 + i * 110}ms` }}>{line}</span>
              </span>
            ))}
          </h1>
        </div>

        <div className="relative z-10 mt-6 grid gap-6 lg:mt-0 lg:max-w-[52%] lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-sm animate-fade text-lg leading-snug [animation-delay:600ms] sm:text-xl">
            Affordable streetwear. Loud ideas. <span className="text-smoke">Printed for you.</span>
          </p>
          <div className="flex animate-fade gap-2 [animation-delay:700ms] sm:gap-3">
            <ButtonLink href="/shop" variant="solid" className="flex-1 !px-5 sm:flex-none sm:!px-7">
              SHOP THE DROP <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="/custom" variant="outline" className="flex-1 !px-5 sm:flex-none sm:!px-7">
              MAKE IT CUSTOM
            </ButtonLink>
          </div>
        </div>

        <a
          href="#drop"
          className="label absolute bottom-10 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-smoke transition-colors hover:text-ink xl:flex"
          aria-label="Scroll to the drop"
        >
          <ArrowDownRight size={14} />
        </a>
      </div>
    </section>
  );
}
