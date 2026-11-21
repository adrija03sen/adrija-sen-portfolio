import type { WidgetName } from "../../data/projects";
import { Rice, MoscowView, Roadmap, Deps, Journeys, Trust, Scope, Metrics } from "./Vendora";
import { LilyFlow, GrowwExperiments, GraphArch } from "./Other";

export default function Widget({ name }: { name: WidgetName }) {
  switch (name) {
    case "rice": return <Rice />;
    case "moscow": return <MoscowView />;
    case "roadmap": return <Roadmap />;
    case "deps": return <Deps />;
    case "journeys": return <Journeys />;
    case "trust": return <Trust />;
    case "scope": return <Scope />;
    case "metrics": return <Metrics />;
    case "lily-flow": return <LilyFlow />;
    case "groww-experiments": return <GrowwExperiments />;
    case "graph-arch": return <GraphArch />;
  }
}
