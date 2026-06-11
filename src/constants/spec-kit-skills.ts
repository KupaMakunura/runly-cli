/** Spec Kit skills required by Runly workflow routers. */
export const RUNLY_SPEC_KIT_SKILL_IDS = [
  "speckit-specify",
  "speckit-clarify",
  "speckit-plan",
  "speckit-tasks",
  "speckit-implement",
] as const;

/** Full set of Spec Kit skills shipped in templates/spec-kit/skills/. */
export const BUNDLED_SPEC_KIT_SKILL_IDS = [
  "speckit-constitution",
  ...RUNLY_SPEC_KIT_SKILL_IDS,
  "speckit-analyze",
  "speckit-checklist",
  "speckit-taskstoissues",
  "speckit-agent-context-update",
  "speckit-git-commit",
  "speckit-git-feature",
  "speckit-git-initialize",
  "speckit-git-remote",
  "speckit-git-validate",
] as const;

export type BundledSpecKitSkillId = (typeof BUNDLED_SPEC_KIT_SKILL_IDS)[number];

export const SPEC_KIT_BUNDLE_VERSION = "0.10.2";
