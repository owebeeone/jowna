import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GripProvider } from "@owebeeone/grip-react";
import { App } from "./App";
import "./index.css";
import { main, grok } from "./runtime_graph";
import { registerJownaTaps } from "./taps_app";

registerJownaTaps();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Expected #root element for Jowna bootstrap.");
}

createRoot(rootElement).render(
  <StrictMode>
    <GripProvider grok={grok} context={main}>
      <App />
    </GripProvider>
  </StrictMode>,
);
