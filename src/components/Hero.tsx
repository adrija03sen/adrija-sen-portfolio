import { motion } from "framer-motion";
import { Download, Github, Linkedin } from "lucide-react";
import { site } from "../data/site";
import QuestionDeck from "./QuestionDeck";

const lines = ["Good products", "don’t start", "with features.", "They start", "with questions."];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 md:px-10 md:pb-28 md:pt-16">
        <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.95rem]">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime ring-1 ring-ink/30" />
            </span>
            {site.status}
          </span>
          <span className="text-muted">{site.headline}</span>
        </div>

        <h1 className="display extrude text-[clamp(2.8rem,9vw,7.25rem)] font-bold" aria-label="Good products don’t start with features. They start with questions.">
          {lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.06em]">
              <motion.span className={`block ${i >= 3 ? "text-volt" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }}
                transition={{ delay: 0.08 * i + (i >= 3 ? 0.35 : 0), duration: 0.7, ease: [0.2, 0.7, 0.1, 1] }}>
                {l}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-14 grid gap-12 md:grid-cols-12">
          <motion.div className="md:col-span-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }}>
            <p className="prose-serif max-w-measure text-xl md:text-[1.35rem]">
              I’m Adrija — an aspiring Product Manager interested in understanding people, challenging assumptions and turning complex problems into simple, useful experiences.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="btn btn-ink">Explore my work</a>
              <a href="#thinking" className="btn btn-line">My product thinking</a>
              <a href={site.resumeUrl} download className="btn btn-line"><Download size={16} aria-hidden /> Download resume</a>
            </div>
            <div className="mt-6 flex gap-5 text-[0.95rem]">
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-2"><Linkedin size={16} aria-hidden /> LinkedIn</a>
              <a href={site.github} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-2"><Github size={16} aria-hidden /> GitHub</a>
            </div>
          </motion.div>

          <motion.aside className="relative md:col-span-5 md:col-start-8" initial={{ opacity: 0, rotateX: 25, y: 40 }} animate={{ opacity: 1, rotateX: 0, y: 0 }} transition={{ delay: 1.1, duration: 0.8, ease: [0.2, 0.7, 0.1, 1] }} style={{ transformPerspective: 1200 }} aria-labelledby="questions-title">
            <QuestionDeck />
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
