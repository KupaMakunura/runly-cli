---
name: runly-debug
description: Runly debug router — use when something breaks during build or test.
---

# Runly Debug (standalone router)

You are a **lightweight router**, not the full method.

## Before anything else

1. Read **`.runly/docs/STATE.md`**.
2. If `Return workflow` is `none`, set it to the workflow the user came from (`build` or `test`).
3. Set `Workflow` to `debug`, `Active skill` to `diagnosing-bugs`.

## Route

1. **diagnosing-bugs** — invoke by name; reproduce, minimize, hypothesize, instrument, fix, regression-test.

## After fix

1. Set `Active skill` → `none`.
2. Set `Workflow` back to `Return workflow` (e.g. `build` or `test`).
3. Clear `Return workflow` → `none` when the user resumes the prior workflow.

## Rules

- Do not skip reproduction.
- Add a regression test when the fix is real.
