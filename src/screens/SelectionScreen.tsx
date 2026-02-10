import { useGrip, useTextGrip } from "@owebeeone/grip-react";
import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import type { Dataset, ImportWarning } from "../domain";
import {
  ACTIVE_DATASET_ID,
  ACTIVE_PROJECT_ID,
  DATASETS,
  DEFAULT_IMPORT_PARAMETERS,
  IMPORT_CAN_APPLY,
  IMPORT_DATASET_NAME,
  IMPORT_DATASET_NAME_TAP,
  IMPORT_FATAL_ERROR,
  IMPORT_LOADING,
  IMPORT_PARAMETERS,
  IMPORT_PARAMETERS_TAP,
  IMPORT_POPOVER_OPEN,
  IMPORT_POPOVER_OPEN_TAP,
  IMPORT_PREVIEW_STATE,
  IMPORT_SOURCE,
  IMPORT_SOURCE_TAP,
  IMPORT_URL_INPUT,
  IMPORT_URL_INPUT_TAP,
  IMPORT_WARNINGS_STATE,
  JOWNA_ACTIONS,
  NEW_PROJECT_NAME,
  NEW_PROJECT_NAME_TAP,
  PREVIEW_FILTER,
  PREVIEW_FILTER_TAP,
  PROJECTS,
} from "../grips";

