import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import StatusTag from "./StatusTag";
import { projects, type Block, type Project } from "../data/projects";
import { caseHash } from "../useHash";
import Widget from "./widgets";

export default function CaseStudy({ project: p }: { project: Project }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const close = () => { window.location.hash = `card-${p.slug}`; };

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    scroller.current?.scrollTo({ top: 0 });
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p.slug]);

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const goTo = (id: string) => scroller.current?.querySelector(`#s-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Group sections by part for the contents list.
  const parts: { part?: string; items: typeof p.sections }[] = [];
  p.sections.forEach((s) => {
    const last = parts[parts.length - 1];
    if (last && last.part === s.part) last.items.push(s); else parts.push({ part: s.part, items: [s] });
  });

  return (
    <motion.div role="dialog" aria-modal="true" aria-labelledby="case-title"
      initial={{ opacity: 0, y: 60, rotateX: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }} exit={{ opacity: 0, y: 60, rotateX: 8, scale: 0.97 }} transition={{ duration: 0.45, ease: [0.2, 0.7, 0.1, 1] }}
      className="fixed inset-0 z-[55] bg-paper" style={{ paddingTop: "env(safe-area-inset-top, 0px)", transformPerspective: 1400, transformOrigin: "50% 0%" }}>
      <div ref={scroller} className="h-full overflow-y-auto overscroll-contain">
        <div className="sticky top-0 z-10 border-b border-rule bg-paper/95 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:px-10">
            <span className="truncate text-[0.95rem]"><span className="tabular-nums text-muted">{p.number}</span> <span className="font-semibold">{p.title}</span></span>
            <button ref={closeRef} onClick={close} className="btn btn-line !py-2"><X size={16} aria-hidden /> Close</button>
          </div>
        </div>

        <header className="mx-auto max-w-7xl px-5 pb-14 pt-12 md:px-10 md:pt-20">
          <div className="flex flex-wrap gap-2">
            <StatusTag {...p.status} />
            <span className="chip">{p.category}</span>
            <span className="chip">{p.context}</span>
          </div>
          <h1 id="case-title" className="display mt-8 text-[clamp(3rem,10vw,8rem)] font-bold">{p.title}</h1>
          <p className="prose-serif mt-6 max-w-[34ch] !text-2xl italic md:!text-3xl">{p.dek}</p>
          {p.disclaimer && (
            <p role="note" className="mt-10 max-w-3xl border-l-4 border-lime bg-sheet px-5 py-4 leading-relaxed">{p.disclaimer}</p>
          )}
          <div className="mt-14 grid gap-10 border-t-2 border-ink pt-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="mb-2 text-[0.95rem] font-semibold">The problem</h2>
              <p className="prose-serif !text-xl">{p.problem}</p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <h2 className="mb-2 text-[0.95rem] font-semibold">My contribution</h2>
              <ul className="space-y-2">
                {p.contribution.map((c) => <li key={c} className="border-b border-rule pb-2 leading-relaxed">{c}</li>)}
              </ul>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 md:grid-cols-12 md:px-10">
          <nav aria-label="Case study contents" className="hidden md:col-span-3 md:block">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
              {parts.map((g, gi) => (
                <div key={gi} className="mb-6">
                  {g.part && <p className="mb-2 text-sm font-semibold">{g.part}</p>}
                  <ol className="space-y-1.5">
                    {g.items.map((s) => (
                      <li key={s.id}><button onClick={() => goTo(s.id)} className="text-left text-[0.95rem] leading-snug text-muted hover:text-ink">{s.title}</button></li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </nav>

          <article className="md:col-span-9">
            {p.sections.map((s, i) => {
              const newPart = s.part && s.part !== p.sections[i - 1]?.part;
              return (
                <div key={s.id}>
                  {newPart && <p className="display display-wide mb-10 mt-6 border-y-2 border-ink py-4 text-2xl font-bold first:mt-0">{s.part}</p>}
                  <section id={`s-${s.id}`} className="scroll-mt-24 border-t border-rule py-12 first:border-t-0 first:pt-0">
                    <h2 className="display display-wide mb-6 text-3xl font-bold md:text-4xl">{s.title}</h2>
                    <div className="space-y-6">{s.blocks.map((b, bi) => <BlockView key={bi} b={b} />)}</div>
                  </section>
                </div>
              );
            })}
          </article>
        </div>

        <footer className="border-t-2 border-ink">
          <div className="mx-auto grid max-w-7xl md:grid-cols-2">
            <a href={caseHash(prev.slug)} className="group flex items-center gap-4 border-b border-rule px-5 py-10 hover:bg-sheet md:border-b-0 md:border-r md:px-10">
              <ArrowLeft aria-hidden className="transition-transform group-hover:-translate-x-1" />
              <span><span className="block text-sm text-muted">Previous</span><span className="display display-wide text-2xl font-bold">{prev.title}</span></span>
            </a>
            <a href={caseHash(next.slug)} className="group flex items-center justify-end gap-4 px-5 py-10 text-right hover:bg-sheet md:px-10">
              <span><span className="block text-sm text-muted">Next</span><span className="display display-wide text-2xl font-bold">{next.title}</span></span>
              <ArrowRight aria-hidden className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </footer>
      </div>
    </motion.div>
  );
}

const noteLabel = { proposal: "Proposal", retro: "Retrospective", plan: "Plan, not results" } as const;

function BlockView({ b }: { b: Block }) {
  switch (b.kind) {
    case "prose":
      return <div className="prose-serif max-w-measure">{b.text.map((t) => <p key={t}>{t}</p>)}</div>;
    case "list":
      return (
        <ol className="max-w-measure space-y-3">
          {b.items.map((t, i) => (
            <li key={t} className="grid grid-cols-[2rem_1fr] gap-2 leading-relaxed"><span className="tabular-nums text-muted">{i + 1}.</span><span>{t}</span></li>
          ))}
        </ol>
      );
    case "pairs":
      return (
        <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {b.items.map((it) => (
            <div key={it.label} className="border-t border-ink/70 pt-3">
              <dt className="font-semibold">{it.label}</dt>
              <dd className="mt-1 leading-relaxed text-ink/80">{it.text}</dd>
            </div>
          ))}
        </dl>
      );
    case "note":
      return (
        <p role="note" className="max-w-measure rounded-sm border border-dashed border-ink/50 px-4 py-3 text-[0.95rem] leading-relaxed">
          <span className="font-semibold">{noteLabel[b.tone]}.</span> {b.text}
        </p>
      );
    case "widget":
      return <Widget name={b.widget} />;
  }
}
