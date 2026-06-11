---
name: runly-build
description: Runly build router — plan slice, tasks, then TDD.
---

# Runly Build (workflow router)

You are a **lightweight router**, not the full method.

## Before anything else

1. Read **`.runly/docs/STATE.md`** — set `Workflow` to `build`.
2. Read **`.runly/registry.json`** → `workflows.build`.
3. Confirm **`.runly/docs/SPEC.md`** (or Spec Kit `specs/`) exists unless scope was `refactor`-only.

## Route (from registry)

`workflows.build.preferredSkills` in order:

1. **speckit-plan** — invoke by name; technical plan for **this build slice** (uses `.specify/`). Run when PLAN.md is missing, stale, or the learner is building one tracer bullet from an epic. If PLAN.md is already current for this slice, invoke briefly to confirm scope then continue.
2. **speckit-tasks** — invoke by name; break the plan into ordered tasks.
3. **tdd** — invoke by name; red-green-refactor implementation.

## Artifact

`workflows.build.requiredArtifact` → **working-code** (runnable slice, not stubs).

Update **`.runly/docs/PLAN.md`** when **speckit-plan** changes the plan during build.

## When something breaks

Set STATE.md `Return workflow` to `build`, `Workflow` to `debug`, invoke **`runly-debug`**.

## After this workflow

Update STATE.md: check off **build** when code runs, `Active skill` → `none`. Tell the learner to invoke **`runly-review`**.

## Rules

- Invoke in order: **plan → tasks → tdd** for this slice.
- Stay inside the plan unless the learner expands scope (then return to **`runly-plan`** for product/spec work).
