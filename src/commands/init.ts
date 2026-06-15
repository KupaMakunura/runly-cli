import type { Command } from "commander";
import { initProject } from "../services/init.ts";
import { resolveAgent } from "../constants/agents.ts";

export function registerInitCommand(program: Command): void {
  program
    .command("init")
    .description(
      "Initialize .runly/, .specify/, and agent skill exports",
    )
    .option(
      "--agent <agent>",
      "Export target (repeatable): cursor, claude, agents (Codex & Others), copilot, gemini",
      collect,
      [],
    )
    .option("--force", "Refresh templates when .runly already exists", false)
    .option("--offline", "Use bundled templates only", false)
    .action(async (options) => {
      const agents =
        options.agent.length > 0
          ? options.agent.map((agent: string) => {
              const resolved = resolveAgent(agent);
              if (!resolved) {
                throw new Error(`Unsupported agent: ${agent}`);
              }
              return resolved;
            })
          : undefined;

      await initProject({
        agents,
        force: options.force,
        offline: options.offline,
      });
    });
}

function collect(value: string, previous: string[]): string[] {
  return [...previous, value];
}
