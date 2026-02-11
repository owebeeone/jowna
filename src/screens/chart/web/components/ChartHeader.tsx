import { useChartScreenContext } from "../context";

export function ChartHeader() {
  const model = useChartScreenContext();

  return (
    <header className="panel row chart-header">
      <div>
        <h1 style={{ marginBottom: 0 }}>Chart View</h1>
      </div>
      <div className="row chart-header-actions">
        {model.datasetSelector.showSelector && (
          <select
            className="chart-dataset-select"
            value={model.datasetSelector.selectedId ?? ""}
            onChange={(event) => model.onSelectDataset(event.target.value)}
          >
            {model.datasetSelector.options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        )}
        <button className="ghost" onClick={model.openSettingsPopover}>
          Chart Settings
        </button>
        {!model.isStaticMode && (
          <button className="ghost" onClick={model.onDownloadHtml} disabled={!model.dataset}>
            Download HTML
          </button>
        )}
        <button
          className="ghost"
          onClick={model.onDownloadDatasetsZip}
          disabled={!model.activeProject || model.datasets.length === 0}
        >
          Download Zip
        </button>
        <button
          className="ghost"
          onClick={model.onDownloadSvg}
          disabled={!model.dataset || !model.chartLayout}
        >
          Download SVG
        </button>
        <button className="ghost" onClick={model.openHelpPopover}>
          Help
        </button>
        {!model.isStaticMode && (
          <button className="ghost" onClick={() => model.actions?.backToSelection()}>
            Back to Selection
          </button>
        )}
      </div>
    </header>
  );
}
