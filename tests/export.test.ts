import { describe, expect, test } from "vitest";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { initProject } from "../src/services/init.ts";
import { exportSkills } from "../src/services/export.ts";
import { pathExists, readText } from "../src/lib/fs.ts";

describe("exportSkills", () => {
  test("copies skills from .runly to agent folders", async () => {
    const root = await mkdtemp(join(tmpdir(), "runly-export-"));
    try {
      await initProject({
        cwd: root,
        agents: ["cursor"],
        offline: true,
      });

      const thinkSkill = join(root, ".cursor/skills/runly-think/SKILL.md");
      const grillSkill = join(root, ".cursor/skills/grill-me/SKILL.md");

      expect(await pathExists(thinkSkill)).toBe(true);
      expect(await pathExists(grillSkill)).toBe(true);

      const content = await readText(thinkSkill);
      expect(content).toContain("registry.json");
      expect(content).toContain("grill-me");
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  test("reads source files from .runly not from generated output", async () => {
    const root = await mkdtemp(join(tmpdir(), "runly-export-"));
    try {
      await initProject({
        cwd: root,
        agents: ["cursor"],
        offline: true,
      });

      const runlyThink = join(root, ".runly/skills/runly/runly-think.md");
      await writeFile(runlyThink, "# Custom think workflow marker\n", "utf8");

      await exportSkills(root, ["agents"]);
      const exported = await readText(
        join(root, ".agents/skills/runly-think/SKILL.md"),
      );
      expect(exported).toContain("Custom think workflow marker");
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
