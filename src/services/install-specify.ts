import { join } from "node:path";
import { getSpecKitBundleDir, projectSpecifyDir } from "../lib/paths.ts";
import { copyDirectory, pathExists } from "../lib/fs.ts";

export type InstallSpecifyResult = {
  installed: boolean;
};

/** Copy bundled `.specify/` infrastructure to the project root only. */
export async function installSpecify(
  projectRoot: string,
  options: { force?: boolean; sourceDir?: string } = {},
): Promise<InstallSpecifyResult> {
  const specifySource = options.sourceDir ?? join(getSpecKitBundleDir(), ".specify");
  if (!(await pathExists(specifySource))) {
    return { installed: false };
  }

  await copyDirectory(specifySource, projectSpecifyDir(projectRoot), {
    overwrite: options.force,
  });

  return { installed: true };
}
