import { dirname, join } from "node:path";
import type { RunlyAgent } from "../constants/agents.ts";
import type { RunlyRegistry } from "../lib/schemas.ts";
import { getPackageRoot } from "../lib/paths.ts";
import { agentSkillPath } from "../lib/skill-paths.ts";
import { copyDirectory, pathExists } from "../lib/fs.ts";

function bundledCommunitySkillDir(
  sourcePath: string,
  skillId: string,
): string {
  return join(getPackageRoot(), sourcePath, skillId);
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

      const bundled = bundledCommunitySkillDir(source.path, skillId);
      if (!(await pathExists(join(bundled, "SKILL.md")))) {
        continue;
      }

      const target = dirname(agentSkillPath(projectRoot, agent, skillId));
      written.push(...(await copyDirectory(bundled, target, {
        overwrite: true,
      })));
    }
  }

  return written;
}
