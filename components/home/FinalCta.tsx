import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="bg-accent text-ink">
      <div className="container-x flex flex-col gap-10 py-20 lg:flex-row lg:items-end lg:justify-between lg:py-32">
        <Reveal>
          <h2 id="final-cta-title" className="display text-[21vw] leading-[0.8] lg:text-[13vw] 2xl:text-[14rem]">
            READY TO
            <br />
            WEAR IT?
          </h2>
        </Reveal>
        <Reveal delay={150} className="flex flex-col gap-4 lg:items-end lg:pb-4">
          <p className="max-w-xs text-lg font-medium leading-snug lg:text-right">
            Pick a mood. Pick a size. Order on WhatsApp in under a minute.
          </p>
          <ButtonLink href="/shop" variant="solid" className="w-full !h-16 !px-10 hover:!bg-paper hover:!text-ink sm:w-auto">
            SHOP THE DROP <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
