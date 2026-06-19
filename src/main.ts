#!/usr/bin/env node

import { createRequire } from "node:module";
import { Command } from "commander";
import { RunlyError } from "./lib/errors.ts";
import { registerInitCommand } from "./commands/init.ts";
import { registerExportCommand } from "./commands/export.ts";
import { registerDoctorCommand } from "./commands/doctor.ts";

const { version } = createRequire(import.meta.url)("../package.json");

function normalizeCliArgv(argv: string[]): string[] {
  const args = argv.slice(2);
  const first = args[0];

  if (!first) {
    return [argv[0], argv[1], "init"];
  }

  if (
    first === "init" ||
    first === "export" ||
    first === "doctor" ||
    first === "-h" ||
    first === "--help" ||
    first === "-V" ||
    first === "--version"
  ) {
    return argv;
  }

  if (first.startsWith("-")) {
    return [argv[0], argv[1], "init", ...args];
  }

  return argv;
}

const program = new Command();

program.name("runly").description("Runly Workflow CLI").version(version);

registerInitCommand(program);
registerExportCommand(program);
registerDoctorCommand(program);

try {
  await program.parseAsync(normalizeCliArgv(process.argv));
} catch (error) {
  if (error instanceof RunlyError) {
    console.error(error.message);
    process.exit(error.exitCode);
  }

  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
}
