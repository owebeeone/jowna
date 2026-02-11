import { useChartScreenContext } from "../context";

export function ChartToolbar() {
  const model = useChartScreenContext();

  return (
    <div className="panel row chart-toolbar" style={{ justifyContent: "space-between" }}>
      <div className="row">
        <button
          className="ghost"
          onClick={() => model.actions?.goBack()}
          disabled={model.historyIndex <= 0}
        >
          Back
        </button>
        <button
          className="ghost"
          onClick={() => model.actions?.goForward()}
          disabled={model.historyIndex >= model.history.length - 1}
        >
          Forward
        </button>
        <button
          className="ghost"
          onClick={() => model.parentFocusPath && model.actions?.focusPath(model.parentFocusPath)}
          disabled={!model.parentFocusPath}
        >
          Up
        </button>
        <button className="ghost" onClick={() => model.actions?.clearFocus()}>
          Reset
        </button>
        <button className="ghost" onClick={model.onToggleDetailsPanel}>
          {model.detailsPanelCollapsed ? "Show Details" : "Hide Details"}
        </button>
      </div>

      <div className="row" style={{ minWidth: 220 }}>
        {model.hasKeyCallouts && (
          <button className="ghost chart-annotation-toggle" onClick={model.onToggleKeyCallouts}>
            {model.showKeyCallouts ? "x" : "[...]"}
          </button>
        )}
        <label className="row chart-collapse-wrap">
          <input
            type="checkbox"
            checked={model.resolvedChartSettings.collapseRedundant}
            onChange={(event) =>
              model.updateChartSettings({ collapseRedundant: event.target.checked })
            }
          />
          <span>Collapse</span>
        </label>
        <span className="muted">Depth</span>
        <input type="number" {...model.depthBind} min={0} max={12} />
      </div>
    </div>
  );
}
