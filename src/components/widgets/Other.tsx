import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Frame } from "./ui";

/* ───────── Lily: how a question becomes an interface ───────── */
const lilySteps = [
  { title: "User asks", body: <p className="prose-serif !text-xl">“I drive about 40 km a day in the city. Which EV fits a budget of around ₹15 lakh, and what would the EMI be?”</p> },
  { title: "Intent routing", body: (
    <div className="space-y-2 text-[0.95rem]">
      <p>The message contains more than one job. Routing picks a primary flow and keeps the second for the follow-up.</p>
      <div className="flex flex-wrap gap-2"><span className="chip border-volt bg-volt text-paper">Recommendation</span><span className="chip">Affordability / EMI</span><span className="chip border-dashed">Comparison (not asked)</span></div>
    </div>
  )},
  { title: "Structured output", body: (
    <pre className="table-scroll rounded-sm bg-ink p-4 text-[0.8rem] leading-relaxed text-paper"><code>{`{
  "intent": "recommendation",
  "constraints": { "budget": 1500000, "daily_km": 40, "use": "city" },
  "shortlist": [
    { "model": "Model A", "why": "Range comfortably covers daily use" },
    { "model": "Model B", "why": "Lowest price in budget" }
  ],
  "next": "emi_breakdown"
}`}</code></pre>
  )},
  { title: "Rendered view", body: (
    <div className="grid gap-3 sm:grid-cols-2">
      {["Model A", "Model B"].map((m, i) => (
        <div key={m} className="rounded-md border border-ink/60 bg-paper p-4">
          <p className="font-semibold">{m}</p>
          <p className="mt-1 text-sm text-muted">{i === 0 ? "Range comfortably covers daily use" : "Lowest price in budget"}</p>
          <p className="mt-3 text-sm font-semibold text-volt">See EMI breakdown</p>
        </div>
      ))}
    </div>
  )},
];
export function LilyFlow() {
  const [i, setI] = useState(0);
  const s = lilySteps[i];
  return (
    <Frame caption="Illustrative walkthrough with placeholder models and values, to show how intent routing and structured JSON shape the experience.">
      <div className="mb-4 flex items-center justify-between gap-3">
        <ol className="flex flex-wrap gap-1.5" aria-label="Steps">
          {lilySteps.map((st, si) => (
            <li key={st.title}>
              <button onClick={() => setI(si)} aria-current={si === i ? "step" : undefined}
                className={`rounded-full px-3 py-1 text-sm font-semibold ${si === i ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}>{si + 1}. {st.title}</button>
            </li>
          ))}
        </ol>
        <div className="flex gap-1">
          <button onClick={() => setI((v) => Math.max(0, v - 1))} disabled={i === 0} aria-label="Previous step" className="rounded-full border border-ink/50 p-1.5 disabled:opacity-30"><ChevronLeft size={16} /></button>
          <button onClick={() => setI((v) => Math.min(lilySteps.length - 1, v + 1))} disabled={i === lilySteps.length - 1} aria-label="Next step" className="rounded-full border border-ink/50 p-1.5 disabled:opacity-30"><ChevronRight size={16} /></button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="min-h-[9rem]">
          {s.body}
        </motion.div>
      </AnimatePresence>
    </Frame>
  );
}

/* ───────── Groww: proposed experiments ───────── */
// Edit to match your case study document exactly.
const experiments = [
  { name: "Goal-first entry", hypothesis: "Starting from a goal instead of a product list will raise first-investment completion.", metric: "First-investment completion" },
  { name: "Plain-language explanations", hypothesis: "Explaining terms at the moment they appear will reduce drop-off on fund detail pages.", metric: "Detail-page exit rate" },
  { name: "Risk-aware shortlist", hypothesis: "A short shortlist matched to risk comfort will speed up the first decision without increasing early withdrawals.", metric: "Time to first investment; early withdrawals as guardrail" },
  { name: "Simple Start guided flow", hypothesis: "Users who go through the full guided flow will be more confident and more likely to invest again.", metric: "Second investment within 30 days" },
  { name: "Retention follow-through", hypothesis: "Simple Start users will retain better than non-guided users over time.", metric: "30- and 90-day retention" },
];
export function GrowwExperiments() {
  const [open, setOpen] = useState(0);
  return (
    <Frame caption="Proposed experiments only. None were run, and no results exist.">
      <ol className="divide-y divide-rule">
        {experiments.map((e, i) => (
          <li key={e.name}>
            <button onClick={() => setOpen(i)} aria-expanded={open === i} className="flex w-full items-baseline gap-3 py-3 text-left">
              <span className="tabular-nums text-muted">{i + 1}</span>
              <span className={`flex-1 font-semibold ${open === i ? "text-volt" : ""}`}>{e.name}</span>
              <span className="chip border-dashed text-xs">Proposed</span>
            </button>
            {open === i && (
              <dl className="grid gap-4 pb-4 pl-6 sm:grid-cols-2">
                <div><dt className="text-sm font-semibold">Hypothesis</dt><dd className="mt-1 leading-relaxed text-ink/80">{e.hypothesis}</dd></div>
                <div><dt className="text-sm font-semibold">Primary measure</dt><dd className="mt-1 leading-relaxed text-ink/80">{e.metric}</dd></div>
              </dl>
            )}
          </li>
        ))}
      </ol>
    </Frame>
  );
}

/* ───────── GraphMind: system design ───────── */
const graphSteps = [
  { name: "Conversation", detail: "Each message is the raw input. Nothing is remembered until it is extracted." },
  { name: "Extraction", detail: "Entities and relationships are pulled out of the message: people, projects, preferences, constraints." },
  { name: "Neo4j graph", detail: "Memory lives as nodes and edges, so related facts stay connected and can be traversed." },
  { name: "Semantic retrieval", detail: "For a new message, relevant nodes are found by meaning, then expanded through their relationships." },
  { name: "LLM inference", detail: "The model answers with the retrieved context in front of it." },
  { name: "Explainable answer", detail: "The response can point to which remembered facts it used, so users can spot and correct mistakes." },
];
export function GraphArch() {
  const [i, setI] = useState(2);
  return (
    <Frame caption="Simplified view of the system. Select a stage to see what it does.">
      <ol className="flex flex-col gap-2 md:flex-row md:items-stretch">
        {graphSteps.map((s, si) => (
          <li key={s.name} className="flex-1">
            <button onClick={() => setI(si)} aria-pressed={si === i}
              className={`h-full w-full rounded-sm border px-3 py-3 text-left text-sm font-semibold transition-colors ${si === i ? "border-volt bg-volt text-paper" : "border-ink/50 bg-paper hover:border-ink"}`}>
              <span className="block text-xs font-normal opacity-70">{si + 1}</span>{s.name}
            </button>
          </li>
        ))}
      </ol>
      <p className="prose-serif mt-5 !text-lg">{graphSteps[i].detail}</p>
    </Frame>
  );
}
