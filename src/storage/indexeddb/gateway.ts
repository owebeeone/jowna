import type { Dataset, DatasetId, PersistedSettings, Project, ProjectId } from "../../domain";
import type {
  DatasetRepository,
  IndexedDbStorageGateway,
  ProjectRepository,
  RecentProjectRepository,
  SettingsRepository,
} from "./contracts";

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface IndexedDbGatewayOptions {
  dbName?: string;
  dbVersion?: number;
  indexedDbFactory?: IDBFactory;
  localStorageLike?: StorageLike;
  now?: () => string;
  createId?: (prefix: "project" | "dataset") => string;
}

const DEFAULT_DB_NAME = "jowna";
const DEFAULT_DB_VERSION = 1;
const PROJECT_STORE = "projects";
const DATASET_STORE = "datasets";
const SETTINGS_KEY = "jowna/settings";
const RECENT_KEY = "jowna/recent";

export function createIndexedDbStorageGateway(
  options: IndexedDbGatewayOptions = {},
): IndexedDbStorageGateway {
  const indexedDb = resolveIndexedDb(options.indexedDbFactory);
  if (!indexedDb) {
    return createInMemoryStorageGateway(options);
  }

  const localStorageLike = resolveLocalStorage(options.localStorageLike);
  const now = options.now ?? (() => new Date().toISOString());
  const createId = options.createId ?? defaultIdFactory;
  const dbPromise = openDatabase(
    indexedDb,
    options.dbName ?? DEFAULT_DB_NAME,
    options.dbVersion ?? DEFAULT_DB_VERSION,
  );

  const projects: ProjectRepository = {
    async listProjects() {
      const db = await dbPromise;
      const tx = db.transaction(PROJECT_STORE, "readonly");
      const store = tx.objectStore(PROJECT_STORE);
      const result = (await requestToPromise(store.getAll())) as Project[];
      await transactionDone(tx);
      return result;
    },

    async getProject(projectId: ProjectId) {
      const db = await dbPromise;
      const tx = db.transaction(PROJECT_STORE, "readonly");
      const store = tx.objectStore(PROJECT_STORE);
      const project = (await requestToPromise(store.get(projectId))) as Project | undefined;
      await transactionDone(tx);
      return project;
    },

    async saveProject(project: Project) {
      const db = await dbPromise;
      const tx = db.transaction(PROJECT_STORE, "readwrite");
      tx.objectStore(PROJECT_STORE).put(project);
      await transactionDone(tx);
    },

    async deleteProject(projectId: ProjectId) {
      const db = await dbPromise;
      const tx = db.transaction([PROJECT_STORE, DATASET_STORE], "readwrite");
      tx.objectStore(PROJECT_STORE).delete(projectId);

      const datasetStore = tx.objectStore(DATASET_STORE);
      const datasets = (await requestToPromise(datasetStore.getAll())) as Dataset[];
      datasets
        .filter((dataset) => dataset.projectId === projectId)
        .forEach((dataset) => {
          datasetStore.delete(dataset.id);
        });

      await transactionDone(tx);
    },

    async copyProject(projectId: ProjectId, nextName: string) {
      const sourceProject = await projects.getProject(projectId);
      if (!sourceProject) {
        throw new Error(`Project '${projectId}' does not exist.`);
      }

      const sourceDatasets = await datasets.listByProject(projectId);
      const projectIdCopy = createId("project");
      const timestamp = now();
      const datasetIdMap = new Map<DatasetId, DatasetId>();

      sourceProject.datasetIds.forEach((datasetId) => {
        datasetIdMap.set(datasetId, createId("dataset"));
      });
      sourceDatasets.forEach((dataset) => {
        if (!datasetIdMap.has(dataset.id)) {
          datasetIdMap.set(dataset.id, createId("dataset"));
        }
      });

      const copiedDatasets = sourceDatasets.map((dataset) => ({
        ...dataset,
        id: datasetIdMap.get(dataset.id)!,
        projectId: projectIdCopy,
        createdAt: timestamp,
        updatedAt: timestamp,
      }));

      for (const dataset of copiedDatasets) {
        await datasets.saveDataset(dataset);
      }

      const copiedProject: Project = {
        ...sourceProject,
        id: projectIdCopy,
        name: nextName,
        createdAt: timestamp,
        updatedAt: timestamp,
        datasetIds: sourceProject.datasetIds.map((datasetId) => datasetIdMap.get(datasetId)!),
        activeDatasetId: sourceProject.activeDatasetId
          ? (datasetIdMap.get(sourceProject.activeDatasetId) ?? null)
          : null,
      };
      await projects.saveProject(copiedProject);
      return copiedProject;
    },
  };

  const datasets: DatasetRepository = {
    async listByProject(projectId: ProjectId) {
      const db = await dbPromise;
      const tx = db.transaction(DATASET_STORE, "readonly");
      const store = tx.objectStore(DATASET_STORE);
      const result = (await requestToPromise(store.getAll())) as Dataset[];
      await transactionDone(tx);
      return result.filter((dataset) => dataset.projectId === projectId);
    },

    async getDataset(datasetId: DatasetId) {
      const db = await dbPromise;
      const tx = db.transaction(DATASET_STORE, "readonly");
      const store = tx.objectStore(DATASET_STORE);
      const dataset = (await requestToPromise(store.get(datasetId))) as Dataset | undefined;
      await transactionDone(tx);
      return dataset;
    },

    async saveDataset(dataset: Dataset) {
      const db = await dbPromise;
      const tx = db.transaction(DATASET_STORE, "readwrite");
      tx.objectStore(DATASET_STORE).put(dataset);
      await transactionDone(tx);
    },

    async deleteDataset(datasetId: DatasetId) {
      const db = await dbPromise;
      const tx = db.transaction(DATASET_STORE, "readwrite");
      tx.objectStore(DATASET_STORE).delete(datasetId);
      await transactionDone(tx);
    },
  };

  const settings: SettingsRepository = {
    async loadSettings() {
      const raw = localStorageLike.getItem(SETTINGS_KEY);
      if (!raw) {
        return undefined;
      }
      try {
        return JSON.parse(raw) as PersistedSettings;
      } catch {
        return undefined;
      }
    },

    async saveSettings(nextSettings: PersistedSettings) {
      localStorageLike.setItem(SETTINGS_KEY, JSON.stringify(nextSettings));
    },
  };

  const recentProjects: RecentProjectRepository = {
    async listRecentProjectIds() {
      const raw = localStorageLike.getItem(RECENT_KEY);
      if (!raw) {
        return [];
      }
      try {
        return JSON.parse(raw) as ProjectId[];
      } catch {
        return [];
      }
    },

    async saveRecentProjectIds(projectIds: ProjectId[]) {
      localStorageLike.setItem(RECENT_KEY, JSON.stringify(projectIds));
    },
  };

  return {
    projects,
    datasets,
    settings,
    recentProjects,
  };
}

