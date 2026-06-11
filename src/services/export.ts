import { readdir, rm } from "node:fs/promises";
import { join } from "node:path";
import type { RunlyAgent } from "../constants/agents.ts";
import { AGENT_SKILL_ROOTS } from "../constants/agents.ts";
import { BUNDLED_SPEC_KIT_SKILL_IDS } from "../constants/spec-kit-skills.ts";
import { agentSkillPath, runlySkillPath } from "../lib/skill-paths.ts";
import { pathExists, readText, writeText } from "../lib/fs.ts";
import { projectSpecifyDir } from "../lib/paths.ts";
import { exportAgents as registryAgents, loadProject } from "../lib/project.ts";
import { exportSpecKitSkills } from "./export-spec-kit-skills.ts";
import { exportCommunitySkills } from "./export-community-skills.ts";

export type ExportResult = {
  written: string[];
  skipped: string[];
  removed: string[];
  communityWritten: string[];
  specKitWritten: string[];
};

function activeSkillIds(registrySkillIds: string[]): Set<string> {
  return new Set([...registrySkillIds, ...BUNDLED_SPEC_KIT_SKILL_IDS]);
}

async function pruneStaleExports(
  projectRoot: string,
  agent: RunlyAgent,
  knownSkillIds: Set<string>,
): Promise<string[]> {
  const skillRoot = join(projectRoot, AGENT_SKILL_ROOTS[agent]);
  if (!(await pathExists(skillRoot))) {
    return [];
  }

  const removed: string[] = [];
  const entries = await readdir(skillRoot, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory() || knownSkillIds.has(entry.name)) {
      continue;
    }

    const skillFile = join(skillRoot, entry.name, "SKILL.md");
    if (!(await pathExists(skillFile))) {
      continue;
    }

    await rm(join(skillRoot, entry.name), { recursive: true, force: true });
    removed.push(entry.name);
  }

  return removed;
}

export async function exportSkills(
  projectRoot: string,
  agents?: RunlyAgent[],
): Promise<ExportResult> {
  const project = await loadProject(projectRoot);
  const targets = agents ?? registryAgents(project);
  const written: string[] = [];
  const skipped: string[] = [];
  const removed: string[] = [];
  const registrySkillIds = Object.keys(project.registry.skills);
  const knownSkillIds = activeSkillIds(registrySkillIds);

  for (const agent of targets) {
    removed.push(...(await pruneStaleExports(projectRoot, agent, knownSkillIds)));

    for (const [skillId, skill] of Object.entries(project.registry.skills)) {
      const skillSource = project.registry.sources[skill.source];
      if (skillSource?.type === "bundled") {
        continue;
      }

      if (!skill.ownedByRunly) {
        continue;
      }

      const source = runlySkillPath(projectRoot, skill.path);
      if (!(await pathExists(source))) {
        skipped.push(skillId);
        continue;
      }

      const content = await readText(source);
      const outputPath = agentSkillPath(projectRoot, agent, skillId);
      await writeText(outputPath, content);
      written.push(outputPath);
    }
  }

  const communityWritten = await exportCommunitySkills(
    projectRoot,
    project.registry,
    targets,
  );

  const specKitWritten =
    (await pathExists(projectSpecifyDir(projectRoot)))
      ? await exportSpecKitSkills(projectRoot, targets)
      : [];

  return {
    written,
    skipped: [...new Set(skipped)],
    removed: [...new Set(removed)],
    communityWritten,
    specKitWritten,
  };
}

export async function listMissingExports(
  projectRoot: string,
  agents: RunlyAgent[],
): Promise<string[]> {
  const project = await loadProject(projectRoot);
  const missing: string[] = [];

  for (const agent of agents) {
    for (const skillId of Object.keys(project.registry.skills)) {
      const outputPath = agentSkillPath(projectRoot, agent, skillId);
      if (!(await pathExists(outputPath))) {
        missing.push(`${agent}:${skillId}`);
      }
    }

    if (await pathExists(projectSpecifyDir(projectRoot))) {
      for (const skillId of BUNDLED_SPEC_KIT_SKILL_IDS) {
        const outputPath = agentSkillPath(projectRoot, agent, skillId);
        if (!(await pathExists(outputPath))) {
          missing.push(`${agent}:${skillId}`);
        }
      }
    }
  }

  return missing;
}
