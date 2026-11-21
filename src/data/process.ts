export interface Stage { n: string; name: string; summary: string; questions: string[]; examples: { project: string; slug: string; text: string }[]; }

export const stages: Stage[] = [
  {
    n: "01", name: "Discover",
    summary: "Understand the user, identify pain points, research the market and challenge assumptions.",
    questions: ["Who is actually stuck, and where?", "What do we believe that we haven’t checked?"],
    examples: [
      { project: "Groww for Gen Z", slug: "groww", text: "Synthesised research from SEBI, FCA, IOSCO and OECD plus five systematic reviews to understand why beginner investors stall before their first investment." },
      { project: "Lily", slug: "lily", text: "Gathered requirements with Lilypad and mapped what EV buyers were really asking: which model, how it compares, and whether they can afford it." },
    ],
  },
  {
    n: "02", name: "Define",
    summary: "Frame the problem, identify user needs, establish product goals and define success.",
    questions: ["What is the smallest problem worth solving first?", "What would success look like in behaviour, not features?"],
    examples: [
      { project: "Groww for Gen Z", slug: "groww", text: "Framed the problem as low confidence and decision overload, not a lack of investment options." },
      { project: "GraphMindAI", slug: "graphmind", text: "Framed long-conversation context loss as a trust problem for users, not only a token-limit problem." },
    ],
  },
  {
    n: "03", name: "Prioritise",
    summary: "Evaluate impact, effort, confidence, dependencies and opportunity cost.",
    questions: ["What does this push out?", "What has to exist before this can work?"],
    examples: [
      { project: "Vendora", slug: "vendora", text: "Ranked 24 feature requests with RICE, then used MoSCoW and engineering capacity to set a six-feature, nine-week build scope." },
      { project: "Vendora", slug: "vendora", text: "Held back some high-scoring features because their dependencies weren’t in place yet." },
    ],
  },
  {
    n: "04", name: "Build",
    summary: "Translate requirements into PRDs, workflows, wireframes, prototypes and engineering-ready decisions.",
    questions: ["Could an engineer start from this?", "Which decisions should be rules, and which need a model?"],
    examples: [
      { project: "Lily", slug: "lily", text: "Designed intent-based routing and structured JSON outputs so AI responses render as reliable comparison and EMI views." },
      { project: "Ritzy Mobility", slug: "experience", text: "Prepared BRD/PRD-style documentation and UI prototypes for AI-driven solutions." },
    ],
  },
  {
    n: "05", name: "Measure",
    summary: "Evaluate adoption, engagement, retention, conversion and business impact.",
    questions: ["What number tells us users got value?", "What would make us stop?"],
    examples: [
      { project: "Vendora", slug: "vendora", text: "Defined Weekly Action Rate as the primary success metric: are merchants doing something useful because of the dashboard?" },
      { project: "Groww for Gen Z", slug: "groww", text: "Planned 30- and 90-day retention measurement to separate a good first experience from a lasting habit." },
      { project: "Ritzy Mobility", slug: "experience", text: "Built GA4 and GTM conversion funnels to see exactly where driver onboarding dropped off." },
    ],
  },
];
