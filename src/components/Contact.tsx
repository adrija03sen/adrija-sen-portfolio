import { useState } from "react";
import { Check, Copy, Download, Github, Linkedin, Mail } from "lucide-react";
import { site } from "../data/site";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(site.email); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch { window.location.href = `mailto:${site.email}`; }
  };
  return (
    <section id="contact" className="border-t border-rule bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
        <h2 className="display text-[clamp(2.8rem,8.5vw,7.5rem)] font-bold">Let’s build something worth using.</h2>
        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <a href={`mailto:${site.email}`} className="display display-wide break-all text-2xl font-semibold underline decoration-lime decoration-2 underline-offset-8 sm:text-3xl">{site.email}</a>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${site.email}`} className="btn bg-paper text-ink hover:bg-lime hover:text-limeink"><Mail size={16} aria-hidden /> Send an email</a>
              <button onClick={copy} className="btn border border-paper/60 hover:bg-paper hover:text-ink" aria-live="polite">
                {copied ? <><Check size={16} aria-hidden /> Copied</> : <><Copy size={16} aria-hidden /> Copy email</>}
              </button>
              <a href={site.resumeUrl} download className="btn border border-paper/60 hover:bg-paper hover:text-ink"><Download size={16} aria-hidden /> Download resume</a>
            </div>
          </div>
          <ul className="space-y-4 text-lg md:col-span-4 md:col-start-9">
            <li><a href={site.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 hover:text-lime"><Linkedin size={18} aria-hidden /> {site.linkedinLabel}</a></li>
            <li><a href={site.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 hover:text-lime"><Github size={18} aria-hidden /> {site.githubLabel}</a></li>
          </ul>
        </div>
        <p className="mt-24 border-t border-paper/20 pt-6 text-sm text-paper/60">
          Adrija Sen, {new Date().getFullYear()}. Case studies describe my own work; recruitment challenges and hiring assignments are proposals, not shipped products.
        </p>
      </div>
    </section>
  );
}
