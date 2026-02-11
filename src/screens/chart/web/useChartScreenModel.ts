import { useGrip, useNumberGrip } from "@owebeeone/grip-react";
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import type { ChartSettings } from "../../../domain";
import {
  createStandaloneChartDocument,
  toStandaloneChartFileName,
} from "../../../features/chart";
import {
  ACTIVE_DATASET,
  ACTIVE_DATASET_ID,
  ACTIVE_PROJECT,
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
  DATASETS,
  DEFAULT_CHART_SETTINGS,
  JOWNA_ACTIONS,
} from "../../../grips";
import {
  MAX_KEY_SEGMENTS,
  MIN_LABEL_FONT_SIZE,
  OUTER_RADIUS,
  buildKronaColorMap,
  computeLayoutDataMaxDepthWithMode,
  createDatasetSelectorState,
  createRadiusScale,
  createWedgeRenderPlan,
  findNodeByPath,
  isMembersListKey,
  isUnassignedAttributeKey,
  isUnclassifiedNodeName,
  parseMemberNames,
  pathEquals,
  pathKey,
  resolveMembersAttributeKey,
  resolveRenderDepth,
} from "../common";
import { CHART_FONT_OPTIONS } from "./constants";
import { downloadHtmlFile, downloadSvgFile, toSvgFileName } from "./download";

export function useChartScreenModel() {
  const actions = useGrip(JOWNA_ACTIONS);
  const dataset = useGrip(ACTIVE_DATASET);
  const activeProject = useGrip(ACTIVE_PROJECT);
  const datasets = useGrip(DATASETS) ?? [];
  const activeDatasetId = useGrip(ACTIVE_DATASET_ID) ?? null;
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
  const datasetSelector = useMemo(
    () => createDatasetSelectorState(datasets, activeDatasetId),
    [activeDatasetId, datasets],
  );

  const kronaColors = useMemo(
    () =>
      buildKronaColorMap(
        chartLayout ?? null,
        resolvedChartSettings.collapseRedundant !== false,
      ),
    [chartLayout, resolvedChartSettings.collapseRedundant],
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

  const layoutDataMaxDepth = computeLayoutDataMaxDepthWithMode(
    chartLayout ?? null,
    resolvedChartSettings.collapseRedundant !== false,
  );
  const maxDepth = resolveRenderDepth(layoutDataMaxDepth, depthLimit);
  const displayDepth = maxDepth + 1;
  const radiusScale = createRadiusScale(displayDepth, OUTER_RADIUS, labelFontSize);
  const centerDiscRadius = maxDepth > 0 ? Math.max(8, Math.min(42, radiusScale(1) * 0.78)) : 42;
  const wedgeRenderPlan = useMemo(
    () =>
      createWedgeRenderPlan(
        chartLayout ?? null,
        maxDepth,
        labelFontSize,
        resolvedChartSettings.collapseRedundant !== false,
      ),
    [chartLayout, labelFontSize, maxDepth, resolvedChartSettings.collapseRedundant],
  );
  const parentFocusPath =
    resolvedFocusPath && resolvedFocusPath.length > 1 ? resolvedFocusPath.slice(0, -1) : null;

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

  const onDownloadHtml = async () => {
    if (!dataset) {
      return;
    }

    try {
      const html = await createStandaloneChartDocument({
        project: activeProject ?? null,
        datasets,
        activeDatasetId,
        depthLimit,
        chartSettings: resolvedChartSettings,
        focusPath,
      });
      downloadHtmlFile(toStandaloneChartFileName(dataset.name), html);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed generating standalone chart HTML.";
      console.warn("Failed generating standalone chart HTML", error);
      if (typeof window !== "undefined") {
        window.alert(message);
      }
    }
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

  const onToggleDetailsPanel = () => {
    setDetailsPanelCollapsed((current) => !current);
    setOpenMembersPopoverForPath(null);
  };

  const openSettingsPopover = () => {
    setSettingsPopoverOpen(true);
  };

  const closeSettingsPopover = () => {
    setSettingsPopoverOpen(false);
  };

  const onSelectDataset = (nextDatasetId: string) => {
    if (!nextDatasetId || nextDatasetId === datasetSelector.selectedId) {
      return;
    }
    actions?.openChart(nextDatasetId);
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

  return {
    actions,
    dataset,
    activeProject,
    datasets,
    activeDatasetId,
    chartLayout,
    focusPath,
    selectedPath,
    hoverPath,
    history,
    historyIndex,
    depthBind,
    depthLimit,
    settingsPopoverOpen,
    detailsPanelCollapsed,
    chartSvgRef,
    resolvedChartSettings,
    chartSurfaceStyle,
    chartCanvasStyle,
    labelFontSize,
    widthMode,
    heightMode,
    widthInputValue,
    heightInputValue,
    chartFontOptions,
    datasetSelector,
    kronaColors,
    resolvedFocusPath,
    activePath,
    activeNode,
    activeLayoutNode,
    activePathKey,
    visibleAttributes,
    membersPopoverOpen,
    unassignedMembersLabel,
    unassignedMembers,
    totalMagnitude,
    activeMagnitude,
    activeShare,
    topSegments,
    hiddenSegments,
    maxDepth,
    displayDepth,
    radiusScale,
    centerDiscRadius,
    wedgeRenderPlan,
    parentFocusPath,
    persistChartSettings,
    updateChartSettings,
    updateDimensionMode,
    onDimensionValueChange,
    onDimensionInputFocus,
    onDimensionInputBlur,
    onDownloadHtml,
    onDownloadSvg,
    onToggleMembersPopover,
    onCloseMembersPopover,
    onToggleDetailsPanel,
    openSettingsPopover,
    closeSettingsPopover,
    onSelectDataset,
  };
}

export type ChartScreenModel = ReturnType<typeof useChartScreenModel>;
