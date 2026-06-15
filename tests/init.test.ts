import { describe, expect, test } from "vitest";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { initProject } from "../src/services/init.ts";
import { pathExists, readText } from "../src/lib/fs.ts";

describe("initProject", () => {
  test("creates .runly with registry and workflow skills only", async () => {
    const root = await mkdtemp(join(tmpdir(), "runly-init-"));
    try {
      await initProject({
        cwd: root,
        agents: ["cursor", "claude"],
        offline: true,
      });

      expect(await pathExists(join(root, ".runly/registry.json"))).toBe(true);
      expect(await pathExists(join(root, ".runly/docs/STATE.md"))).toBe(true);
      expect(await pathExists(join(root, ".runly/config.json"))).toBe(false);
      expect(await pathExists(join(root, ".runly/state.json"))).toBe(false);
      expect(await pathExists(join(root, ".runly/course.json"))).toBe(false);
      expect(
        await pathExists(join(root, ".runly/skills/runly/runly-think.md")),
      ).toBe(true);
      expect(
        await pathExists(join(root, ".cursor/skills/runly-think/SKILL.md")),
      ).toBe(true);
      expect(
        await pathExists(join(root, ".cursor/skills/grill-me/SKILL.md")),
      ).toBe(true);
      expect(
        await pathExists(join(root, ".runly/skills/community")),
      ).toBe(false);

      const registry = JSON.parse(
        await readText(join(root, ".runly/registry.json")),
      );
      expect(registry.export.agents).toEqual(["cursor", "claude"]);
      expect(registry.workflows.think.preferredSkills).toContain("grill-me");
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  test("refuses to overwrite without force", async () => {
    const root = await mkdtemp(join(tmpdir(), "runly-init-"));
    try {
      await initProject({
        cwd: root,
        agents: ["cursor"],
        offline: true,
      });

      await expect(
        initProject({
          cwd: root,
          agents: ["cursor"],
          offline: true,
        }),
      ).rejects.toThrow(
        ".runly already exists",
      );
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  test("preserves an existing AGENTS.md file", async () => {
    const root = await mkdtemp(join(tmpdir(), "runly-init-"));
    try {
      const agentsPath = join(root, "AGENTS.md");
      await writeFile(agentsPath, "# Existing agent instructions\n", "utf8");

      await initProject({
        cwd: root,
        agents: ["cursor"],
        offline: true,
      });

      expect(await readText(agentsPath)).toBe("# Existing agent instructions\n");
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
