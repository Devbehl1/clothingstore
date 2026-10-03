const DEFAULT_ITEMS = ["NEW DROP", "OVERSIZED", "PRINTED", "MADE FOR YOU"];

export function Marquee({
  items = DEFAULT_ITEMS,
  tone = "ink",
}: {
  items?: readonly string[];
  tone?: "ink" | "accent";
}) {
  const row = (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {[...items, ...items].map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="display px-5 text-[2.75rem] leading-none sm:px-8 sm:text-7xl">{item}</span>
          <span className={tone === "ink" ? "text-accent" : "text-ink"} style={{ fontSize: "1.75rem" }}>
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-label={items.join(", ")}
      className={`overflow-hidden py-4 sm:py-6 ${tone === "ink" ? "bg-ink text-paper" : "bg-accent text-ink"}`}
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row}
        {row}
      </div>
    </section>
  );
}