export function SelectionScreen() {
  const MAX_TRANSFER_WARNINGS = 120;
  const actions = useGrip(JOWNA_ACTIONS);
  const projects = useGrip(PROJECTS) ?? [];
  const activeProjectId = useGrip(ACTIVE_PROJECT_ID);
  const datasets = useGrip(DATASETS) ?? [];
  const activeDatasetId = useGrip(ACTIVE_DATASET_ID);

  const importSource = useGrip(IMPORT_SOURCE);
  const importParameters = useGrip(IMPORT_PARAMETERS) ?? DEFAULT_IMPORT_PARAMETERS;
  const importParametersTap = useGrip(IMPORT_PARAMETERS_TAP);
  const importSourceTap = useGrip(IMPORT_SOURCE_TAP);
  const importPreview = useGrip(IMPORT_PREVIEW_STATE);
  const importWarnings = useGrip(IMPORT_WARNINGS_STATE) ?? [];
  const importFatalError = useGrip(IMPORT_FATAL_ERROR);
  const importLoading = useGrip(IMPORT_LOADING) ?? false;
  const importCanApply = useGrip(IMPORT_CAN_APPLY) ?? false;
  const importPopoverOpen = useGrip(IMPORT_POPOVER_OPEN) ?? false;
  const importPopoverOpenTap = useGrip(IMPORT_POPOVER_OPEN_TAP);

  const projectNameBind = useTextGrip(NEW_PROJECT_NAME, NEW_PROJECT_NAME_TAP);
  const datasetNameBind = useTextGrip(IMPORT_DATASET_NAME, IMPORT_DATASET_NAME_TAP);
  const previewFilterBind = useTextGrip(PREVIEW_FILTER, PREVIEW_FILTER_TAP);
  const urlInputBind = useTextGrip(IMPORT_URL_INPUT, IMPORT_URL_INPUT_TAP);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingProjectName, setEditingProjectName] = useState("");
  const [editingDatasetId, setEditingDatasetId] = useState<string | null>(null);
  const [editingDatasetName, setEditingDatasetName] = useState("");
  const [projectTransferNotice, setProjectTransferNotice] = useState<string | null>(null);
  const [projectTransferWarnings, setProjectTransferWarnings] = useState<string[]>([]);
  const [pendingDeleteProjectId, setPendingDeleteProjectId] = useState<string | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const projectArchiveInputRef = useRef<HTMLInputElement | null>(null);

  const filteredRows = (importPreview?.rows ?? []).filter((row) => {
    const query = previewFilterBind.value.trim().toLowerCase();
    if (query.length === 0) {
      return true;
    }
    const haystack = [
      String(row.sourceRow),
      String(row.magnitude),
      row.path.join(" / "),
      row.url ?? "",
      row.description ?? "",
      ...Object.values(row.attributes),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });

  const updateImportParameters = (partial: Partial<typeof importParameters>) => {
    importParametersTap?.update((current) => ({
      ...(current ?? DEFAULT_IMPORT_PARAMETERS),
      ...partial,
    }));
  };

  const openImportPopover = () => {
    importPopoverOpenTap?.set(true);
  };

  const closeImportPopover = () => {
    importPopoverOpenTap?.set(false);
  };

  const onCancelImportPopover = () => {
    importPopoverOpenTap?.set(false);
  };

  const onOpenImportForProject = async (projectId: string) => {
    if (!actions) {
      return;
    }
    await actions.openProject(projectId);
    importPopoverOpenTap?.set(true);
  };

  const onSelectProject = async (projectId: string) => {
    if (!actions) {
      return;
    }
    await actions.openProject(projectId);
  };

  const onDownloadProject = async (projectId: string, projectName: string) => {
    if (!actions) {
      return;
    }

    try {
      await actions.exportProjectArchive(projectId);
      setProjectTransferNotice(`Downloaded archive for '${projectName}'.`);
      setProjectTransferWarnings([]);
    } catch (error) {
      console.warn("Failed exporting project archive", error);
      const message = error instanceof Error ? error.message : "Unknown export error.";
      setProjectTransferNotice(`Warning: ${message}`);
      setProjectTransferWarnings([]);
    }
  };

  const onUploadProjectClick = () => {
    projectArchiveInputRef.current?.click();
  };

  const onProjectArchiveFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    event.target.value = "";
    if (!file || !actions) {
      return;
    }

    try {
      const report = await actions.importProjectArchive(file);
      const warningCount = report.warnings.length;
      const suffix = warningCount > 0 ? ` with ${warningCount} warning(s).` : ".";
      const importType = report.mode === "krona-html" ? "Krona HTML project" : "project archive";
      setProjectTransferNotice(
        `Imported ${importType} '${report.projectName}' (${report.datasetCount} dataset(s))${suffix}`,
      );
      const warningLines = report.warnings.slice(0, MAX_TRANSFER_WARNINGS).map(formatWarning);
      if (report.warnings.length > MAX_TRANSFER_WARNINGS) {
        warningLines.push(
          `... ${report.warnings.length - MAX_TRANSFER_WARNINGS} additional warning(s) not shown.`,
        );
      }
      setProjectTransferWarnings(warningLines);
    } catch (error) {
      console.warn("Failed importing project archive", error);
      const message = error instanceof Error ? error.message : "Unknown import error.";
      setProjectTransferNotice(`Warning: ${message}`);
      setProjectTransferWarnings([]);
    }
  };

  const pendingDeleteProject =
    pendingDeleteProjectId !== null
      ? (projects.find((project) => project.id === pendingDeleteProjectId) ?? null)
      : null;
  const canConfirmDelete = deleteConfirmText.trim().toLowerCase() === "delete";

  const onRequestDeleteProject = (projectId: string) => {
    setPendingDeleteProjectId(projectId);
    setDeleteConfirmText("");
  };

  const onCancelDeleteProject = () => {
    setPendingDeleteProjectId(null);
    setDeleteConfirmText("");
  };

  const onConfirmDeleteProject = async () => {
    if (!pendingDeleteProject || !canConfirmDelete || !actions) {
      return;
    }

    try {
      await actions.deleteProject(pendingDeleteProject.id);
      setProjectTransferNotice(`Deleted project '${pendingDeleteProject.name}'.`);
    } catch (error) {
      console.warn("Failed deleting project", error);
      const message = error instanceof Error ? error.message : "Unknown delete error.";
      setProjectTransferNotice(`Warning: ${message}`);
    } finally {
      onCancelDeleteProject();
    }
  };

  const onDownloadDatasetJson = (dataset: Dataset) => {
    try {
      const payload = {
        exportedAt: new Date().toISOString(),
        dataset,
      };
      downloadTextFile(
        toDatasetJsonFileName(dataset.name),
        JSON.stringify(payload, null, 2),
        "application/json",
      );
      setProjectTransferNotice(`Downloaded dataset '${dataset.name}' JSON.`);
    } catch (error) {
      console.warn("Failed exporting dataset JSON", error);
      const message = error instanceof Error ? error.message : "Unknown dataset export error.";
      setProjectTransferNotice(`Warning: ${message}`);
    }
  };

  const onStartProjectRename = (projectId: string, currentName: string) => {
    setEditingProjectId(projectId);
    setEditingProjectName(currentName);
  };

  const onCancelProjectRename = () => {
    setEditingProjectId(null);
    setEditingProjectName("");
  };

  const onCommitProjectRename = async (projectId: string) => {
    const project = projects.find((candidate) => candidate.id === projectId);
    const nextNameInput = editingProjectName.trim();
    const nextName = nextNameInput.length > 0 ? nextNameInput : (project?.name ?? "");
    onCancelProjectRename();

    if (!actions || !project || nextName.length === 0 || nextName === project.name) {
      return;
    }

    await actions.renameProject(projectId, nextName);
  };

  const onStartDatasetRename = (datasetId: string, currentName: string) => {
    setEditingDatasetId(datasetId);
    setEditingDatasetName(currentName);
  };

  const onCancelDatasetRename = () => {
    setEditingDatasetId(null);
    setEditingDatasetName("");
  };

  const onCommitDatasetRename = async (datasetId: string) => {
    const dataset = datasets.find((candidate) => candidate.id === datasetId);
    const nextNameInput = editingDatasetName.trim();
    const nextName = nextNameInput.length > 0 ? nextNameInput : (dataset?.name ?? "");
    onCancelDatasetRename();

    if (!actions || !dataset || nextName.length === 0 || nextName === dataset.name) {
      return;
    }

    await actions.renameDataset(datasetId, nextName);
  };

  const onDatasetRenameKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.currentTarget.blur();
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      onCancelDatasetRename();
    }
  };

  const onProjectRenameKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.currentTarget.blur();
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      onCancelProjectRename();
    }
  };

  const onViewChartFromPopover = () => {
    if (!actions || !activeDatasetId) {
      return;
    }
    actions.openChart(activeDatasetId);
    importPopoverOpenTap?.set(false);
  };

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const content = await file.text();
    importSourceTap?.set({
      kind: "file",
      name: file.name,
      content,
    });
  };

  const onLoadFromUrl = async () => {
    const url = urlInputBind.value.trim();
    if (url.length === 0) {
      return;
    }

    try {
      const response = await fetch(url);
      const content = await response.text();
      const nameFromUrl = url.split("/").pop() || "url-source";
      importSourceTap?.set({
        kind: "url",
        name: nameFromUrl,
        content,
      });
    } catch (error) {
      console.error("Failed loading URL source", error);
    }
  };

  return (
    <div className="app-shell">
      <div className="app-frame">
        <header className="panel">
          <h1>
            <a href="https://github.com/owebeeone/jowna" target="_blank" rel="noreferrer">
              Jowna - data visualizer
            </a>
          </h1>
        </header>

        <div className="panel-grid">
          <section className="panel stack">
            <h2>Projects</h2>

            <div className="row">
              <input
                placeholder="New project name"
                value={projectNameBind.value}
                onChange={projectNameBind.onChange}
              />
              <button
                onClick={() => actions?.createProject(projectNameBind.value)}
                disabled={!actions}
              >
                Create
              </button>
            </div>

            <div className="row">
              <button
                className="ghost"
                onClick={() => actions?.refreshProjects()}
                disabled={!actions}
              >
                Refresh
              </button>
              <button className="ghost" onClick={openImportPopover}>
                Import Tool
              </button>
              <button className="ghost" onClick={onUploadProjectClick} disabled={!actions}>
                Upload Project
              </button>
              <ChartIconButton
                onClick={() => actions?.openChart(activeDatasetId)}
                disabled={!actions || !activeDatasetId}
                label="Open active chart"
              />
            </div>
            <input
              ref={projectArchiveInputRef}
              type="file"
              accept=".jowna,.jowna-project,.krona.html,.html,.htm,application/json,text/json,text/html"
              style={{ display: "none" }}
              onChange={onProjectArchiveFileChange}
            />
            <div className="storage-warning">
              Warning: project data is stored in your browser on this computer and may be removed by
              site-data/browser cleanup.
            </div>
            {projectTransferNotice && <div className="muted">{projectTransferNotice}</div>}
            {projectTransferWarnings.length > 0 && (
              <ul className="warning-list">
                {projectTransferWarnings.map((warning, index) => (
                  <li key={`${warning}-${index}`}>{warning}</li>
                ))}
              </ul>
            )}

            <ul className="project-list">
              {projects.map((project) => {
                const isActive = project.id === activeProjectId;
                return (
                  <li
                    key={project.id}
                    className={`project-item${isActive ? " active" : ""}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      void onSelectProject(project.id);
                    }}
                    onKeyDown={(event) => {
                      if (event.target !== event.currentTarget) {
                        return;
                      }
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        void onSelectProject(project.id);
                      }
                    }}
                  >
                    <div>
                      {editingProjectId === project.id ? (
                        <input
                          className="project-name-input"
                          autoFocus
                          value={editingProjectName}
                          onChange={(event) => setEditingProjectName(event.target.value)}
                          onClick={(event) => event.stopPropagation()}
                          onBlur={() => {
                            void onCommitProjectRename(project.id);
                          }}
                          onKeyDown={onProjectRenameKeyDown}
                        />
                      ) : (
                        <button
                          className="project-name-button"
                          onClick={(event) => {
                            event.stopPropagation();
                            onStartProjectRename(project.id, project.name);
                          }}
                        >
                          {project.name}
                        </button>
                      )}
                    </div>
                    <div className="muted">datasets: {project.datasetIds.length}</div>
                    <div className="row">
                      <button
                        className="ghost"
                        onClick={(event) => {
                          event.stopPropagation();
                          void onOpenImportForProject(project.id);
                        }}
                      >
                        Import
                      </button>
                      <button
                        className="ghost"
                        onClick={(event) => {
                          event.stopPropagation();
                          void actions?.copyProject(project.id, `${project.name} Copy`);
                        }}
                      >
                        Copy
                      </button>
                      <button
                        className="ghost"
                        title="Download the Jowna project file."
                        onClick={(event) => {
                          event.stopPropagation();
                          void onDownloadProject(project.id, project.name);
                        }}
                      >
                        Download Jowna
                      </button>
                      <button
                        className="danger"
                        onClick={(event) => {
                          event.stopPropagation();
                          onRequestDeleteProject(project.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>

                    {isActive && (
                      <div
                        className="project-datasets stack"
                        onClick={(event) => event.stopPropagation()}
                        onKeyDown={(event) => event.stopPropagation()}
                      >
                        <h3>Datasets</h3>
                        {datasets.length === 0 && <div className="muted">No datasets yet.</div>}
                        {datasets.map((dataset) => (
                          <div
                            key={dataset.id}
                            className="row"
                            style={{ justifyContent: "space-between" }}
                          >
                            <div className="dataset-name-wrap">
                              {editingDatasetId === dataset.id ? (
                                <input
                                  className="dataset-name-input"
                                  autoFocus
                                  value={editingDatasetName}
                                  onChange={(event) => setEditingDatasetName(event.target.value)}
                                  onBlur={() => {
                                    void onCommitDatasetRename(dataset.id);
                                  }}
                                  onKeyDown={onDatasetRenameKeyDown}
                                />
                              ) : (
                                <button
                                  className="dataset-name-button"
                                  onClick={() => onStartDatasetRename(dataset.id, dataset.name)}
                                >
                                  {dataset.name}
                                </button>
                              )}
                              {dataset.id === activeDatasetId && (
                                <span className="muted">(active)</span>
                              )}
                            </div>
                            <div className="row">
                              <button
                                className="ghost"
                                onClick={() => onDownloadDatasetJson(dataset)}
                              >
                                Download Dataset
                              </button>
                              <ChartIconButton
                                className="ghost"
                                onClick={() => actions?.openChart(dataset.id)}
                                disabled={!actions}
                                label={`Open chart for ${dataset.name}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>

      {importPopoverOpen && (
        <div className="import-popover-backdrop" onClick={closeImportPopover}>
          <section
            className="panel import-popover"
            role="dialog"
            aria-modal="true"
            aria-label="Import Tool"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="import-popover-header">
              <h2>Import Tool</h2>
              <button
                className="ghost popover-x"
                onClick={onCancelImportPopover}
                aria-label="Cancel import dialog"
              >
                X
              </button>
            </header>

            <div className="import-popover-body stack">
              <div className="stack">
                <label>
                  <span className="muted">File Source</span>
                  <input type="file" onChange={onFileChange} />
                </label>
                <div className="row">
                  <input
                    placeholder="https://example.com/data.tsv"
                    value={urlInputBind.value}
                    onChange={urlInputBind.onChange}
                  />
                  <button className="ghost" onClick={onLoadFromUrl}>
                    Load URL
                  </button>
                </div>
                <div className="muted">
                  Source: <strong>{importSource?.name ?? "none"}</strong>
                </div>
              </div>

              <div className="panel stack" style={{ background: "#fafcfb" }}>
                <h3>Parse Parameters</h3>

                <div className="row">
                  <label style={{ flex: 1 }}>
                    <span className="muted">Format</span>
                    <select
                      value={importParameters.format}
                      onChange={(event) =>
                        updateImportParameters({
                          format: event.target.value as typeof importParameters.format,
                        })
                      }
                    >
                      <option value="auto">Auto</option>
                      <option value="tsv">TSV</option>
                      <option value="csv">CSV</option>
                      <option value="json-hierarchy">JSON hierarchy</option>
                      <option value="json-flat">JSON flat rows</option>
                    </select>
                  </label>

                  <label style={{ flex: 1 }}>
                    <span className="muted">Delimiter</span>
                    <input
                      value={importParameters.delimiter}
                      onChange={(event) =>
                        updateImportParameters({ delimiter: event.target.value })
                      }
                    />
                  </label>
                </div>

                <label className="row" style={{ alignItems: "center" }}>
                  <input
                    type="checkbox"
                    style={{ width: "auto" }}
                    checked={importParameters.hasHeaderRow}
                    onChange={(event) =>
                      updateImportParameters({ hasHeaderRow: event.target.checked })
                    }
                  />
                  <span>Header row</span>
                </label>

                <div className="row">
                  <label style={{ flex: 1 }}>
                    <span className="muted">Comment Prefix</span>
                    <input
                      value={importParameters.commentPrefix}
                      onChange={(event) =>
                        updateImportParameters({ commentPrefix: event.target.value })
                      }
                    />
                  </label>
                  <label style={{ flex: 1 }}>
                    <span className="muted">Magnitude Field</span>
                    <input
                      value={importParameters.magnitudeField}
                      onChange={(event) =>
                        updateImportParameters({ magnitudeField: event.target.value })
                      }
                    />
                  </label>
                </div>

                <label>
                  <span className="muted">Path Fields (comma-separated)</span>
                  <input
                    value={importParameters.pathFields.join(",")}
                    onChange={(event) =>
                      updateImportParameters({
                        pathFields: event.target.value
                          .split(",")
                          .map((field) => field.trim())
                          .filter((field) => field.length > 0),
                      })
                    }
                  />
                </label>

                <div className="row">
                  <label style={{ flex: 1 }}>
                    <span className="muted">URL Field</span>
                    <input
                      value={importParameters.urlField ?? ""}
                      onChange={(event) =>
                        updateImportParameters({
                          urlField:
                            event.target.value.trim().length > 0 ? event.target.value : null,
                        })
                      }
                    />
                  </label>
                  <label style={{ flex: 1 }}>
                    <span className="muted">Description Field</span>
                    <input
                      value={importParameters.descriptionField ?? ""}
                      onChange={(event) =>
                        updateImportParameters({
                          descriptionField:
                            event.target.value.trim().length > 0 ? event.target.value : null,
                        })
                      }
                    />
                  </label>
                </div>

                <label>
                  <span className="muted">Attribute Fields (comma-separated)</span>
                  <input
                    value={importParameters.attributeFields.join(",")}
                    onChange={(event) =>
                      updateImportParameters({
                        attributeFields: event.target.value
                          .split(",")
                          .map((field) => field.trim())
                          .filter((field) => field.length > 0),
                      })
                    }
                  />
                </label>

                <div className="row">
                  <button
                    onClick={() => actions?.parsePreview()}
                    disabled={!actions || importLoading}
                  >
                    {importLoading ? "Parsing..." : "Preview Parse"}
                  </button>
                </div>
              </div>

              <div className="panel stack" style={{ background: "#fafcfb" }}>
                <h3>Preview</h3>
                {importFatalError && <div style={{ color: "#b23a2f" }}>{importFatalError}</div>}
                <div className="muted">Rows: {importPreview?.totalRows ?? 0}</div>

                <label>
                  <span className="muted">Filter Preview</span>
                  <input value={previewFilterBind.value} onChange={previewFilterBind.onChange} />
                </label>

                <div className="preview-wrap">
                  <table className="preview-table">
                    <thead>
                      <tr>
                        <th>row</th>
                        <th>magnitude</th>
                        <th>path</th>
                        <th>url</th>
                        <th>description</th>
                        <th>attributes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRows.map((row) => (
                        <tr key={row.rowId}>
                          <td>{row.sourceRow}</td>
                          <td>{row.magnitude}</td>
                          <td>{row.path.join(" / ")}</td>
                          <td>{row.url ?? ""}</td>
                          <td>{row.description ?? ""}</td>
                          <td>
                            {Object.entries(row.attributes)
                              .map(([key, value]) => `${key}:${value}`)
                              .join(" | ")}
                          </td>
                        </tr>
                      ))}
                      {filteredRows.length === 0 && (
                        <tr>
                          <td colSpan={6} className="muted">
                            No preview rows.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div>
                  <h4>Warnings</h4>
                  <ul className="warning-list">
                    {importWarnings.map((warning, index) => (
                      <li key={`${warning.code}-${warning.row ?? 0}-${index}`}>
                        <strong>{warning.code}</strong>: {warning.message}
                        {warning.row ? ` (row ${warning.row})` : ""}
                        {warning.column ? ` [${warning.column}]` : ""}
                      </li>
                    ))}
                    {importWarnings.length === 0 && <li className="muted">No warnings.</li>}
                  </ul>
                </div>

                <div className="row">
                  <input
                    placeholder="Dataset name"
                    value={datasetNameBind.value}
                    onChange={datasetNameBind.onChange}
                  />
                  <button
                    onClick={() => actions?.applyImport(datasetNameBind.value)}
                    disabled={!actions || !importCanApply || !activeProjectId}
                  >
                    Apply Import
                  </button>
                </div>
              </div>
            </div>

            <footer className="import-popover-footer row">
              <button className="ghost" onClick={onCancelImportPopover}>
                Cancel
              </button>
              <button className="ghost" onClick={closeImportPopover}>
                Close
              </button>
              <button onClick={onViewChartFromPopover} disabled={!actions || !activeDatasetId}>
                View Chart
              </button>
            </footer>
          </section>
        </div>
      )}

      {pendingDeleteProject && (
        <div className="delete-confirm-backdrop" onClick={onCancelDeleteProject}>
          <section
            className="panel delete-confirm-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Confirm project deletion"
            onClick={(event) => event.stopPropagation()}
          >
            <h3>Delete Project</h3>
            <div>
              Type <code>delete</code> to delete <strong>{pendingDeleteProject.name}</strong>.
            </div>
            <input
              autoFocus
              value={deleteConfirmText}
              placeholder="delete"
              onChange={(event) => setDeleteConfirmText(event.target.value)}
            />
            <div className="row delete-confirm-actions">
              <button className="ghost" onClick={onCancelDeleteProject}>
                Cancel
              </button>
              <button
                className="danger"
                onClick={onConfirmDeleteProject}
                disabled={!canConfirmDelete}
              >
                Delete
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function toDatasetJsonFileName(datasetName: string): string {
  const normalized = datasetName
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const base = normalized.length > 0 ? normalized : "dataset";
  return `${base}.json`;
}

function formatWarning(warning: ImportWarning): string {
  const row = warning.row ? ` (row ${warning.row})` : "";
  const column = warning.column ? ` [${warning.column}]` : "";
  return `${warning.code}: ${warning.message}${row}${column}`;
}

function downloadTextFile(fileName: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.rel = "noopener";
  anchor.click();

  URL.revokeObjectURL(url);
}

interface ChartIconButtonProps {
  className?: string;
  disabled?: boolean;
  label: string;
  onClick: () => void;
}

function ChartIconButton({ className, disabled, label, onClick }: ChartIconButtonProps) {
  const classes = className ? `chart-icon-button ${className}` : "chart-icon-button";
  return (
    <button className={classes} onClick={onClick} disabled={disabled} aria-label={label}>
      <ChartOutlineIcon />
    </button>
  );
}

function ChartOutlineIcon() {
  return (
    <svg
      className="chart-outline-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12 3v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M17.4 6.7l-3.8 4.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M20.8 13l-6-0.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M7 19.7l2.4-5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
