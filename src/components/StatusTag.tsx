import type { StatusTone } from "../data/projects";

const styles: Record<StatusTone, string> = {
  build: "bg-volt text-paper border-volt",
  proposal: "border-ink/60 border-dashed",
  independent: "bg-lime text-limeink border-lime",
};

export default function StatusTag({ label, tone }: { label: string; tone: StatusTone }) {
  return <span className={`chip ${styles[tone]}`}>{label}</span>;
}
