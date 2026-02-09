import { describe, expect, it } from "vitest";
import type { Project } from "../../domain";
import { makeProject } from "../../test-support/fixtures";
import type {
  FileManagerActions,
  FileManagerController,
  FileManagerState,
  ProjectListItem,
} from "./contracts";

function toProjectListItem(project: Project): ProjectListItem {
  return {
    id: project.id,
    name: project.name,
    updatedAt: project.updatedAt,
    datasetCount: project.datasetIds.length,
  };
}

function createFileManagerHarness(seedProjects: Project[]): FileManagerController {
  const projects = [...seedProjects];
  const state: FileManagerState = {
    projects: projects.map(toProjectListItem),
    activeProjectId: projects[0]?.id ?? null,
    isLoading: false,
    warningMessage: null,
  };

  const actions: FileManagerActions = {
    async refreshProjects() {
      state.projects = projects.map(toProjectListItem);
    },
    async createProject(name) {
      const created = makeProject({
        id: `project-${projects.length + 1}`,
        name,
        datasetIds: [],
        activeDatasetId: null,
      });
      projects.push(created);
      state.projects = projects.map(toProjectListItem);
      return created;
    },
    async copyProject(projectId, nextName) {
      const source = projects.find((project) => project.id === projectId);
      if (!source) {
        throw new Error("Project not found");
      }
      const copied = {
        ...source,
        id: `${source.id}-copy`,
        name: nextName,
      };
      projects.push(copied);
      state.projects = projects.map(toProjectListItem);
      return copied;
    },
    async deleteProject(projectId) {
      const nextProjects = projects.filter((project) => project.id !== projectId);
      if (nextProjects.length === projects.length) {
        state.warningMessage = `Project '${projectId}' not found`;
        return;
      }
      projects.splice(0, projects.length, ...nextProjects);
      state.projects = projects.map(toProjectListItem);
      if (state.activeProjectId === projectId) {
        state.activeProjectId = projects[0]?.id ?? null;
      }
    },
    async setActiveProject(projectId) {
      const exists = projects.some((project) => project.id === projectId);
      if (!exists) {
        state.warningMessage = `Cannot activate missing project '${projectId}'`;
        return;
      }
      state.activeProjectId = projectId;
      state.warningMessage = null;
    },
  };

  return { state, actions };
}

describe("file-manager contracts", () => {
  it("supports create/copy/delete workflows for project selection", async () => {
    const controller = createFileManagerHarness([makeProject()]);

    const created = await controller.actions.createProject("New Project");
    const copied = await controller.actions.copyProject(created.id, "New Project Copy");
    await controller.actions.deleteProject(created.id);

    expect(controller.state.projects.map((project) => project.name)).toContain("New Project Copy");
    expect(controller.state.projects.map((project) => project.id)).not.toContain(created.id);
    expect(copied.id).toBe(`${created.id}-copy`);
  });

  it("tracks active project state and warning paths", async () => {
    const controller = createFileManagerHarness([
      makeProject({ id: "project-a", name: "A" }),
      makeProject({ id: "project-b", name: "B" }),
    ]);

    await controller.actions.setActiveProject("project-b");
    expect(controller.state.activeProjectId).toBe("project-b");
    expect(controller.state.warningMessage).toBeNull();

    await controller.actions.setActiveProject("project-missing");
    expect(controller.state.activeProjectId).toBe("project-b");
    expect(controller.state.warningMessage).toContain("project-missing");
  });

  it("refreshes list items using current repository state", async () => {
    const controller = createFileManagerHarness([makeProject()]);
    const actions: FileManagerActions = controller.actions;

    await actions.createProject("Second");
    await actions.refreshProjects();

    expect(controller.state.projects).toHaveLength(2);
    expect(controller.state.projects[1]?.datasetCount).toBe(0);
  });
});
