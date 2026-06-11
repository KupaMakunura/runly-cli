import { z } from "zod";
import { WORKFLOWS } from "../constants/workflows.ts";
import { AGENTS } from "../constants/agents.ts";

export const workflowDefinitionSchema = z.object({
  goal: z.string().min(1),
  preferredSkills: z.array(z.string()),
  fallbackSkills: z.array(z.string()),
  requiredArtifact: z.string().min(1),
  nextWorkflow: z.enum(WORKFLOWS).optional(),
});

export const skillDefinitionSchema = z.object({
  source: z.string().min(1),
  path: z.string().min(1),
  purpose: z.string().min(1),
  ownedByRunly: z.boolean(),
  /** Name passed to `npx skills add -s` when it differs from the registry key */
  skillsName: z.string().optional(),
});

export const specKitBundleSchema = z.object({
  version: z.string().min(1),
});

export const skillSourceSchema = z.object({
  type: z.enum(["local", "skills", "github", "bundled"]),
  path: z.string().min(1),
  /** skills.sh package slug, e.g. mattpocock/skills */
  package: z.string().optional(),
  /**
   * When the package installs one umbrella skill folder (e.g. garrytan/gstack → gstack/),
   * community skills are read from `.agents/skills/<bundleSkill>/<skillName>/SKILL.md`.
   */
  bundleSkill: z.string().optional(),
  /** legacy github repo slug */
  repo: z.string().optional(),
});

export const syncConfigSchema = z.object({
  runlyRepo: z.string().min(1),
  ref: z.string().default("main"),
  templatesPath: z.string().default("templates/runly"),
});

export const registrySchema = z.object({
  version: z.string().min(1),
  export: z
    .object({
      agents: z.array(z.enum(AGENTS)).min(1),
    })
    .optional(),
  sync: syncConfigSchema.optional(),
  specKitBundle: specKitBundleSchema.optional(),
  sources: z.record(z.string(), skillSourceSchema),
  skills: z.record(z.string(), skillDefinitionSchema),
  workflows: z.record(z.enum(WORKFLOWS), workflowDefinitionSchema),
});

export type RunlyRegistry = z.infer<typeof registrySchema>;
export type RunlyWorkflow = z.infer<typeof workflowDefinitionSchema>;
export type RunlySkillSource = z.infer<typeof skillSourceSchema>;
export type RunlySyncConfig = z.infer<typeof syncConfigSchema>;
export type RunlySpecKitBundle = z.infer<typeof specKitBundleSchema>;
