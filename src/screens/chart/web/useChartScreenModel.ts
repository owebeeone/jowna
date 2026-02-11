import {
  useAtomValueTap,
  useGrip,
  useNumberGrip,
  type GripContext,
} from "@owebeeone/grip-react";
import { useMemo, useRef, type ChangeEvent } from "react";
import type { ChartSettings, TreeNode } from "../../../domain";
import {
  createStandaloneChartDocument,
  SunburstChartRenderer,
  STATIC_CHART_PAYLOAD_GLOBAL,
  toStandaloneChartFileName,
} from "../../../features/chart";
import {
  createProjectDatasetsZipBlob,
  toDatasetsZipFileName,
} from "../../../features/file-manager";
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
  CHART_UI_ACTIVE_DIMENSION_DRAFT,
  CHART_UI_DETAILS_PANEL_COLLAPSED,
  CHART_UI_DIMENSION_DRAFTS,
  CHART_UI_HELP_POPOVER_OPEN,
  CHART_UI_OPEN_MEMBERS_POPOVER_FOR_PATH,
  CHART_UI_SETTINGS_POPOVER_OPEN,
  CHART_UI_SHOW_KEY_CALLOUTS,
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
import { downloadBlobFile, downloadHtmlFile, downloadSvgFile, toSvgFileName } from "./download";

const EMPTY_PATH_HISTORY: string[][] = [];
const EMPTY_DIMENSION_DRAFTS = { width: "", height: "" };

export function resolveComparableFocusPathForTree(params: {
  tree: TreeNode;
  requestedPath: string[] | null;
}): string[] {
  const fallback = [params.tree.name];
  if (!params.requestedPath || params.requestedPath.length === 0) {
    return fallback;
  }

  const normalized = params.requestedPath
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);
  if (normalized.length === 0) {
    return fallback;
  }

  for (let length = normalized.length; length >= 1; length -= 1) {
    const candidate = normalized.slice(0, length);
    if (findNodeByPath(params.tree, candidate)) {
      return candidate;
    }
  }

  return fallback;
}

