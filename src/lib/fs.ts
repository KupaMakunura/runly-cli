import { mkdir, readdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";

export async function pathExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

export async function readText(path: string): Promise<string> {
  return Bun.file(path).text();
}

export async function writeText(path: string, content: string): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  await Bun.write(path, content);
}

export async function readJson<T>(path: string): Promise<T> {
  const text = await readText(path);
  return JSON.parse(text) as T;
}

export async function writeJson(
  path: string,
  value: unknown,
): Promise<void> {
  await writeText(path, `${JSON.stringify(value, null, 2)}\n`);
}

export async function copyDirectory(
  source: string,
  destination: string,
  options: { overwrite?: boolean } = {},
): Promise<string[]> {
  const written: string[] = [];
  const entries = await readdir(source, { withFileTypes: true });

  for (const entry of entries) {
    const from = join(source, entry.name);
    const to = join(destination, entry.name);

    if (entry.isDirectory()) {
      await mkdir(to, { recursive: true });
      written.push(...(await copyDirectory(from, to, options)));
      continue;
    }

    if (!options.overwrite && (await pathExists(to))) {
      continue;
    }

    await mkdir(dirname(to), { recursive: true });
    await Bun.write(to, Bun.file(from));
    written.push(to);
  }

  return written;
}
