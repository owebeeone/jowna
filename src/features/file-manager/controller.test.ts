import { describe, expect, it } from "vitest";
import { createIndexedDbStorageGateway } from "../../storage/indexeddb";
import { createFileManagerController } from "./controller";

describe("createFileManagerController", () => {
  it("creates, copies, and deletes projects through repository", async () => {
    const counters = new Map<string, number>();
    const nextId = (prefix: "project" | "dataset") => {
      const next = (counters.get(prefix) ?? 0) + 1;
      counters.set(prefix, next);
      return `${prefix}-${next}`;
    };

    const storage = createIndexedDbStorageGateway({
      indexedDbFactory: undefined,
      now: () => "2026-02-09T00:00:00.000Z",
      createId: nextId,
    });

    const controller = createFileManagerController({
      projectRepository: storage.projects,
      now: () => "2026-02-09T00:00:00.000Z",
      createProjectId: () => "project-1",
    });

    const created = await controller.actions.createProject("Project A");
    expect(created.id).toBe("project-1");

    const copied = await controller.actions.copyProject("project-1", "Project A Copy");
    expect(copied.name).toBe("Project A Copy");

    await controller.actions.deleteProject("project-1");
    expect(controller.state.projects.some((project) => project.id === "project-1")).toBe(false);
  });
});
