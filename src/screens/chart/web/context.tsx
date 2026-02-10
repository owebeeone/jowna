import { createContext, useContext, type ReactNode } from "react";
import type { ChartScreenModel } from "./useChartScreenModel";

const ChartScreenContext = createContext<ChartScreenModel | null>(null);

export function ChartScreenProvider(props: { model: ChartScreenModel; children: ReactNode }) {
  return (
    <ChartScreenContext.Provider value={props.model}>{props.children}</ChartScreenContext.Provider>
  );
}

export function useChartScreenContext(): ChartScreenModel {
  const context = useContext(ChartScreenContext);
  if (!context) {
    throw new Error("useChartScreenContext must be used inside ChartScreenProvider.");
  }
  return context;
}
