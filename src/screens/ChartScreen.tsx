import { useGrip, useNumberGrip } from "@owebeeone/grip-react";
import { useMemo, useRef, useState, type ChangeEvent } from "react";
import type { ChartSettings, TreeNode } from "../domain";
import {
  createStandaloneChartDocument,
  toStandaloneChartFileName,
  type ChartLayoutNode,
  type ChartLayoutResult,
} from "../features/chart";
import {
  ACTIVE_DATASET,
  CHART_DEPTH_LIMIT,
  CHART_DEPTH_LIMIT_TAP,
  CHART_FOCUS_PATH,
  CHART_HISTORY,
  CHART_HISTORY_INDEX,
  CHART_HOVER_PATH,
  CHART_LAYOUT,
  CHART_SELECTED_PATH,
  CHART_SETTINGS_STATE,
  CHART_SETTINGS_STATE_TAP,
  DEFAULT_CHART_SETTINGS,
  JOWNA_ACTIONS,
} from "../grips";

const OUTER_RADIUS = 270;
const MAX_KEY_SEGMENTS = 10;
const KRONA_SATURATION = 0.5;
const KRONA_LIGHTNESS_BASE = 0.6;
const KRONA_LIGHTNESS_MAX = 0.8;
const KRONA_UNCLASSIFIED_COLOR = "rgb(220,220,220)";

