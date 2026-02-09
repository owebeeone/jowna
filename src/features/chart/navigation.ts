import type {
  ChartNavigationActions,
  ChartNavigationController,
  ChartNavigationState,
} from "./contracts";

export function createChartNavigationController(): ChartNavigationController {
  const state: ChartNavigationState = {
    focusHistory: [],
    historyIndex: -1,
  };

  const actions: ChartNavigationActions = {
    focusPath(path) {
      const normalized = normalizePath(path);
      if (normalized.length === 0) {
        return;
      }

      const nextHistory = state.focusHistory.slice(0, state.historyIndex + 1);
      nextHistory.push(normalized);
      state.focusHistory = nextHistory;
      state.historyIndex = nextHistory.length - 1;
    },

    goBack() {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1;
      }
    },

    goForward() {
      if (state.historyIndex < state.focusHistory.length - 1) {
        state.historyIndex += 1;
      }
    },

    reset() {
      state.focusHistory = [];
      state.historyIndex = -1;
    },
  };

  return { state, actions };
}

function normalizePath(path: string[]): string[] {
  return path.map((segment) => segment.trim()).filter((segment) => segment.length > 0);
}
