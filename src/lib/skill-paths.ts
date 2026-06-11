import { join } from "node:path";
import type { RunlyAgent } from "../constants/agents.ts";
import { AGENT_SKILL_ROOTS } from "../constants/agents.ts";
import { skillFilePath } from "./project.ts";

export function agentSkillPath(
  projectRoot: string,
  agent: RunlyAgent,
  skillId: string,
): string {
  return join(projectRoot, AGENT_SKILL_ROOTS[agent], skillId, "SKILL.md");
}

export function runlySkillPath(
  projectRoot: string,
  registryPath: string,
): string {
  return skillFilePath(projectRoot, registryPath);
}
