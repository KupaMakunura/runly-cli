import { createWriteStream } from "node:fs";
import { mkdtemp, readdir, rm } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import { join } from "node:path";
import { tmpdir } from "node:os";
import * as tar from "tar";
import { getRunlyTemplateDir, getSpecKitBundleDir } from "../lib/paths.ts";
import { pathExists, readJson } from "../lib/fs.ts";
import {
  registrySchema,
  type RunlyRegistry,
  type RunlySyncConfig,
} from "../lib/schemas.ts";

export type ScaffoldAssets = {
  runlyTemplateDir: string;
  specifySourceDir: string;
  registry: RunlyRegistry;
  source: "github" | "bundled";
  cleanup?: () => Promise<void>;
};

const DEFAULT_SYNC: RunlySyncConfig = {
  runlyRepo: "KupaMakunura/runly-cli",
  ref: "main",
  templatesPath: "templates/runly",
};

function archiveUrl(sync: RunlySyncConfig): string {
  return `https://codeload.github.com/${sync.runlyRepo}/tar.gz/${sync.ref}`;
}

async function downloadGitHubArchive(sync: RunlySyncConfig): Promise<ScaffoldAssets | null> {
  const tempRoot = await mkdtemp(join(tmpdir(), "runly-archive-"));
  const archivePath = join(tempRoot, "runly.tar.gz");
  const cleanup = () => rm(tempRoot, { recursive: true, force: true });

  try {
    const response = await fetch(archiveUrl(sync));
    if (!response.ok || !response.body) {
      await cleanup();
      return null;
    }

    await pipeline(
      Readable.fromWeb(response.body as globalThis.ReadableStream),
      createWriteStream(archivePath),
    );

    await tar.x({
      cwd: tempRoot,
      file: archivePath,
    });

    const entries = await readdir(tempRoot, { withFileTypes: true });
    const extracted = entries.find((entry) => entry.isDirectory());
    if (!extracted) {
      await cleanup();
      return null;
    }

    const repoRoot = join(tempRoot, extracted.name);
    const runlyTemplateDir = join(repoRoot, sync.templatesPath);
    const specifySourceDir = join(repoRoot, "templates", "spec-kit", ".specify");

    if (
      !(await pathExists(join(runlyTemplateDir, "registry.json"))) ||
      !(await pathExists(specifySourceDir))
    ) {
      await cleanup();
      return null;
    }

    const registry = registrySchema.parse(
      await readJson(join(runlyTemplateDir, "registry.json")),
    );

    return {
      runlyTemplateDir,
      specifySourceDir,
      registry,
      source: "github",
      cleanup,
    };
  } catch {
    await cleanup().catch(() => undefined);
    return null;
  }
}

export async function loadScaffoldAssets(
  syncConfig?: RunlySyncConfig,
  options: { offline?: boolean } = {},
): Promise<ScaffoldAssets> {
  const sync = syncConfig ?? DEFAULT_SYNC;

  if (!options.offline) {
    const remote = await downloadGitHubArchive(sync);
    if (remote) {
      return remote;
    }
  }

  const runlyTemplateDir = getRunlyTemplateDir();
  const specifySourceDir = join(getSpecKitBundleDir(), ".specify");
  const registry = registrySchema.parse(
    await readJson(join(runlyTemplateDir, "registry.json")),
  );

  return {
    runlyTemplateDir,
    specifySourceDir,
    registry,
    source: "bundled",
  };
}
