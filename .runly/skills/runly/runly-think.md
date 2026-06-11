---
name: runly-think
description: Runly think router — clarifies the project before planning.
---

# Runly Think (workflow router)

You are a **lightweight router**, not the full method.

## Before anything else

1. Read **`.runly/docs/STATE.md`** — set `Workflow` to `think`, clear `Planning scope` to `unset` if starting fresh.
2. Read **`.runly/registry.json`** → `workflows.think`.

## Route (from registry)

`workflows.think.preferredSkills`:

1. **grill-me** — invoke by name; interview until the problem is clear.

## Artifact

`workflows.think.requiredArtifact` → `.runly/docs/PROJECT_BRIEF.md`

## After this workflow

Update STATE.md: `Active skill` → `none`, check off **think** when PROJECT_BRIEF exists, set `Workflow` to `plan` when the learner is ready.

Tell the learner to invoke **`runly-plan`**.

## Rules

- Invoke routed skills — do not substitute your own process.
- No specs, plans, or production code in this workflow.
