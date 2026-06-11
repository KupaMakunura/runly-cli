export const AGENTS = [
  "cursor",
  "claude",
  "agents",
  "copilot",
  "gemini",
] as const;

export type RunlyAgent = (typeof AGENTS)[number];

/** Legacy CLI / registry names mapped to current export targets. */
const AGENT_ALIASES: Record<string, RunlyAgent> = {
  codex: "agents",
};

export function isRunlyAgent(value: string): value is RunlyAgent {
  return (AGENTS as readonly string[]).includes(value);
}

export function resolveAgent(value: string): RunlyAgent | null {
  if (isRunlyAgent(value)) {
    return value;
  }
  return AGENT_ALIASES[value] ?? null;
}

export function resolveAgents(values: string[]): RunlyAgent[] {
  const resolved: RunlyAgent[] = [];
  for (const value of values) {
    const agent = resolveAgent(value);
    if (agent && !resolved.includes(agent)) {
      resolved.push(agent);
    }
  }
  return resolved;
}

/** Where each coding agent discovers exported skills. */
export const AGENT_SKILL_ROOTS: Record<RunlyAgent, string> = {
  cursor: ".cursor/skills",
  claude: ".claude/skills",
  agents: ".agents/skills",
  copilot: ".github/skills",
  gemini: ".gemini/skills",
};
