import { useGrip } from "@owebeeone/grip-react";
import { APP_VIEW } from "./grips";
import { ChartScreen } from "./screens/ChartScreen";
import { SelectionScreen } from "./screens/SelectionScreen";
import "./screens/screens.css";

export function App() {
  const view = useGrip(APP_VIEW) ?? "selection";

  if (view === "chart") {
    return <ChartScreen />;
  }

  return <SelectionScreen />;
}
