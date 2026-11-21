import { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "../data/projects";
import { caseHash } from "../useHash";

// A 3D deck of the questions behind each project. The front card opens its case study.
export default function QuestionDeck() {
  const [active, setActive] = useState(0);
  const n = projects.length;
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 16 });
  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [10, -2]), { stiffness: 120, damping: 16 });

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const go = (d: number) => setActive((a) => (a + d + n) % n);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 id="questions-title" className="text-[0.95rem] font-semibold">Questions I’ve been working on</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm tabular-nums text-muted" aria-live="polite">{active + 1} / {n}</span>
          <button onClick={() => go(-1)} aria-label="Previous question" className="press rounded-full border border-ink p-1.5"><ChevronLeft size={16} /></button>
          <button onClick={() => go(1)} aria-label="Next question" className="press rounded-full border border-ink p-1.5"><ChevronRight size={16} /></button>
        </div>
      </div>

      <div onPointerMove={move} onPointerLeave={() => { px.set(0); py.set(0); }} style={{ perspective: 1200 }} className="relative h-[20rem] sm:h-[19rem]">
        <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }} className="relative h-full pt-16">
          {projects.map((p, i) => {
            const d = (i - active + n) % n; // 0 = front
            const front = d === 0;
            return (
              <motion.a key={p.slug} href={caseHash(p.slug)}
                tabIndex={front ? 0 : -1} aria-hidden={!front}
                animate={{ y: -d * 22, x: d * 10, z: -d * 60, rotateZ: d * 1.5, opacity: 1 - d * 0.14 }}
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
                style={{ zIndex: n - d, transformStyle: "preserve-3d", pointerEvents: front ? "auto" : "none" }}
                className={`depth absolute inset-x-0 top-16 flex h-[15.5rem] flex-col rounded-lg border border-ink p-6 ${front ? "bg-sheet" : "bg-paper"}`}>
                <span className="flex items-center justify-between text-sm">
                  <span className="tabular-nums text-muted">{p.number}</span>
                  <span className="font-semibold">{p.title}</span>
                </span>
                <span className="prose-serif mt-4 block !text-[1.35rem] !leading-snug italic" style={{ transform: "translateZ(30px)" }}>“{p.question}”</span>
                <span className="mt-auto inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-volt" style={{ transform: "translateZ(20px)" }}>
                  Open the case study <ArrowUpRight size={16} aria-hidden />
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
