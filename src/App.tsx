import { AnimatePresence, MotionConfig } from "framer-motion";
import { useEffect } from "react";
import { useHash } from "./useHash";
import { getProject } from "./data/projects";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Experience from "./components/Experience";
import Process from "./components/Process";
import DecisionLog from "./components/DecisionLog";
import Toolkit from "./components/Toolkit";
import Lab from "./components/Lab";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import CaseStudy from "./components/CaseStudy";

export default function App() {
  const hash = useHash();
  const project = hash.startsWith("case-") ? getProject(hash.slice(5)) : undefined;

  // Section hashes scroll; case hashes open the overlay.
  useEffect(() => {
    if (!hash || hash.startsWith("case-")) return;
    document.getElementById(hash)?.scrollIntoView();
  }, [hash]);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
  }, [project]);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] btn btn-ink">Skip to work</a>
      <Nav />
      <main {...((project ? { inert: "", "aria-hidden": true } : {}) as Record<string, unknown>)}>
        <Hero />
        <About />
        <Work />
        <Experience />
        <Process />
        <DecisionLog />
        <Toolkit />
        <Lab />
        <Achievements />
        <Contact />
      </main>
      <AnimatePresence>{project && <CaseStudy key={project.slug} project={project} />}</AnimatePresence>
    </MotionConfig>
  );
}
