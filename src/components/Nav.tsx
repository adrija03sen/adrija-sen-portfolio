import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { nav, site } from "../data/site";

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch { /* storage unavailable */ }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch { /* ignore */ }
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))] as const;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [theme, toggle] = useTheme();
  return (
    <header className="sticky top-0 z-50 border-b border-rule/70 bg-paper/90 backdrop-blur" style={{ top: "env(safe-area-inset-top, 0px)" }}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="#top" className="display display-wide text-xl font-bold tracking-tight">Adrija Sen</a>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="text-[0.95rem] text-ink/75 transition-colors hover:text-ink">{n.label}</a>
          ))}
          <a href={site.resumeUrl} download className="btn btn-ink !py-2">Resume</a>
          <button onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} className="rounded-full p-2 hover:bg-ink/5">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
        <div className="flex items-center gap-1 md:hidden">
          <button onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} className="rounded-full p-2">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} className="rounded-full p-2">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-nav" aria-label="Mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-rule bg-paper md:hidden">
            <ul className="px-5 py-4">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} onClick={() => setOpen(false)} className="display display-wide block py-2.5 text-2xl font-semibold">{n.label}</a>
                </li>
              ))}
              <li className="pt-3"><a href={site.resumeUrl} download className="btn btn-ink">Download resume</a></li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
