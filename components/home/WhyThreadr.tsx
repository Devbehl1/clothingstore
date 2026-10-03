import { SectionLabel } from "./SectionHeading";
import { STORE_CONFIG } from "@/lib/config";

const POINTS = [
  { title: "PREMIUM PRINTS", body: "Quality printing designed to last." },
  { title: "GEN-Z PRICES", body: "Good clothes shouldn’t destroy your wallet." },
  { title: "MADE FOR YOU", body: "From ready-to-wear drops to custom designs." },
  { title: "NO BORING BASICS", body: "Every drop has a personality." },
];

export function WhyThreadr() {
  return (
    <section aria-labelledby="why-title" className="border-t border-ink/10 py-20 lg:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionLabel index="04">WHY {STORE_CONFIG.brandName}</SectionLabel>
          <h2 id="why-title" className="max-w-xs text-2xl font-medium leading-tight tracking-tight sm:text-right">
            Four promises. Zero boring basics.
          </h2>
        </div>
        <ul className="mt-10 border-t border-ink">
          {POINTS.map((point, i) => (
            <li key={point.title} className="group border-b border-ink">
              <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-3 py-6 transition-[padding] duration-500 ease-[var(--ease-out-expo)] sm:grid-cols-[4rem_1fr_minmax(0,22rem)] lg:py-8 lg:hover:pl-6">
                <span className="label text-smoke group-hover:text-accent">0{i + 1}</span>
                <h3 className="display text-[11vw] leading-[0.85] transition-colors duration-300 sm:text-[8vw] lg:text-[7vw] lg:group-hover:text-accent 2xl:text-[7.5rem]">
                  {point.title}
                </h3>
                <p className="col-start-2 mt-3 text-smoke sm:col-start-3 sm:mt-0 sm:text-right sm:text-lg">{point.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
