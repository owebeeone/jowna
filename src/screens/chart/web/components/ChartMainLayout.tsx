import { useChartScreenContext } from "../context";
import { ChartCanvasPanel } from "./ChartCanvasPanel";
import { ChartDetailsPanel } from "./ChartDetailsPanel";

export function ChartMainLayout() {
  const model = useChartScreenContext();

  return (
    <div className={`chart-layout ${model.detailsPanelCollapsed ? "is-details-hidden" : ""}`}>
      <ChartCanvasPanel />
      <ChartDetailsPanel />
    </div>
  );
}
