import { describe, expect, test } from "vitest";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import {
  DEFAULT_RUNLY_AGENT,
  defaultAgentsForInit,
  detectInstalledAgents,
} from "../src/lib/detect-agents.ts";
import { resolveAgent } from "../src/constants/agents.ts";
import { initProject } from "../src/services/init.ts";
import { pathExists, readText } from "../src/lib/fs.ts";

describe("detectInstalledAgents", () => {
  test("returns empty when no agent folders exist", async () => {
    const root = await mkdtemp(join(tmpdir(), "runly-detect-"));
    try {
      expect(await detectInstalledAgents(root)).toEqual([]);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  test("detects cursor and agents from folder markers", async () => {
    const root = await mkdtemp(join(tmpdir(), "runly-detect-"));
    try {
      await mkdir(join(root, ".cursor"));
      await mkdir(join(root, ".agents"));
      const detected = await detectInstalledAgents(root);
      expect(detected).toContain("cursor");
      expect(detected).toContain("agents");
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});

describe("defaultAgentsForInit", () => {
  test("uses agents (.agents/skills) when nothing is detected", () => {
    expect(defaultAgentsForInit([])).toEqual([DEFAULT_RUNLY_AGENT]);
    expect(DEFAULT_RUNLY_AGENT).toBe("agents");
  });

  test("keeps detected agents when present", () => {
    expect(defaultAgentsForInit(["cursor", "claude"])).toEqual([
      "cursor",
      "claude",
    ]);
  });
});

describe("resolveAgent", () => {
  test("maps legacy codex alias to agents", () => {
    expect(resolveAgent("codex")).toBe("agents");
    expect(resolveAgent("agents")).toBe("agents");
  });
});

describe("initProject default agent", () => {
  test("exports to .agents/skills when no agents flag and empty project", async () => {
    const root = await mkdtemp(join(tmpdir(), "runly-init-default-"));
    try {
      await initProject({ cwd: root, offline: true });

      expect(
        await pathExists(join(root, ".agents/skills/runly-think/SKILL.md")),
      ).toBe(true);

      const registry = JSON.parse(
        await readText(join(root, ".runly/registry.json")),
      );
      expect(registry.export.agents).toEqual(["agents"]);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  test("accepts --agent codex as alias for agents export path", async () => {
    const root = await mkdtemp(join(tmpdir(), "runly-init-codex-alias-"));
    try {
      await initProject({
        cwd: root,
        agents: ["codex"],
        offline: true,
      });

      const registry = JSON.parse(
        await readText(join(root, ".runly/registry.json")),
      );
      expect(registry.export.agents).toEqual(["agents"]);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
