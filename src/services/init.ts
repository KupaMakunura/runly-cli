import { join } from "node:path";
import * as p from "@clack/prompts";
import { getAgentsTemplatePath, getRunlyTemplateDir } from "../lib/paths.ts";
import {
  copyDirectory,
  pathExists,
  readJson,
  writeJson,
  writeText,
} from "../lib/fs.ts";
import {
  agentSelectOptions,
  defaultAgentsForInit,
  detectInstalledAgents,
  formatAgentList,
} from "../lib/detect-agents.ts";
import { exportSkills } from "./export.ts";
import { installSpecify } from "./install-specify.ts";
import { registrySchema } from "../lib/schemas.ts";
import { resolveAgents, type RunlyAgent } from "../constants/agents.ts";

export type InitOptions = {
  cwd?: string;
  agents?: string[];
  force?: boolean;
  skipSpecKitBundle?: boolean;
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

  if ((await pathExists(runlyPath)) && !options.force) {
    throw new Error(
      ".runly already exists. Re-run with --force to refresh templates without overwriting docs.",
    );
  }

  const agents = await resolveInitAgents(cwd, options.agents);

  const templateDir = getRunlyTemplateDir();
  await copyDirectory(templateDir, runlyPath, { overwrite: options.force });

  const registry = registrySchema.parse(
    await readJson(join(templateDir, "registry.json")),
  );
  registry.export = { agents };

  await writeJson(join(runlyPath, "registry.json"), registry);

  if (!options.skipSpecKitBundle) {
    const specify = await installSpecify(cwd, { force: options.force });
    if (specify.installed) {
      p.log.success("Installed Spec Kit infrastructure at .specify/");
    }
  }

  const agentsTemplate = getAgentsTemplatePath();
  const agentsTarget = join(cwd, "AGENTS.md");
  if (!(await pathExists(agentsTarget))) {
    await writeText(agentsTarget, await Bun.file(agentsTemplate).text());
  }

  const exported = await exportSkills(cwd, agents);
  const total =
    exported.written.length +
    exported.communityWritten.length +
    exported.specKitWritten.length;
  if (total > 0) {
    p.log.info(`Exported ${total} skill file(s) to configured agent folders`);
  }

  p.outro(`Runly initialized in ${cwd}`);
  return cwd;
}
