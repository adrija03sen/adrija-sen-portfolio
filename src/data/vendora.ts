// ─────────────────────────────────────────────────────────────────────────────
// VENDORA WIDGET DATA
// The source PDF was not available when this file was written. Facts taken from
// the brief are marked [brief]. Everything marked [illustrative] is a stand-in
// that shows how the widget works: replace it with the values from your Vendora
// document, then set VENDORA_ILLUSTRATIVE to false to remove the on-page caption.
// ─────────────────────────────────────────────────────────────────────────────
export const VENDORA_ILLUSTRATIVE = true;

export type Moscow = "Must" | "Should" | "Could" | "Won’t (now)";
export interface Feature {
  id: string; name: string; reach: number; impact: number; confidence: number; effort: number;
  moscow: Moscow; inScope: boolean; weeks?: [number, number]; dependsOn?: string[]; note?: string;
}

// RICE = (Reach × Impact × Confidence) / Effort. Reach: merchants per quarter. Impact 0.25–3. Confidence 0–1. Effort: person-weeks.
export const features: Feature[] = [
  // In scope [brief: these three were prioritised]; scores [illustrative]
  { id: "declutter", name: "Dashboard decluttering", reach: 9000, impact: 2, confidence: 0.9, effort: 3, moscow: "Must", inScope: true, weeks: [1, 3], note: "Foundation: reduces noise before anything new is added." },
  { id: "dismiss", name: "Dismissible alerts", reach: 8000, impact: 1, confidence: 0.9, effort: 1, moscow: "Must", inScope: true, weeks: [2, 3], dependsOn: ["declutter"] },
  { id: "top3", name: "Top 3 Actions This Week", reach: 7000, impact: 3, confidence: 0.7, effort: 4, moscow: "Must", inScope: true, weeks: [4, 7], dependsOn: ["declutter", "signals"], note: "The guidance layer. Drives Weekly Action Rate." },
  // In scope, names [illustrative]
  { id: "signals", name: "Unified merchant signals feed", reach: 7000, impact: 1, confidence: 0.8, effort: 2, moscow: "Should", inScope: true, weeks: [3, 4], dependsOn: ["declutter"] },
  { id: "prefs", name: "Alert preference settings", reach: 5000, impact: 1, confidence: 0.8, effort: 1, moscow: "Should", inScope: true, weeks: [7, 8], dependsOn: ["dismiss"] },
  { id: "digest", name: "Weekly summary email", reach: 6000, impact: 1, confidence: 0.6, effort: 2, moscow: "Should", inScope: true, weeks: [8, 9], dependsOn: ["top3"] },
  // Deferred [illustrative]
  { id: "ai-pricing", name: "AI pricing suggestions", reach: 6000, impact: 3, confidence: 0.5, effort: 6, moscow: "Won’t (now)", inScope: false, dependsOn: ["signals"], note: "Big potential impact, but low confidence and it depends on clean signals that don’t exist yet." },
  { id: "custom-reports", name: "Custom report builder", reach: 2500, impact: 2, confidence: 0.8, effort: 5, moscow: "Could", inScope: false },
  { id: "bulk-edit", name: "Bulk inventory editing", reach: 3000, impact: 2, confidence: 0.8, effort: 3, moscow: "Could", inScope: false },
  { id: "multi-store", name: "Multi-store switching", reach: 800, impact: 2, confidence: 0.7, effort: 4, moscow: "Won’t (now)", inScope: false },
  { id: "new-alerts", name: "New notification types", reach: 5000, impact: 0.5, confidence: 0.6, effort: 2, moscow: "Won’t (now)", inScope: false, note: "Adds noise to the problem being solved." },
  { id: "themes", name: "Dashboard themes", reach: 4000, impact: 0.25, confidence: 0.9, effort: 1, moscow: "Won’t (now)", inScope: false },
];

export const rice = (f: Feature) => Math.round((f.reach * f.impact * f.confidence) / f.effort);

export const roadmapPhases = [
  { from: 1, to: 9, label: "Build: six features [brief]" },
  { from: 10, to: 12, label: "Testing and rollout [brief]" },
];

export const trustLabels = [
  { name: "Verified purchase", tone: "volt", rule: "The review is linked to a completed order on Vendora.", shows: "Shown to shoppers with the order month, never the order ID." },
  { name: "Unverified", tone: "muted", rule: "No matching order was found. The review still shows, without the verified mark.", shows: "Explains why, so the label reads as information rather than accusation." },
  { name: "Under review", tone: "lime", rule: "A suspicious pattern was detected, such as near-duplicate text or a burst of reviews in a short window.", shows: "Visible to the merchant with the reason. A person decides what happens next; nothing is removed automatically." },
];

export const scope = {
  mvp: [
    "Order-linked review requests after delivery",
    "Purchase verification against order records",
    "Duplicate and near-duplicate detection",
    "Explainable trust labels",
    "Rule-based suspicious-pattern flags",
    "Human review queue before any action",
  ],
  later: [
    "ML-based review classification, once verified data exists",
    "Review sentiment and theme summaries for merchants",
    "Reviewer reputation across stores",
    "Automated action for high-confidence cases only",
  ],
};

export const journeys = {
  customer: [
    { step: "Order delivered", detail: "A review request arrives, linked to that order." },
    { step: "Writes review", detail: "Short form with rating, text and optional photo." },
    { step: "Checks run", detail: "Purchase verified; duplicate and pattern checks run quietly." },
    { step: "Sees label", detail: "Their review shows as Verified purchase." },
  ],
  merchant: [
    { step: "Opens reviews", detail: "Sees reviews grouped by trust label." },
    { step: "Reads why", detail: "Each flag carries a plain-language reason." },
    { step: "Escalates", detail: "Can request human review of a flag." },
    { step: "Acts on insight", detail: "Uses trusted reviews to fix real product issues." },
  ],
};

export const metrics = {
  northStar: { name: "Weekly Action Rate", def: "Share of active merchants who complete at least one recommended action in a week. [brief]" },
  supporting: [
    { name: "Top 3 Actions completion", def: "How many of the suggested actions get done." },
    { name: "Alert dismissal patterns", def: "Which alerts get dismissed unread, a signal of noise." },
    { name: "Time to first action", def: "From opening the dashboard to doing something useful." },
  ],
  guardrails: [
    { name: "Missed critical alerts", def: "Merchants must not lose important signals because of decluttering." },
    { name: "Merchant churn", def: "Watched closely for at-risk accounts such as UrbanThread." },
  ],
};
