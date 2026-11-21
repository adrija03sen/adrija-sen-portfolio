import Section from "./Section";
import Tilt from "./Tilt";
import { lab } from "../data/lab";

export default function Lab() {
  return (
    <Section id="lab" title="Experiments and teardowns"
      dek="A working notebook that will grow over time. The entries below are planned, not yet written.">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {lab.map((e) => (
          <li key={e.title}><Tilt max={8}><div className={`flex h-full min-h-[13rem] flex-col rounded-lg p-6 ${e.status === "planned" ? "border border-dashed border-ink/50 bg-paper shadow-[10px_14px_24px_-16px_rgb(var(--ink)/0.35)]" : "depth-sm border border-ink bg-sheet"}`}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-[0.95rem] font-semibold">{e.kind}</span>
              <span className="text-sm text-muted">{e.status === "planned" ? "Coming later" : "Published"}</span>
            </div>
            <p className="display display-wide mt-6 text-xl font-semibold leading-snug">{e.title}</p>
            <p className="mt-auto pt-4 leading-relaxed text-muted">{e.body}</p>
          </div></Tilt></li>
        ))}
      </ul>
    </Section>
  );
}
