import { useChartScreenContext } from "../context";

export function ChartHeader() {
  const model = useChartScreenContext();

  return (
    <header className="panel row" style={{ justifyContent: "space-between" }}>
      <div>
        <h1 style={{ marginBottom: 4 }}>Chart View</h1>
        <div className="muted">{model.dataset?.name ?? "No active dataset"}</div>
      </div>
      <div className="row">
        <button className="ghost" onClick={model.openSettingsPopover}>
          Chart Settings
        </button>
        <button className="ghost" onClick={model.onDownloadHtml} disabled={!model.dataset}>
          Download HTML
        </button>
        <button
          className="ghost"
          onClick={model.onDownloadSvg}
          disabled={!model.dataset || !model.chartLayout}
        >
          Download SVG
        </button>
        <button className="ghost" onClick={() => model.actions?.backToSelection()}>
          Back to Selection
        </button>
      </div>
    </header>
  );
}
