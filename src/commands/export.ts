import type { Command } from "commander";
import { exportAgents, loadProject } from "../lib/project.ts";
import { exportSkills } from "../services/export.ts";
import { resolveAgent } from "../constants/agents.ts";
import { writeJson } from "../lib/fs.ts";
import { join } from "node:path";
import { runlyDir } from "../lib/paths.ts";

export function registerExportCommand(program: Command): void {
  program
    .command("export")
    .description("Copy .runly skills into coding agent skill folders")
    .option(
      "--agent <agent>",
      "Limit export to one agent (cursor, claude, agents = Codex & Others, copilot, gemini)",
    )
    .action(async (options) => {
      const project = await loadProject();

      const agents = options.agent
        ? (() => {
            const resolved = resolveAgent(options.agent);
            if (!resolved) {
              throw new Error(`Unsupported agent: ${options.agent}`);
            }
            return [resolved];
          })()
        : exportAgents(project);

      if (options.agent) {
        const registry = {
          ...project.registry,
          export: { agents },
        };
        await writeJson(join(runlyDir(project.root), "registry.json"), registry);
      }

      const result = await exportSkills(project.root, agents);

      console.log(`Exported ${result.written.length} skill file(s) from .runly/.`);
      if (result.removed.length > 0) {
        console.log("Removed stale exports:");
        for (const skillId of result.removed) {
          console.log(`- ${skillId}`);
        }
      }
      if (result.skipped.length > 0) {
        console.log("Skipped skills not present in .runly/:");
        for (const skillId of result.skipped) {
          console.log(`- ${skillId}`);
        }
      }
    });
}
