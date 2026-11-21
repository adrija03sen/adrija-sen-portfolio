// Decision log. `basis` is shown on each entry so readers know what kind of evidence sits behind it.
//  - "documented": the reasoning is in the original project documents.
//  - "retrospective": a reasoned explanation written afterwards, labelled as such on the site.
export type Basis = "documented" | "retrospective";
export interface Decision {
  project: string; slug: string; question: string; basis: Basis;
  context: string; options: string[]; reasoning: string; tradeoff: string; decision: string; validateNext: string;
}

export const decisions: Decision[] = [
  {
    project: "Groww for Gen Z", slug: "groww", basis: "retrospective",
    question: "Why I prioritised beginner confidence over adding more investment options.",
    context: "The research I synthesised pointed to financial literacy gaps, decision overload and low trust as the barriers stopping young people from making a first investment.",
    options: ["Add more products and categories to attract Gen Z", "Lower the effort and anxiety of the first decision", "Lean on content and education outside the product"],
    reasoning: "More options make overload worse for the exact user I was designing for. If the barrier is confidence, the first job is a guided first step that explains itself in plain language.",
    tradeoff: "A narrower first experience may feel limiting to users who already know what they want.",
    decision: "Propose Simple Start: a guided first-investment experience with goal-based discovery, plain-language explanations and risk-aware shortlists.",
    validateNext: "Whether guided users complete a first investment at a higher rate, and whether they are still active at 30 and 90 days.",
  },
  {
    project: "Lily", slug: "lily", basis: "retrospective",
    question: "Why I structured 13+ user intents instead of building a generic chatbot.",
    context: "EV buyers come with a handful of recurring jobs: picking a model, comparing vehicles and working out affordability. A free-form chatbot answers all of them the same way.",
    options: ["Open-ended chatbot with a strong prompt", "Intent-based routing into structured decision flows", "A static comparison tool with no AI"],
    reasoning: "Mapping 13+ intent patterns let each job get the right output: a recommendation, a side-by-side comparison or an EMI breakdown. Structured JSON made those outputs predictable enough to render as real interface, not just paragraphs.",
    tradeoff: "More design and maintenance work, and queries outside the mapped intents need a sensible fallback.",
    decision: "Route by intent, return structured JSON from the Claude API, and render purpose-built views for each decision.",
    validateNext: "How often real queries fall outside the mapped intents, and which fallback answers users find useful.",
  },
  {
    project: "Vendora", slug: "vendora", basis: "documented",
    question: "Why I prioritised actionable guidance over additional notifications.",
    context: "Merchants faced a cluttered dashboard and a stream of alerts. Several requests in the backlog asked for even more signals.",
    options: ["Add new notification types", "Declutter and make alerts dismissible first", "Build guidance that tells merchants what to do next"],
    reasoning: "More notifications add noise to an already noisy surface. Decluttering and dismissible alerts lower the noise; Top 3 Actions This Week turns what’s left into a short list of things to do.",
    tradeoff: "Some requested alert types wait for a later phase, and the requesting merchants see slower progress on their specific asks.",
    decision: "Prioritise dashboard decluttering, dismissible alerts and Top 3 Actions This Week, measured by Weekly Action Rate.",
    validateNext: "Whether Weekly Action Rate rises without merchants missing alerts that matter.",
  },
  {
    project: "Vendora", slug: "vendora", basis: "documented",
    question: "Why I chose rules and human review before AI-based review classification.",
    context: "The Trust & Review Intelligence proposal needed a way to flag suspicious reviews. An ML classifier was an obvious idea.",
    options: ["Train a model to classify fake reviews", "Start with order-linked collection, verification and rule-based checks, with humans reviewing flags", "Do nothing automated and rely on reports"],
    reasoning: "A classifier is only as good as its training data, and Vendora didn’t yet have reliably verified reviews. Order-linked collection creates that data; rules are explainable to merchants; human review stops a wrong flag from hurting an honest seller.",
    tradeoff: "Slower and less scalable at first, and some sophisticated abuse will get through rules.",
    decision: "Build trustworthy data first: purchase verification, duplicate detection, explainable trust labels and human review before automated action. Advanced AI moves to future scope.",
    validateNext: "False-positive rate of rule-based flags and how much verified data accumulates before a model becomes worth training.",
  },
  {
    project: "Metadome.ai", slug: "metadome", basis: "retrospective",
    question: "Why technical capabilities need a clear business case.",
    context: "An AI/XR diagnostic platform is impressive to demo. The challenge was explaining why a business should pay for it.",
    options: ["Lead with the technology and its novelty", "Lead with the operational problem and the value of solving it"],
    reasoning: "Buyers fund outcomes, not capabilities. Tying each AI capability to a problem it removes, then to an ROI model, makes the product something a decision-maker can say yes to.",
    tradeoff: "A business-first story can undersell what’s technically new, and ROI assumptions need to be stated openly.",
    decision: "Build the strategy around problem discovery, AI-to-product logic and a business case with an ROI model, then package it as executive summary and BRD/PRD/SOW-style documents.",
    validateNext: "Which ROI assumptions a real buyer would challenge first, and how to evidence them.",
  },
];
