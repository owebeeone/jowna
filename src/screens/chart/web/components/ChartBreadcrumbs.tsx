import { useChartScreenContext } from "../context";

export function ChartBreadcrumbs() {
  const model = useChartScreenContext();

  if (!model.resolvedFocusPath) {
    return null;
  }

  return (
    <div className="panel chart-breadcrumbs">
      <span className="muted">Focus</span>
      {model.resolvedFocusPath.map((segment, index) => {
        const crumbPath = model.resolvedFocusPath!.slice(0, index + 1);
        const isLast = index === model.resolvedFocusPath!.length - 1;
        return (
          <button
            key={`${segment}-${index}`}
            className={`crumb ${isLast ? "is-current" : ""}`}
            onClick={() => model.focusPathAction(crumbPath)}
          >
            {segment}
          </button>
        );
      })}
    </div>
  );
}
