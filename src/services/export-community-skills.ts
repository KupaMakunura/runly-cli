import { join } from "node:path";
import type { RunlyAgent } from "../constants/agents.ts";
import type { RunlyRegistry } from "../lib/schemas.ts";
import { getPackageRoot } from "../lib/paths.ts";
import { agentSkillPath } from "../lib/skill-paths.ts";
import { pathExists, readText, writeText } from "../lib/fs.ts";

function bundledCommunitySkillPath(
  sourcePath: string,
  skillId: string,
): string {
  return join(getPackageRoot(), sourcePath, skillId, "SKILL.md");
}

/** Export community skills from templates/community → agent skills folder. */
export async function exportCommunitySkills(
  projectRoot: string,
  registry: RunlyRegistry,
  agents: RunlyAgent[],
): Promise<string[]> {
  const written: string[] = [];

  for (const agent of agents) {
    for (const [skillId, skill] of Object.entries(registry.skills)) {
      if (skill.ownedByRunly) {
        continue;
      }

      const source = registry.sources[skill.source];
      if (source?.type !== "bundled" || skill.source === "spec-kit") {
        continue;
      }

      const bundled = bundledCommunitySkillPath(source.path, skillId);
      if (!(await pathExists(bundled))) {
        continue;
      }

      const target = agentSkillPath(projectRoot, agent, skillId);
      await writeText(target, await readText(bundled));
      written.push(target);
    }
  }

  return written;
}
