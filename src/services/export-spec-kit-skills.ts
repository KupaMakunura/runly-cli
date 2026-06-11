import { join } from "node:path";
import type { RunlyAgent } from "../constants/agents.ts";
import { BUNDLED_SPEC_KIT_SKILL_IDS } from "../constants/spec-kit-skills.ts";
import { agentSkillPath } from "../lib/skill-paths.ts";
import { getSpecKitBundleDir } from "../lib/paths.ts";
import { pathExists, readText, writeText } from "../lib/fs.ts";

function bundledSkillPath(skillId: string): string {
  return join(getSpecKitBundleDir(), "skills", skillId, "SKILL.md");
}

/** Export speckit-* skills to the same agent folder as grill-me, runly-think, etc. */
export async function exportSpecKitSkills(
  projectRoot: string,
  agents: RunlyAgent[],
): Promise<string[]> {
  const written: string[] = [];

  for (const agent of agents) {
    for (const skillId of BUNDLED_SPEC_KIT_SKILL_IDS) {
      const source = bundledSkillPath(skillId);
      if (!(await pathExists(source))) {
        continue;
      }

      const target = agentSkillPath(projectRoot, agent, skillId);
      await writeText(target, await readText(source));
      written.push(target);
    }
  }

  return written;
}

export async function missingSpecKitSkills(
  projectRoot: string,
  agents: RunlyAgent[],
): Promise<string[]> {
  const missing: string[] = [];

  for (const skillId of BUNDLED_SPEC_KIT_SKILL_IDS) {
    const found = await Promise.all(
      agents.map((agent) =>
        pathExists(agentSkillPath(projectRoot, agent, skillId)),
      ),
    );

    if (!found.some(Boolean)) {
      missing.push(skillId);
    }
  }

  return missing;
}
