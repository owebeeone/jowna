import { useChartScreenContext } from "../context";

export function MembersPopover() {
  const model = useChartScreenContext();

  if (model.detailsPanelCollapsed || !model.membersPopoverOpen) {
    return null;
  }

  return (
    <div className="members-popover-layer">
      <section
        className="panel members-popover members-popover-floating"
        role="dialog"
        aria-label={`${model.unassignedMembersLabel} list`}
      >
        <header className="members-popover-header">
          <strong>{`${model.unassignedMembersLabel} (${model.unassignedMembers.length})`}</strong>
          <button
            className="ghost popover-x"
            onClick={model.onCloseMembersPopover}
            aria-label="Close members list"
          >
            X
          </button>
        </header>
        <div className="members-popover-list">
          {model.unassignedMembers.map((member, index) => (
            <div key={`${member}-${index}`} className="members-popover-item">
              {member}
            </div>
          ))}
        </div>
        <footer className="members-popover-footer">
          <button className="ghost" onClick={model.onCloseMembersPopover}>
            Close
          </button>
        </footer>
      </section>
    </div>
  );
}
