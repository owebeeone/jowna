import type { GripContext, GripContextLike } from "@owebeeone/grip-react";

const projectContextRefs = new Map<string, WeakRef<GripContext>>();
const projectContextFallback = new Map<string, GripContext>();

function resolveProjectContextKey(projectId: string | null | undefined): string {
  const normalized = projectId?.trim() ?? "";
  return normalized.length > 0 ? normalized : "chart-ui-default";
}

function getCachedProjectContext(key: string): GripContext | undefined {
  if (typeof WeakRef !== "undefined") {
    const existing = projectContextRefs.get(key)?.deref();
    if (!existing) {
      projectContextRefs.delete(key);
    }
    return existing;
  }
  return projectContextFallback.get(key);
}

function setCachedProjectContext(key: string, context: GripContext): void {
  if (typeof WeakRef !== "undefined") {
    projectContextRefs.set(key, new WeakRef(context));
    return;
  }
  projectContextFallback.set(key, context);
}

export function getOrCreateProjectChartUiContext(params: {
  parent: GripContextLike;
  projectId: string | null | undefined;
}): GripContext {
  const key = resolveProjectContextKey(params.projectId);
  const existing = getCachedProjectContext(key);
  if (existing) {
    return existing;
  }

  const created = params.parent.getGripConsumerContext().createChild();
  setCachedProjectContext(key, created);
  return created;
}
