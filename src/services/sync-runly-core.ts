import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { getRunlyTemplateDir } from "../lib/paths.ts";
import { copyDirectory, pathExists, readJson } from "../lib/fs.ts";
import { registrySchema, type RunlyRegistry, type RunlySyncConfig } from "../lib/schemas.ts";
import { runCommand } from "../lib/run-command.ts";

export type RunlyCoreSyncResult = {
  templateDir: string;
  registry: RunlyRegistry;
  source: "github" | "bundled";
  cleanup?: () => Promise<void>;
};

const DEFAULT_SYNC: RunlySyncConfig = {
  runlyRepo: "KupaMakunura/runly-cli",
  ref: "main",
  templatesPath: "templates/runly",
};

type CloneResult = {
  templateDir: string;
  cleanup: () => Promise<void>;
};

async function cloneRunlyTemplates(
  sync: RunlySyncConfig,
): Promise<CloneResult | null> {
  const tempRoot = await mkdtemp(join(tmpdir(), "runly-sync-"));
  const cleanup = () => rm(tempRoot, { recursive: true, force: true });

  try {
    const cloneResult = await runCommand(
      [
        "git",
        "clone",
        "--depth",
        "1",
        "--branch",
        sync.ref,
        `https://github.com/${sync.runlyRepo}.git`,
        tempRoot,
      ],
      { quiet: true },
    );

    if (cloneResult.exitCode !== 0) {
      await cleanup();
      return null;
    }

    const templateDir = join(tempRoot, sync.templatesPath);
    if (!(await pathExists(join(templateDir, "registry.json")))) {
      await cleanup();
      return null;
    }

    return { templateDir, cleanup };
  } catch {
    await cleanup().catch(() => undefined);
    return null;
  }
}

export async function syncRunlyCoreTemplates(
  syncConfig?: RunlySyncConfig,
  options: { offline?: boolean } = {},
): Promise<RunlyCoreSyncResult> {
  const sync = syncConfig ?? DEFAULT_SYNC;

  if (!options.offline) {
    const remote = await cloneRunlyTemplates(sync);
    if (remote) {
      const registry = registrySchema.parse(
        await readJson(join(remote.templateDir, "registry.json")),
      );
      return {
        templateDir: remote.templateDir,
        registry,
        source: "github",
        cleanup: remote.cleanup,
      };
    }
  }

  const templateDir = getRunlyTemplateDir();
  const registry = registrySchema.parse(
    await readJson(join(templateDir, "registry.json")),
  );

  return { templateDir, registry, source: "bundled" };
}

export async function applyRunlyCoreToProject(
  projectRoot: string,
  templateDir: string,
  registry: RunlyRegistry,
  preserveExportAgents?: RunlyRegistry["export"],
): Promise<void> {
  const runlyPath = join(projectRoot, ".runly");
  const mergedRegistry: RunlyRegistry = {
    ...registry,
    export: preserveExportAgents ?? registry.export,
  };

  await copyDirectory(join(templateDir, "skills/runly"), join(runlyPath, "skills/runly"), {
    overwrite: true,
  });

  const { writeJson } = await import("../lib/fs.ts");
  await writeJson(join(runlyPath, "registry.json"), mergedRegistry);
}
