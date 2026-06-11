import { runCommand } from "./run-command.ts";
import { RunlyError } from "./errors.ts";

export type ToolCheck = {
  name: string;
  available: boolean;
  version?: string;
  installHint?: string;
};

export async function checkGit(): Promise<ToolCheck> {
  const result = await runCommand(["git", "--version"], { quiet: true });
  return {
    name: "git",
    available: result.exitCode === 0,
    version: result.exitCode === 0 ? result.stdout.trim() : undefined,
    installHint: "https://git-scm.com/downloads",
  };
}

export async function ensureGit(): Promise<void> {
  const git = await checkGit();
  if (!git.available) {
    throw new RunlyError(
      `git is required for Spec Kit feature branches. Install from ${git.installHint}`,
    );
  }
}
