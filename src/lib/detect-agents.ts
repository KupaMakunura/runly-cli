import { join } from "node:path";
import {
  AGENTS,
  AGENT_SKILL_ROOTS,
  type RunlyAgent,
} from "../constants/agents.ts";
import { pathExists } from "./fs.ts";

/** Folder markers that suggest an agent is already in use in this project. */
const DETECTION_MARKERS: Record<RunlyAgent, string[]> = {
  cursor: [".cursor"],
  claude: [".claude"],
  agents: [".agents"],
  copilot: [".github/copilot"],
  gemini: [".gemini"],
};

/** User-facing names in init prompts (registry key `agents` → Codex & Others). */
export const AGENT_DISPLAY_NAMES: Record<RunlyAgent, string> = {
  cursor: "Cursor",
  claude: "Claude Code",
  agents: "Codex & Others",
  copilot: "GitHub Copilot",
  gemini: "Gemini CLI",
};

/**
 * Default export target when no agent folders are detected.
 * Routes to `.agents/skills/` — Codex, OpenClaw, and other tools that share that folder.
 */
export const DEFAULT_RUNLY_AGENT: RunlyAgent = "agents";

export function formatAgentList(agents: RunlyAgent[]): string {
  return agents.map((agent) => AGENT_DISPLAY_NAMES[agent]).join(", ");
}

export async function detectInstalledAgents(
  projectRoot: string,
): Promise<RunlyAgent[]> {
  const detected: RunlyAgent[] = [];

  for (const agent of AGENTS) {
    for (const marker of DETECTION_MARKERS[agent]) {
      if (await pathExists(join(projectRoot, marker))) {
        detected.push(agent);
        break;
      }
    }
  }

  return detected;
}

export function defaultAgentsForInit(detected: RunlyAgent[]): RunlyAgent[] {
  return detected.length > 0 ? detected : [DEFAULT_RUNLY_AGENT];
}

export function agentSelectOptions(): Array<{
  value: RunlyAgent;
  label: string;
}> {
  return AGENTS.map((agent) => ({
    value: agent,
    label: `${AGENT_DISPLAY_NAMES[agent]} → ${AGENT_SKILL_ROOTS[agent]}/`,
  }));
}
