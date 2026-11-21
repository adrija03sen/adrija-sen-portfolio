// The Lab grows over time. Change `status` to "published" and fill `body` when an entry is ready.
export type LabStatus = "planned" | "published";
export interface LabEntry { kind: string; title: string; status: LabStatus; body: string; }

export const lab: LabEntry[] = [
  { kind: "Product teardown", title: "A teardown of a consumer app’s onboarding", status: "planned", body: "Where it earns trust in the first minute, and where it asks for too much too soon." },
  { kind: "AI prototype", title: "A small AI prototype built in a weekend", status: "planned", body: "One narrow job, one evaluation question: does it beat the non-AI version?" },
  { kind: "Feature redesign", title: "Redesigning one feature I use every day", status: "planned", body: "The problem it solves, the problem it creates, and a cheaper fix." },
  { kind: "Experiment idea", title: "An experiment I’d want to run", status: "planned", body: "Hypothesis, metric, guardrail, and what result would change my mind." },
  { kind: "Product observation", title: "Short notes on products in the wild", status: "planned", body: "Small patterns I notice in apps, pricing pages and checkout flows." },
  { kind: "Failed experiment", title: "Lessons from something that didn’t work", status: "planned", body: "What I assumed, what actually happened, and what I’d test first next time." },
];
