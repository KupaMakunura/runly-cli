import type { RunlyAgent } from "../constants/agents.ts";
import { exportAgents as registryAgents, loadProject } from "../lib/project.ts";
import { exportSkills } from "./export.ts";
import { applyRunlyCoreToProject, syncRunlyCoreTemplates } from "./sync-runly-core.ts";
import { installSpecify } from "./install-specify.ts";

export type SyncResult = {
  coreSource: "github" | "bundled";
  registryVersion: string;
  exported: number;
  communityExported: number;
  specKitExported: number;
  removed: string[];
};

export async function syncProject(
  startDir = process.cwd(),
  options: { offline?: boolean } = {},
): Promise<SyncResult> {
  const project = await loadProject(startDir);
  const syncConfig = project.registry.sync;

  const core = await syncRunlyCoreTemplates(syncConfig, options);
  try {
    await applyRunlyCoreToProject(
      project.root,
      core.templateDir,
      core.registry,
      project.registry.export,
    );
  } finally {
    await core.cleanup?.();
  }

  await installSpecify(project.root, { force: true, requireGit: false });

  const refreshed = await loadProject(startDir);
  const agents = registryAgents(refreshed) as RunlyAgent[];
  const exportResult = await exportSkills(project.root, agents);

  return {
    coreSource: core.source,
    registryVersion: refreshed.registry.version,
    exported: exportResult.written.length,
    communityExported: exportResult.communityWritten.length,
    specKitExported: exportResult.specKitWritten.length,
    removed: exportResult.removed,
  };
}
