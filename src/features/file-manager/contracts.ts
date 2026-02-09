import type { Project, ProjectId } from "../../domain";

export interface ProjectListItem {
  id: ProjectId;
  name: string;
  updatedAt: string;
  datasetCount: number;
}

export interface FileManagerState {
  projects: ProjectListItem[];
  activeProjectId: ProjectId | null;
  isLoading: boolean;
  warningMessage: string | null;
}

export interface FileManagerActions {
  refreshProjects(): Promise<void>;
  createProject(name: string): Promise<Project>;
  copyProject(projectId: ProjectId, nextName: string): Promise<Project>;
  deleteProject(projectId: ProjectId): Promise<void>;
  setActiveProject(projectId: ProjectId): Promise<void>;
}

export interface FileManagerController {
  readonly state: FileManagerState;
  readonly actions: FileManagerActions;
}

export interface FileManagerViewProps {
  controller: FileManagerController;
}
