import Section from "./Section";
import { site } from "../data/site";

export default function About() {
  return (
    <Section id="about" title="Hi, I’m Adrija." dek={site.statement}>
      <div className="grid gap-12 md:grid-cols-12">
        <div className="prose-serif max-w-measure md:col-span-7">
          <p>
            I study Electronics and Instrumentation Engineering at NIT Silchar. Instrumentation is, more or less, the discipline of measuring things properly before you try to control them. It turns out that’s a decent description of product management too.
          </p>
          <p>
            I got pulled towards product while building things and noticing that the hard part was rarely the code. It was deciding what was worth building, for whom, and how we’d know it worked. Consumer technology and AI products are where those questions feel most alive to me right now.
          </p>
          <p>
            From May to July 2026 I was an Operations Analytics Intern at <a className="link" href="#experience">Ritzy Mobility</a>, where I worked with product, engineering and operations, translated business requirements into product documentation and prototypes, and learned how quickly a good metric turns into a better conversation.
          </p>
          <p>
            I’m early in this. What I can offer is curiosity, structured thinking and a habit of writing down why I made a decision, so I can check later whether I was right. The rest of this site is that habit, made public.
          </p>
        </div>
        <aside className="md:col-span-4 md:col-start-9">
          <h3 className="mb-3 text-[0.95rem] font-semibold">What I’m exploring</h3>
          <ul className="flex flex-wrap gap-2">
            {site.positioning.map((p) => <li key={p} className="chip">{p}</li>)}
          </ul>
          <h3 className="mb-3 mt-10 text-[0.95rem] font-semibold">Currently</h3>
          <p className="leading-relaxed text-muted">B.Tech, Electronics & Instrumentation Engineering, NIT Silchar, 2023–2027. Looking for Product Management internships and early-career roles.</p>
        </aside>
      </div>
    </Section>
  );
}
