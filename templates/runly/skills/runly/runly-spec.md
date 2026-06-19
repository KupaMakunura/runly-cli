---
name: runly-spec
description: Runly spec router — defines tools, inputs, outputs, and auth rules before planning.
---

# Runly Spec (workflow router)

You are a **lightweight router**, not the full method.

## Before anything else

1. Read **`.runly/docs/STATE.md`** — set `Workflow` to `spec`.
2. Read **`.runly/registry.json`** → `workflows.spec`.
3. Confirm **`.runly/docs/PROJECT_BRIEF.md`** exists. If it does not, tell the learner to run **`runly-think`** first.

## Route (from registry)

`workflows.spec.preferredSkills` in order:

1. **grill-with-docs** — invoke by name; challenge the spec assumptions against the brief.
2. **speckit-specify** — invoke by name; produce the full spec document with tool definitions, inputs, outputs, and acceptance criteria.

## Artifact

`workflows.spec.requiredArtifact` → `.runly/docs/SPEC.md`

## After this workflow

Update STATE.md: check off **spec**, `Active skill` → `none`. Tell the learner to invoke **`runly-plan`**.

## Rules

- No implementation in this workflow. Spec only.
- Every tool must have explicit input schema, output schema, auth behavior, and error cases.
- Do not let the learner skip auth rules — they belong in the spec.
