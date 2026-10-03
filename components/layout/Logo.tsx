import Link from "next/link";
import { STORE_CONFIG } from "@/lib/config";

/** Swap this component's contents for an <Image> or SVG when the final logo is ready. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${STORE_CONFIG.brandName} home`}
      className={`display inline-flex items-baseline text-[1.65rem] leading-none tracking-[-0.01em] ${className}`}
    >
      {STORE_CONFIG.brandName}
      <span className="ml-0.5 inline-block size-[0.32em] rounded-full bg-accent" aria-hidden="true" />
    </Link>
  );
}
