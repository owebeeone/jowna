import type { Dataset, Project } from "../../domain";

export const PROJECT_ARCHIVE_FORMAT = "jowna.project";
export const PROJECT_ARCHIVE_VERSION = 1;
export const PROJECT_ARCHIVE_SCHEMA_VERSION = "1.0.0";
export const PROJECT_ARCHIVE_EXTENSION = ".jowna";
export const PROJECT_ARCHIVE_MIME_TYPE = "application/x-jowna+json";

export interface ProjectArchiveV1 {
  format: typeof PROJECT_ARCHIVE_FORMAT;
  version: typeof PROJECT_ARCHIVE_VERSION;
  schemaVersion: typeof PROJECT_ARCHIVE_SCHEMA_VERSION;
  exportedAt: string;
  project: Project;
  datasets: Dataset[];
}

export interface MaterializeImportedProjectInput {
  archive: ProjectArchiveV1;
  nowIso: string;
  createId: (prefix: "project" | "dataset") => string;
  nextName?: string;
}

export interface MaterializedImportedProject {
  project: Project;
  datasets: Dataset[];
}

export interface CreateProjectArchiveInput {
  project: Project;
  datasets: Dataset[];
  exportedAt: string;
}

export function createProjectArchive(input: CreateProjectArchiveInput): ProjectArchiveV1 {
  return {
    format: PROJECT_ARCHIVE_FORMAT,
    version: PROJECT_ARCHIVE_VERSION,
    schemaVersion: PROJECT_ARCHIVE_SCHEMA_VERSION,
    exportedAt: input.exportedAt,
    project: input.project,
    datasets: input.datasets,
  };
}

export function serializeProjectArchive(archive: ProjectArchiveV1): string {
  return JSON.stringify(archive, null, 2);
}

export function parseProjectArchive(raw: string): ProjectArchiveV1 {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Invalid project archive file.");
  }

  if (!isProjectArchiveV1(parsed)) {
    throw new Error("Invalid project archive file.");
  }

  const version = parsed.version;
  if (version !== PROJECT_ARCHIVE_VERSION) {
    throw new Error(`Unsupported project archive version '${version}'.`);
  }

  // Backward compatibility for older .jowna files that predate schemaVersion.
  return {
    ...parsed,
    schemaVersion:
      parsed.schemaVersion && typeof parsed.schemaVersion === "string"
        ? parsed.schemaVersion
        : PROJECT_ARCHIVE_SCHEMA_VERSION,
  };
}

export function materializeImportedProject(
  input: MaterializeImportedProjectInput,
): MaterializedImportedProject {
  const projectId = input.createId("project");
  const datasetIdMap = new Map<string, string>();
  const sourceDatasetsById = new Map(
    input.archive.datasets.map((dataset) => [dataset.id, dataset]),
  );

  input.archive.project.datasetIds.forEach((datasetId) => {
    if (!datasetIdMap.has(datasetId)) {
      datasetIdMap.set(datasetId, input.createId("dataset"));
    }
  });
  input.archive.datasets.forEach((dataset) => {
    if (!datasetIdMap.has(dataset.id)) {
      datasetIdMap.set(dataset.id, input.createId("dataset"));
    }
  });

  const orderedSourceDatasetIds = uniqueStrings([
    ...input.archive.project.datasetIds,
    ...input.archive.datasets.map((dataset) => dataset.id),
  ]).filter((datasetId) => sourceDatasetsById.has(datasetId));

  const datasets = orderedSourceDatasetIds.map((sourceId) => {
    const source = sourceDatasetsById.get(sourceId)!;
    return {
      ...source,
      id: datasetIdMap.get(sourceId)!,
      projectId,
      createdAt: input.nowIso,
      updatedAt: input.nowIso,
    };
  });

  const normalizedName = normalizeName(
    input.nextName ?? input.archive.project.name,
    "Imported Project",
  );
  const datasetIds = datasets.map((dataset) => dataset.id);
  const mappedActiveDatasetId = input.archive.project.activeDatasetId
    ? (datasetIdMap.get(input.archive.project.activeDatasetId) ?? null)
    : null;
  const activeDatasetId =
    mappedActiveDatasetId && datasetIds.includes(mappedActiveDatasetId)
      ? mappedActiveDatasetId
      : (datasetIds[0] ?? null);

  const project: Project = {
    ...input.archive.project,
    id: projectId,
    name: normalizedName,
    createdAt: input.nowIso,
    updatedAt: input.nowIso,
    datasetIds,
    activeDatasetId,
  };

  return {
    project,
    datasets,
  };
}

export function toProjectArchiveFileName(projectName: string): string {
  const normalized = projectName
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const base = normalized.length > 0 ? normalized : "project";
  return `${base}${PROJECT_ARCHIVE_EXTENSION}`;
}

function normalizeName(value: string, fallback: string): string {
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : fallback;
}

function uniqueStrings(values: string[]): string[] {
  return [...new Set(values)];
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isProjectArchiveV1(value: unknown): value is ProjectArchiveV1 {
  if (!isObject(value)) {
    return false;
  }
  if (value.format !== PROJECT_ARCHIVE_FORMAT) {
    return false;
  }
  if (typeof value.version !== "number" || !Number.isInteger(value.version)) {
    return false;
  }
  if (typeof value.exportedAt !== "string") {
    return false;
  }
  if (!isProject(value.project)) {
    return false;
  }
  if (!Array.isArray(value.datasets)) {
    return false;
  }
  return value.datasets.every((dataset) => isDataset(dataset));
}

function isProject(value: unknown): value is Project {
  if (!isObject(value)) {
    return false;
  }
  if (typeof value.id !== "string" || typeof value.name !== "string") {
    return false;
  }
  if (typeof value.createdAt !== "string" || typeof value.updatedAt !== "string") {
    return false;
  }
  if (!Array.isArray(value.datasetIds) || !value.datasetIds.every((id) => typeof id === "string")) {
    return false;
  }
  if (value.activeDatasetId !== null && typeof value.activeDatasetId !== "string") {
    return false;
  }
  return true;
}

function isDataset(value: unknown): value is Dataset {
  if (!isObject(value)) {
    return false;
  }
  if (
    typeof value.id !== "string" ||
    typeof value.projectId !== "string" ||
    typeof value.name !== "string"
  ) {
    return false;
  }
  if (typeof value.createdAt !== "string" || typeof value.updatedAt !== "string") {
    return false;
  }
  if (!isObject(value.tree)) {
    return false;
  }
  if (typeof value.tree.name !== "string" || typeof value.tree.magnitude !== "number") {
    return false;
  }
  return true;
}
