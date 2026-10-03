export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="label flex items-center gap-3 text-smoke">
      <span className="text-ink">({index})</span>
      <span className="h-px w-8 bg-current" aria-hidden="true" />
      {children}
    </p>
  );
}
