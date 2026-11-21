import Section from "./Section";
import { achievements } from "../data/achievements";

export default function Achievements() {
  return (
    <Section id="achievements" tone="sheet" title="Achievements" dek="Competitions where I practised working fast with messy data and tight constraints.">
      <ul className="border-t-2 border-ink">
        {achievements.map((a) => (
          <li key={a.title} className="grid gap-2 border-b border-rule py-6 md:grid-cols-12 md:gap-8">
            <h3 className="display display-wide text-2xl font-bold md:col-span-5">{a.title}</h3>
            <p className="text-lg leading-relaxed text-ink/80 md:col-span-7">{a.result}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
