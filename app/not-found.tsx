import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col justify-center py-20">
      <p className="label text-smoke">ERROR 404</p>
      <h1 className="display mt-4 text-[22vw] leading-[0.8] lg:text-[14rem]">
        MOOD NOT
        <br />
        FOUND<span className="text-accent">.</span>
      </h1>
      <p className="mt-6 max-w-sm text-lg text-smoke">This page logged off. The drop didn&apos;t.</p>
      <ButtonLink href="/shop" className="mt-8 self-start">
        SHOP THE DROP <ArrowRight size={16} />
      </ButtonLink>
    </section>
  );
}
