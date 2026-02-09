import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Expected #root element for Jowna bootstrap.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