function createInMemoryStorageGateway(options: IndexedDbGatewayOptions): IndexedDbStorageGateway {
  const projectMap = new Map<ProjectId, Project>();
  const datasetMap = new Map<DatasetId, Dataset>();
  const localStorageLike = resolveLocalStorage(options.localStorageLike);
  const now = options.now ?? (() => new Date().toISOString());
  const createId = options.createId ?? defaultIdFactory;

  const projects: ProjectRepository = {
    async listProjects() {
      return [...projectMap.values()];
    },

    async getProject(projectId: ProjectId) {
      return projectMap.get(projectId);
    },

    async saveProject(project: Project) {
      projectMap.set(project.id, project);
    },

    async deleteProject(projectId: ProjectId) {
      projectMap.delete(projectId);
      [...datasetMap.values()]
        .filter((dataset) => dataset.projectId === projectId)
        .forEach((dataset) => datasetMap.delete(dataset.id));
    },

    async copyProject(projectId: ProjectId, nextName: string) {
      const sourceProject = projectMap.get(projectId);
      if (!sourceProject) {
        throw new Error(`Project '${projectId}' does not exist.`);
      }

      const sourceDatasets = [...datasetMap.values()].filter(
        (dataset) => dataset.projectId === projectId,
      );
      const projectIdCopy = createId("project");
      const timestamp = now();
      const datasetIdMap = new Map<DatasetId, DatasetId>();

      sourceProject.datasetIds.forEach((datasetId) => {
        datasetIdMap.set(datasetId, createId("dataset"));
      });
      sourceDatasets.forEach((dataset) => {
        if (!datasetIdMap.has(dataset.id)) {
          datasetIdMap.set(dataset.id, createId("dataset"));
        }
      });

      sourceDatasets.forEach((dataset) => {
        datasetMap.set(datasetIdMap.get(dataset.id)!, {
          ...dataset,
          id: datasetIdMap.get(dataset.id)!,
          projectId: projectIdCopy,
          createdAt: timestamp,
          updatedAt: timestamp,
        });
      });

      const copiedProject: Project = {
        ...sourceProject,
        id: projectIdCopy,
        name: nextName,
        createdAt: timestamp,
        updatedAt: timestamp,
        datasetIds: sourceProject.datasetIds.map((datasetId) => datasetIdMap.get(datasetId)!),
        activeDatasetId: sourceProject.activeDatasetId
          ? (datasetIdMap.get(sourceProject.activeDatasetId) ?? null)
          : null,
      };

      projectMap.set(copiedProject.id, copiedProject);
      return copiedProject;
    },
  };

  const datasets: DatasetRepository = {
    async listByProject(projectId: ProjectId) {
      return [...datasetMap.values()].filter((dataset) => dataset.projectId === projectId);
    },

    async getDataset(datasetId: DatasetId) {
      return datasetMap.get(datasetId);
    },

    async saveDataset(dataset: Dataset) {
      datasetMap.set(dataset.id, dataset);
    },

    async deleteDataset(datasetId: DatasetId) {
      datasetMap.delete(datasetId);
    },
  };

  const settings: SettingsRepository = {
    async loadSettings() {
      const raw = localStorageLike.getItem(SETTINGS_KEY);
      if (!raw) {
        return undefined;
      }
      try {
        return JSON.parse(raw) as PersistedSettings;
      } catch {
        return undefined;
      }
    },
    async saveSettings(nextSettings) {
      localStorageLike.setItem(SETTINGS_KEY, JSON.stringify(nextSettings));
    },
  };

  const recentProjects: RecentProjectRepository = {
    async listRecentProjectIds() {
      const raw = localStorageLike.getItem(RECENT_KEY);
      if (!raw) {
        return [];
      }
      try {
        return JSON.parse(raw) as ProjectId[];
      } catch {
        return [];
      }
    },
    async saveRecentProjectIds(projectIds) {
      localStorageLike.setItem(RECENT_KEY, JSON.stringify(projectIds));
    },
  };

  return {
    projects,
    datasets,
    settings,
    recentProjects,
  };
}

function resolveIndexedDb(explicit?: IDBFactory): IDBFactory | undefined {
  if (explicit) {
    return explicit;
  }
  if (typeof indexedDB !== "undefined") {
    return indexedDB;
  }
  return undefined;
}

function resolveLocalStorage(explicit?: StorageLike): StorageLike {
  if (explicit) {
    return explicit;
  }
  if (typeof localStorage !== "undefined") {
    return localStorage;
  }
  return createMemoryStorage();
}

function createMemoryStorage(): StorageLike {
  const values = new Map<string, string>();
  return {
    getItem(key: string) {
      return values.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      values.set(key, value);
    },
  };
}

function defaultIdFactory(prefix: "project" | "dataset"): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function openDatabase(
  indexedDb: IDBFactory,
  dbName: string,
  dbVersion: number,
): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDb.open(dbName, dbVersion);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(PROJECT_STORE)) {
        db.createObjectStore(PROJECT_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(DATASET_STORE)) {
        db.createObjectStore(DATASET_STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function transactionDone(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}
