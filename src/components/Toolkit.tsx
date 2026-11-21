import Section from "./Section";
import { toolkit } from "../data/toolkit";

export default function Toolkit() {
  return (
    <Section id="toolkit" tone="sheet" title="Product toolkit"
      dek="Tools and areas I’ve worked with or explored in projects. No skill bars: I’d rather show the work than score myself.">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {toolkit.map((g) => (
          <div key={g.group} className="depth-sm rounded-lg border border-ink bg-paper p-6">
            <h3 className="display display-wide text-2xl font-bold">{g.group}</h3>
            <p className="mt-2 text-muted">{g.note}</p>
            <ul className="mt-5 space-y-2">
              {g.items.map((it) => <li key={it} className="border-b border-rule pb-2">{it}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
