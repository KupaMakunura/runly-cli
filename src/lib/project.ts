import { join } from "node:path";
import { registrySchema, type RunlyRegistry } from "./schemas.ts";
import { readJson } from "./fs.ts";
import { requireRunlyRoot, runlyDir } from "./paths.ts";
import { resolveAgents, type RunlyAgent } from "../constants/agents.ts";
import { DEFAULT_RUNLY_AGENT } from "./detect-agents.ts";
import { WORKFLOWS, type RunlyWorkflowId } from "../constants/workflows.ts";

export type RunlyProject = {
  root: string;
  registry: RunlyRegistry;
};

const LEGACY_NEXT: Record<string, RunlyWorkflowId | undefined> = {
  spec: "plan",
  ship: "test",
  reflect: undefined,
};

function migrateRegistry(raw: Record<string, unknown>): Record<string, unknown> {
  if (raw.modes && !raw.workflows) {
    raw.workflows = raw.modes;
    delete raw.modes;
  }

  const workflows = raw.workflows as Record<string, Record<string, unknown>> | undefined;
  if (workflows) {
    for (const key of ["ship", "reflect"]) {
      delete workflows[key];
    }

    for (const workflow of Object.values(workflows)) {
      const next = workflow.nextWorkflow as string | undefined;
      if (!next) {
        continue;
      }

      if (!(WORKFLOWS as readonly string[]).includes(next)) {
        workflow.nextWorkflow = LEGACY_NEXT[next];
        if (!workflow.nextWorkflow) {
          delete workflow.nextWorkflow;
        }
      }
    }
  }

  return raw;
}

export async function loadProject(startDir = process.cwd()): Promise<RunlyProject> {
  const root = await requireRunlyRoot(startDir);
  const raw = migrateRegistry(
    (await readJson(join(runlyDir(root), "registry.json"))) as Record<
      string,
      unknown
    >,
  );
  const registry = registrySchema.parse(raw);

  return { root, registry };
}

export function exportAgents(project: RunlyProject): RunlyAgent[] {
  const configured = project.registry.export?.agents ?? [DEFAULT_RUNLY_AGENT];
  const resolved = resolveAgents(configured);
  return resolved.length > 0 ? resolved : [DEFAULT_RUNLY_AGENT];
}

export function skillFilePath(projectRoot: string, registryPath: string): string {
  return join(projectRoot, registryPath);
}
