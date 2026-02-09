import { describe, expect, it } from "vitest";
import type { Dataset, PersistedSettings, Project } from "../../domain";
import { makeDataset, makeProject } from "../../test-support/fixtures";
import type {
  DatasetRepository,
  IndexedDbStorageGateway,
  ProjectRepository,
  RecentProjectRepository,
  SettingsRepository,
} from "./contracts";

class InMemoryProjectRepository implements ProjectRepository {
  constructor(
    private readonly projects: Map<string, Project>,
    private readonly datasets: Map<string, Dataset>,
  ) {}

  async listProjects(): Promise<Project[]> {
    return [...this.projects.values()];
  }

  async getProject(projectId: string): Promise<Project | undefined> {
    return this.projects.get(projectId);
  }

  async saveProject(project: Project): Promise<void> {
    this.projects.set(project.id, project);
  }

  async deleteProject(projectId: string): Promise<void> {
    this.projects.delete(projectId);
  }

  async copyProject(projectId: string, nextName: string): Promise<Project> {
    const source = this.projects.get(projectId);
    if (!source) {
      throw new Error("Project not found");
    }

    const copiedProject: Project = {
      ...source,
      id: `${source.id}-copy`,
      name: nextName,
      datasetIds: source.datasetIds.map((datasetId) => `${datasetId}-copy`),
      activeDatasetId: source.activeDatasetId ? `${source.activeDatasetId}-copy` : null,
      updatedAt: "2026-02-09T01:00:00.000Z",
    };

    source.datasetIds.forEach((datasetId, index) => {
      const sourceDataset = this.datasets.get(datasetId);
      if (!sourceDataset) {
        return;
      }
      const copiedDatasetId = copiedProject.datasetIds[index]!;
      this.datasets.set(copiedDatasetId, {
        ...sourceDataset,
        id: copiedDatasetId,
        projectId: copiedProject.id,
      });
    });

    this.projects.set(copiedProject.id, copiedProject);
    return copiedProject;
  }
}

class InMemoryDatasetRepository implements DatasetRepository {
  constructor(private readonly datasets: Map<string, Dataset>) {}

  async listByProject(projectId: string): Promise<Dataset[]> {
    return [...this.datasets.values()].filter((dataset) => dataset.projectId === projectId);
  }

  async getDataset(datasetId: string): Promise<Dataset | undefined> {
    return this.datasets.get(datasetId);
  }

  async saveDataset(dataset: Dataset): Promise<void> {
    this.datasets.set(dataset.id, dataset);
  }

  async deleteDataset(datasetId: string): Promise<void> {
    this.datasets.delete(datasetId);
  }
}

class QuotaFailingDatasetRepository implements DatasetRepository {
  async listByProject(): Promise<Dataset[]> {
    return [];
  }

  async getDataset(): Promise<Dataset | undefined> {
    return undefined;
  }

  async saveDataset(): Promise<void> {
    throw new Error("QuotaExceededError");
  }

  async deleteDataset(): Promise<void> {
    return undefined;
  }
}

class InMemorySettingsRepository implements SettingsRepository {
  private settings: PersistedSettings | undefined;

  async loadSettings(): Promise<PersistedSettings | undefined> {
    return this.settings;
  }

  async saveSettings(settings: PersistedSettings): Promise<void> {
    this.settings = settings;
  }
}

class InMemoryRecentProjectRepository implements RecentProjectRepository {
  private recent: string[] = [];

  async listRecentProjectIds(): Promise<string[]> {
    return this.recent;
  }

  async saveRecentProjectIds(projectIds: string[]): Promise<void> {
    this.recent = projectIds;
  }
}

function createGateway(): IndexedDbStorageGateway {
  const datasetMap = new Map<string, Dataset>();
  const projectMap = new Map<string, Project>();
  return {
    projects: new InMemoryProjectRepository(projectMap, datasetMap),
    datasets: new InMemoryDatasetRepository(datasetMap),
    settings: new InMemorySettingsRepository(),
    recentProjects: new InMemoryRecentProjectRepository(),
  };
}

describe("indexeddb storage contracts", () => {
  it("supports project save/load and dataset listing by project", async () => {
    const gateway = createGateway();
    const project = makeProject();
    const dataset = makeDataset();

    await gateway.projects.saveProject(project);
    await gateway.datasets.saveDataset(dataset);

    const loadedProject = await gateway.projects.getProject(project.id);
    const projectDatasets = await gateway.datasets.listByProject(project.id);

    expect(loadedProject?.name).toBe(project.name);
    expect(projectDatasets.map((value) => value.id)).toEqual([dataset.id]);
  });

  it("supports project copy use case without version history", async () => {
    const gateway = createGateway();
    const project = makeProject();
    const dataset = makeDataset();
    await gateway.projects.saveProject(project);
    await gateway.datasets.saveDataset(dataset);

    const copied = await gateway.projects.copyProject(project.id, `${project.name} Copy`);
    const copiedDatasets = await gateway.datasets.listByProject(copied.id);

    expect(copied.id).toBe("project-1-copy");
    expect(copiedDatasets).toHaveLength(1);
    expect(copiedDatasets[0]?.projectId).toBe(copied.id);
  });

  it("supports recent-project ordering and settings persistence", async () => {
    const gateway = createGateway();
    await gateway.recentProjects.saveRecentProjectIds(["project-3", "project-1", "project-2"]);

    await gateway.settings.saveSettings({
      app: {
        autoSaveLastProject: true,
        defaultFormat: "csv",
        savedProjectSort: "updated-desc",
      },
      chart: {
        background: "transparent",
        borderWidth: 1,
        borderColor: "#111111",
        wedgeStrokeWidth: 1,
        wedgeStrokeColor: "#333333",
        fontFamily: "IBM Plex Sans",
        fontSizePx: 12,
        width: "fit",
        height: "fit",
        colorScheme: "level-default",
      },
    });

    const recent = await gateway.recentProjects.listRecentProjectIds();
    const settings = await gateway.settings.loadSettings();

    expect(recent).toEqual(["project-3", "project-1", "project-2"]);
    expect(settings?.app.autoSaveLastProject).toBe(true);
  });

  it("allows callers to surface quota-like errors", async () => {
    const quotaFailingRepo: DatasetRepository = new QuotaFailingDatasetRepository();

    const warningMessage = await saveDatasetWithWarning(quotaFailingRepo, makeDataset());
    expect(warningMessage).toContain("QuotaExceededError");
  });
});

async function saveDatasetWithWarning(repo: DatasetRepository, dataset: Dataset): Promise<string> {
  try {
    await repo.saveDataset(dataset);
    return "ok";
  } catch (error) {
    return `warning:${String((error as Error).message)}`;
  }
}