export function ChartScreen() {
  const actions = useGrip(JOWNA_ACTIONS);
  const dataset = useGrip(ACTIVE_DATASET);
  const chartLayout = useGrip(CHART_LAYOUT);
  const focusPath = useGrip(CHART_FOCUS_PATH);
  const selectedPath = useGrip(CHART_SELECTED_PATH);
  const hoverPath = useGrip(CHART_HOVER_PATH);
  const history = useGrip(CHART_HISTORY) ?? [];
  const historyIndex = useGrip(CHART_HISTORY_INDEX) ?? -1;
  const chartSettings = useGrip(CHART_SETTINGS_STATE);
  const chartSettingsTap = useGrip(CHART_SETTINGS_STATE_TAP);
  const depthLimit = useGrip(CHART_DEPTH_LIMIT) ?? 0;
  const [settingsPopoverOpen, setSettingsPopoverOpen] = useState(false);
  const chartSvgRef = useRef<SVGSVGElement | null>(null);

  const depthBind = useNumberGrip(CHART_DEPTH_LIMIT, CHART_DEPTH_LIMIT_TAP, {
    emptyAs: 0,
    clamp: { min: 0, max: 12 },
  });

  const resolvedChartSettings = chartSettings ?? DEFAULT_CHART_SETTINGS;
  const chartSurfaceStyle = {
    background: resolvedChartSettings.background,
    borderWidth: `${Math.max(0, resolvedChartSettings.borderWidth)}px`,
    borderColor: resolvedChartSettings.borderColor,
  };
  const chartCanvasStyle = {
    width:
      typeof resolvedChartSettings.width === "number"
        ? `${Math.max(240, resolvedChartSettings.width)}px`
        : undefined,
    height:
      typeof resolvedChartSettings.height === "number"
        ? `${Math.max(240, resolvedChartSettings.height)}px`
        : undefined,
  };
  const labelFontSize = Math.max(8, resolvedChartSettings.fontSizePx);
  const widthMode = typeof resolvedChartSettings.width === "number" ? "custom" : "fit";
  const heightMode = typeof resolvedChartSettings.height === "number" ? "custom" : "fit";

  const kronaColors = useMemo(() => buildKronaColorMap(chartLayout ?? null), [chartLayout]);

  const resolvedFocusPath = dataset ? (focusPath ?? [dataset.tree.name]) : null;
  const activePath = hoverPath ?? selectedPath ?? resolvedFocusPath;
  const activeNode = dataset ? findNodeByPath(dataset.tree, activePath) : null;
  const activeLayoutNode =
    activePath && chartLayout
      ? (chartLayout.nodes.find((node) => pathEquals(node.path, activePath)) ?? null)
      : null;

  const totalMagnitude = chartLayout?.totalMagnitude ?? 0;
  const activeMagnitude = activeLayoutNode?.magnitude ?? activeNode?.magnitude ?? 0;
  const activeShare = totalMagnitude > 0 ? (activeMagnitude / totalMagnitude) * 100 : 0;

  const topSegments = (
    chartLayout?.nodes
      .filter((node) => node.depth === 1)
      .sort((left, right) => {
        if (right.magnitude !== left.magnitude) {
          return right.magnitude - left.magnitude;
        }
        return left.name.localeCompare(right.name);
      }) ?? []
  ).slice(0, MAX_KEY_SEGMENTS);
  const hiddenSegments =
    (chartLayout?.nodes.filter((node) => node.depth === 1).length ?? 0) - topSegments.length;

  const maxDepth = chartLayout?.nodes.reduce((max, node) => Math.max(max, node.depth), 0) ?? 0;
  const radiusScale = createRadiusScale(maxDepth, OUTER_RADIUS);
  const parentFocusPath =
    resolvedFocusPath && resolvedFocusPath.length > 1 ? resolvedFocusPath.slice(0, -1) : null;

  const onDownloadHtml = () => {
    if (!dataset) {
      return;
    }

    const html = createStandaloneChartDocument({
      datasetName: dataset.name,
      tree: dataset.tree,
      depthLimit,
      chartSettings: resolvedChartSettings,
    });
    downloadHtmlFile(toStandaloneChartFileName(dataset.name), html);
  };

  const onDownloadSvg = () => {
    if (!dataset || !chartSvgRef.current) {
      return;
    }
    downloadSvgFile(toSvgFileName(dataset.name), chartSvgRef.current);
  };

  const updateChartSettings = (partial: Partial<ChartSettings>) => {
    chartSettingsTap?.update((current) => ({
      ...(current ?? DEFAULT_CHART_SETTINGS),
      ...partial,
    }));
  };

  const updateDimensionMode = (dimension: "width" | "height", mode: "fit" | "custom") => {
    if (mode === "fit") {
      updateChartSettings({ [dimension]: "fit" } as Partial<ChartSettings>);
      return;
    }

    const currentDimension = resolvedChartSettings[dimension];
    const fallback = dimension === "width" ? 620 : 640;
    updateChartSettings({
      [dimension]:
        typeof currentDimension === "number" && Number.isFinite(currentDimension)
          ? Math.max(240, currentDimension)
          : fallback,
    } as Partial<ChartSettings>);
  };

  const onDimensionValueChange =
    (dimension: "width" | "height") => (event: ChangeEvent<HTMLInputElement>) => {
      const parsed = Number.parseInt(event.target.value, 10);
      if (!Number.isFinite(parsed)) {
        return;
      }
      updateChartSettings({ [dimension]: Math.max(240, parsed) } as Partial<ChartSettings>);
    };

  return (
    <div className="app-shell">
      <div className="app-frame">
        <header className="panel row" style={{ justifyContent: "space-between" }}>
          <div>
            <h1 style={{ marginBottom: 4 }}>Chart View</h1>
            <div className="muted">{dataset?.name ?? "No active dataset"}</div>
          </div>
          <div className="row">
            <button className="ghost" onClick={() => setSettingsPopoverOpen(true)}>
              Chart Settings
            </button>
            <button className="ghost" onClick={onDownloadHtml} disabled={!dataset}>
              Download HTML
            </button>
            <button className="ghost" onClick={onDownloadSvg} disabled={!dataset || !chartLayout}>
              Download SVG
            </button>
            <button className="ghost" onClick={() => actions?.backToSelection()}>
              Back to Selection
            </button>
          </div>
        </header>

        <div className="panel row chart-toolbar" style={{ justifyContent: "space-between" }}>
          <div className="row">
            <button
              className="ghost"
              onClick={() => actions?.goBack()}
              disabled={historyIndex <= 0}
            >
              Back
            </button>
            <button
              className="ghost"
              onClick={() => actions?.goForward()}
              disabled={historyIndex >= history.length - 1}
            >
              Forward
            </button>
            <button
              className="ghost"
              onClick={() => parentFocusPath && actions?.focusPath(parentFocusPath)}
              disabled={!parentFocusPath}
            >
              Up
            </button>
            <button className="ghost" onClick={() => actions?.clearFocus()}>
              Reset
            </button>
          </div>

          <div className="row" style={{ minWidth: 220 }}>
            <span className="muted">Depth</span>
            <input type="number" {...depthBind} min={0} max={12} />
          </div>
        </div>

        {resolvedFocusPath && (
          <div className="panel chart-breadcrumbs">
            <span className="muted">Focus</span>
            {resolvedFocusPath.map((segment, index) => {
              const crumbPath = resolvedFocusPath.slice(0, index + 1);
              const isLast = index === resolvedFocusPath.length - 1;
              return (
                <button
                  key={`${segment}-${index}`}
                  className={`crumb ${isLast ? "is-current" : ""}`}
                  onClick={() => actions?.focusPath(crumbPath)}
                >
                  {segment}
                </button>
              );
            })}
          </div>
        )}

        <div className="chart-layout">
          <section className="chart-surface chart-surface-krona" style={chartSurfaceStyle}>
            {!dataset || !chartLayout ? (
              <div className="muted">No chart data yet. Import a dataset and open chart.</div>
            ) : (
              <>
                <svg
                  ref={chartSvgRef}
                  className="chart-canvas chart-canvas-krona"
                  viewBox="0 0 620 620"
                  role="img"
                  style={chartCanvasStyle}
                >
                  <g
                    transform="translate(310 310)"
                    style={{ fontFamily: resolvedChartSettings.fontFamily }}
                  >
                    {chartLayout.nodes
                      .filter((node) => node.depth > 0)
                      .map((node) => {
                        const innerRadius = radiusScale(node.depth - 1);
                        const outerRadius = radiusScale(node.depth);
                        const pathData = arcPath(
                          innerRadius,
                          outerRadius,
                          node.startAngle,
                          node.endAngle,
                        );
                        if (!pathData) {
                          return null;
                        }

                        const isActive = activePath ? pathEquals(node.path, activePath) : false;
                        const isFocused = resolvedFocusPath
                          ? pathEquals(node.path, resolvedFocusPath)
                          : false;
                        const fill =
                          kronaColors.get(pathKey(node.path)) ?? KRONA_UNCLASSIFIED_COLOR;

                        return (
                          <path
                            key={node.path.join("/")}
                            className={`chart-wedge ${isActive ? "is-active" : ""} ${isFocused ? "is-focus" : ""}`}
                            d={pathData}
                            fill={fill}
                            stroke={isActive ? "#062d1e" : resolvedChartSettings.wedgeStrokeColor}
                            strokeWidth={
                              isActive ? 2.2 : Math.max(0.4, resolvedChartSettings.wedgeStrokeWidth)
                            }
                            opacity={hoverPath ? (isActive ? 1 : 0.42) : isFocused ? 1 : 0.92}
                            role="button"
                            tabIndex={0}
                            onMouseEnter={() => actions?.hoverPath(node.path)}
                            onMouseLeave={() => actions?.hoverPath(null)}
                            onClick={() => actions?.focusPath(node.path)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                actions?.focusPath(node.path);
                              }
                            }}
                          >
                            <title>{`${node.path.join(" / ")}: ${node.magnitude.toLocaleString()}`}</title>
                          </path>
                        );
                      })}

                    {chartLayout.nodes
                      .filter((node) => node.depth > 0)
                      .map((node) => {
                        const innerRadius = radiusScale(node.depth - 1);
                        const outerRadius = radiusScale(node.depth);
                        const label = createWedgeLabel(
                          node,
                          innerRadius,
                          outerRadius,
                          chartLayout.totalMagnitude,
                          maxDepth,
                        );
                        if (!label) {
                          return null;
                        }
                        return (
                          <text
                            key={`label-${node.path.join("/")}`}
                            className="chart-wedge-label"
                            x={label.x}
                            y={label.y}
                            textAnchor={label.anchor}
                            dominantBaseline="middle"
                            transform={`rotate(${label.rotate} ${label.x} ${label.y})`}
                            style={{
                              fontFamily: resolvedChartSettings.fontFamily,
                              fontSize: `${labelFontSize}px`,
                            }}
                          >
                            {label.text}
                          </text>
                        );
                      })}

                    <circle
                      r={radiusScale(0) + 42}
                      className="chart-center-disc"
                      onClick={() =>
                        parentFocusPath
                          ? actions?.focusPath(parentFocusPath)
                          : actions?.clearFocus()
                      }
                    />
                    <text x={0} y={-18} textAnchor="middle" className="chart-center-title">
                      {activeNode?.name ??
                        resolvedFocusPath?.[resolvedFocusPath.length - 1] ??
                        "Root"}
                    </text>
                    <text x={0} y={2} textAnchor="middle" className="chart-center-metric">
                      {activeMagnitude.toLocaleString()}
                    </text>
                    <text x={0} y={22} textAnchor="middle" className="chart-center-sub">
                      {activeShare.toFixed(1)}% of view
                    </text>
                  </g>
                </svg>
                <div className="chart-hint muted">
                  Click a segment to zoom. Hover to inspect. Click center to move up.
                </div>
              </>
            )}
          </section>

          <aside className="panel stack chart-details">
            <h3>{hoverPath ? "Hover Details" : "Details"}</h3>
            {!activeNode ? (
              <div className="muted">Hover or click a wedge to inspect node details.</div>
            ) : (
              <div className="stack">
                <div>
                  <strong>{activeNode.name}</strong>
                </div>
                <div className="muted">path: {(activePath ?? []).join(" / ")}</div>

                <div className="chart-stats">
                  <div className="chart-stat">
                    <span className="muted">Magnitude</span>
                    <strong>{activeMagnitude.toLocaleString()}</strong>
                  </div>
                  <div className="chart-stat">
                    <span className="muted">Share</span>
                    <strong>{activeShare.toFixed(1)}%</strong>
                  </div>
                  <div className="chart-stat">
                    <span className="muted">Children</span>
                    <strong>{activeNode.children?.length ?? 0}</strong>
                  </div>
                </div>

                {activeNode.description && <div>{activeNode.description}</div>}
                {activeNode.url && (
                  <div>
                    <a href={activeNode.url} target="_blank" rel="noreferrer">
                      {activeNode.url}
                    </a>
                  </div>
                )}
                <div className="stack">
                  {Object.entries(activeNode.attributes ?? {}).map(([key, value]) => (
                    <div key={key} className="muted">
                      <strong>{key}:</strong> {value}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="stack">
              <h3>Top Segments</h3>
              {topSegments.length === 0 ? (
                <div className="muted">No segments in the current view.</div>
              ) : (
                <div className="stack">
                  {topSegments.map((node) => {
                    const share = totalMagnitude > 0 ? (node.magnitude / totalMagnitude) * 100 : 0;
                    const isActive = activePath ? pathEquals(node.path, activePath) : false;
                    return (
                      <button
                        key={`key-${node.path.join("/")}`}
                        className={`key-row ${isActive ? "is-active" : ""}`}
                        onMouseEnter={() => actions?.hoverPath(node.path)}
                        onMouseLeave={() => actions?.hoverPath(null)}
                        onClick={() => actions?.focusPath(node.path)}
                      >
                        <span
                          className="legend-dot"
                          style={{
                            background:
                              kronaColors.get(pathKey(node.path)) ?? KRONA_UNCLASSIFIED_COLOR,
                          }}
                        />
                        <span className="key-label">{node.name}</span>
                        <span className="key-value">{share.toFixed(1)}%</span>
                      </button>
                    );
                  })}
                  {hiddenSegments > 0 && (
                    <div className="muted">+ {hiddenSegments} more in this level</div>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {settingsPopoverOpen && (
        <div
          className="chart-settings-popover-backdrop"
          onClick={() => setSettingsPopoverOpen(false)}
        >
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
                onClick={() => setSettingsPopoverOpen(false)}
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
                      value={toColorInputValue(resolvedChartSettings.background, "#f6f8f7")}
                      onChange={(event) => updateChartSettings({ background: event.target.value })}
                    />
                    <input
                      value={resolvedChartSettings.background}
                      onChange={(event) => updateChartSettings({ background: event.target.value })}
                    />
                  </div>
                </label>

                <label className="stack">
                  <span className="muted">Border Color</span>
                  <div className="row">
                    <input
                      className="chart-color-input"
                      type="color"
                      value={toColorInputValue(resolvedChartSettings.borderColor, "#b7c2bc")}
                      onChange={(event) => updateChartSettings({ borderColor: event.target.value })}
                    />
                    <input
                      value={resolvedChartSettings.borderColor}
                      onChange={(event) => updateChartSettings({ borderColor: event.target.value })}
                    />
                  </div>
                </label>

                <label className="stack">
                  <span className="muted">Border Width</span>
                  <input
                    type="number"
                    min={0}
                    step={0.2}
                    value={resolvedChartSettings.borderWidth}
                    onChange={(event) => {
                      const parsed = Number.parseFloat(event.target.value);
                      if (!Number.isFinite(parsed)) {
                        return;
                      }
                      updateChartSettings({ borderWidth: Math.max(0, parsed) });
                    }}
                  />
                </label>

                <label className="stack">
                  <span className="muted">Wedge Stroke Color</span>
                  <div className="row">
                    <input
                      className="chart-color-input"
                      type="color"
                      value={toColorInputValue(resolvedChartSettings.wedgeStrokeColor, "#ffffff")}
                      onChange={(event) =>
                        updateChartSettings({ wedgeStrokeColor: event.target.value })
                      }
                    />
                    <input
                      value={resolvedChartSettings.wedgeStrokeColor}
                      onChange={(event) =>
                        updateChartSettings({ wedgeStrokeColor: event.target.value })
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
                    value={resolvedChartSettings.wedgeStrokeWidth}
                    onChange={(event) => {
                      const parsed = Number.parseFloat(event.target.value);
                      if (!Number.isFinite(parsed)) {
                        return;
                      }
                      updateChartSettings({ wedgeStrokeWidth: Math.max(0.4, parsed) });
                    }}
                  />
                </label>

                <label className="stack">
                  <span className="muted">Font Family</span>
                  <input
                    value={resolvedChartSettings.fontFamily}
                    onChange={(event) => updateChartSettings({ fontFamily: event.target.value })}
                  />
                </label>

                <label className="stack">
                  <span className="muted">Font Size (px)</span>
                  <input
                    type="number"
                    min={8}
                    step={1}
                    value={resolvedChartSettings.fontSizePx}
                    onChange={(event) => {
                      const parsed = Number.parseFloat(event.target.value);
                      if (!Number.isFinite(parsed)) {
                        return;
                      }
                      updateChartSettings({ fontSizePx: Math.max(8, parsed) });
                    }}
                  />
                </label>

                <div className="stack">
                  <span className="muted">Chart Width</span>
                  <div className="row chart-dimension-row">
                    <select
                      value={widthMode}
                      onChange={(event) =>
                        updateDimensionMode("width", event.target.value as "fit" | "custom")
                      }
                    >
                      <option value="fit">Fit</option>
                      <option value="custom">Custom</option>
                    </select>
                    <input
                      type="number"
                      min={240}
                      step={10}
                      value={
                        typeof resolvedChartSettings.width === "number"
                          ? resolvedChartSettings.width
                          : ""
                      }
                      onChange={onDimensionValueChange("width")}
                      disabled={widthMode === "fit"}
                    />
                  </div>
                </div>

                <div className="stack">
                  <span className="muted">Chart Height</span>
                  <div className="row chart-dimension-row">
                    <select
                      value={heightMode}
                      onChange={(event) =>
                        updateDimensionMode("height", event.target.value as "fit" | "custom")
                      }
                    >
                      <option value="fit">Fit</option>
                      <option value="custom">Custom</option>
                    </select>
                    <input
                      type="number"
                      min={240}
                      step={10}
                      value={
                        typeof resolvedChartSettings.height === "number"
                          ? resolvedChartSettings.height
                          : ""
                      }
                      onChange={onDimensionValueChange("height")}
                      disabled={heightMode === "fit"}
                    />
                  </div>
                </div>
              </div>
            </div>

            <footer className="row chart-settings-popover-footer">
              <button
                className="ghost"
                onClick={() =>
                  chartSettingsTap?.set({
                    ...DEFAULT_CHART_SETTINGS,
                  })
                }
              >
                Reset Defaults
              </button>
              <button className="ghost" onClick={() => setSettingsPopoverOpen(false)}>
                Close
              </button>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}

function downloadHtmlFile(fileName: string, html: string): void {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  downloadBlobFile(fileName, blob);
}

function downloadSvgFile(fileName: string, svg: SVGSVGElement): void {
  const svgMarkup = serializeSvgForDownload(svg);
  const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
  downloadBlobFile(fileName, blob);
}

function downloadBlobFile(fileName: string, blob: Blob): void {
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.rel = "noopener";
  anchor.click();

  URL.revokeObjectURL(url);
}

function serializeSvgForDownload(svg: SVGSVGElement): string {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

  const viewBox = clone.getAttribute("viewBox");
  if (viewBox) {
    const parts = viewBox
      .trim()
      .split(/\s+/)
      .map((part) => Number.parseFloat(part));
    if (parts.length === 4 && parts.every((part) => Number.isFinite(part))) {
      clone.setAttribute("width", String(parts[2]));
      clone.setAttribute("height", String(parts[3]));
    }
  }

  const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
  style.textContent = `
    .chart-wedge-label{fill:#0e2b1f;font-weight:600}
    .chart-center-disc{fill:#f4faf7;stroke:#c4d8cc;stroke-width:1.4}
    .chart-center-title{font-size:13px;font-weight:700;fill:#102a1f}
    .chart-center-metric{font-size:15px;font-weight:700;fill:#174936}
    .chart-center-sub{font-size:11px;fill:#4f675d}
  `;
  clone.insertBefore(style, clone.firstChild);

  return `<?xml version="1.0" encoding="UTF-8"?>\n${clone.outerHTML}`;
}

function toSvgFileName(datasetName: string): string {
  const normalized = datasetName
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const base = normalized.length > 0 ? normalized : "dataset-chart";
  return `${base}.svg`;
}

function findNodeByPath(root: TreeNode, path: string[] | null): TreeNode | null {
  if (!path || path.length === 0) {
    return root;
  }

  const [head, ...tail] = path;
  if (head !== root.name) {
    return null;
  }

  let cursor: TreeNode = root;
  for (const segment of tail) {
    const next = cursor.children?.find((child) => child.name === segment);
    if (!next) {
      return null;
    }
    cursor = next;
  }

  return cursor;
}

function arcPath(
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
): string {
  if (endAngle <= startAngle) {
    return "";
  }

  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  const outerStart = polarPoint(outerRadius, startAngle);
  const outerEnd = polarPoint(outerRadius, endAngle);

  if (innerRadius <= 0) {
    return [
      `M ${outerStart.x} ${outerStart.y}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
      "L 0 0",
      "Z",
    ].join(" ");
  }

  const innerEnd = polarPoint(innerRadius, endAngle);
  const innerStart = polarPoint(innerRadius, startAngle);

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

function polarPoint(radius: number, angle: number): { x: number; y: number } {
  return {
    x: Math.cos(angle - Math.PI / 2) * radius,
    y: Math.sin(angle - Math.PI / 2) * radius,
  };
}

function createRadiusScale(maxDepth: number, outerRadius: number): (depth: number) => number {
  return (depth) => {
    if (depth <= 0 || maxDepth <= 0) {
      return 0;
    }
    const normalized = depth / maxDepth;
    return Math.pow(normalized, 0.86) * outerRadius;
  };
}

interface WedgeLabel {
  text: string;
  x: number;
  y: number;
  rotate: number;
  anchor: "start" | "middle" | "end";
}

function createWedgeLabel(
  node: ChartLayoutNode,
  innerRadius: number,
  outerRadius: number,
  totalMagnitude: number,
  maxDepth: number,
): WedgeLabel | null {
  const isOuterRing = maxDepth <= 1 || node.depth === maxDepth;
  const angleSpan = node.endAngle - node.startAngle;
  const ringThickness = outerRadius - innerRadius;
  const radius = innerRadius + ringThickness * 0.56;
  const tangentialSpan = radius * angleSpan;

  const minAngleSpan = isOuterRing ? 0.045 : 0.09;
  const minRingThickness = isOuterRing ? 12 : 16;
  const minTangentialSpan = isOuterRing ? 12 : 42;

  if (
    angleSpan < minAngleSpan ||
    ringThickness < minRingThickness ||
    tangentialSpan < minTangentialSpan
  ) {
    return null;
  }

  const percentage = totalMagnitude > 0 ? (node.magnitude / totalMagnitude) * 100 : 0;
  const midAngle = (node.startAngle + node.endAngle) / 2;
  const point = polarPoint(radius, midAngle);

  const availableTextLength = isOuterRing
    ? Math.max(0, ringThickness - 6)
    : Math.max(0, tangentialSpan - 4);
  const maxChars = Math.max(isOuterRing ? 4 : 8, Math.floor(availableTextLength / 7.2));
  const text = ellipsize(`${node.name} ${percentage.toFixed(1)}%`, maxChars);
  const baseRotation = isOuterRing ? (midAngle * 180) / Math.PI - 90 : (midAngle * 180) / Math.PI;
  const normalizedRotation = normalizeDegrees(baseRotation);
  const flip = normalizedRotation > 90 || normalizedRotation < -90;
  const rotate = flip ? normalizedRotation + 180 : normalizedRotation;

  return {
    text,
    x: point.x,
    y: point.y,
    rotate,
    anchor: isOuterRing ? (flip ? "end" : "start") : "middle",
  };
}

function ellipsize(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, Math.max(0, maxLength - 3))}...`;
}

function buildKronaColorMap(layout: ChartLayoutResult | null): Map<string, string> {
  const colors = new Map<string, string>();
  if (!layout || layout.nodes.length === 0) {
    return colors;
  }

  const root = layout.nodes.find((node) => node.depth === 0) ?? layout.nodes[0]!;
  const childrenByParent = new Map<string, ChartLayoutNode[]>();
  for (const node of layout.nodes) {
    if (node.depth === 0) {
      continue;
    }
    const parent = pathKey(node.path.slice(0, -1));
    const children = childrenByParent.get(parent);
    if (children) {
      children.push(node);
    } else {
      childrenByParent.set(parent, [node]);
    }
  }

  childrenByParent.forEach((children) => {
    children.sort((left, right) => {
      if (left.startAngle !== right.startAngle) {
        return left.startAngle - right.startAngle;
      }
      return left.endAngle - right.endAngle;
    });
  });

  const maxDepth = layout.nodes.reduce((max, node) => Math.max(max, node.depth), 0);
  const depthNormalizer = maxDepth > 8 ? 8 : Math.max(maxDepth, 1);
  const lightnessFactor = (KRONA_LIGHTNESS_MAX - KRONA_LIGHTNESS_BASE) / depthNormalizer;

  const assignColor = (node: ChartLayoutNode, hueMin: number, hueMax: number): void => {
    let boundedHueMax = hueMax;
    if (boundedHueMax - hueMin > 1 / 12) {
      boundedHueMax = hueMin + 1 / 12;
    }

    if (node.depth > 0) {
      if (node.magnitude <= 0) {
        colors.set(pathKey(node.path), KRONA_UNCLASSIFIED_COLOR);
      } else {
        const lightness = Math.min(
          KRONA_LIGHTNESS_MAX,
          KRONA_LIGHTNESS_BASE + (node.depth - 1) * lightnessFactor,
        );
        const rgb = hslToRgb(hueMin, KRONA_SATURATION, lightness);
        colors.set(pathKey(node.path), rgbText(rgb.r, rgb.g, rgb.b));
      }
    }

    const children = childrenByParent.get(pathKey(node.path)) ?? [];
    if (children.length === 0) {
      return;
    }

    for (let index = 0; index < children.length; index += 1) {
      const child = children[index]!;
      let childHueMin: number;
      let childHueMax: number;

      if (node.depth === 0) {
        if (children.length > 6) {
          childHueMin = (1 - Math.pow(1 - index / children.length, 1.4)) * 0.95;
          childHueMax = (1 - Math.pow(1 - (index + 0.55) / children.length, 1.4)) * 0.95;
        } else {
          childHueMin = index / children.length;
          childHueMax = (index + 0.55) / children.length;
        }
      } else {
        childHueMin = lerp(child.startAngle, node.startAngle, node.endAngle, hueMin, boundedHueMax);
        childHueMax = lerp(
          child.startAngle + (child.endAngle - child.startAngle) * 0.99,
          node.startAngle,
          node.endAngle,
          hueMin,
          boundedHueMax,
        );
      }

      assignColor(child, childHueMin, childHueMax);
    }
  };

  assignColor(root, 0, 1);
  return colors;
}

function lerp(
  value: number,
  rangeStart: number,
  rangeEnd: number,
  outputStart: number,
  outputEnd: number,
): number {
  if (rangeEnd === rangeStart) {
    return outputStart;
  }
  return outputStart + ((value - rangeStart) / (rangeEnd - rangeStart)) * (outputEnd - outputStart);
}

function rgbText(red: number, green: number, blue: number): string {
  return `rgb(${red},${green},${blue})`;
}

function hslToRgb(
  hue: number,
  saturation: number,
  lightness: number,
): { r: number; g: number; b: number } {
  if (saturation === 0) {
    const value = Math.floor(lightness * 255);
    return { r: value, g: value, b: value };
  }

  const m2 =
    lightness <= 0.5
      ? lightness * (saturation + 1)
      : lightness + saturation - lightness * saturation;
  const m1 = lightness * 2 - m2;

  return {
    r: Math.floor(hueToRgb(m1, m2, hue + 1 / 3)),
    g: Math.floor(hueToRgb(m1, m2, hue)),
    b: Math.floor(hueToRgb(m1, m2, hue - 1 / 3)),
  };
}

function hueToRgb(m1: number, m2: number, hue: number): number {
  let normalizedHue = hue;

  while (normalizedHue < 0) {
    normalizedHue += 1;
  }

  while (normalizedHue > 1) {
    normalizedHue -= 1;
  }

  let value: number;
  if (6 * normalizedHue < 1) {
    value = m1 + (m2 - m1) * normalizedHue * 6;
  } else if (2 * normalizedHue < 1) {
    value = m2;
  } else if (3 * normalizedHue < 2) {
    value = m1 + (m2 - m1) * (2 / 3 - normalizedHue) * 6;
  } else {
    value = m1;
  }

  return value * 255;
}

function pathEquals(left: string[], right: string[]): boolean {
  return left.length === right.length && left.every((segment, index) => segment === right[index]);
}

function pathKey(path: string[]): string {
  return path.join("/");
}

function toColorInputValue(value: string, fallback: string): string {
  const normalized = value.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(normalized)) {
    return normalized;
  }
  if (/^#[0-9a-fA-F]{3}$/.test(normalized)) {
    return `#${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}${normalized[3]}${normalized[3]}`;
  }
  return fallback;
}

function normalizeDegrees(angle: number): number {
  let normalized = angle;
  while (normalized <= -180) {
    normalized += 360;
  }
  while (normalized > 180) {
    normalized -= 360;
  }
  return normalized;
}
