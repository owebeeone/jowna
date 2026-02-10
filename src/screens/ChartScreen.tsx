import { useGrip, useNumberGrip } from "@owebeeone/grip-react";
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import type { ChartSettings, TreeNode } from "../domain";
import {
  SunburstChartRenderer,
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
const MIN_LABEL_FONT_SIZE = 4;
const CHART_FONT_OPTIONS = [
  { label: "Krona (sans-serif)", value: "sans-serif" },
  { label: "Arial", value: "Arial" },
  { label: "Helvetica", value: "Helvetica" },
  { label: "Verdana", value: "Verdana" },
  { label: "IBM Plex Sans", value: "IBM Plex Sans" },
  { label: "System UI", value: "system-ui" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Courier New", value: "Courier New" },
  { label: "Monospace", value: "monospace" },
] as const;

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
  const [detailsPanelCollapsed, setDetailsPanelCollapsed] = useState(false);
  const [openMembersPopoverForPath, setOpenMembersPopoverForPath] = useState<string | null>(null);
  const [dimensionDrafts, setDimensionDrafts] = useState<{ width: string; height: string }>({
    width: "",
    height: "",
  });
  const [activeDimensionDraft, setActiveDimensionDraft] = useState<"width" | "height" | null>(null);
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
    overflow: "visible",
  };
  const labelFontSize = Math.max(MIN_LABEL_FONT_SIZE, resolvedChartSettings.fontSizePx);
  const widthMode = typeof resolvedChartSettings.width === "number" ? "custom" : "fit";
  const heightMode = typeof resolvedChartSettings.height === "number" ? "custom" : "fit";
  const widthInputValue =
    activeDimensionDraft === "width"
      ? dimensionDrafts.width
      : typeof resolvedChartSettings.width === "number"
        ? String(resolvedChartSettings.width)
        : "";
  const heightInputValue =
    activeDimensionDraft === "height"
      ? dimensionDrafts.height
      : typeof resolvedChartSettings.height === "number"
        ? String(resolvedChartSettings.height)
        : "";
  const chartFontOptions = useMemo(() => {
    const current = resolvedChartSettings.fontFamily;
    if (CHART_FONT_OPTIONS.some((option) => option.value === current)) {
      return CHART_FONT_OPTIONS;
    }
    return [{ label: `Custom (${current})`, value: current }, ...CHART_FONT_OPTIONS];
  }, [resolvedChartSettings.fontFamily]);

  const colorLayout = useMemo(() => {
    if (!dataset) {
      return null;
    }
    const renderer = new SunburstChartRenderer();
    return renderer.computeLayout({
      root: dataset.tree,
      settings: {
        ...DEFAULT_CHART_SETTINGS,
        collapseRedundant: resolvedChartSettings.collapseRedundant,
      },
      focusedPath: null,
      depthLimit: null,
    });
  }, [dataset, resolvedChartSettings.collapseRedundant]);
  const kronaColors = useMemo(
    () => buildKronaColorMap(colorLayout ?? chartLayout ?? null),
    [colorLayout, chartLayout],
  );

  const resolvedFocusPath = dataset ? (focusPath ?? [dataset.tree.name]) : null;
  const activePath = hoverPath ?? selectedPath ?? resolvedFocusPath;
  const activeNode = dataset ? findNodeByPath(dataset.tree, activePath) : null;
  const activeLayoutNode =
    activePath && chartLayout
      ? (chartLayout.nodes.find((node) => pathEquals(node.path, activePath)) ?? null)
      : null;
  const activePathKey = activePath ? pathKey(activePath) : null;
  const activeAttributes = Object.entries(activeNode?.attributes ?? {});
  const membersAttributeKey = resolveMembersAttributeKey(activeAttributes);
  const membersAttributeValue = membersAttributeKey
    ? (activeAttributes.find(([key]) => key === membersAttributeKey)?.[1] ?? "")
    : "";
  const unassignedMembers = membersAttributeKey
    ? parseMemberNames(membersAttributeValue, membersAttributeKey)
    : [];
  const memberAttributeKeys = new Set(
    activeAttributes.filter(([key, value]) => isMembersListKey(key, value)).map(([key]) => key),
  );
  const unassignedMembersLabel = "Unassigned Members";
  const visibleAttributes = activeAttributes.filter(
    ([key]) => !memberAttributeKeys.has(key) && !isUnassignedAttributeKey(key),
  );
  const membersPopoverOpen = Boolean(activePathKey && openMembersPopoverForPath === activePathKey);

  const totalMagnitude = chartLayout?.totalMagnitude ?? 0;
  const activeMagnitude = activeLayoutNode?.magnitude ?? activeNode?.magnitude ?? 0;
  const activeShare = totalMagnitude > 0 ? (activeMagnitude / totalMagnitude) * 100 : 0;

  const topLevelSegments = (
    chartLayout?.nodes.filter((node) => node.depth === 1 && !isUnclassifiedNodeName(node.name)) ??
    []
  ).sort((left, right) => {
    if (right.magnitude !== left.magnitude) {
      return right.magnitude - left.magnitude;
    }
    return left.name.localeCompare(right.name);
  });
  const topSegments = topLevelSegments.slice(0, MAX_KEY_SEGMENTS);
  const hiddenSegments = topLevelSegments.length - topSegments.length;

  const layoutDataMaxDepth = computeLayoutDataMaxDepth(chartLayout ?? null);
  const maxDepth = resolveRenderDepth(layoutDataMaxDepth, depthLimit);
  const radiusScale = createRadiusScale(maxDepth, OUTER_RADIUS);
  const wedgeRenderPlan = useMemo(
    () => createWedgeRenderPlan(chartLayout ?? null, maxDepth, labelFontSize),
    [chartLayout, labelFontSize, maxDepth],
  );
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

  const onToggleMembersPopover = () => {
    if (!activePathKey) {
      return;
    }
    setOpenMembersPopoverForPath((current) => (current === activePathKey ? null : activePathKey));
  };

  const onCloseMembersPopover = () => {
    setOpenMembersPopoverForPath(null);
  };

  useEffect(() => {
    if (activeDimensionDraft !== "width") {
      const nextWidth =
        typeof resolvedChartSettings.width === "number" ? String(resolvedChartSettings.width) : "";
      setDimensionDrafts((current) =>
        current.width === nextWidth ? current : { ...current, width: nextWidth },
      );
    }
    if (activeDimensionDraft !== "height") {
      const nextHeight =
        typeof resolvedChartSettings.height === "number"
          ? String(resolvedChartSettings.height)
          : "";
      setDimensionDrafts((current) =>
        current.height === nextHeight ? current : { ...current, height: nextHeight },
      );
    }
  }, [
    activeDimensionDraft,
    resolvedChartSettings.height,
    resolvedChartSettings.width,
    setDimensionDrafts,
  ]);

  const persistChartSettings = (nextSettings: ChartSettings) => {
    const normalized: ChartSettings = {
      ...nextSettings,
      colorScheme: Array.isArray(nextSettings.colorScheme)
        ? [...nextSettings.colorScheme]
        : nextSettings.colorScheme,
    };

    if (actions?.setProjectChartSettings) {
      void actions.setProjectChartSettings(normalized);
      return;
    }

    chartSettingsTap?.set(normalized);
  };

  const updateChartSettings = (partial: Partial<ChartSettings>) => {
    const current = chartSettingsTap?.get() ?? resolvedChartSettings;
    persistChartSettings({
      ...current,
      ...partial,
    });
  };

  const updateDimensionMode = (dimension: "width" | "height", mode: "fit" | "custom") => {
    if (mode === "fit") {
      setActiveDimensionDraft((current) => (current === dimension ? null : current));
      setDimensionDrafts((current) => ({ ...current, [dimension]: "" }));
      updateChartSettings({ [dimension]: "fit" } as Partial<ChartSettings>);
      return;
    }

    const currentDimension = resolvedChartSettings[dimension];
    const fallback = dimension === "width" ? 620 : 640;
    const normalized =
      typeof currentDimension === "number" && Number.isFinite(currentDimension)
        ? Math.max(240, currentDimension)
        : fallback;

    setDimensionDrafts((current) => ({ ...current, [dimension]: String(normalized) }));
    updateChartSettings({
      [dimension]: normalized,
    } as Partial<ChartSettings>);
  };

  const onDimensionValueChange =
    (dimension: "width" | "height") => (event: ChangeEvent<HTMLInputElement>) => {
      setDimensionDrafts((current) => ({ ...current, [dimension]: event.target.value }));
    };

  const onDimensionInputFocus = (dimension: "width" | "height") => () => {
    setActiveDimensionDraft(dimension);
  };

  const onDimensionInputBlur =
    (dimension: "width" | "height") => (event: ChangeEvent<HTMLInputElement>) => {
      setActiveDimensionDraft((current) => (current === dimension ? null : current));
      const parsed = Number.parseInt(event.target.value, 10);
      if (!Number.isFinite(parsed)) {
        const fallback =
          typeof resolvedChartSettings[dimension] === "number"
            ? String(resolvedChartSettings[dimension])
            : "";
        setDimensionDrafts((current) => ({ ...current, [dimension]: fallback }));
        return;
      }
      const normalized = Math.max(240, parsed);
      setDimensionDrafts((current) => ({ ...current, [dimension]: String(normalized) }));
      updateChartSettings({ [dimension]: normalized } as Partial<ChartSettings>);
    };

  const onToggleDetailsPanel = () => {
    setDetailsPanelCollapsed((current) => !current);
    setOpenMembersPopoverForPath(null);
  };

  return (
    <div className="app-shell">
      <div className="app-frame chart-screen-frame">
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
            <button className="ghost" onClick={onToggleDetailsPanel}>
              {detailsPanelCollapsed ? "Show Details" : "Hide Details"}
            </button>
          </div>

          <div className="row" style={{ minWidth: 220 }}>
            <label className="row chart-collapse-wrap">
              <input
                type="checkbox"
                checked={resolvedChartSettings.collapseRedundant}
                onChange={(event) =>
                  updateChartSettings({ collapseRedundant: event.target.checked })
                }
              />
              <span>Collapse</span>
            </label>
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

        <div className={`chart-layout ${detailsPanelCollapsed ? "is-details-hidden" : ""}`}>
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
                  <defs>
                    <pattern
                      id="chart-hidden-pattern"
                      patternUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="7"
                      height="7"
                    >
                      <line
                        x1="0"
                        y1="0"
                        x2="3.5"
                        y2="3.5"
                        stroke="rgba(16,36,27,0.35)"
                        strokeWidth="0.8"
                      />
                      <line
                        x1="3.5"
                        y1="7"
                        x2="7"
                        y2="3.5"
                        stroke="rgba(16,36,27,0.35)"
                        strokeWidth="0.8"
                      />
                    </pattern>
                  </defs>
                  <g
                    transform="translate(310 310)"
                    style={{ fontFamily: resolvedChartSettings.fontFamily }}
                  >
                    {wedgeRenderPlan.visibleNodes.map((entry) => {
                      const node = entry.node;
                      const interactionPath = entry.interactionPath;
                      const innerRadius = radiusScale(node.depth - 1);
                      const outerRadius = radiusScale(entry.outerDepth);
                      const pathData = arcPath(
                        innerRadius,
                        outerRadius,
                        node.startAngle,
                        node.endAngle,
                      );
                      if (!pathData) {
                        return null;
                      }

                      const isInteractive =
                        interactionPath.length > 0 && !isUnclassifiedNodeName(node.name);
                      const isActive =
                        isInteractive && activePath
                          ? pathEquals(interactionPath, activePath)
                          : false;
                      const isFocused =
                        isInteractive && resolvedFocusPath
                          ? pathEquals(interactionPath, resolvedFocusPath)
                          : false;
                      const fill = isUnclassifiedNodeName(node.name)
                        ? KRONA_UNCLASSIFIED_COLOR
                        : resolveNodeFillColor(
                            kronaColors,
                            [entry.colorPath, interactionPath, node.path],
                            KRONA_UNCLASSIFIED_COLOR,
                          );
                      const wedgeKey = entry.key;
                      const titleText = entry.isGroupedHidden
                        ? `${entry.hiddenCount} more`
                        : `${node.path.join(" / ")}: ${node.magnitude.toLocaleString()}`;

                      return (
                        <g key={wedgeKey}>
                          <path
                            className={`chart-wedge ${isActive ? "is-active" : ""} ${isFocused ? "is-focus" : ""}`}
                            d={pathData}
                            fill={fill}
                            stroke={isActive ? "#062d1e" : resolvedChartSettings.wedgeStrokeColor}
                            strokeWidth={
                              isActive ? 2.2 : Math.max(0.4, resolvedChartSettings.wedgeStrokeWidth)
                            }
                            opacity={
                              isInteractive && hoverPath
                                ? isActive
                                  ? 1
                                  : 0.42
                                : isFocused
                                  ? 1
                                  : 0.92
                            }
                            role={isInteractive ? "button" : undefined}
                            tabIndex={isInteractive ? 0 : undefined}
                            onMouseEnter={
                              isInteractive ? () => actions?.hoverPath(interactionPath) : undefined
                            }
                            onMouseLeave={
                              isInteractive ? () => actions?.hoverPath(null) : undefined
                            }
                            onClick={
                              isInteractive ? () => actions?.focusPath(interactionPath) : undefined
                            }
                            onKeyDown={
                              isInteractive
                                ? (event) => {
                                    if (event.key === "Enter" || event.key === " ") {
                                      event.preventDefault();
                                      actions?.focusPath(interactionPath);
                                    }
                                  }
                                : undefined
                            }
                          >
                            <title>{titleText}</title>
                          </path>
                          {entry.isGroupedHidden && (
                            <path
                              d={pathData}
                              fill="url(#chart-hidden-pattern)"
                              stroke="none"
                              opacity={0.65}
                              pointerEvents="none"
                            />
                          )}
                        </g>
                      );
                    })}

                    {wedgeRenderPlan.visibleNodes.map((entry) => {
                      const node = entry.node;
                      const interactionPath = entry.interactionPath;
                      const innerRadius = radiusScale(node.depth - 1);
                      const outerRadius = radiusScale(entry.outerDepth);
                      const label = createWedgeLabel(
                        node,
                        innerRadius,
                        outerRadius,
                        maxDepth,
                        entry.outerDepth,
                        labelFontSize,
                      );
                      if (!label) {
                        return null;
                      }

                      const showTooltip =
                        Boolean(hoverPath) &&
                        pathEquals(interactionPath, hoverPath ?? []) &&
                        label.isTruncated;
                      const tooltip = showTooltip
                        ? createHoverLabelTooltip(label, labelFontSize)
                        : null;
                      return (
                        <g key={`label-${entry.key}`}>
                          {tooltip && (
                            <g className="chart-label-tooltip" pointerEvents="none">
                              <rect
                                className="chart-label-tooltip-box"
                                x={tooltip.x}
                                y={tooltip.y}
                                width={tooltip.width}
                                height={tooltip.height}
                                rx={7}
                                ry={7}
                                fill="#ffffff"
                                stroke={resolvedChartSettings.wedgeStrokeColor}
                                strokeWidth={
                                  Math.max(0.4, resolvedChartSettings.wedgeStrokeWidth) + 0.5
                                }
                              />
                              <text
                                className="chart-label-tooltip-text"
                                x={tooltip.textX}
                                y={tooltip.textY}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                style={{
                                  fontFamily: resolvedChartSettings.fontFamily,
                                  fontSize: `${labelFontSize}px`,
                                }}
                              >
                                {label.fullText}
                              </text>
                            </g>
                          )}
                          <text
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
                        </g>
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

          {!detailsPanelCollapsed && (
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
                    {visibleAttributes.map(([key, value]) => (
                      <div key={key} className="muted">
                        <strong>{key}:</strong> {value}
                      </div>
                    ))}
                    <button
                      className="ghost members-popover-trigger"
                      onClick={onToggleMembersPopover}
                      aria-haspopup="dialog"
                      aria-expanded={membersPopoverOpen}
                    >
                      {`${unassignedMembersLabel} (${unassignedMembers.length})`}
                    </button>
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
                      const share =
                        totalMagnitude > 0 ? (node.magnitude / totalMagnitude) * 100 : 0;
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
                              background: resolveNodeFillColor(
                                kronaColors,
                                [node.path],
                                KRONA_UNCLASSIFIED_COLOR,
                              ),
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
          )}
        </div>
      </div>

      {!detailsPanelCollapsed && membersPopoverOpen && (
        <div className="members-popover-layer">
          <section
            className="panel members-popover members-popover-floating"
            role="dialog"
            aria-label={`${unassignedMembersLabel} list`}
          >
            <header className="members-popover-header">
              <strong>{`${unassignedMembersLabel} (${unassignedMembers.length})`}</strong>
              <button
                className="ghost popover-x"
                onClick={onCloseMembersPopover}
                aria-label="Close members list"
              >
                X
              </button>
            </header>
            <div className="members-popover-list">
              {unassignedMembers.map((member, index) => (
                <div key={`${member}-${index}`} className="members-popover-item">
                  {member}
                </div>
              ))}
            </div>
            <footer className="members-popover-footer">
              <button className="ghost" onClick={onCloseMembersPopover}>
                Close
              </button>
            </footer>
          </section>
        </div>
      )}

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

                <label className="row" style={{ alignItems: "center" }}>
                  <input
                    type="checkbox"
                    style={{ width: "auto" }}
                    checked={resolvedChartSettings.collapseRedundant}
                    onChange={(event) =>
                      updateChartSettings({ collapseRedundant: event.target.checked })
                    }
                  />
                  <span>Collapse redundant wedges</span>
                </label>

                <label className="stack">
                  <span className="muted">Font Family</span>
                  <select
                    value={resolvedChartSettings.fontFamily}
                    onChange={(event) => updateChartSettings({ fontFamily: event.target.value })}
                  >
                    {chartFontOptions.map((option) => (
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
                    value={resolvedChartSettings.fontSizePx}
                    onChange={(event) => {
                      const parsed = Number.parseFloat(event.target.value);
                      if (!Number.isFinite(parsed)) {
                        return;
                      }
                      updateChartSettings({ fontSizePx: Math.max(MIN_LABEL_FONT_SIZE, parsed) });
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
                      value={widthInputValue}
                      onChange={onDimensionValueChange("width")}
                      onFocus={onDimensionInputFocus("width")}
                      onBlur={onDimensionInputBlur("width")}
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
                      value={heightInputValue}
                      onChange={onDimensionValueChange("height")}
                      onFocus={onDimensionInputFocus("height")}
                      onBlur={onDimensionInputBlur("height")}
                      disabled={heightMode === "fit"}
                    />
                  </div>
                </div>
              </div>
            </div>

            <footer className="row chart-settings-popover-footer">
              <button
                className="ghost"
                onClick={() => persistChartSettings({ ...DEFAULT_CHART_SETTINGS })}
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
    x: Math.cos(angle + Math.PI / 2) * radius,
    y: Math.sin(angle + Math.PI / 2) * radius,
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

export function resolveRenderDepth(treeMaxDepth: number, depthLimit: number): number {
  if (treeMaxDepth <= 0) {
    return 0;
  }
  if (depthLimit <= 0) {
    return treeMaxDepth;
  }
  return Math.min(depthLimit, treeMaxDepth);
}

interface WedgeRenderPlan {
  visibleNodes: WedgeRenderNode[];
}

interface WedgeRenderNode {
  node: ChartLayoutNode;
  isGroupedHidden: boolean;
  hiddenCount: number;
  key: string;
  colorPath: string[];
  interactionPath: string[];
  outerDepth: number;
}

export function createWedgeRenderPlan(
  layout: ChartLayoutResult | null,
  maxDepth: number,
  labelFontSize: number,
): WedgeRenderPlan {
  if (!layout || layout.nodes.length === 0) {
    return {
      visibleNodes: [],
    };
  }

  const visibleNodes = layout.nodes.filter((node) => node.depth > 0);
  if (visibleNodes.length === 0 || maxDepth <= 0) {
    return {
      visibleNodes: visibleNodes.map((node) => ({
        node,
        isGroupedHidden: false,
        hiddenCount: 0,
        key: pathKey(node.path),
        colorPath: node.path,
        interactionPath: node.path,
        outerDepth: node.depth,
      })),
    };
  }

  const minVisibleWidth = Math.max(MIN_LABEL_FONT_SIZE, labelFontSize) * 2.3;
  const radiusScale = createRadiusScale(maxDepth, OUTER_RADIUS);
  const childrenByParent = new Map<string, ChartLayoutNode[]>();
  const visiblePathKeys = new Set(visibleNodes.map((node) => pathKey(node.path)));

  for (const node of visibleNodes) {
    const parentKey = pathKey(node.path.slice(0, -1));
    const children = childrenByParent.get(parentKey);
    if (children) {
      children.push(node);
    } else {
      childrenByParent.set(parentKey, [node]);
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

  const groupedNodes: WedgeRenderNode[] = [];
  for (const [parentKey, children] of childrenByParent.entries()) {
    let index = 0;
    let hiddenGroupIndex = 0;

    while (index < children.length) {
      const child = children[index]!;
      if (!shouldGroupHiddenChild(child, radiusScale, minVisibleWidth)) {
        groupedNodes.push({
          node: child,
          isGroupedHidden: false,
          hiddenCount: 0,
          key: pathKey(child.path),
          colorPath: child.path,
          interactionPath: child.path,
          outerDepth: child.depth,
        });
        index += 1;
        continue;
      }

      let runEnd = index;
      while (
        runEnd + 1 < children.length &&
        shouldGroupHiddenChild(children[runEnd + 1]!, radiusScale, minVisibleWidth)
      ) {
        runEnd += 1;
      }

      const run = children.slice(index, runEnd + 1);
      const first = run[0]!;
      const last = run[run.length - 1]!;
      const parentPath = first.path.slice(0, -1);
      const interactionPath = parentPath.length > 0 ? parentPath : first.path;
      const groupedColorPath = resolveGroupedColorPath(parentPath, first.path, visiblePathKeys);
      const hiddenCount = run.length;
      const groupedMagnitude = run.reduce((sum, node) => sum + node.magnitude, 0);

      groupedNodes.push({
        node: {
          path: first.path.slice(0, -1).concat([`${hiddenCount} more`]),
          name: `${hiddenCount} more`,
          depth: first.depth,
          magnitude: groupedMagnitude,
          startAngle: first.startAngle,
          endAngle: last.endAngle,
        },
        isGroupedHidden: true,
        hiddenCount,
        key: `${parentKey}/[${hiddenCount}-more-${hiddenGroupIndex}]`,
        colorPath: groupedColorPath,
        interactionPath,
        outerDepth: first.depth,
      });

      hiddenGroupIndex += 1;
      index = runEnd + 1;
    }
  }

  const sortedNodes = groupedNodes.sort((left, right) => {
    if (left.node.depth !== right.node.depth) {
      return left.node.depth - right.node.depth;
    }
    if (left.node.startAngle !== right.node.startAngle) {
      return left.node.startAngle - right.node.startAngle;
    }
    if (left.node.endAngle !== right.node.endAngle) {
      return left.node.endAngle - right.node.endAngle;
    }
    return left.key.localeCompare(right.key);
  });

  const parentKeys = new Set(sortedNodes.map((entry) => pathKey(entry.node.path.slice(0, -1))));
  return {
    visibleNodes: sortedNodes.map((entry) => ({
      ...entry,
      outerDepth: parentKeys.has(pathKey(entry.node.path)) ? entry.node.depth : maxDepth,
    })),
  };
}

function shouldGroupHiddenChild(
  child: ChartLayoutNode,
  radiusScale: (depth: number) => number,
  minVisibleWidth: number,
): boolean {
  const innerRadius = radiusScale(child.depth - 1);
  const outerRadius = radiusScale(child.depth);
  const angleSpan = Math.max(0, child.endAngle - child.startAngle);
  const widthEstimate = angleSpan * (innerRadius + outerRadius);
  return widthEstimate < minVisibleWidth;
}

function resolveGroupedColorPath(
  parentPath: string[],
  fallbackPath: string[],
  visiblePathKeys: Set<string>,
): string[] {
  for (let length = parentPath.length; length >= 2; length -= 1) {
    const candidate = parentPath.slice(0, length);
    if (visiblePathKeys.has(pathKey(candidate))) {
      return candidate;
    }
  }
  return fallbackPath;
}

interface WedgeLabel {
  text: string;
  fullText: string;
  isTruncated: boolean;
  x: number;
  y: number;
  rotate: number;
  anchor: "start" | "middle" | "end";
}

interface HoverLabelTooltip {
  x: number;
  y: number;
  width: number;
  height: number;
  textX: number;
  textY: number;
}

function createWedgeLabel(
  node: ChartLayoutNode,
  innerRadius: number,
  outerRadius: number,
  maxDepth: number,
  outerDepth: number,
  fontSizePx: number,
): WedgeLabel | null {
  const isOuterRing = maxDepth <= 1 || outerDepth >= maxDepth;
  const angleSpan = node.endAngle - node.startAngle;
  const ringThickness = outerRadius - innerRadius;
  const radius = innerRadius + ringThickness * (isOuterRing ? 0.6 : 0.56);
  const tangentialSpan = radius * angleSpan;

  const minAngleSpan = isOuterRing ? 0.007 : 0.04;
  const minRingThickness = isOuterRing ? 6 : 10;
  const minTangentialSpan = isOuterRing ? 2 : 10;

  if (
    angleSpan < minAngleSpan ||
    ringThickness < minRingThickness ||
    tangentialSpan < minTangentialSpan
  ) {
    return null;
  }

  const midAngle = (node.startAngle + node.endAngle) / 2;
  const point = polarPoint(radius, midAngle);

  const approximateCharWidth = Math.max(4, fontSizePx * 0.58);
  const availableTextLength = isOuterRing
    ? Math.max(0, ringThickness - fontSizePx * 0.45)
    : Math.max(0, tangentialSpan - fontSizePx * 0.35);
  const maxChars = Math.max(
    isOuterRing ? 4 : 6,
    Math.floor(availableTextLength / approximateCharWidth),
  );
  const isTruncated = node.name.length > maxChars;
  const text = ellipsize(node.name, maxChars);
  const baseRotation = isOuterRing ? (midAngle * 180) / Math.PI - 90 : (midAngle * 180) / Math.PI;
  const normalizedRotation = normalizeDegrees(baseRotation);
  const flip = normalizedRotation > 90 || normalizedRotation < -90;
  const rotate = flip ? normalizedRotation + 180 : normalizedRotation;

  return {
    text,
    fullText: node.name,
    isTruncated,
    x: point.x,
    y: point.y,
    rotate,
    anchor: isOuterRing ? (flip ? "end" : "start") : "middle",
  };
}

function createHoverLabelTooltip(label: WedgeLabel, fontSizePx: number): HoverLabelTooltip {
  const horizontalPadding = 9;
  const verticalPadding = 5;
  const approxTextWidth = Math.max(20, label.fullText.length * fontSizePx * 0.58);
  const width = approxTextWidth + horizontalPadding * 2;
  const height = fontSizePx + verticalPadding * 2 + 2;
  const centerX = label.x;
  const centerY = label.y - fontSizePx * 1.2;

  return {
    x: centerX - width / 2,
    y: centerY - height / 2,
    width,
    height,
    textX: centerX,
    textY: centerY,
  };
}

function ellipsize(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, Math.max(0, maxLength - 3))}...`;
}

export function buildKronaColorMap(layout: ChartLayoutResult | null): Map<string, string> {
  const colors = new Map<string, string>();
  if (!layout || layout.nodes.length === 0) {
    return colors;
  }

  const root = layout.nodes.find((node) => node.depth === 0) ?? layout.nodes[0]!;
  const existingPathKeys = new Set(layout.nodes.map((node) => pathKey(node.path)));
  const childrenByParent = new Map<string, ChartLayoutNode[]>();
  for (const node of layout.nodes) {
    if (isUnclassifiedNodeName(node.name)) {
      colors.set(pathKey(node.path), KRONA_UNCLASSIFIED_COLOR);
      continue;
    }
    if (node.depth === 0) {
      continue;
    }
    const parent = pathKey(
      resolveNearestExistingAncestorPath(node.path.slice(0, -1), existingPathKeys),
    );
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

  const maxDepth = computeLayoutDataMaxDepth(layout);
  const depthNormalizer = maxDepth > 8 ? 8 : Math.max(maxDepth, 1);
  const lightnessFactor = (KRONA_LIGHTNESS_MAX - KRONA_LIGHTNESS_BASE) / depthNormalizer;

  const assignColor = (node: ChartLayoutNode, hueMin: number, hueMax: number): void => {
    let boundedHueMax = hueMax;
    if (boundedHueMax - hueMin > 1 / 12) {
      boundedHueMax = hueMin + 1 / 12;
    }

    if (node.depth > 0) {
      if (node.magnitude <= 0 || isUnclassifiedNodeName(node.name)) {
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

export function resolveNodeFillColor(
  colors: Map<string, string>,
  candidatePaths: string[][],
  fallbackColor = KRONA_UNCLASSIFIED_COLOR,
): string {
  for (const candidate of candidatePaths) {
    if (!candidate || candidate.length === 0) {
      continue;
    }
    for (let length = candidate.length; length >= 1; length -= 1) {
      const color = colors.get(pathKey(candidate.slice(0, length)));
      if (typeof color === "string" && color.length > 0) {
        return color;
      }
    }
  }
  return fallbackColor;
}

function resolveNearestExistingAncestorPath(
  path: string[],
  existingPathKeys: Set<string>,
): string[] {
  for (let length = path.length; length >= 0; length -= 1) {
    const candidate = path.slice(0, length);
    if (existingPathKeys.has(pathKey(candidate))) {
      return candidate;
    }
  }
  return [];
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

function isUnclassifiedNodeName(name: string): boolean {
  return name.trim().toLowerCase().startsWith("[other ");
}

function computeLayoutDataMaxDepth(layout: ChartLayoutResult | null): number {
  if (!layout || layout.nodes.length === 0) {
    return 0;
  }

  let maxDepth = 0;
  for (const node of layout.nodes) {
    if (node.depth <= 0 || isUnclassifiedNodeName(node.name)) {
      continue;
    }
    if (node.depth > maxDepth) {
      maxDepth = node.depth;
    }
  }

  if (maxDepth > 0) {
    return maxDepth;
  }
  return layout.nodes.reduce((max, node) => Math.max(max, node.depth), 0);
}

function isUnassignedAttributeKey(key: string): boolean {
  const normalized = normalizeAttributeKey(key);
  return /\bunassigned\b/.test(normalized);
}

function isUnassignedMembersKey(key: string): boolean {
  const normalized = normalizeAttributeKey(key);
  return /\bunassigned\b/.test(normalized) && /\bmembers?\b/.test(normalized);
}

function isMembersListKey(key: string, value: string): boolean {
  const normalized = normalizeAttributeKey(key);
  if (!/\bmembers?\b/.test(normalized)) {
    return false;
  }
  return value.trim().length > 0;
}

function resolveMembersAttributeKey(attributes: Array<[string, string]>): string | null {
  const explicitUnassigned = attributes.find(([key]) => isUnassignedMembersKey(key));
  if (explicitUnassigned) {
    return explicitUnassigned[0];
  }

  const membersField = attributes.find(([key, value]) => isMembersListKey(key, value));
  return membersField?.[0] ?? null;
}

function parseMemberNames(rawValue: string, keyHint?: string): string[] {
  const trimmed = rawValue.trim();
  if (trimmed.length === 0) {
    return [];
  }

  if (
    (trimmed.startsWith("[") && trimmed.endsWith("]")) ||
    (trimmed.startsWith("{") && trimmed.endsWith("}"))
  ) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return Array.from(
          new Set(parsed.map((value) => String(value).trim()).filter((value) => value.length > 0)),
        );
      }
    } catch {
      // Best-effort parsing; fall back to delimiter-based parsing.
    }
  }

  const keySuggestsMembers = keyHint ? /\bmembers?\b/.test(normalizeAttributeKey(keyHint)) : false;
  if (keySuggestsMembers && !/[,\n;|]/.test(trimmed)) {
    const whitespaceTokens = trimmed.split(/\s+/).filter((value) => value.length > 0);
    if (
      whitespaceTokens.length > 1 &&
      whitespaceTokens.every((value) => /^[\w./:-]+$/.test(value))
    ) {
      return Array.from(new Set(whitespaceTokens));
    }
  }

  const separator = trimmed.includes("\n")
    ? /\r?\n+/
    : trimmed.includes(";")
      ? /\s*;\s*/
      : trimmed.includes("|")
        ? /\s*\|\s*/
        : /\s*,\s*/;

  return Array.from(
    new Set(
      trimmed
        .split(separator)
        .map((value) => value.trim())
        .filter((value) => value.length > 0),
    ),
  );
}

function normalizeAttributeKey(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .toLowerCase();
}
