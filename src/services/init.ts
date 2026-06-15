import { join } from "node:path";
import { rm } from "node:fs/promises";
import * as p from "@clack/prompts";
import { getAgentsTemplatePath } from "../lib/paths.ts";
import {
  copyDirectory,
  pathExists,
  readText,
  writeText,
  writeJson,
} from "../lib/fs.ts";
import {
  agentSelectOptions,
  defaultAgentsForInit,
  detectInstalledAgents,
  formatAgentList,
} from "../lib/detect-agents.ts";
import { exportSkills } from "./export.ts";
import { installSpecify } from "./install-specify.ts";
import { resolveAgents, type RunlyAgent } from "../constants/agents.ts";
import { loadScaffoldAssets } from "./scaffold-assets.ts";

export type InitOptions = {
  cwd?: string;
  agents?: string[];
  force?: boolean;
  offline?: boolean;
};

export async function resolveInitAgents(
  cwd: string,
  explicit?: string[],
): Promise<RunlyAgent[]> {
  if (explicit && explicit.length > 0) {
    return resolveAgents(explicit);
  }

  const detected = await detectInstalledAgents(cwd);
  const suggested = defaultAgentsForInit(detected);

  if (!process.stdin.isTTY) {
    return suggested;
  }

  p.intro("Runly project setup");

  if (detected.length === 0) {
    p.log.info(
      "No agent folders detected — pre-selecting Codex & Others (.agents/skills/). Change the selection below if needed.",
    );
  } else {
    p.log.info(`Detected: ${formatAgentList(detected)}`);
  }

  const answer = await p.multiselect({
    message: "Which coding agents should Runly export skills to?",
    options: agentSelectOptions(),
    initialValues: suggested,
    required: true,
  });
  if (p.isCancel(answer)) {
    p.cancel("Setup cancelled.");
    process.exit(0);
  }

  return resolveAgents(answer as string[]);
}

export async function initProject(options: InitOptions = {}): Promise<string> {
  const cwd = options.cwd ?? process.cwd();
  const runlyPath = join(cwd, ".runly");
  const specifyPath = join(cwd, ".specify");

  const hasRunly = await pathExists(runlyPath);
  if (hasRunly && !options.force) {
    if (!process.stdin.isTTY) {
      throw new Error(
        ".runly already exists. Delete the existing scaffold or re-run with --force.",
      );
    }

    const answer = await p.confirm({
      message:
        "This folder is already initialized. Overwrite the scaffolded .runly/ and .specify/ structure?",
      initialValue: false,
    });
    if (p.isCancel(answer) || !answer) {
      throw new Error(
        ".runly already exists. Delete the existing scaffold or re-run with --force.",
      );
    }
    options.force = true;
  }

  const agents = await resolveInitAgents(cwd, options.agents);
  const assets = await loadScaffoldAssets(undefined, { offline: options.offline });

  if (options.force) {
    await rm(runlyPath, { recursive: true, force: true });
    await rm(specifyPath, { recursive: true, force: true });
  }

  try {
    await copyDirectory(assets.runlyTemplateDir, runlyPath, {
      overwrite: options.force,
    });

    const registry = assets.registry;
    registry.export = { agents };
    await writeJson(join(runlyPath, "registry.json"), registry);

    const specify = await installSpecify(cwd, {
      force: options.force,
      sourceDir: assets.specifySourceDir,
    });
    if (specify.installed) {
      p.log.success(
        `Installed Spec Kit infrastructure at .specify/ from ${assets.source}.`,
      );
    }

    const agentsTemplate = getAgentsTemplatePath();
    const agentsTarget = join(cwd, "AGENTS.md");
    if (!(await pathExists(agentsTarget))) {
      await writeText(agentsTarget, await readText(agentsTemplate));
    }

    const exported = await exportSkills(cwd, agents);
    const total =
      exported.written.length +
      exported.communityWritten.length +
      exported.specKitWritten.length;
    if (total > 0) {
      p.log.info(`Exported ${total} skill file(s) to configured agent folders`);
    }

    p.outro(`Runly initialized in ${cwd} using ${assets.source} assets`);
  } finally {
    await assets.cleanup?.();
  }
  return cwd;
}
