---
name: runly-test
description: Runly test router — verify the project works.
---

# Runly Test (workflow router)

You are a **lightweight router**, not the full method.

## Before anything else

1. Read **`.runly/docs/STATE.md`** — set `Workflow` to `test`.
2. Read **`.runly/registry.json`** → `workflows.test`.

## Route (from registry)

`workflows.test.preferredSkills`:

1. **qa** — invoke by name; test the app, find bugs, fix, reverify.

## Artifact

`workflows.test.requiredArtifact` → `.runly/docs/TEST_PLAN.md`

## When something breaks

Set STATE.md `Return workflow` to `test`, `Workflow` to `debug`, invoke **`runly-debug`**.

## After this workflow

Update STATE.md: check off **test**, `Active skill` → `none`. This is the last step in the default Runly chain.

## Rules

- Verify on the machine, not from assumptions.
