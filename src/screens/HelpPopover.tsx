interface HelpPopoverProps {
  open: boolean;
  onClose: () => void;
}

const JOWNA_VERSION = typeof __JOWNA_VERSION__ !== "undefined" ? __JOWNA_VERSION__ : "dev";

export function HelpPopover({ open, onClose }: HelpPopoverProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="help-popover-backdrop" onClick={onClose}>
      <section
        className="panel help-popover"
        role="dialog"
        aria-modal="true"
        aria-label="About Jowna"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="help-popover-header">
          <h2>
            <a href="https://github.com/owebeeone/jowna" target="_blank" rel="noreferrer">
              About Jowna
            </a>
          </h2>
          <button className="ghost popover-x" onClick={onClose} aria-label="Close help dialog">
            X
          </button>
        </header>

        <div className="help-popover-body stack">
          <p>
            <strong>Version:</strong> {JOWNA_VERSION}
          </p>
          <p>
            Jowna is an <strong>alpha</strong> browser-first data visualizer inspired by{" "}
            <a href="https://github.com/marbl/Krona/wiki" target="_blank" rel="noreferrer">
              Krona
            </a>
            .
          </p>
          <p>
            GitHub:{" "}
            <a href="https://github.com/owebeeone/jowna" target="_blank" rel="noreferrer">
              github.com/owebeeone/jowna
            </a>
          </p>
          <p>
            Jowna is best suited to hierarchical categorical data with numeric magnitudes (counts,
            abundances, sizes, scores) and path-like labels such as taxonomy, geography, org
            structure, or any nested grouping.
          </p>
          <p>
            Visual output is a Krona-style radial partition chart (sunburst / pie-style wedges),
            where inner rings show higher-level groups and outer rings show more specific subgroups.
          </p>
          <ul className="warning-list">
            <li>
              <strong>Upload Project</strong> can import exported Jowna project files and Krona HTML
              files.
            </li>
            <li>
              <strong>Download Project</strong> preserves datasets and chart settings.
            </li>
            <li>
              Project data is stored locally in your browser. Export and copy project files when you
              need to share or back up your work.
            </li>
            <li>
              <strong>Download HTML</strong> exports a standalone interactive chart page.
            </li>
            <li>
              <strong>Download Zip</strong> exports all project datasets as TSV files in a zip.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
