---
name: runly-build
description: Runly build router — tasks, implement, then TDD.
---

# Runly Build (workflow router)

You are a **lightweight router**, not the full method.

## Before anything else

1. Read **`.runly/docs/STATE.md`** — set `Workflow` to `build`.
2. Read **`.runly/registry.json`** → `workflows.build`.
3. Confirm **`.runly/docs/PLAN.md`** exists (and SPEC / `specs/` unless scope was `refactor`-only).

## Route (from registry)

`workflows.build.preferredSkills` in order:

1. **speckit-tasks** — invoke by name; break the plan into ordered tasks (`tasks.md` via `.specify/`).
2. **speckit-implement** — invoke by name; execute the tasks and produce working code.
3. **tdd** — invoke by name; red-green-refactor on anything still rough, add tests, harden the slice.

## Artifact

`workflows.build.requiredArtifact` → **working-code** (runnable slice, not stubs).

## When something breaks

Set STATE.md `Return workflow` to `build`, `Workflow` to `debug`, invoke **`runly-debug`**.

## After this workflow

Update STATE.md: check off **build** when code runs, `Active skill` → `none`. Tell the learner to invoke **`runly-review`**.

## Rules

- Invoke in order: **tasks → implement → tdd**.
- Planning belongs in **`runly-plan`** — do not substitute **speckit-plan** here.
- Stay inside the plan unless the learner expands scope (then return to **`runly-plan`**).
