import { KRONA_UNCLASSIFIED_COLOR, pathEquals, resolveNodeFillColor } from "../../common";
import { useChartScreenContext } from "../context";

export function ChartDetailsPanel() {
  const model = useChartScreenContext();

  if (model.detailsPanelCollapsed) {
    return null;
  }

  return (
    <aside className="panel stack chart-details">
      <h3>{model.hoverPath ? "Hover Details" : "Details"}</h3>
      {!model.activeNode ? (
        <div className="muted">Hover or click a wedge to inspect node details.</div>
      ) : (
        <div className="stack">
          <div>
            <strong>{model.activeNode.name}</strong>
          </div>
          <div className="muted">path: {(model.activePath ?? []).join(" / ")}</div>

          <div className="chart-stats">
            <div className="chart-stat">
              <span className="muted">Magnitude</span>
              <strong>{model.activeMagnitude.toLocaleString()}</strong>
            </div>
            <div className="chart-stat">
              <span className="muted">Share</span>
              <strong>{model.activeShare.toFixed(1)}%</strong>
            </div>
            <div className="chart-stat">
              <span className="muted">Children</span>
              <strong>{model.activeNode.children?.length ?? 0}</strong>
            </div>
          </div>

          {model.activeNode.description && <div>{model.activeNode.description}</div>}
          {model.activeNode.url && (
            <div>
              <a href={model.activeNode.url} target="_blank" rel="noreferrer">
                {model.activeNode.url}
              </a>
            </div>
          )}
          <div className="stack">
            {model.visibleAttributes.map(([key, value]) => (
              <div key={key} className="muted">
                <strong>{key}:</strong> {value}
              </div>
            ))}
            <button
              className="ghost members-popover-trigger"
              onClick={model.onToggleMembersPopover}
              aria-haspopup="dialog"
              aria-expanded={model.membersPopoverOpen}
            >
              {`${model.unassignedMembersLabel} (${model.unassignedMembers.length})`}
            </button>
          </div>
        </div>
      )}

      <div className="stack">
        <h3>Top Segments</h3>
        {model.topSegments.length === 0 ? (
          <div className="muted">No segments in the current view.</div>
        ) : (
          <div className="stack">
            {model.topSegments.map((node) => {
              const share =
                model.totalMagnitude > 0 ? (node.magnitude / model.totalMagnitude) * 100 : 0;
              const isActive = model.activePath ? pathEquals(node.path, model.activePath) : false;
              return (
                <button
                  key={`key-${node.path.join("/")}`}
                  className={`key-row ${isActive ? "is-active" : ""}`}
                  onMouseEnter={() => model.hoverPathAction(node.path)}
                  onMouseLeave={() => model.hoverPathAction(null)}
                  onClick={() => model.focusPathAction(node.path)}
                >
                  <span
                    className="legend-dot"
                    style={{
                      background: resolveNodeFillColor(
                        model.kronaColors,
                        [node.path],
                        KRONA_UNCLASSIFIED_COLOR,
                      ),
                    }}
                  />
                  <span className="key-label">{node.name}</span>
                  <span className="key-value">{share.toFixed(1)}%</span>
                </button>
              );
            })}
            {model.hiddenSegments > 0 && (
              <div className="muted">+ {model.hiddenSegments} more in this level</div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
