import type {
  Dataset,
  DatasetId,
  PersistedSettings,
  Project,
  ProjectId,
} from "../../domain";

export interface ProjectRepository {
  listProjects(): Promise<Project[]>;
  getProject(projectId: ProjectId): Promise<Project | undefined>;
  saveProject(project: Project): Promise<void>;
  deleteProject(projectId: ProjectId): Promise<void>;
  copyProject(projectId: ProjectId, nextName: string): Promise<Project>;
}

export interface DatasetRepository {
  listByProject(projectId: ProjectId): Promise<Dataset[]>;
  getDataset(datasetId: DatasetId): Promise<Dataset | undefined>;
  saveDataset(dataset: Dataset): Promise<void>;
  deleteDataset(datasetId: DatasetId): Promise<void>;
}

export interface SettingsRepository {
  loadSettings(): Promise<PersistedSettings | undefined>;
  saveSettings(settings: PersistedSettings): Promise<void>;
}

export interface RecentProjectRepository {
  listRecentProjectIds(): Promise<ProjectId[]>;
  saveRecentProjectIds(projectIds: ProjectId[]): Promise<void>;
}

export interface IndexedDbStorageGateway {
  projects: ProjectRepository;
  datasets: DatasetRepository;
  settings: SettingsRepository;
  recentProjects: RecentProjectRepository;
}

