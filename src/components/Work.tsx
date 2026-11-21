import { ArrowUpRight } from "lucide-react";
import Section from "./Section";
import StatusTag from "./StatusTag";
import Tilt, { Layer } from "./Tilt";
import { projects } from "../data/projects";
import { caseHash } from "../useHash";

// Asymmetric layout: wide/narrow, narrow/wide, then full width.
const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7", "md:col-span-12"];

export default function Work() {
  return (
    <Section id="work" title="Selected product work"
      dek="Five projects, each written up as a case study: what the problem was, what I decided, and what I’d still want to find out. Labels show what was built and what was proposed.">
      <ol className="grid gap-8 md:grid-cols-12 md:gap-10">
        {projects.map((p, i) => (
          <li key={p.slug} id={`card-${p.slug}`} className={`${spans[i % spans.length]} scroll-mt-28`}>
            <Tilt max={6}>
              <a href={caseHash(p.slug)}
                className="depth lift group relative flex h-full min-h-[24rem] flex-col rounded-xl border border-ink bg-sheet p-7 md:p-9"
                style={{ transformStyle: "preserve-3d" }}>
                <Layer z={50} className="flex items-start justify-between gap-4">
                  <span className="display text-6xl font-bold tabular-nums text-volt md:text-7xl">{p.number}</span>
                  <span className="flex flex-wrap justify-end gap-2"><StatusTag {...p.status} /></span>
                </Layer>
                <Layer z={35} className="mt-8">
                  <h3 className="display text-4xl font-bold sm:text-5xl">{p.title}</h3>
                  <p className="prose-serif mt-3 max-w-[42ch] !text-lg italic">{p.dek}</p>
                </Layer>
                <Layer z={20} className="mt-6 flex flex-1 flex-col">
                  <span className="chip self-start">{p.category}</span>
                  <p className="mt-4 max-w-[60ch] leading-relaxed text-ink/80"><span className="font-semibold text-ink">Problem.</span> {p.problem}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold">
                    Read the case study
                    <ArrowUpRight size={18} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Layer>
              </a>
            </Tilt>
          </li>
        ))}
      </ol>
    </Section>
  );
}
