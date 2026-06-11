import { join } from "node:path";
import { getRunlyTemplateDir, projectSpecifyDir } from "../lib/paths.ts";
import { pathExists, readJson } from "../lib/fs.ts";
import {
  exportAgents as registryAgents,
  loadProject,
  type RunlyProject,
} from "../lib/project.ts";
import { registrySchema } from "../lib/schemas.ts";
import { listMissingExports } from "./export.ts";
import { missingSpecKitSkills } from "./export-spec-kit-skills.ts";
import { runlySkillPath } from "../lib/skill-paths.ts";
import {
  STANDALONE_RUNLY_SKILLS,
  WORKFLOWS,
  workflowSkillId,
} from "../constants/workflows.ts";
import { syncProject } from "./sync.ts";
import { checkGit } from "../lib/prerequisites.ts";
import type { RunlyAgent } from "../constants/agents.ts";

export type DoctorResult = {
  healthy: boolean;
  issues: string[];
  warnings: string[];
  fixed: string[];
};

async function collectHealth(project: RunlyProject): Promise<{
  issues: string[];
  warnings: string[];
}> {
  const issues: string[] = [];
  const warnings: string[] = [];

  const git = await checkGit();
  if (!git.available) {
    warnings.push(
      `git is not installed. Spec Kit feature branches need git. ${git.installHint ?? ""}`.trim(),
    );
  }

  const hasSpecifyDir = await pathExists(projectSpecifyDir(project.root));
  if (!hasSpecifyDir) {
    warnings.push(
      "Spec Kit infrastructure missing (.specify/ at project root). Run `runly doctor --fix`.",
    );
  }

  const agents = registryAgents(project) as RunlyAgent[];
  if (hasSpecifyDir) {
    const missingSpecKit = await missingSpecKitSkills(project.root, agents);
    for (const skillId of missingSpecKit) {
      warnings.push(
        `speckit skill missing from agent folder: ${skillId}. Run \`runly doctor --fix\`.`,
      );
    }
  }

  const templateRegistry = registrySchema.parse(
    await readJson(join(getRunlyTemplateDir(), "registry.json")),
  );
  if (project.registry.version !== templateRegistry.version) {
    warnings.push(
      `Registry version ${project.registry.version} differs from latest ${templateRegistry.version}. Run \`runly doctor --fix\`.`,
    );
  }

  const requiredRunlySkills = [
    ...WORKFLOWS.map(workflowSkillId),
    ...STANDALONE_RUNLY_SKILLS,
  ];

  for (const skillId of requiredRunlySkills) {
    const skill = project.registry.skills[skillId];
    if (!skill) {
      issues.push(`Runly skill "${skillId}" is missing from registry.json.`);
      continue;
    }

    const skillPath = runlySkillPath(project.root, skill.path);
    if (!(await pathExists(skillPath))) {
      issues.push(`Missing Runly skill file: ${skill.path}`);
    }
  }

  const missingExports = await listMissingExports(project.root, agents);
  for (const item of missingExports) {
    issues.push(`Missing exported skill: ${item}. Run \`runly doctor --fix\`.`);
  }

  return { issues, warnings };
}

export async function runDoctor(
  startDir = process.cwd(),
  options: { fix?: boolean; offline?: boolean } = {},
): Promise<DoctorResult> {
  const fixed: string[] = [];
  let project = await loadProject(startDir);

  if (options.fix) {
    const sync = await syncProject(startDir, { offline: options.offline });

    fixed.push(
      `Synced Runly core from ${sync.coreSource} (registry ${sync.registryVersion}).`,
    );
    fixed.push(
      `Re-exported ${sync.exported} runly + ${sync.communityExported} community + ${sync.specKitExported} speckit skill file(s).`,
    );

    if (sync.removed.length > 0) {
      fixed.push(`Removed ${sync.removed.length} stale export(s).`);
    }

    project = await loadProject(startDir);
  }

  const { issues, warnings } = await collectHealth(project);

  return {
    healthy: issues.length === 0,
    issues,
    warnings,
    fixed,
  };
}
