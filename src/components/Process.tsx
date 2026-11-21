import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Section from "./Section";
import { stages } from "../data/process";
import { caseHash } from "../useHash";

export default function Process() {
  const [active, setActive] = useState(0);
  const s = stages[active];
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setActive((a) => (a + 1) % stages.length);
    if (e.key === "ArrowLeft") setActive((a) => (a - 1 + stages.length) % stages.length);
  };
  return (
    <Section id="thinking" tone="sheet" title="How I approach a product problem."
      dek="Five stages I keep coming back to. Pick one to see where it shows up in my work.">
      <div role="tablist" aria-label="Product process stages" onKeyDown={onKey} className="grid grid-cols-5 border-b-2 border-ink">
        {stages.map((st, i) => (
          <button key={st.n} role="tab" id={`tab-${st.n}`} aria-selected={i === active} aria-controls="stage-panel" tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`relative px-1 pb-4 pt-2 text-left transition-colors sm:px-3 ${i === active ? "text-ink" : "text-muted hover:text-ink"}`}>
            <span className="block text-sm tabular-nums">{st.n}</span>
            <span className="display display-wide block text-[0.95rem] font-bold sm:text-2xl md:text-3xl">{st.name}</span>
            {i === active && <motion.span layoutId="stage-bar" className="absolute inset-x-0 -bottom-[2px] h-[6px] bg-volt" />}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={s.n} id="stage-panel" role="tabpanel" aria-labelledby={`tab-${s.n}`}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
          className="grid gap-10 pt-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="prose-serif !text-2xl !leading-snug">{s.summary}</p>
            <ul className="mt-6 space-y-2">
              {s.questions.map((q) => <li key={q} className="text-muted">{q}</li>)}
            </ul>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <h3 className="mb-4 text-[0.95rem] font-semibold">In my work</h3>
            <ul className="space-y-5">
              {s.examples.map((ex) => (
                <li key={ex.text} className="border-l-2 border-ink/20 pl-5">
                  <a href={ex.slug === "experience" ? "#experience" : caseHash(ex.slug)} className="link font-semibold">{ex.project}</a>
                  <p className="mt-1 leading-relaxed text-ink/80">{ex.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
