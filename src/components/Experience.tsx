import Section from "./Section";
import { ritzy } from "../data/experience";

export default function Experience() {
  return (
    <Section id="experience" tone="ink" title="Real-world product exposure" dek={ritzy.summary}>
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="display display-wide text-3xl font-bold">{ritzy.org}</p>
          <p className="mt-2 text-lg text-paper/80">{ritzy.role}</p>
          <p className="mt-1 text-paper/60">{ritzy.when}, {ritzy.where}</p>
          <p className="prose-serif mt-10 border-l-2 border-lime pl-5 !text-lg italic text-paper/90">{ritzy.lesson}</p>
        </div>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 md:col-span-8">
          {ritzy.threads.map((t) => (
            <div key={t.title} className="border-t border-paper/25 pt-5">
              <h3 className="mb-3 text-xl font-semibold">{t.title}</h3>
              <ul className="space-y-3">
                {t.points.map((pt) => <li key={pt} className="leading-relaxed text-paper/80">{pt}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
