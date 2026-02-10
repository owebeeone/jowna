import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GripProvider } from "@owebeeone/grip-react";
import { grok, main } from "../runtime_graph";
import { readStaticChartPayloadFromWindow } from "../features/chart/static-payload";
import { registerStaticChartTaps } from "../taps_static";
import { StaticApp } from "./StaticApp";
import "../index.css";
import "../screens/screens.css";

const payload = readStaticChartPayloadFromWindow();
registerStaticChartTaps(payload);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Expected #root element for static chart bootstrap.");
}

createRoot(rootElement).render(
  <StrictMode>
    <GripProvider grok={grok} context={main}>
      <StaticApp />
    </GripProvider>
  </StrictMode>,
);
