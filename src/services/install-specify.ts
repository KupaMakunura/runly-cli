import { join } from "node:path";
import { getSpecKitBundleDir, projectSpecifyDir } from "../lib/paths.ts";
import { copyDirectory, pathExists } from "../lib/fs.ts";
import { ensureGit } from "../lib/prerequisites.ts";

export type InstallSpecifyResult = {
  installed: boolean;
};

/** Copy bundled `.specify/` infrastructure to the project root only. */
export async function installSpecify(
  projectRoot: string,
  options: { force?: boolean; requireGit?: boolean } = {},
): Promise<InstallSpecifyResult> {
  if (options.requireGit !== false) {
    await ensureGit();
  }

  const specifySource = join(getSpecKitBundleDir(), ".specify");
  if (!(await pathExists(specifySource))) {
    return { installed: false };
  }

  await copyDirectory(specifySource, projectSpecifyDir(projectRoot), {
    overwrite: options.force,
  });

  return { installed: true };
}
