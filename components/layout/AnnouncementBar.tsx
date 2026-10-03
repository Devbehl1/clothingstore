import { STORE_CONFIG } from "@/lib/config";

export function AnnouncementBar() {
  const [primary, ...rest] = STORE_CONFIG.announcements;
  return (
    <div className="bg-ink text-paper">
      <div className="container-x flex h-9 items-center justify-center gap-10 lg:justify-between">
        <p className="label hidden text-paper/60 lg:block">{rest[0]}</p>
        <p className="label flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-accent" aria-hidden="true" />
          {primary}
        </p>
        <p className="label hidden text-paper/60 lg:block">{rest[1]}</p>
      </div>
    </div>
  );
}
