import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "./SectionHeading";

export function EditorialSection() {
  return (
    <section aria-labelledby="editorial-title" className="relative overflow-hidden bg-ink py-20 text-paper lg:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="relative z-10 lg:col-span-7 lg:row-start-1">
          <div className="[&_p]:text-paper/50">
            <SectionLabel index="02">THE IDEA</SectionLabel>
          </div>
          <h2 id="editorial-title" className="display mt-6 text-[30vw] leading-[0.8] sm:text-[24vw] lg:text-[15.5vw] 2xl:text-[16rem]">
            <Reveal as="div">NOT</Reveal>
            <Reveal as="div" delay={100} className="pl-[14vw] lg:pl-[10vw]">
              JUST
            </Reveal>
            <Reveal as="div" delay={200}>
              A TEE<span className="text-accent">.</span>
            </Reveal>
          </h2>
          <Reveal delay={300} className="mt-10 grid max-w-xl gap-6 sm:grid-cols-2 lg:mt-14">
            <p className="text-2xl font-medium leading-tight tracking-tight">
              Your clothes should say something before you do.
            </p>
            <p className="text-paper/60">
              Every THREADR piece starts as a feeling — a 2AM thought, an inside joke, a mood you can&apos;t put into words. We
              print it heavy, cut it oversized and price it so you can collect the whole drop.
            </p>
          </Reveal>
        </div>

        <div className="relative lg:col-span-5 lg:col-start-8 lg:row-start-1">
          <Reveal className="relative ml-auto aspect-[3/4] w-[78%] overflow-hidden bg-paper/10 lg:w-full">
            <Image
              src="/images/lifestyle/portrait.jpg"
              alt="Man in a white THREADR tee leaning against a wall"
              fill
              sizes="(min-width: 1024px) 38vw, 78vw"
              className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] hover:scale-105"
            />
          </Reveal>
          <Reveal
            delay={150}
            className="absolute -bottom-10 left-0 aspect-[4/5] w-[46%] overflow-hidden border-[6px] border-ink bg-paper/10 lg:-bottom-16 lg:-left-24 lg:w-[52%]"
          >
            <Image
              src="/images/lifestyle/rooftop.jpg"
              alt="Woman crouching on a rooftop in streetwear"
              fill
              sizes="(min-width: 1024px) 20vw, 46vw"
              className="object-cover"
            />
          </Reveal>
          <p className="label absolute -right-1 top-6 origin-top-right -rotate-90 text-paper/40 lg:-right-8">
            SS26 — CAMPAIGN
          </p>
        </div>
      </div>
    </section>
  );
}