export function useChartScreenModel(chartUiContext: GripContext) {
  const actions = useGrip(JOWNA_ACTIONS);
  const dataset = useGrip(ACTIVE_DATASET);
  const activeProject = useGrip(ACTIVE_PROJECT);
  const datasets = useGrip(DATASETS) ?? [];
  const activeDatasetId = useGrip(ACTIVE_DATASET_ID) ?? null;
  const chartSettings = useGrip(CHART_SETTINGS_STATE);
  const chartSettingsTap = useGrip(CHART_SETTINGS_STATE_TAP);
  const focusPathTap = useAtomValueTap(CHART_FOCUS_PATH, {
    ctx: chartUiContext,
    initial: null,
  });
  const selectedPathTap = useAtomValueTap(CHART_SELECTED_PATH, {
    ctx: chartUiContext,
    initial: null,
  });
  const hoverPathTap = useAtomValueTap(CHART_HOVER_PATH, {
    ctx: chartUiContext,
    initial: null,
  });
  const historyTap = useAtomValueTap(CHART_HISTORY, {
    ctx: chartUiContext,
    initial: CHART_HISTORY.defaultValue ?? EMPTY_PATH_HISTORY,
  });
  const historyIndexTap = useAtomValueTap(CHART_HISTORY_INDEX, {
    ctx: chartUiContext,
    initial: -1,
  });
  const focusPathState = useGrip(CHART_FOCUS_PATH, chartUiContext) ?? null;
  const selectedPathState = useGrip(CHART_SELECTED_PATH, chartUiContext) ?? null;
  const hoverPathState = useGrip(CHART_HOVER_PATH, chartUiContext) ?? null;
  const historyState = useGrip(CHART_HISTORY, chartUiContext) ?? EMPTY_PATH_HISTORY;
  const historyIndexState = useGrip(CHART_HISTORY_INDEX, chartUiContext) ?? -1;
  const depthLimit = useGrip(CHART_DEPTH_LIMIT) ?? 0;

  const settingsPopoverTap = useAtomValueTap(CHART_UI_SETTINGS_POPOVER_OPEN, {
    ctx: chartUiContext,
    initial: false,
  });
  const detailsPanelCollapsedTap = useAtomValueTap(CHART_UI_DETAILS_PANEL_COLLAPSED, {
    ctx: chartUiContext,
    initial: false,
  });
  const openMembersPopoverForPathTap = useAtomValueTap(CHART_UI_OPEN_MEMBERS_POPOVER_FOR_PATH, {
    ctx: chartUiContext,
    initial: null,
  });
  const showKeyCalloutsTap = useAtomValueTap(CHART_UI_SHOW_KEY_CALLOUTS, {
    ctx: chartUiContext,
    initial: true,
  });
  const helpPopoverOpenTap = useAtomValueTap(CHART_UI_HELP_POPOVER_OPEN, {
    ctx: chartUiContext,
    initial: false,
  });
  const dimensionDraftsTap = useAtomValueTap(CHART_UI_DIMENSION_DRAFTS, {
    ctx: chartUiContext,
    initial: CHART_UI_DIMENSION_DRAFTS.defaultValue ?? EMPTY_DIMENSION_DRAFTS,
  });
  const activeDimensionDraftTap = useAtomValueTap(CHART_UI_ACTIVE_DIMENSION_DRAFT, {
    ctx: chartUiContext,
    initial: null,
  });

  const settingsPopoverOpen = useGrip(CHART_UI_SETTINGS_POPOVER_OPEN, chartUiContext) ?? false;
  const detailsPanelCollapsed =
    useGrip(CHART_UI_DETAILS_PANEL_COLLAPSED, chartUiContext) ?? false;
  const openMembersPopoverForPath =
    useGrip(CHART_UI_OPEN_MEMBERS_POPOVER_FOR_PATH, chartUiContext) ?? null;
  const showKeyCallouts = useGrip(CHART_UI_SHOW_KEY_CALLOUTS, chartUiContext) ?? true;
  const helpPopoverOpen = useGrip(CHART_UI_HELP_POPOVER_OPEN, chartUiContext) ?? false;
  const dimensionDrafts = useGrip(CHART_UI_DIMENSION_DRAFTS, chartUiContext) ?? EMPTY_DIMENSION_DRAFTS;
  const activeDimensionDraft =
    useGrip(CHART_UI_ACTIVE_DIMENSION_DRAFT, chartUiContext) ?? null;
  const chartSvgRef = useRef<SVGSVGElement | null>(null);
  const chartRenderer = useMemo(() => new SunburstChartRenderer(), []);

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
  const isStaticMode =
    typeof window !== "undefined" &&
    Object.prototype.hasOwnProperty.call(window, STATIC_CHART_PAYLOAD_GLOBAL);
  const chartLayout = useMemo(() => {
    if (!dataset) {
      return null;
    }
    return chartRenderer.computeLayout({
      root: dataset.tree,
      settings: resolvedChartSettings,
      focusedPath: focusPathState,
      depthLimit: depthLimit <= 0 ? null : depthLimit,
    });
  }, [chartRenderer, dataset, resolvedChartSettings, focusPathState, depthLimit]);

  const kronaColors = useMemo(
    () =>
      buildKronaColorMap(chartLayout ?? null, resolvedChartSettings.collapseRedundant !== false),
    [chartLayout, resolvedChartSettings.collapseRedundant],
  );

  const resolvedFocusPath = dataset
    ? focusPathState && findNodeByPath(dataset.tree, focusPathState)
      ? focusPathState
      : [dataset.tree.name]
    : null;
  const activePath = hoverPathState ?? selectedPathState ?? resolvedFocusPath;
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
        OUTER_RADIUS,
      ),
    [chartLayout, labelFontSize, maxDepth, resolvedChartSettings.collapseRedundant],
  );
  const hasKeyCallouts = wedgeRenderPlan.visibleNodes.some((entry) => entry.isKeyed);
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
      if (activeDimensionDraft === dimension) {
        activeDimensionDraftTap.set(null);
      }
      dimensionDraftsTap.update((current) => ({
        ...(current ?? { width: "", height: "" }),
        [dimension]: "",
      }));
      updateChartSettings({ [dimension]: "fit" } as Partial<ChartSettings>);
      return;
    }

    const currentDimension = resolvedChartSettings[dimension];
    const fallback = dimension === "width" ? 620 : 640;
    const normalized =
      typeof currentDimension === "number" && Number.isFinite(currentDimension)
        ? Math.max(240, currentDimension)
        : fallback;

    dimensionDraftsTap.update((current) => ({
      ...(current ?? { width: "", height: "" }),
      [dimension]: String(normalized),
    }));
    updateChartSettings({
      [dimension]: normalized,
    } as Partial<ChartSettings>);
  };

  const onDimensionValueChange =
    (dimension: "width" | "height") => (event: ChangeEvent<HTMLInputElement>) => {
      dimensionDraftsTap.update((current) => ({
        ...(current ?? { width: "", height: "" }),
        [dimension]: event.target.value,
      }));
    };

  const onDimensionInputFocus = (dimension: "width" | "height") => () => {
    activeDimensionDraftTap.set(dimension);
    const currentDimension = resolvedChartSettings[dimension];
    const fallback = dimension === "width" ? "620" : "640";
    const draftValue =
      typeof currentDimension === "number" && Number.isFinite(currentDimension)
        ? String(Math.max(240, currentDimension))
        : fallback;
    dimensionDraftsTap.update((current) => ({
      ...(current ?? { width: "", height: "" }),
      [dimension]: draftValue,
    }));
  };

  const onDimensionInputBlur =
    (dimension: "width" | "height") => (event: ChangeEvent<HTMLInputElement>) => {
      if (activeDimensionDraft === dimension) {
        activeDimensionDraftTap.set(null);
      }
      const parsed = Number.parseInt(event.target.value, 10);
      if (!Number.isFinite(parsed)) {
        const fallback =
          typeof resolvedChartSettings[dimension] === "number"
            ? String(resolvedChartSettings[dimension])
            : "";
        dimensionDraftsTap.update((current) => ({
          ...(current ?? { width: "", height: "" }),
          [dimension]: fallback,
        }));
        return;
      }
      const normalized = Math.max(240, parsed);
      dimensionDraftsTap.update((current) => ({
        ...(current ?? { width: "", height: "" }),
        [dimension]: String(normalized),
      }));
      updateChartSettings({ [dimension]: normalized } as Partial<ChartSettings>);
    };

  const normalizeNodePath = (path: string[]): string[] =>
    path.map((segment) => segment.trim()).filter((segment) => segment.length > 0);

  const focusPath = (path: string[]) => {
    if (!dataset) {
      return;
    }
    const normalized = normalizeNodePath(path);
    if (normalized.length === 0 || !findNodeByPath(dataset.tree, normalized)) {
      return;
    }

    focusPathTap.set(normalized);
    selectedPathTap.set(normalized);
    hoverPathTap.set(null);

    const history = historyTap.get() ?? [];
    const historyIndex = historyIndexTap.get() ?? -1;
    const nextHistory = [...history.slice(0, historyIndex + 1), normalized];
    historyTap.set(nextHistory);
    historyIndexTap.set(nextHistory.length - 1);
  };

  const hoverPath = (path: string[] | null) => {
    if (!dataset) {
      hoverPathTap.set(null);
      return;
    }
    if (!path) {
      hoverPathTap.set(null);
      return;
    }
    const normalized = normalizeNodePath(path);
    if (normalized.length === 0 || !findNodeByPath(dataset.tree, normalized)) {
      hoverPathTap.set(null);
      return;
    }
    hoverPathTap.set(normalized);
  };

  const goBack = () => {
    const history = historyTap.get() ?? [];
    const historyIndex = historyIndexTap.get() ?? -1;
    if (historyIndex <= 0) {
      return;
    }
    const nextIndex = historyIndex - 1;
    historyIndexTap.set(nextIndex);
    const path = history[nextIndex] ?? null;
    focusPathTap.set(path);
    selectedPathTap.set(path);
    hoverPathTap.set(null);
  };

  const goForward = () => {
    const history = historyTap.get() ?? [];
    const historyIndex = historyIndexTap.get() ?? -1;
    if (historyIndex >= history.length - 1) {
      return;
    }
    const nextIndex = historyIndex + 1;
    historyIndexTap.set(nextIndex);
    const path = history[nextIndex] ?? null;
    focusPathTap.set(path);
    selectedPathTap.set(path);
    hoverPathTap.set(null);
  };

  const clearFocus = () => {
    focusPathTap.set(null);
    selectedPathTap.set(null);
    hoverPathTap.set(null);
    historyTap.set([]);
    historyIndexTap.set(-1);
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
        focusPath: focusPathState,
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

  const onDownloadDatasetsZip = () => {
    if (datasets.length === 0) {
      return;
    }

    const fallbackProject = {
      id: "project-static",
      name: "Jowna Project",
      createdAt: new Date(0).toISOString(),
      updatedAt: new Date().toISOString(),
      datasetIds: datasets.map((dataset) => dataset.id),
      activeDatasetId: activeDatasetId ?? datasets[0]?.id ?? null,
      chartSettings: resolvedChartSettings,
    };

    const projectForZip = activeProject ?? fallbackProject;

    try {
      const blob = createProjectDatasetsZipBlob({
        project: projectForZip,
        datasets,
        exportedAt: new Date().toISOString(),
      });
      downloadBlobFile(toDatasetsZipFileName(projectForZip.name), blob);
    } catch (error) {
      console.warn("Failed generating dataset zip", error);
      const message = error instanceof Error ? error.message : "Failed generating dataset zip.";
      if (typeof window !== "undefined") {
        window.alert(message);
      }
    }
  };

  const onToggleMembersPopover = () => {
    if (!activePathKey) {
      return;
    }
    openMembersPopoverForPathTap.update((current) =>
      current === activePathKey ? null : activePathKey,
    );
  };

  const onCloseMembersPopover = () => {
    openMembersPopoverForPathTap.set(null);
  };

  const onToggleDetailsPanel = () => {
    detailsPanelCollapsedTap.update((current) => !current);
    openMembersPopoverForPathTap.set(null);
  };

  const onToggleKeyCallouts = () => {
    showKeyCalloutsTap.update((current) => !current);
  };

  const openSettingsPopover = () => {
    settingsPopoverTap.set(true);
  };

  const closeSettingsPopover = () => {
    settingsPopoverTap.set(false);
  };

  const openHelpPopover = () => {
    helpPopoverOpenTap.set(true);
  };

  const closeHelpPopover = () => {
    helpPopoverOpenTap.set(false);
  };

  const onSelectDataset = (nextDatasetId: string) => {
    if (!nextDatasetId || nextDatasetId === datasetSelector.selectedId) {
      return;
    }
    const nextDataset = datasets.find((entry) => entry.id === nextDatasetId) ?? null;
    if (nextDataset) {
      const nextFocusPath = resolveComparableFocusPathForTree({
        tree: nextDataset.tree,
        requestedPath: resolvedFocusPath,
      });
      focusPathTap.set(nextFocusPath);
      selectedPathTap.set(nextFocusPath);
      hoverPathTap.set(null);
      historyTap.set([nextFocusPath]);
      historyIndexTap.set(0);
    } else {
      clearFocus();
    }
    actions?.openChart(nextDatasetId);
    openMembersPopoverForPathTap.set(null);
  };

  return {
    actions,
    dataset,
    activeProject,
    datasets,
    activeDatasetId,
    chartLayout,
    focusPath: focusPathState,
    selectedPath: selectedPathState,
    hoverPath: hoverPathState,
    history: historyState,
    historyIndex: historyIndexState,
    depthBind,
    depthLimit,
    settingsPopoverOpen,
    detailsPanelCollapsed,
    showKeyCallouts,
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
    isStaticMode,
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
    hasKeyCallouts,
    parentFocusPath,
    persistChartSettings,
    updateChartSettings,
    updateDimensionMode,
    onDimensionValueChange,
    onDimensionInputFocus,
    onDimensionInputBlur,
    onDownloadHtml,
    onDownloadSvg,
    onDownloadDatasetsZip,
    focusPathAction: focusPath,
    hoverPathAction: hoverPath,
    goBackAction: goBack,
    goForwardAction: goForward,
    clearFocusAction: clearFocus,
    onToggleMembersPopover,
    onCloseMembersPopover,
    onToggleDetailsPanel,
    onToggleKeyCallouts,
    openSettingsPopover,
    closeSettingsPopover,
    helpPopoverOpen,
    openHelpPopover,
    closeHelpPopover,
    onSelectDataset,
  };
}

export type ChartScreenModel = ReturnType<typeof useChartScreenModel>;
