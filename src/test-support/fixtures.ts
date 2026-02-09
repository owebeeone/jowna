import type {
  Dataset,
  ImportParameters,
  ImportSource,
  ImportWarning,
  NormalizedRow,
  Project,
  TreeNode,
} from "../domain";

export function makeWarning(overrides: Partial<ImportWarning> = {}): ImportWarning {
  return {
    code: "ROW_SKIPPED",
    message: "Row skipped due to invalid magnitude",
    severity: "warning",
    row: 2,
    column: "magnitude",
    ...overrides,
  };
}

export function makeNormalizedRow(overrides: Partial<NormalizedRow> = {}): NormalizedRow {
  return {
    rowId: "row-1",
    sourceRow: 2,
    magnitude: 10,
    path: ["Animals", "Mammals"],
    url: null,
    description: null,
    attributes: {},
    ...overrides,
  };
}

export function makeTree(overrides: Partial<TreeNode> = {}): TreeNode {
  return {
    name: "Root",
    magnitude: 10,
    children: [{ name: "Animals", magnitude: 10 }],
    ...overrides,
  };
}

export function makeProject(overrides: Partial<Project> = {}): Project {
  return {
    id: "project-1",
    name: "Population Project",
    createdAt: "2026-02-09T00:00:00.000Z",
    updatedAt: "2026-02-09T00:00:00.000Z",
    datasetIds: ["dataset-1"],
    activeDatasetId: "dataset-1",
    ...overrides,
  };
}

export function makeDataset(overrides: Partial<Dataset> = {}): Dataset {
  return {
    id: "dataset-1",
    projectId: "project-1",
    name: "Population Dataset",
    createdAt: "2026-02-09T00:00:00.000Z",
    updatedAt: "2026-02-09T00:00:00.000Z",
    tree: makeTree(),
    sourceFileName: "population.tsv",
    sourceFormat: "tsv",
    flatTable: [makeNormalizedRow()],
    importWarnings: [],
    ...overrides,
  };
}

export function makeImportParameters(overrides: Partial<ImportParameters> = {}): ImportParameters {
  return {
    format: "csv",
    delimiter: ",",
    hasHeaderRow: true,
    commentPrefix: "#",
    magnitudeField: "magnitude",
    pathFields: ["level1", "level2"],
    urlField: "url",
    descriptionField: "description",
    attributeFields: ["source"],
    ...overrides,
  };
}

export function makeImportSource(overrides: Partial<ImportSource> = {}): ImportSource {
  return {
    kind: "file",
    name: "sample.csv",
    content: "magnitude,level1,level2\n10,Animals,Mammals",
    ...overrides,
  };
}
