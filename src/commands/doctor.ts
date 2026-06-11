import type { Command } from "commander";
import { runDoctor } from "../services/doctor.ts";

export function registerDoctorCommand(program: Command): void {
  program
    .command("doctor")
    .description(
      "Check .runly health; --fix refreshes bundled Spec Kit, Runly core, and re-exports skills",
    )
    .option("--fix", "Reinstall Spec Kit bundle, sync Runly templates, re-export skills", false)
    .option("--offline", "Use bundled templates only (no GitHub fetch)", false)
    .action(async (options) => {
      const result = await runDoctor(process.cwd(), {
        fix: options.fix,
        offline: options.offline,
      });

      if (result.fixed.length > 0) {
        console.log("Applied fixes:");
        for (const item of result.fixed) {
          console.log(`- ${item}`);
        }
        console.log("");
      }

      if (result.warnings.length > 0) {
        console.log("Warnings:");
        for (const warning of result.warnings) {
          console.log(`- ${warning}`);
        }
        console.log("");
      }

      if (result.issues.length > 0) {
        console.log("Issues:");
        for (const issue of result.issues) {
          console.log(`- ${issue}`);
        }
        process.exitCode = 1;
        return;
      }

      console.log(result.healthy ? "Runly configuration looks healthy." : "Runly configuration has issues.");
    });
}
