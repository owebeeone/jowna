import { useGrip, useNumberGrip } from "@owebeeone/grip-react";
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import type { ChartSettings } from "../domain";
import {
  SunburstChartRenderer,
  createStandaloneChartDocument,
  toStandaloneChartFileName,
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
import {
  MAX_KEY_SEGMENTS,
  MIN_LABEL_FONT_SIZE,
  OUTER_RADIUS,
  KRONA_UNCLASSIFIED_COLOR,
  arcPath,
  buildKronaColorMap,
  computeLayoutDataMaxDepth,
  createHoverLabelTooltip,
  createRadiusScale,
  createWedgeLabel,
  createWedgeRenderPlan,
  findNodeByPath,
  isMembersListKey,
  isUnassignedAttributeKey,
  isUnclassifiedNodeName,
  parseMemberNames,
  pathEquals,
  pathKey,
  resolveMembersAttributeKey,
  resolveNodeFillColor,
  resolveRenderDepth,
} from "./chart/common";
import {
  CHART_FONT_OPTIONS,
  downloadHtmlFile,
  downloadSvgFile,
  toColorInputValue,
  toSvgFileName,
} from "./chart/web";

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
