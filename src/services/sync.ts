import type { RunlyAgent } from "../constants/agents.ts";
import { exportAgents as registryAgents, loadProject } from "../lib/project.ts";
import { exportSkills } from "./export.ts";
import { join } from "node:path";
import { copyDirectory, writeJson } from "../lib/fs.ts";
import { installSpecify } from "./install-specify.ts";
import { loadScaffoldAssets } from "./scaffold-assets.ts";

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
  const assets = await loadScaffoldAssets(project.registry.sync, options);
  try {
    const runlyPath = join(project.root, ".runly");
    await copyDirectory(
      join(assets.runlyTemplateDir, "skills/runly"),
      join(runlyPath, "skills/runly"),
      { overwrite: true },
    );
    await writeJson(join(runlyPath, "registry.json"), {
      ...assets.registry,
      export: project.registry.export ?? assets.registry.export,
    });
  } finally {
    await assets.cleanup?.();
  }

  await installSpecify(project.root, {
    force: true,
    sourceDir: assets.specifySourceDir,
  });

  const refreshed = await loadProject(startDir);
  const agents = registryAgents(refreshed) as RunlyAgent[];
  const exportResult = await exportSkills(project.root, agents);

  return {
    coreSource: assets.source,
    registryVersion: refreshed.registry.version,
    exported: exportResult.written.length,
    communityExported: exportResult.communityWritten.length,
    specKitExported: exportResult.specKitWritten.length,
    removed: exportResult.removed,
  };
}
