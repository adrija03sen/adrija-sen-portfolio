import type { ReactNode } from "react";

// Section heading: a large statement on the left, an optional short dek on the right.
export default function Section({ id, title, dek, children, tone = "paper" }: {
  id: string; title: ReactNode; dek?: ReactNode; children: ReactNode; tone?: "paper" | "sheet" | "ink";
}) {
  const bg = tone === "sheet" ? "bg-sheet" : tone === "ink" ? "bg-ink text-paper" : "";
  return (
    <section id={id} className={`border-t border-rule ${bg}`}>
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12">
          <h2 className="display text-[2.6rem] font-bold sm:text-6xl md:col-span-8 md:text-7xl">{title}</h2>
          {dek && <p className={`self-end text-lg leading-relaxed md:col-span-4 ${tone === "ink" ? "text-paper/70" : "text-muted"}`}>{dek}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
