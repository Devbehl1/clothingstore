import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WhyThreadr } from "@/components/home/WhyThreadr";
import { STORE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description: `${STORE_CONFIG.brandName} is an Indian streetwear label making affordable, loud, printed clothing for Gen-Z.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="container-x pb-16 pt-8 lg:pb-24 lg:pt-14">
        <div className="label flex justify-between border-b border-ink/15 pb-3 text-smoke">
          <span>ABOUT {STORE_CONFIG.brandName}</span>
          <span className="text-ink">EST. 2026 — INDIA</span>
        </div>
        <h1 className="display mt-8 text-[19vw] leading-[0.8] lg:text-[11.5vw] 2xl:text-[12rem]">
          CLOTHES THAT
          <br />
          <span className="lg:pl-[14vw]">TALK BACK</span>
          <span className="text-accent">.</span>
        </h1>
      </section>

      <section className="container-x grid gap-10 pb-20 lg:grid-cols-12 lg:gap-6 lg:pb-32">
        <Reveal className="relative aspect-[4/5] overflow-hidden bg-bone lg:col-span-5">
          <Image
            src="/images/lifestyle/rack.jpg"
            alt="A rack of black THREADR tees"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <div className="flex flex-col justify-between gap-10 lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="text-3xl font-medium leading-[1.15] tracking-tight lg:text-4xl">
              We started {STORE_CONFIG.brandName} because good streetwear in India was either too expensive or too boring.
              So we made the in-between: heavy cotton, loud prints and prices you don&apos;t have to think twice about.
            </p>
          </Reveal>
          <Reveal delay={120} className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="label text-accent">THE DROPS</p>
              <p className="mt-3 text-ink/75">
                Small-batch drops built around moods, memes and the stuff your group chat won&apos;t stop talking about.
                When it&apos;s gone, it&apos;s gone.
              </p>
            </div>
            <div>
              <p className="label text-accent">THE STUDIO</p>
              <p className="mt-3 text-ink/75">
                The same presses that print our drops print yours. Bring an idea, a sketch or a meme and we&apos;ll make it
                wearable.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200} className="flex flex-wrap gap-3">
            <ButtonLink href="/shop">
              SHOP THE DROP <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink href="/custom" variant="outline">
              MAKE IT CUSTOM
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-20 text-paper lg:py-32">
        <div className="container-x grid gap-px sm:grid-cols-3">
          {[
            ["₹599", "Starting price. Always."],
            ["100%", "Cotton tees, printed in India."],
            ["1 TAP", "Order on WhatsApp. No account, no fuss."],
          ].map(([big, small]) => (
            <div key={big} className="border-t border-paper/20 py-8 sm:pr-8">
              <p className="display text-7xl text-accent lg:text-9xl">{big}</p>
              <p className="mt-3 max-w-[14rem] text-paper/70">{small}</p>
            </div>
          ))}
        </div>
      </section>

      <WhyThreadr />
    </>
  );
}
