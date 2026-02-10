import { DEFAULT_CHART_SETTINGS } from "../../../../grips";
import { MIN_LABEL_FONT_SIZE } from "../../common";
import { toColorInputValue } from "../color-input";
import { useChartScreenContext } from "../context";

export function ChartSettingsPopover() {
  const model = useChartScreenContext();

  if (!model.settingsPopoverOpen) {
    return null;
  }

  return (
    <div className="chart-settings-popover-backdrop" onClick={model.closeSettingsPopover}>
      <section
        className="panel chart-settings-popover"
        role="dialog"
        aria-modal="true"
        aria-label="Chart settings"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="chart-settings-popover-header">
          <h2>Chart Settings</h2>
          <button
            className="ghost popover-x"
            onClick={model.closeSettingsPopover}
            aria-label="Close chart settings"
          >
            X
          </button>
        </header>

        <div className="chart-settings-popover-body">
          <div className="chart-settings-grid">
            <label className="stack">
              <span className="muted">Background</span>
              <div className="row">
                <input
                  className="chart-color-input"
                  type="color"
                  value={toColorInputValue(model.resolvedChartSettings.background, "#f6f8f7")}
                  onChange={(event) =>
                    model.updateChartSettings({ background: event.target.value })
                  }
                />
                <input
                  value={model.resolvedChartSettings.background}
                  onChange={(event) =>
                    model.updateChartSettings({ background: event.target.value })
                  }
                />
              </div>
            </label>

            <label className="stack">
              <span className="muted">Border Color</span>
              <div className="row">
                <input
                  className="chart-color-input"
                  type="color"
                  value={toColorInputValue(model.resolvedChartSettings.borderColor, "#b7c2bc")}
                  onChange={(event) =>
                    model.updateChartSettings({ borderColor: event.target.value })
                  }
                />
                <input
                  value={model.resolvedChartSettings.borderColor}
                  onChange={(event) =>
                    model.updateChartSettings({ borderColor: event.target.value })
                  }
                />
              </div>
            </label>

            <label className="stack">
              <span className="muted">Border Width</span>
              <input
                type="number"
                min={0}
                step={0.2}
                value={model.resolvedChartSettings.borderWidth}
                onChange={(event) => {
                  const parsed = Number.parseFloat(event.target.value);
                  if (!Number.isFinite(parsed)) {
                    return;
                  }
                  model.updateChartSettings({ borderWidth: Math.max(0, parsed) });
                }}
              />
            </label>

            <label className="stack">
              <span className="muted">Wedge Stroke Color</span>
              <div className="row">
                <input
                  className="chart-color-input"
                  type="color"
                  value={toColorInputValue(model.resolvedChartSettings.wedgeStrokeColor, "#ffffff")}
                  onChange={(event) =>
                    model.updateChartSettings({ wedgeStrokeColor: event.target.value })
                  }
                />
                <input
                  value={model.resolvedChartSettings.wedgeStrokeColor}
                  onChange={(event) =>
                    model.updateChartSettings({ wedgeStrokeColor: event.target.value })
                  }
                />
              </div>
            </label>

            <label className="stack">
              <span className="muted">Wedge Stroke Width</span>
              <input
                type="number"
                min={0.4}
                step={0.2}
                value={model.resolvedChartSettings.wedgeStrokeWidth}
                onChange={(event) => {
                  const parsed = Number.parseFloat(event.target.value);
                  if (!Number.isFinite(parsed)) {
                    return;
                  }
                  model.updateChartSettings({ wedgeStrokeWidth: Math.max(0.4, parsed) });
                }}
              />
            </label>

            <label className="row" style={{ alignItems: "center" }}>
              <input
                type="checkbox"
                style={{ width: "auto" }}
                checked={model.resolvedChartSettings.collapseRedundant}
                onChange={(event) =>
                  model.updateChartSettings({ collapseRedundant: event.target.checked })
                }
              />
              <span>Collapse redundant wedges</span>
            </label>

            <label className="stack">
              <span className="muted">Font Family</span>
              <select
                value={model.resolvedChartSettings.fontFamily}
                onChange={(event) => model.updateChartSettings({ fontFamily: event.target.value })}
              >
                {model.chartFontOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="stack">
              <span className="muted">Font Size (px)</span>
              <input
                type="number"
                min={MIN_LABEL_FONT_SIZE}
                step={1}
                value={model.resolvedChartSettings.fontSizePx}
                onChange={(event) => {
                  const parsed = Number.parseFloat(event.target.value);
                  if (!Number.isFinite(parsed)) {
                    return;
                  }
                  model.updateChartSettings({ fontSizePx: Math.max(MIN_LABEL_FONT_SIZE, parsed) });
                }}
              />
            </label>

            <div className="stack">
              <span className="muted">Chart Width</span>
              <div className="row chart-dimension-row">
                <select
                  value={model.widthMode}
                  onChange={(event) =>
                    model.updateDimensionMode("width", event.target.value as "fit" | "custom")
                  }
                >
                  <option value="fit">Fit</option>
                  <option value="custom">Custom</option>
                </select>
                <input
                  type="number"
                  min={240}
                  step={10}
                  value={model.widthInputValue}
                  onChange={model.onDimensionValueChange("width")}
                  onFocus={model.onDimensionInputFocus("width")}
                  onBlur={model.onDimensionInputBlur("width")}
                  disabled={model.widthMode === "fit"}
                />
              </div>
            </div>

            <div className="stack">
              <span className="muted">Chart Height</span>
              <div className="row chart-dimension-row">
                <select
                  value={model.heightMode}
                  onChange={(event) =>
                    model.updateDimensionMode("height", event.target.value as "fit" | "custom")
                  }
                >
                  <option value="fit">Fit</option>
                  <option value="custom">Custom</option>
                </select>
                <input
                  type="number"
                  min={240}
                  step={10}
                  value={model.heightInputValue}
                  onChange={model.onDimensionValueChange("height")}
                  onFocus={model.onDimensionInputFocus("height")}
                  onBlur={model.onDimensionInputBlur("height")}
                  disabled={model.heightMode === "fit"}
                />
              </div>
            </div>
          </div>
        </div>

        <footer className="row chart-settings-popover-footer">
          <button
            className="ghost"
            onClick={() => model.persistChartSettings({ ...DEFAULT_CHART_SETTINGS })}
          >
            Reset Defaults
          </button>
          <button className="ghost" onClick={model.closeSettingsPopover}>
            Close
          </button>
        </footer>
      </section>
    </div>
  );
}
