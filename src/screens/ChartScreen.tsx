import { useGrip, useRuntime } from "@owebeeone/grip-react";
import { useMemo } from "react";
import { ACTIVE_PROJECT_ID } from "../grips";
import {
  ChartBreadcrumbs,
  ChartHeader,
  ChartHelpPopover,
  ChartMainLayout,
  ChartScreenProvider,
  ChartSettingsPopover,
  ChartToolbar,
  MembersPopover,
  getOrCreateProjectChartUiContext,
  useChartScreenModel,
} from "./chart/web";

export function ChartScreen() {
  const activeProjectId = useGrip(ACTIVE_PROJECT_ID);
  const runtime = useRuntime();
  const chartUiContext = useMemo(
    () =>
      getOrCreateProjectChartUiContext({
        parent: runtime.context,
        projectId: activeProjectId,
      }),
    [activeProjectId, runtime.context],
  );
  const model = useChartScreenModel(chartUiContext);

  return (
    <ChartScreenProvider model={model}>
      <div className="app-shell">
        <div className="app-frame chart-screen-frame">
          <ChartHeader />
          <ChartToolbar />
          <ChartBreadcrumbs />
          <ChartMainLayout />
        </div>

        <MembersPopover />
        <ChartSettingsPopover />
        <ChartHelpPopover />
      </div>
    </ChartScreenProvider>
  );
}
