import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Frame, Seg } from "./ui";
import { features, rice, roadmapPhases, trustLabels, scope, journeys, metrics, VENDORA_ILLUSTRATIVE, type Feature, type Moscow } from "../../data/vendora";

const illustrativeNote = VENDORA_ILLUSTRATIVE
  ? " Scores and some feature names are illustrative stand-ins for the assignment’s values."
  : "";

const byId = Object.fromEntries(features.map((f) => [f.id, f])) as Record<string, Feature>;

/* ───────── RICE table ───────── */
type SortKey = "rice" | "reach" | "effort";
export function Rice() {
  const [sort, setSort] = useState<SortKey>("rice");
  const [filter, setFilter] = useState<"all" | "in" | "out">("all");
  const rows = useMemo(() => {
    const r = features.filter((f) => filter === "all" || (filter === "in" ? f.inScope : !f.inScope));
    return [...r].sort((a, b) => sort === "effort" ? a.effort - b.effort : sort === "reach" ? b.reach - a.reach : rice(b) - rice(a));
  }, [sort, filter]);
  const max = Math.max(...features.map(rice));
  return (
    <Frame caption={<>RICE = Reach × Impact × Confidence ÷ Effort. Showing the leading requests from the backlog of 24.{illustrativeNote}</>}>
      <div className="mb-4 flex flex-wrap gap-3">
        <Seg label="Sort by" value={sort} onChange={setSort} options={[{ value: "rice", label: "RICE score" }, { value: "reach", label: "Reach" }, { value: "effort", label: "Lowest effort" }]} />
        <Seg label="Filter" value={filter} onChange={setFilter} options={[{ value: "all", label: "All" }, { value: "in", label: "In 12-week scope" }, { value: "out", label: "Deferred" }]} />
      </div>
      <div className="table-scroll">
        <table className="w-full min-w-[640px] border-collapse text-left text-[0.95rem]">
          <thead>
            <tr className="border-b-2 border-ink">
              <th scope="col" className="py-2 pr-3 font-semibold">Feature request</th>
              <th scope="col" className="px-2 py-2 text-right font-semibold">Reach</th>
              <th scope="col" className="px-2 py-2 text-right font-semibold">Impact</th>
              <th scope="col" className="px-2 py-2 text-right font-semibold">Conf.</th>
              <th scope="col" className="px-2 py-2 text-right font-semibold">Effort</th>
              <th scope="col" className="w-[28%] py-2 pl-3 font-semibold">RICE</th>
            </tr>
          </thead>
          <motion.tbody layout>
            {rows.map((f) => (
              <motion.tr layout key={f.id} className="border-b border-rule align-top">
                <td className="py-3 pr-3">
                  <span className="font-semibold">{f.name}</span>
                  <span className={`ml-2 text-xs ${f.inScope ? "text-volt" : "text-muted"}`}>{f.inScope ? "In scope" : "Deferred"}</span>
                  {f.note && <span className="mt-1 block text-sm text-muted">{f.note}</span>}
                </td>
                <td className="px-2 py-3 text-right tabular-nums">{f.reach.toLocaleString("en-IN")}</td>
                <td className="px-2 py-3 text-right tabular-nums">{f.impact}</td>
                <td className="px-2 py-3 text-right tabular-nums">{Math.round(f.confidence * 100)}%</td>
                <td className="px-2 py-3 text-right tabular-nums">{f.effort}w</td>
                <td className="py-3 pl-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 flex-1 rounded-full bg-ink/10">
                      <div className={`h-full rounded-full ${f.inScope ? "bg-volt" : "bg-ink/40"}`} style={{ width: `${(rice(f) / max) * 100}%` }} />
                    </div>
                    <span className="w-14 text-right tabular-nums">{rice(f).toLocaleString("en-IN")}</span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </Frame>
  );
}

/* ───────── MoSCoW comparison ───────── */
const order: Moscow[] = ["Must", "Should", "Could", "Won’t (now)"];
export function MoscowView() {
  const [view, setView] = useState<"score" | "moscow">("score");
  const ranked = [...features].sort((a, b) => rice(b) - rice(a));
  const rank = Object.fromEntries(ranked.map((f, i) => [f.id, i + 1]));
  return (
    <Frame caption={<>Switch views to see how the ranking changed once dependencies, confidence and capacity were applied.{illustrativeNote}</>}>
      <Seg label="View" value={view} onChange={setView} options={[{ value: "score", label: "Ranked by RICE" }, { value: "moscow", label: "Final MoSCoW scope" }]} />
      {view === "score" ? (
        <ol className="mt-5 space-y-1.5">
          {ranked.map((f) => (
            <motion.li layoutId={`m-${f.id}`} key={f.id} className="flex items-center gap-3 rounded-sm border border-rule bg-paper px-3 py-2">
              <span className="w-6 tabular-nums text-muted">{rank[f.id]}</span><span className="flex-1">{f.name}</span>
              <span className="text-sm tabular-nums text-muted">{rice(f).toLocaleString("en-IN")}</span>
            </motion.li>
          ))}
        </ol>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {order.map((m) => (
            <div key={m}>
              <h4 className={`mb-2 border-b-2 pb-1 font-semibold ${m === "Must" ? "border-volt" : "border-ink/40"}`}>{m}</h4>
              <ul className="space-y-1.5">
                {features.filter((f) => f.moscow === m).map((f) => (
                  <motion.li layoutId={`m-${f.id}`} key={f.id} className={`rounded-sm border px-3 py-2 text-[0.95rem] ${f.inScope ? "border-volt bg-paper" : "border-dashed border-ink/30"}`}>
                    {f.name}<span className="block text-xs text-muted">RICE rank {rank[f.id]}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </Frame>
  );
}

/* ───────── Roadmap ───────── */
export function Roadmap() {
  const scoped = features.filter((f) => f.inScope && f.weeks).sort((a, b) => a.weeks![0] - b.weeks![0]);
  const [sel, setSel] = useState<string>(scoped[0].id);
  const f = byId[sel];
  const weeks = Array.from({ length: 12 }, (_, i) => i + 1);
  return (
    <Frame caption={<>Nine weeks of build, three weeks of testing and rollout.{illustrativeNote}</>}>
      <div className="table-scroll">
        <div className="min-w-[620px]">
          <div className="grid grid-cols-[11rem_repeat(12,1fr)] text-xs text-muted">
            <span />
            {weeks.map((w) => <span key={w} className={`py-1 text-center tabular-nums ${w >= 10 ? "font-semibold text-ink" : ""}`}>W{w}</span>)}
          </div>
          <div className="grid grid-cols-[11rem_repeat(12,1fr)] items-center">
            <span className="py-1 text-sm font-semibold">Phase</span>
            {roadmapPhases.map((ph) => (
              <div key={ph.label} style={{ gridColumn: `${ph.from + 1} / ${ph.to + 2}` }}
                className={`m-0.5 rounded-sm px-2 py-1 text-xs ${ph.from >= 10 ? "bg-lime text-limeink" : "bg-ink/10"}`}>{ph.label.replace(/\s\[.*\]/, "")}</div>
            ))}
          </div>
          {scoped.map((r) => {
            const active = r.id === sel; const isDep = f.dependsOn?.includes(r.id);
            return (
              <div key={r.id} className="grid grid-cols-[11rem_repeat(12,1fr)] items-center border-t border-rule">
                <span className="truncate py-2 pr-2 text-sm">{r.name}</span>
                <button onClick={() => setSel(r.id)} aria-pressed={active} aria-label={`${r.name}, weeks ${r.weeks![0]} to ${r.weeks![1]}`}
                  style={{ gridColumn: `${r.weeks![0] + 1} / ${r.weeks![1] + 2}` }}
                  className={`m-0.5 h-7 rounded-sm text-left text-xs transition-colors ${active ? "bg-volt text-paper" : isDep ? "bg-ink text-paper" : "bg-ink/25 hover:bg-ink/40"}`}>
                  <span className="px-2">W{r.weeks![0]}–{r.weeks![1]}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={sel} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-5 border-t border-ink/60 pt-4">
          <p className="font-semibold">{f.name}</p>
          <p className="mt-1 text-[0.95rem] text-ink/80">
            {f.dependsOn?.length ? <>Waits on: {f.dependsOn.map((d) => byId[d].name).join(", ")}.</> : "No dependencies. This goes first."}
            {f.note ? ` ${f.note}` : ""}
          </p>
        </motion.div>
      </AnimatePresence>
    </Frame>
  );
}

/* ───────── Dependency map ───────── */
function depth(f: Feature): number {
  return f.dependsOn?.length ? 1 + Math.max(...f.dependsOn.map((d) => depth(byId[d]))) : 0;
}
function upstream(id: string, acc = new Set<string>()): Set<string> {
  byId[id].dependsOn?.forEach((d) => { acc.add(d); upstream(d, acc); });
  return acc;
}
export function Deps() {
  const nodes = features.filter((f) => f.inScope || f.dependsOn?.length);
  const levels = Math.max(...nodes.map(depth)) + 1;
  const [focus, setFocus] = useState<string | null>("top3");
  const chain = focus ? upstream(focus) : new Set<string>();
  return (
    <Frame caption={<>Select a feature to light up everything it depends on. Dashed boxes are deferred.{illustrativeNote}</>}>
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${levels}, minmax(0, 1fr))` }}>
        {Array.from({ length: levels }, (_, lv) => (
          <div key={lv} className="space-y-2">
            <p className="text-xs text-muted">{lv === 0 ? "Foundation" : `Layer ${lv + 1}`}</p>
            {nodes.filter((n) => depth(n) === lv).map((n) => {
              const on = focus === n.id; const up = chain.has(n.id);
              return (
                <button key={n.id} onClick={() => setFocus(on ? null : n.id)} aria-pressed={on}
                  className={`block w-full rounded-sm border px-2.5 py-2 text-left text-sm leading-snug transition-colors ${on ? "border-volt bg-volt text-paper" : up ? "border-ink bg-ink text-paper" : n.inScope ? "border-ink/50 bg-paper hover:border-ink" : "border-dashed border-ink/40 hover:border-ink"}`}>
                  {n.name}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      {focus && (
        <p className="mt-4 text-[0.95rem]">
          <span className="font-semibold">{byId[focus].name}</span>{" "}
          {chain.size ? <>needs {[...chain].map((d) => byId[d].name).join(", ")} first.</> : "has no dependencies."}
        </p>
      )}
    </Frame>
  );
}

/* ───────── Journeys ───────── */
export function Journeys() {
  const [who, setWho] = useState<"customer" | "merchant">("customer");
  return (
    <Frame caption="Proposed journeys. These describe the intended experience, not observed behaviour.">
      <Seg label="Journey" value={who} onChange={setWho} options={[{ value: "customer", label: "Customer" }, { value: "merchant", label: "Merchant" }]} />
      <AnimatePresence mode="wait">
        <motion.ol key={who} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="mt-5 grid gap-3 sm:grid-cols-4">
          {journeys[who].map((s, i) => (
            <li key={s.step} className="relative border-t-2 border-ink pt-3">
              <span className="text-sm tabular-nums text-muted">Step {i + 1}</span>
              <p className="mt-1 font-semibold">{s.step}</p>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-ink/80">{s.detail}</p>
            </li>
          ))}
        </motion.ol>
      </AnimatePresence>
    </Frame>
  );
}

/* ───────── Trust labels ───────── */
const toneCls: Record<string, string> = { volt: "bg-volt text-paper", muted: "bg-ink/10 text-ink", lime: "bg-lime text-limeink" };
export function Trust() {
  const [i, setI] = useState(0);
  const l = trustLabels[i];
  return (
    <Frame caption="Proposed label design. Every label states its reason in plain language.">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div role="tablist" aria-label="Trust labels" className="flex flex-wrap gap-2">
            {trustLabels.map((t, ti) => (
              <button key={t.name} role="tab" aria-selected={ti === i} onClick={() => setI(ti)}
                className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${ti === i ? "border-ink bg-ink text-paper" : "border-ink/40 hover:border-ink"}`}>{t.name}</button>
            ))}
          </div>
          <dl className="mt-5 space-y-4">
            <div><dt className="font-semibold">When it applies</dt><dd className="mt-1 leading-relaxed text-ink/80">{l.rule}</dd></div>
            <div><dt className="font-semibold">What people see</dt><dd className="mt-1 leading-relaxed text-ink/80">{l.shows}</dd></div>
          </dl>
        </div>
        <div className="rounded-md border border-rule bg-paper p-5" aria-label="Example review card">
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold">A shopper</span>
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${toneCls[l.tone]}`}>{l.name}</span>
          </div>
          <p className="mt-1 text-sm text-muted" aria-label="4 out of 5 stars">★★★★☆</p>
          <p className="prose-serif mt-3 !text-base">“Fabric is softer than I expected. Sizing runs a little small, so I’d go one up.”</p>
          <p className="mt-4 border-t border-rule pt-3 text-xs text-muted">Example review text, written for illustration.</p>
        </div>
      </div>
    </Frame>
  );
}

/* ───────── MVP vs future ───────── */
export function Scope() {
  return (
    <Frame caption="Future scope depends on data the MVP collects. Nothing here is built.">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h4 className="mb-3 border-b-2 border-volt pb-1 font-semibold">MVP</h4>
          <ul className="space-y-2">{scope.mvp.map((s) => <li key={s} className="rounded-sm border border-ink/50 bg-paper px-3 py-2">{s}</li>)}</ul>
        </div>
        <div>
          <h4 className="mb-3 border-b-2 border-ink/40 pb-1 font-semibold">Future scope</h4>
          <ul className="space-y-2">{scope.later.map((s) => <li key={s} className="rounded-sm border border-dashed border-ink/40 px-3 py-2 text-ink/80">{s}</li>)}</ul>
        </div>
      </div>
    </Frame>
  );
}

/* ───────── Metrics ───────── */
export function Metrics() {
  return (
    <Frame caption="Proposed metric framework. No metric values exist, because nothing was launched.">
      <div className="grid gap-6 md:grid-cols-12">
        <div className="rounded-md bg-ink p-5 text-paper md:col-span-5">
          <p className="text-sm text-paper/70">North Star</p>
          <p className="display mt-2 text-4xl font-extrabold">{metrics.northStar.name}</p>
          <p className="mt-3 leading-relaxed text-paper/85">{metrics.northStar.def.replace(/\s\[.*\]/, "")}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:col-span-7">
          <div>
            <h4 className="mb-2 font-semibold">Supporting</h4>
            <ul className="space-y-3">{metrics.supporting.map((m) => <li key={m.name}><span className="font-semibold">{m.name}.</span> <span className="text-ink/80">{m.def}</span></li>)}</ul>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Guardrails</h4>
            <ul className="space-y-3">{metrics.guardrails.map((m) => <li key={m.name}><span className="font-semibold">{m.name}.</span> <span className="text-ink/80">{m.def}</span></li>)}</ul>
          </div>
        </div>
      </div>
    </Frame>
  );
}
