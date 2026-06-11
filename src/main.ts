#!/usr/bin/env bun

import { Command } from "commander";
import { RunlyError } from "./lib/errors.ts";
import { registerInitCommand } from "./commands/init.ts";
import { registerExportCommand } from "./commands/export.ts";
import { registerDoctorCommand } from "./commands/doctor.ts";

const program = new Command();

program
  .name("runly")
  .description("Runly workflow CLI — init projects, export mode skills, and check configuration health")
  .version("0.1.0");

registerInitCommand(program);
registerExportCommand(program);
registerDoctorCommand(program);

try {
  await program.parseAsync(process.argv);
} catch (error) {
  if (error instanceof RunlyError) {
    console.error(error.message);
    process.exit(error.exitCode);
  }

  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
}
