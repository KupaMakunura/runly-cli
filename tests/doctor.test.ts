import { describe, expect, test } from "vitest";
import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { initProject } from "../src/services/init.ts";
import { runDoctor } from "../src/services/doctor.ts";

describe("runDoctor", () => {
  test("reports healthy project after init", async () => {
    const root = await mkdtemp(join(tmpdir(), "runly-doctor-"));
    try {
      await initProject({
        cwd: root,
        agents: ["cursor"],
        offline: true,
      });

      const result = await runDoctor(root);
      expect(result.healthy).toBe(true);
      expect(result.issues).toHaveLength(0);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  test("fix offline restores missing exports", async () => {
    const root = await mkdtemp(join(tmpdir(), "runly-doctor-fix-"));
    try {
      await initProject({
        cwd: root,
        agents: ["cursor"],
        offline: true,
      });
      await rm(join(root, ".cursor/skills/runly-think/SKILL.md"));

      const before = await runDoctor(root);
      expect(before.healthy).toBe(false);

      const fixed = await runDoctor(root, { fix: true, offline: true });
      expect(fixed.fixed.length).toBeGreaterThan(0);

      const after = await runDoctor(root);
      expect(after.healthy).toBe(true);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  test("reports missing exports when agent copy was removed", async () => {
    const root = await mkdtemp(join(tmpdir(), "runly-doctor-"));
    try {
      await initProject({
        cwd: root,
        agents: ["cursor"],
        offline: true,
      });
      await rm(join(root, ".cursor/skills/runly-think/SKILL.md"));

      const result = await runDoctor(root);
      expect(result.healthy).toBe(false);
      expect(result.issues.some((issue) => issue.includes("runly-think"))).toBe(
        true,
      );
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
