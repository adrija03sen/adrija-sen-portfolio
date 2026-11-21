import type { ReactNode } from "react";

export function Frame({ children, caption }: { children: ReactNode; caption?: ReactNode }) {
  return (
    <figure className="depth-sm rounded-lg border border-ink bg-sheet">
      <div className="p-4 sm:p-6">{children}</div>
      {caption && <figcaption className="border-t border-rule px-4 py-3 text-sm leading-relaxed text-muted sm:px-6">{caption}</figcaption>}
    </figure>
  );
}

export function Seg<T extends string>({ value, options, onChange, label }: {
  value: T; options: { value: T; label: string }[]; onChange: (v: T) => void; label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex flex-wrap rounded-full border border-ink/70 p-1">
      {options.map((o) => (
        <button key={o.value} role="radio" aria-checked={value === o.value} onClick={() => onChange(o.value)}
          className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${value === o.value ? "bg-ink text-paper" : "hover:bg-ink/5"}`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
