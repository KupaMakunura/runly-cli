export const WORKFLOWS = [
  "think",
  "plan",
  "build",
  "review",
  "test",
] as const;

export type RunlyWorkflowId = (typeof WORKFLOWS)[number];

export function isRunlyWorkflow(value: string): value is RunlyWorkflowId {
  return (WORKFLOWS as readonly string[]).includes(value);
}

export function workflowSkillId(workflow: RunlyWorkflowId): string {
  return `runly-${workflow}`;
}

/** Standalone Runly skills outside the main workflow chain. */
export const STANDALONE_RUNLY_SKILLS = ["runly-debug"] as const;
