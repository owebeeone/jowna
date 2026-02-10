import {
  ChartBreadcrumbs,
  ChartHeader,
  ChartMainLayout,
  ChartScreenProvider,
  ChartSettingsPopover,
  ChartToolbar,
  MembersPopover,
  useChartScreenModel,
} from "./chart/web";

export function ChartScreen() {
  const model = useChartScreenModel();

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
      </div>
    </ChartScreenProvider>
  );
}
