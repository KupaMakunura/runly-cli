import type { Command } from "commander";
import { initProject } from "../services/init.ts";
import { resolveAgent } from "../constants/agents.ts";

export function registerInitCommand(program: Command): void {
  program
    .command("init")
    .description(
      "Initialize .runly/, bundled Spec Kit, community skills, and agent exports",
    )
    .option(
      "--agent <agent>",
      "Export target (repeatable): cursor, claude, agents (Codex & Others), copilot, gemini",
      collect,
      [],
    )
    .option("--force", "Refresh templates when .runly already exists", false)
    .option("--skip-spec-kit", "Skip bundled Spec Kit install", false)
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
        skipSpecKitBundle: options.skipSpecKit,
      });
    });
}

function collect(value: string, previous: string[]): string[] {
  return [...previous, value];
}
