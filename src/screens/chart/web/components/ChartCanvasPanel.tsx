import {
  KRONA_UNCLASSIFIED_COLOR,
  arcPath,
  createKeyCallouts,
  createHoverLabelTooltip,
  createWedgeLabel,
  isUnclassifiedNodeName,
  pathEquals,
  resolveNodeFillColor,
} from "../../common";
import { useChartScreenContext } from "../context";

export function ChartCanvasPanel() {
  const model = useChartScreenContext();
  const viewWidth = 620;
  const viewHeight = 620;
  const centerX = viewWidth / 2;
  const centerY = viewHeight / 2;

  const resolveEntryFill = (entry: (typeof model.wedgeRenderPlan.visibleNodes)[number]) => {
    if (isUnclassifiedNodeName(entry.node.name)) {
      return KRONA_UNCLASSIFIED_COLOR;
    }
    return (
      entry.fillOverride ??
      resolveNodeFillColor(
        model.kronaColors,
        [entry.colorPath, entry.interactionPath, entry.node.path],
        KRONA_UNCLASSIFIED_COLOR,
      )
    );
  };

  const fillByEntryKey = new Map(
    model.wedgeRenderPlan.visibleNodes.map((entry) => [entry.key, resolveEntryFill(entry)]),
  );
  const keyCallouts = createKeyCallouts({
    entries: model.wedgeRenderPlan.visibleNodes
      .filter((entry) => entry.isKeyed)
      .map((entry) => ({
        key: entry.key,
        name: entry.node.name,
        magnitude: entry.node.magnitude,
        startAngle: entry.node.startAngle,
        endAngle: entry.node.endAngle,
        fill: fillByEntryKey.get(entry.key) ?? KRONA_UNCLASSIFIED_COLOR,
        interactionPath: entry.interactionPath,
      })),
    totalMagnitude: model.chartLayout?.totalMagnitude ?? 0,
    width: viewWidth,
    height: viewHeight,
    centerX,
    centerY,
    radius: model.radiusScale(model.displayDepth),
    fontSizePx: model.labelFontSize,
  });

  return (
    <section className="chart-surface chart-surface-krona" style={model.chartSurfaceStyle}>
      {!model.dataset || !model.chartLayout ? (
        <div className="muted">No chart data yet. Import a dataset and open chart.</div>
      ) : (
        <>
          <svg
            ref={model.chartSvgRef}
            className="chart-canvas chart-canvas-krona"
            viewBox={`0 0 ${viewWidth} ${viewHeight}`}
            role="img"
            style={model.chartCanvasStyle}
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
              style={{ fontFamily: model.resolvedChartSettings.fontFamily }}
            >
              {model.wedgeRenderPlan.visibleNodes.map((entry) => {
                const node = entry.node;
                const interactionPath = entry.interactionPath;
                const innerRadius = model.radiusScale(Math.max(0, node.depth - 1));
                const outerRadius = model.radiusScale(entry.renderOuterDepth);
                const pathData = arcPath(innerRadius, outerRadius, node.startAngle, node.endAngle);
                if (!pathData) {
                  return null;
                }

                const isInteractive =
                  interactionPath.length > 0 && !isUnclassifiedNodeName(node.name);
                const isActive =
                  isInteractive && model.activePath
                    ? pathEquals(interactionPath, model.activePath)
                    : false;
                const isFocused =
                  isInteractive && model.resolvedFocusPath
                    ? pathEquals(interactionPath, model.resolvedFocusPath)
                    : false;
                const fill = fillByEntryKey.get(entry.key) ?? KRONA_UNCLASSIFIED_COLOR;
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
                      stroke={isActive ? "#062d1e" : model.resolvedChartSettings.wedgeStrokeColor}
                      strokeWidth={
                        isActive ? 2.2 : Math.max(0.4, model.resolvedChartSettings.wedgeStrokeWidth)
                      }
                      opacity={
                        isInteractive && model.hoverPath
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
                        isInteractive ? () => model.actions?.hoverPath(interactionPath) : undefined
                      }
                      onMouseLeave={
                        isInteractive ? () => model.actions?.hoverPath(null) : undefined
                      }
                      onClick={
                        isInteractive
                          ? (event) => {
                              model.actions?.focusPath(interactionPath);
                              event.currentTarget.blur?.();
                            }
                          : undefined
                      }
                      onKeyDown={
                        isInteractive
                          ? (event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                model.actions?.focusPath(interactionPath);
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

              {model.wedgeRenderPlan.visibleNodes.map((entry) => {
                const node = entry.node;
                const interactionPath = entry.interactionPath;
                const innerRadius = model.radiusScale(Math.max(0, node.depth - 1));
                const outerRadius = model.radiusScale(entry.labelOuterDepth);
                const label = createWedgeLabel(
                  node,
                  innerRadius,
                  outerRadius,
                  model.displayDepth,
                  entry.labelOuterDepth,
                  model.labelFontSize,
                );
                if (entry.isKeyed || !label) {
                  return null;
                }

                const showTooltip =
                  Boolean(model.hoverPath) &&
                  pathEquals(interactionPath, model.hoverPath ?? []) &&
                  label.isTruncated;
                const tooltip = showTooltip
                  ? createHoverLabelTooltip(label, model.labelFontSize)
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
                          stroke={model.resolvedChartSettings.wedgeStrokeColor}
                          strokeWidth={
                            Math.max(0.4, model.resolvedChartSettings.wedgeStrokeWidth) + 0.5
                          }
                        />
                        <text
                          className="chart-label-tooltip-text"
                          x={tooltip.textX}
                          y={tooltip.textY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          style={{
                            fontFamily: model.resolvedChartSettings.fontFamily,
                            fontSize: `${model.labelFontSize}px`,
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
                        fontFamily: model.resolvedChartSettings.fontFamily,
                        fontSize: `${model.labelFontSize}px`,
                      }}
                    >
                      {label.text}
                    </text>
                  </g>
                );
              })}

              <circle
                r={model.centerDiscRadius}
                className="chart-center-disc"
                onClick={() =>
                  model.parentFocusPath
                    ? model.actions?.focusPath(model.parentFocusPath)
                    : model.actions?.clearFocus()
                }
              />
              <text x={0} y={-18} textAnchor="middle" className="chart-center-title">
                {model.activeNode?.name ??
                  model.resolvedFocusPath?.[model.resolvedFocusPath.length - 1] ??
                  "Root"}
              </text>
              <text x={0} y={2} textAnchor="middle" className="chart-center-metric">
                {model.activeMagnitude.toLocaleString()}
              </text>
              <text x={0} y={22} textAnchor="middle" className="chart-center-sub">
                {model.activeShare.toFixed(1)}% of view
              </text>
            </g>
            {keyCallouts.map((callout) => {
              const isInteractive =
                callout.interactionPath.length > 0 &&
                !isUnclassifiedNodeName(
                  callout.interactionPath[callout.interactionPath.length - 1] ?? "",
                );
              const isActive =
                isInteractive && model.activePath
                  ? pathEquals(callout.interactionPath, model.activePath)
                  : false;
              const isFocused =
                isInteractive && model.resolvedFocusPath
                  ? pathEquals(callout.interactionPath, model.resolvedFocusPath)
                  : false;

              return (
                <g
                  key={`key-callout-${callout.key}`}
                  className={`chart-key-callout ${isActive ? "is-active" : ""} ${isFocused ? "is-focus" : ""}`}
                  role={isInteractive ? "button" : undefined}
                  tabIndex={isInteractive ? 0 : undefined}
                  onMouseEnter={
                    isInteractive
                      ? () => model.actions?.hoverPath(callout.interactionPath)
                      : undefined
                  }
                  onMouseLeave={isInteractive ? () => model.actions?.hoverPath(null) : undefined}
                  onClick={
                    isInteractive
                      ? (event) => {
                          model.actions?.focusPath(callout.interactionPath);
                          event.currentTarget.blur?.();
                        }
                      : undefined
                  }
                  onKeyDown={
                    isInteractive
                      ? (event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            model.actions?.focusPath(callout.interactionPath);
                          }
                        }
                      : undefined
                  }
                >
                  <path
                    className="chart-key-line"
                    d={callout.linePath}
                    strokeWidth={callout.lineStrokeWidth}
                  />
                  <rect
                    className="chart-key-text-box"
                    x={callout.textBoxX}
                    y={callout.textBoxY}
                    width={callout.textBoxWidth}
                    height={callout.textBoxHeight}
                    rx={Math.max(4, model.labelFontSize * 0.42)}
                    ry={Math.max(4, model.labelFontSize * 0.42)}
                    fill="#ffffff"
                    stroke={model.resolvedChartSettings.wedgeStrokeColor}
                    strokeWidth={Math.max(0.4, model.resolvedChartSettings.wedgeStrokeWidth) + 0.5}
                  />
                  <text
                    className="chart-key-text"
                    x={callout.textX}
                    y={callout.textY}
                    textAnchor={callout.textAnchor}
                    dominantBaseline="middle"
                    style={{
                      fontFamily: model.resolvedChartSettings.fontFamily,
                      fontSize: `${model.labelFontSize}px`,
                    }}
                  >
                    {callout.text}
                  </text>
                  <rect
                    className="chart-key-color-box"
                    x={callout.colorBoxX}
                    y={callout.colorBoxY}
                    width={callout.colorBoxSize}
                    height={callout.colorBoxSize}
                    fill={callout.fill}
                    stroke={model.resolvedChartSettings.wedgeStrokeColor}
                    strokeWidth={Math.max(0.4, model.resolvedChartSettings.wedgeStrokeWidth)}
                  />
                </g>
              );
            })}
          </svg>
          <div className="chart-hint muted">
            Click a segment to zoom. Hover to inspect. Click center to move up.
          </div>
        </>
      )}
    </section>
  );
}
