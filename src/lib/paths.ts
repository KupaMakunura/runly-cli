import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pathExists } from "./fs.ts";

const moduleDir = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(moduleDir, "../..");

export function getPackageRoot(): string {
  return packageRoot;
}

export function getTemplatesDir(): string {
  return join(packageRoot, "templates");
}

export function getRunlyTemplateDir(): string {
  return join(getTemplatesDir(), "runly");
}

export function getSpecKitBundleDir(): string {
  return join(getTemplatesDir(), "spec-kit");
}

export function getAgentsTemplatePath(): string {
  return join(packageRoot, "AGENTS.md");
}

export async function findRunlyRoot(
  startDir = process.cwd(),
): Promise<string | null> {
  let current = resolve(startDir);

  while (true) {
    const registryPath = join(current, ".runly", "registry.json");
    if (await pathExists(registryPath)) {
      return current;
    }

    const parent = dirname(current);
    if (parent === current) {
      return null;
    }
    current = parent;
  }
}

export async function requireRunlyRoot(startDir = process.cwd()): Promise<string> {
  const root = await findRunlyRoot(startDir);
  if (!root) {
    throw new Error(
      "No Runly project found. Run `runly init` in your project directory first.",
    );
  }
  return root;
}

export function runlyDir(projectRoot: string): string {
  return join(projectRoot, ".runly");
}

export function projectSpecifyDir(projectRoot: string): string {
  return join(projectRoot, ".specify");
}
