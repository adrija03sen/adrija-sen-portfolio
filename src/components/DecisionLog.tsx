import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Section from "./Section";
import { decisions, type Basis } from "../data/decisions";
import { caseHash } from "../useHash";

const basisLabel: Record<Basis, string> = {
  documented: "From the project documents",
  retrospective: "Retrospective explanation",
};

export default function DecisionLog() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="decisions" title="Not just what I built. Why I built it."
      dek="A log of real decisions from my projects: the options I had, what I chose and what it cost. Entries labelled retrospective were written afterwards to explain my reasoning.">
      <ul className="border-t-2 border-ink">
        {decisions.map((d, i) => {
          const isOpen = open === i;
          return (
            <li key={d.question} className="border-b border-rule">
              <h3>
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={`decision-${i}`}
                  className="group grid w-full grid-cols-[1fr_auto] items-start gap-6 py-7 text-left md:grid-cols-12">
                  <span className="text-[0.95rem] text-muted md:col-span-3">{d.project}</span>
                  <span className="display display-wide col-span-1 row-start-2 text-2xl font-semibold leading-tight group-hover:text-volt md:col-span-8 md:row-start-1 md:text-[2rem]">{d.question}</span>
                  <Plus aria-hidden size={26} className={`col-start-2 row-span-2 row-start-1 transition-transform md:col-span-1 md:col-start-12 md:row-span-1 md:justify-self-end ${isOpen ? "rotate-45" : ""}`} />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div id={`decision-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="grid gap-8 pb-10 md:grid-cols-12">
                      <div className="md:col-span-3">
                        <span className={`chip ${d.basis === "retrospective" ? "border-dashed" : ""}`}>{basisLabel[d.basis]}</span>
                        <a href={caseHash(d.slug)} className="link mt-4 block text-[0.95rem]">Open the case study</a>
                      </div>
                      <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 md:col-span-9">
                        <Field label="Context">{d.context}</Field>
                        <Field label="Competing options">
                          <ul className="list-disc space-y-1 pl-5">{d.options.map((o) => <li key={o}>{o}</li>)}</ul>
                        </Field>
                        <Field label="My reasoning">{d.reasoning}</Field>
                        <Field label="The trade-off">{d.tradeoff}</Field>
                        <div className="sm:col-span-2">
                          <dt className="mb-1 text-[0.95rem] font-semibold">The decision</dt>
                          <dd className="prose-serif !text-xl"><span className="mark">{d.decision}</span></dd>
                        </div>
                        <Field label="What I’d validate next">{d.validateNext}</Field>
                      </dl>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="mb-1 text-[0.95rem] font-semibold">{label}</dt>
      <dd className="leading-relaxed text-ink/80">{children}</dd>
    </div>
  );
}
