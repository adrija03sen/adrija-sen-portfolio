// Case studies are data-driven. Add a project by appending to `projects`.
export type WidgetName =
  | "rice" | "moscow" | "roadmap" | "deps" | "journeys" | "trust" | "scope" | "metrics"
  | "lily-flow" | "groww-experiments" | "graph-arch";

export type Block =
  | { kind: "prose"; text: string[] }
  | { kind: "list"; items: string[] }
  | { kind: "pairs"; items: { label: string; text: string }[] }
  | { kind: "note"; tone: "proposal" | "retro" | "plan"; text: string }
  | { kind: "widget"; widget: WidgetName };

export interface CaseSection { id: string; title: string; part?: string; blocks: Block[] }

export type StatusTone = "build" | "proposal" | "independent";
export interface Project {
  slug: string; number: string; title: string; dek: string; category: string;
  context: string; status: { label: string; tone: StatusTone };
  problem: string; contribution: string[]; question: string;
  disclaimer?: string; sections: CaseSection[];
}

export const projects: Project[] = [
  // ───────────────────────────── LILY ─────────────────────────────
  {
    slug: "lily", number: "01", title: "Lily",
    dek: "An intelligent EV assistant that helps buyers choose, compare and afford.",
    category: "AI Product Development", context: "Freelance project for Lilypad",
    status: { label: "Freelance build", tone: "build" },
    problem: "EV buyers often struggle with model selection, vehicle comparisons and affordability decisions.",
    question: "What does an EV buyer need to hear before they feel ready to decide?",
    contribution: [
      "Gathered requirements and shaped product strategy.",
      "Identified and mapped 13+ user intent patterns.",
      "Designed structured decision flows and intent-based routing.",
      "Integrated the Claude API with structured JSON outputs.",
      "Developed an interactive experience for recommendations, comparisons and budget/EMI insights.",
      "Contributed to go-to-market positioning.",
    ],
    sections: [
      { id: "discovery", title: "Problem discovery", blocks: [
        { kind: "prose", text: [
          "Buying an EV still feels like research homework. Specs are scattered across brand sites, comparison articles disagree, and the question most buyers care about, whether they can afford it month to month, usually needs a separate calculator.",
          "Working from Lilypad’s requirements, I treated the problem as decision support rather than information supply. Buyers don’t lack information. They lack a way to turn it into a decision they feel sure about.",
        ]},
      ]},
      { id: "needs", title: "User needs and use cases", blocks: [
        { kind: "prose", text: ["The recurring needs fell into three jobs. I mapped 13+ intent patterns underneath them, so each job could be answered in its own way."] },
        { kind: "pairs", items: [
          { label: "Choosing", text: "Which EV suits my usage, my city and my budget? The buyer wants a shortlist with reasons, not a catalogue." },
          { label: "Comparing", text: "How do these two or three models actually differ? The buyer wants differences side by side, not two separate descriptions." },
          { label: "Affording", text: "What will this cost me each month? The buyer wants budget and EMI insight in the same conversation as the recommendation." },
        ]},
      ]},
      { id: "opportunity", title: "Product opportunity", blocks: [
        { kind: "prose", text: [
          "A single assistant that keeps context across all three jobs can shorten the path from curiosity to a confident shortlist. The opportunity wasn’t to answer EV questions. Search already does that. It was to remember what the buyer said earlier and carry it into the next decision.",
        ]},
      ]},
      { id: "journey", title: "User journey", blocks: [
        { kind: "prose", text: ["A typical path moves from an open question to a structured answer, then to a follow-up the user didn’t have to re-explain."] },
        { kind: "widget", widget: "lily-flow" },
      ]},
      { id: "prioritisation", title: "Feature prioritisation", blocks: [
        { kind: "prose", text: [
          "The first version focused on the three decision jobs, because each one maps directly to a buying moment. Anything that didn’t help someone choose, compare or afford was a later idea.",
        ]},
        { kind: "pairs", items: [
          { label: "First", text: "Recommendations, side-by-side comparisons, budget and EMI insights." },
          { label: "Supporting", text: "Intent routing and structured outputs, so the three jobs render reliably." },
          { label: "Later", text: "Anything outside the core buying decision." },
        ]},
      ]},
      { id: "ai-vs-rules", title: "AI versus rule-based decisions", blocks: [
        { kind: "prose", text: [
          "Not every part of Lily should be generated. Understanding a loosely worded question and explaining a trade-off in plain language is where a language model helps. Arithmetic and structure are where it shouldn’t improvise.",
        ]},
        { kind: "pairs", items: [
          { label: "Model", text: "Interpreting the question, matching it to an intent, writing the explanation around a recommendation." },
          { label: "Structure", text: "Responses returned as structured JSON, so comparisons and EMI views render as consistent interface components." },
          { label: "Principle", text: "If a wrong answer would cost the user money, the format should be predictable and checkable." },
        ]},
      ]},
      { id: "feasibility", title: "Technical feasibility", blocks: [
        { kind: "prose", text: [
          "The key feasibility question was whether a model could return output consistent enough to drive interface, not just text. Structured JSON from the Claude API answered that: each intent has an expected shape, and the interface renders the shape it receives.",
        ]},
      ]},
      { id: "architecture", title: "Product architecture", blocks: [
        { kind: "list", items: [
          "User message enters the conversation with prior context.",
          "Intent routing selects one of the mapped decision flows.",
          "The Claude API returns structured JSON for that flow.",
          "The interface renders a recommendation, comparison or EMI view, plus the explanation.",
        ]},
      ]},
      { id: "evaluation", title: "Evaluation strategy", blocks: [
        { kind: "note", tone: "plan", text: "This is how I would evaluate Lily. It describes a plan, not results that were measured." },
        { kind: "pairs", items: [
          { label: "Intent accuracy", text: "Does each query land in the right flow? Review a sample of real queries by hand." },
          { label: "Output validity", text: "Does every response match its expected JSON shape?" },
          { label: "Usefulness", text: "Do users act on the recommendation, for example by comparing or checking EMI next?" },
          { label: "Fallback rate", text: "How often do queries fall outside mapped intents, and what happens when they do?" },
        ]},
      ]},
      { id: "roadmap", title: "Future roadmap", blocks: [
        { kind: "note", tone: "plan", text: "Ideas for future versions. None of these have been built." },
        { kind: "list", items: [
          "Learn new intents from fallback queries rather than guessing them up front.",
          "Clearer sourcing for specifications, so users can see where a number comes from.",
          "A handoff from shortlist to test drive or dealer enquiry, to connect the assistant to a business outcome.",
        ]},
      ]},
    ],
  },

  // ───────────────────────────── GROWW ─────────────────────────────
  {
    slug: "groww", number: "02", title: "Groww for Gen Z",
    dek: "A guided first-investment experience for people who want to start but don’t know how.",
    category: "Product Strategy", context: "Recruitment challenge",
    status: { label: "Recruitment challenge", tone: "proposal" },
    problem: "Young investors experience financial literacy gaps, decision overload and low trust when starting their investment journey.",
    question: "Why do young people who want to invest still not make their first investment?",
    disclaimer: "This is a product strategy proposal written for a recruitment challenge. I did not work at Groww, nothing here was built or launched, and the experiments are proposed, not run.",
    contribution: [
      "Synthesised research from SEBI, FCA, IOSCO and OECD, alongside five systematic reviews.",
      "Identified key beginner-investor barriers.",
      "Proposed Simple Start, a guided first-investment experience.",
      "Introduced goal-based discovery, plain-language explanations and risk-aware shortlists.",
      "Planned five product experiments.",
    ],
    sections: [
      { id: "research", title: "Research synthesis", blocks: [
        { kind: "prose", text: [
          "I started with secondary research rather than opinions: regulator and policy material from SEBI, the FCA, IOSCO and the OECD, alongside five systematic reviews on investor behaviour and financial literacy.",
          "The aim was to separate what beginners say they want from what actually stops them.",
        ]},
        { kind: "note", tone: "proposal", text: "No primary user research was conducted. Findings come from published sources." },
      ]},
      { id: "framing", title: "Problem framing", blocks: [
        { kind: "prose", text: ["Three barriers kept appearing. Together they explained why access alone hasn’t turned interest into first investments."] },
        { kind: "pairs", items: [
          { label: "Literacy gaps", text: "Terms like NAV, expense ratio and volatility make the first decision feel like an exam." },
          { label: "Decision overload", text: "Thousands of funds and stocks, and no clear way to narrow them down." },
          { label: "Low trust", text: "Fear of losing money, and uncertainty about whether recommendations are in the user’s interest." },
        ]},
        { kind: "prose", text: ["Reframed: the problem isn’t too few options. It’s too little confidence to choose one."] },
      ]},
      { id: "personas", title: "User personas", blocks: [
        { kind: "note", tone: "proposal", text: "These are proto-personas built from the research synthesis, not from interviews." },
        { kind: "pairs", items: [
          { label: "The hesitant starter", text: "Has a first salary, knows they should invest, opens the app, browses, and leaves without acting." },
          { label: "The tip follower", text: "Learns from social media and friends, wants to act quickly, and has little sense of risk." },
          { label: "The goal saver", text: "Is saving for something specific and doesn’t think of it as investing at all." },
        ]},
      ]},
      { id: "journey", title: "Journey mapping", blocks: [
        { kind: "pairs", items: [
          { label: "Curious", text: "Downloads the app after seeing others invest." },
          { label: "Overwhelmed", text: "Faces long lists and unfamiliar terms. This is where most of the drop-off risk sits." },
          { label: "Unsure", text: "Worries about choosing wrong and losing money." },
          { label: "Stalls", text: "Leaves to come back later, which often means never." },
        ]},
        { kind: "prose", text: ["Simple Start is designed to intervene between overwhelmed and stalls."] },
      ]},
      { id: "prioritisation", title: "Feature prioritisation", blocks: [
        { kind: "pairs", items: [
          { label: "Goal-based discovery", text: "Start from what the user is saving for, not from product categories." },
          { label: "Plain-language explanations", text: "Explain every term at the moment it matters." },
          { label: "Risk-aware shortlists", text: "Show a few suitable options instead of a full marketplace." },
        ]},
        { kind: "prose", text: ["Adding more investment options was deliberately deprioritised. For this user, it would make the main barrier worse."] },
      ]},
      { id: "strategy", title: "Product strategy: Simple Start", blocks: [
        { kind: "prose", text: [
          "Simple Start is a guided first-investment experience. The user picks a goal, sees a short, risk-aware shortlist explained in plain language, and makes a first, small investment with a clear sense of what they bought and why.",
          "The strategic bet is that confidence earned in the first investment carries into later ones.",
        ]},
      ]},
      { id: "experiments", title: "Experiment design", blocks: [
        { kind: "note", tone: "proposal", text: "All five experiments are proposed. None were run." },
        { kind: "widget", widget: "groww-experiments" },
      ]},
      { id: "metrics", title: "Success metrics", blocks: [
        { kind: "pairs", items: [
          { label: "Primary", text: "First-investment completion among new users who enter Simple Start." },
          { label: "Supporting", text: "Time from install to first investment; explanation engagement; shortlist-to-investment conversion." },
          { label: "Guardrail", text: "Early withdrawals or complaints suggesting users were nudged into something unsuitable." },
        ]},
      ]},
      { id: "retention", title: "30/90-day retention measurement", blocks: [
        { kind: "prose", text: [
          "A first investment is a good start, not proof of value. I planned to measure retention at 30 and 90 days, comparing users who came through Simple Start with those who didn’t.",
          "Thirty days tells us whether the first experience was understood. Ninety days tells us whether a habit is forming, such as a second investment or a recurring plan.",
        ]},
        { kind: "note", tone: "plan", text: "A measurement plan. No retention data exists for this proposal." },
      ]},
    ],
  },

  // ───────────────────────────── GRAPHMIND ─────────────────────────────
  {
    slug: "graphmind", number: "03", title: "GraphMindAI",
    dek: "Graph-based memory so long AI conversations keep what matters.",
    category: "AI Systems", context: "Independent project",
    status: { label: "Independent project", tone: "independent" },
    problem: "Long AI conversations can lose important context.",
    question: "What does it feel like when an assistant forgets what you told it?",
    contribution: [
      "Built a graph-based memory system.",
      "Designed Neo4j graph storage.",
      "Integrated semantic retrieval and LLM inference.",
      "Explored contextual and explainable responses.",
    ],
    sections: [
      { id: "problem", title: "User problem", blocks: [
        { kind: "prose", text: [
          "In a long conversation, an assistant may forget a constraint mentioned an hour ago, or contradict something it said earlier. For the user, this isn’t a technical limit. It feels like not being listened to, and they end up repeating themselves.",
        ]},
      ]},
      { id: "why", title: "Why memory matters", blocks: [
        { kind: "prose", text: [
          "Memory turns a series of answers into a working relationship. It decides whether an assistant can help with multi-step work, such as planning, research or a project, rather than isolated questions.",
        ]},
      ]},
      { id: "hypothesis", title: "Product hypothesis", blocks: [
        { kind: "note", tone: "proposal", text: "A hypothesis I explored by building, not one I tested with users." },
        { kind: "prose", text: [
          "If memory is stored as connected entities and relationships rather than as a growing pile of text, the assistant can retrieve the right context, and explain where it came from. Explainability should make users trust remembered context more.",
        ]},
      ]},
      { id: "design", title: "System design", blocks: [
        { kind: "widget", widget: "graph-arch" },
      ]},
      { id: "tradeoffs", title: "Technical trade-offs", blocks: [
        { kind: "pairs", items: [
          { label: "Graph vs plain vectors", text: "A graph captures relationships and makes retrieval explainable, but costs more to build and maintain than embeddings alone." },
          { label: "What to remember", text: "Storing everything is noisy. Storing too little loses context. Extraction rules decide the quality of memory." },
          { label: "Latency", text: "Every retrieval step adds time before the answer appears." },
        ]},
      ]},
      { id: "reliability", title: "Reliability considerations", blocks: [
        { kind: "list", items: [
          "Wrong memories are worse than no memory, so stored facts need a way to be corrected or removed.",
          "Retrieved context should be shown, not hidden, so users can catch mistakes.",
          "Stale information needs to give way when the user says something new.",
        ]},
      ]},
      { id: "future", title: "Future product opportunities", blocks: [
        { kind: "note", tone: "plan", text: "Directions, not built features." },
        { kind: "list", items: [
          "A memory view where users see and edit what the assistant knows.",
          "Project-scoped memory, so work contexts don’t leak into each other.",
          "Memory for support and onboarding assistants, where forgetting is costly.",
        ]},
      ]},
    ],
  },

  // ───────────────────────────── VENDORA ─────────────────────────────
  {
    slug: "vendora", number: "04", title: "Vendora",
    dek: "Merchant experience and trust intelligence for a seller platform.",
    category: "Product Strategy, Roadmapping, Prioritisation", context: "APM hiring assignment, fictional company",
    status: { label: "Hiring assignment", tone: "proposal" },
    problem: "Merchants faced a cluttered dashboard with too many signals and too little guidance, and shoppers had little reason to trust reviews.",
    question: "What should a merchant do this week, and can they trust what reviews are telling them?",
    disclaimer: "Vendora is a fictional company from an APM hiring assignment. Everything below is a proposed product strategy. None of these features are deployed.",
    contribution: [
      "Analysed 24 feature requests and ranked them with RICE.",
      "Applied MoSCoW to set final scope: six features in nine weeks, three weeks for testing and rollout.",
      "Defined Weekly Action Rate as the primary success metric.",
      "Designed Trust & Review Intelligence with verification, explainable labels and human review.",
    ],
    sections: [
      { id: "context", title: "The brief", part: "Part A: Merchant dashboard and guidance roadmap", blocks: [
        { kind: "prose", text: [
          "Part A asked for a 12-week roadmap from a backlog of 24 feature requests, within real engineering capacity. Part B asked for a new feature proposal. I chose Trust & Review Intelligence.",
          "The thread connecting both: merchants don’t need more information. They need information they can act on and trust.",
        ]},
      ]},
      { id: "rice", title: "Ranking 24 requests with RICE", part: "Part A: Merchant dashboard and guidance roadmap", blocks: [
        { kind: "prose", text: ["RICE gave a common scale for very different requests. Change the sort, or filter by scope, to see how the ranking became a plan."] },
        { kind: "widget", widget: "rice" },
      ]},
      { id: "moscow", title: "From score to scope with MoSCoW", part: "Part A: Merchant dashboard and guidance roadmap", blocks: [
        { kind: "prose", text: ["A RICE score says what’s valuable. It doesn’t say what fits, or what has to come first. MoSCoW, combined with dependencies and capacity, set the final scope."] },
        { kind: "widget", widget: "moscow" },
      ]},
      { id: "roadmap", title: "The 12-week roadmap", part: "Part A: Merchant dashboard and guidance roadmap", blocks: [
        { kind: "prose", text: ["Six features in nine weeks of development, then three weeks reserved for testing and rollout. Select a feature to see what it waits on."] },
        { kind: "widget", widget: "roadmap" },
      ]},
      { id: "dependencies", title: "Dependencies and capacity", part: "Part A: Merchant dashboard and guidance roadmap", blocks: [
        { kind: "prose", text: ["Decluttering comes first because everything else lands on top of it. Top 3 Actions needs a clean surface and reliable signals before it can recommend anything."] },
        { kind: "widget", widget: "deps" },
      ]},
      { id: "delayed", title: "Why some high scorers waited", part: "Part A: Merchant dashboard and guidance roadmap", blocks: [
        { kind: "prose", text: [
          "Some features ranked well and still didn’t make the cut. A high score with low confidence, or a dependency that doesn’t exist yet, is a risk in the schedule rather than a win.",
          "Others would add notifications to the very surface the roadmap was trying to quiet. Shipping them would have worked against the primary metric.",
        ]},
      ]},
      { id: "urbanthread", title: "The UrbanThread retention risk", part: "Part A: Merchant dashboard and guidance roadmap", blocks: [
        { kind: "prose", text: [
          "UrbanThread, an important merchant, was at risk of leaving over a need the 12-week plan didn’t cover. Reshuffling the roadmap for one account would have delayed work for every merchant.",
          "Instead I proposed a workaround that addressed UrbanThread’s need in the short term without changing the roadmap, and treated the account as a guardrail to watch during rollout.",
        ]},
      ]},
      { id: "metrics", title: "North Star and supporting metrics", part: "Part A: Merchant dashboard and guidance roadmap", blocks: [
        { kind: "widget", widget: "metrics" },
      ]},
      { id: "trust-problem", title: "Why reviews need trust", part: "Part B: Trust and review intelligence", blocks: [
        { kind: "prose", text: [
          "Reviews only help if people believe them. Shoppers can’t tell a real buyer from a fake one, and merchants can’t tell genuine feedback from noise or attacks.",
          "Trust & Review Intelligence starts where trust starts: with knowing that a review came from a real purchase.",
        ]},
      ]},
      { id: "journeys", title: "Customer and merchant journeys", part: "Part B: Trust and review intelligence", blocks: [
        { kind: "widget", widget: "journeys" },
      ]},
      { id: "verification", title: "Verification and duplicate detection", part: "Part B: Trust and review intelligence", blocks: [
        { kind: "pairs", items: [
          { label: "Order-linked collection", text: "Review requests are tied to a completed order, so most reviews are verified at the source." },
          { label: "Purchase verification", text: "Reviews without a matching order still appear, but without the verified mark." },
          { label: "Duplicate detection", text: "Identical or near-identical text across reviews gets flagged." },
          { label: "Suspicious patterns", text: "Unusual activity, such as bursts of reviews in a short window, is flagged for review." },
        ]},
      ]},
      { id: "labels", title: "Explainable trust labels", part: "Part B: Trust and review intelligence", blocks: [
        { kind: "prose", text: ["Each label carries its reason. A merchant should never see a flag without knowing why it’s there."] },
        { kind: "widget", widget: "trust" },
      ]},
      { id: "human", title: "Human review before automated action", part: "Part B: Trust and review intelligence", blocks: [
        { kind: "prose", text: [
          "Automatically hiding a genuine review hurts an honest merchant and silences a real customer. Early on, a flag starts a human review, never an automatic removal.",
        ]},
      ]},
      { id: "scope", title: "MVP versus future scope", part: "Part B: Trust and review intelligence", blocks: [
        { kind: "widget", widget: "scope" },
      ]},
      { id: "data-first", title: "Why trustworthy data comes before advanced AI", part: "Part B: Trust and review intelligence", blocks: [
        { kind: "prose", text: [
          "A model that classifies fake reviews needs examples of real and fake reviews to learn from. Without verified data, it would learn from the same noise it is meant to filter.",
          "So the MVP builds the dataset first. Order-linked reviews and human decisions on flags become the labelled data a future classifier can be trained and checked against.",
        ]},
      ]},
      { id: "tradeoffs", title: "Product decisions and trade-offs", part: "Part B: Trust and review intelligence", blocks: [
        { kind: "pairs", items: [
          { label: "Guidance over alerts", text: "Fewer, actionable signals over more notifications. Some requested alert types wait." },
          { label: "Rules over models, for now", text: "Explainable and safe, but less scalable. Some sophisticated abuse will get through." },
          { label: "Humans in the loop", text: "Slower moderation in exchange for not punishing honest sellers." },
          { label: "Workaround over reshuffle", text: "Protect the roadmap for all merchants while managing one at-risk account." },
        ]},
      ]},
    ],
  },

  // ───────────────────────────── METADOME ─────────────────────────────
  {
    slug: "metadome", number: "05", title: "Metadome.ai",
    dek: "Turning an AI/XR diagnostic platform into a business case.",
    category: "AI Product Strategy", context: "Recruitment challenge",
    status: { label: "Recruitment challenge", tone: "proposal" },
    problem: "A technically impressive AI/XR diagnostic platform needed a clear answer to the buyer’s question: why pay for this?",
    question: "What business problem does this technology remove?",
    disclaimer: "This was a multi-day recruitment challenge. It is a strategy proposal and was not implemented.",
    contribution: [
      "Developed a multi-day product strategy for an AI/XR diagnostic platform.",
      "Covered problem discovery and AI-to-product logic.",
      "Developed a PRD-style narrative.",
      "Created a business case and ROI model.",
      "Prepared an executive summary and BRD/PRD/SOW-style documentation.",
    ],
    sections: [
      { id: "context", title: "The challenge", blocks: [
        { kind: "prose", text: [
          "Metadome.ai builds spatial computing for diagnostics, using augmented reality to help automotive technicians. The challenge ran over several days and asked for product strategy, not a demo.",
        ]},
      ]},
      { id: "discovery", title: "Problem discovery", blocks: [
        { kind: "prose", text: [
          "I started with the technician and the business they work for: where diagnosis is slow, where expertise is scarce, and what that costs. A capability only matters if it removes one of those costs.",
        ]},
      ]},
      { id: "ai-logic", title: "AI-to-product logic", blocks: [
        { kind: "prose", text: ["For every capability, the same chain of questions:"] },
        { kind: "list", items: [
          "What can the technology do?",
          "Which user problem does that solve?",
          "What changes in the workflow?",
          "What is that worth to the business?",
        ]},
        { kind: "prose", text: ["If a capability couldn’t complete the chain, it didn’t lead the story."] },
      ]},
      { id: "prd", title: "PRD-style narrative", blocks: [
        { kind: "prose", text: [
          "The PRD narrative tied users, problems, requirements and success measures together so product, engineering and business readers could each find their part without a separate document.",
        ]},
      ]},
      { id: "business", title: "Business case and ROI model", blocks: [
        { kind: "prose", text: [
          "The business case translated operational improvements into money a buyer would recognise, through an ROI model with its assumptions stated openly so they could be challenged.",
        ]},
      ]},
      { id: "docs", title: "Documentation", blocks: [
        { kind: "pairs", items: [
          { label: "Executive summary", text: "The decision in one page, for leaders." },
          { label: "BRD", text: "The business problem, objectives and value." },
          { label: "PRD", text: "Users, requirements and success criteria." },
          { label: "SOW", text: "Scope, deliverables and boundaries." },
        ]},
      ]},
      { id: "learning", title: "What I took away", blocks: [
        { kind: "prose", text: [
          "Deep technology needs a translator. Most of the value of a PM on an AI product is making the line from capability to outcome clear enough that someone can fund it.",
        ]},
      ]},
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
