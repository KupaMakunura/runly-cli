---
name: runly-review
description: Runly review router — engineering review of the code that was built.
---

# Runly Review (workflow router)

You are a **lightweight router**, not the full method.

## Before anything else

1. Read **`.runly/docs/STATE.md`** — set `Workflow` to `review`.
2. Read **`.runly/registry.json`** → `workflows.review`.

## Route (from registry)

`workflows.review.preferredSkills`:

1. **plan-eng-review** — invoke by name; architecture, data flow, edge cases, tests in real code.
2. **zoom-out** — invoke by name; how the change fits the wider codebase.

If a preferred skill is missing, use `workflows.review.fallbackSkills` (e.g. **review**).

## Artifact

`workflows.review.requiredArtifact` → `.runly/docs/REVIEW_NOTES.md`

## After this workflow

Update STATE.md: check off **review**, `Active skill` → `none`. Tell the learner to invoke **`runly-test`**.

## Rules

- Review **code that exists**, not the plan alone.
