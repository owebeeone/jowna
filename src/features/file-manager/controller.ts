import type { Project, ProjectId } from "../../domain";
import type { ProjectRepository } from "../../storage/indexeddb";
import type {
  FileManagerActions,
  FileManagerController,
  FileManagerState,
  ProjectListItem,
} from "./contracts";

export interface FileManagerControllerOptions {
  projectRepository: ProjectRepository;
  now?: () => string;
  createProjectId?: () => ProjectId;
}

export function createFileManagerController(
  options: FileManagerControllerOptions,
): FileManagerController {
  const now = options.now ?? (() => new Date().toISOString());
  const createProjectId = options.createProjectId ?? (() => defaultProjectId());
  const state: FileManagerState = {
    projects: [],
    activeProjectId: null,
    isLoading: false,
    warningMessage: null,
  };

  const actions: FileManagerActions = {
    async refreshProjects() {
      state.isLoading = true;
      try {
        const projects = await options.projectRepository.listProjects();
        state.projects = projects
          .map((project) => toListItem(project))
          .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
        if (
          state.activeProjectId &&
          !state.projects.some((project) => project.id === state.activeProjectId)
        ) {
          state.activeProjectId = state.projects[0]?.id ?? null;
        }
      } finally {
        state.isLoading = false;
      }
    },

    async createProject(name) {
      const timestamp = now();
      const project: Project = {
        id: createProjectId(),
        name,
        createdAt: timestamp,
        updatedAt: timestamp,
        datasetIds: [],
        activeDatasetId: null,
      };
      await options.projectRepository.saveProject(project);
      await actions.refreshProjects();
      state.activeProjectId = project.id;
      return project;
    },

    async copyProject(projectId, nextName) {
      const copied = await options.projectRepository.copyProject(projectId, nextName);
      await actions.refreshProjects();
      state.activeProjectId = copied.id;
      return copied;
    },

    async deleteProject(projectId) {
      await options.projectRepository.deleteProject(projectId);
      await actions.refreshProjects();
    },

    async setActiveProject(projectId) {
      const exists = state.projects.some((project) => project.id === projectId);
      if (!exists) {
        state.warningMessage = `Cannot activate missing project '${projectId}'.`;
        return;
      }
      state.activeProjectId = projectId;
      state.warningMessage = null;
    },
  };

  return {
    state,
    actions,
  };
}

function toListItem(project: Project): ProjectListItem {
  return {
    id: project.id,
    name: project.name,
    updatedAt: project.updatedAt,
    datasetCount: project.datasetIds.length,
  };
}

function defaultProjectId(): ProjectId {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `project-${crypto.randomUUID()}`;
  }
  return `project-${Math.random().toString(36).slice(2, 10)}`;
}
