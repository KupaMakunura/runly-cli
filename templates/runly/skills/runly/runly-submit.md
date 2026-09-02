---
name: runly-submit
description: Runly handoff router — prepare a project for release or team handoff.
---

# Runly Handoff (workflow router)

You are a **lightweight router**, not the full method.

## Before anything else

1. Read **`.runly/docs/STATE.md`** — set `Workflow` to `submit`.
2. Verify all prior workflows are checked off: think, spec, plan, build, review, test, ship.
3. Confirm all required artifacts exist in `.runly/docs/`.

## Required Artifacts Checklist

- [ ] `.runly/docs/PROJECT_BRIEF.md`
- [ ] `.runly/docs/SPEC.md`
- [ ] `.runly/docs/PLAN.md`
- [ ] `.runly/docs/REVIEW_NOTES.md`
- [ ] `.runly/docs/TEST_PLAN.md`
- [ ] `.runly/docs/CLIENT_SETUP.md`
- [ ] `.runly/docs/REFLECTION.md` (project handoff)
- [ ] `README.md` (in repo root)

## Route (from registry)

`workflows.submit.preferredSkills`:

1. **zoom-out** — invoke by name; help the user prepare a concise project handoff by reviewing the full project from the outside.

## Handoff Questions to Answer

Capture the relevant answers in `REFLECTION.md`:

1. What did you build?
2. What problem does it solve?
3. Which parts did the AI agent help with?
4. Which parts did you have to correct manually?
5. What integrations, authentication, or data-design decisions matter to the next maintainer?
6. What would you improve in the next version?
7. How should another developer run, test, and extend the project?

## After this workflow

Update STATE.md: check off **submit**, `Active skill` → `none`, `Workflow` → `complete`.

Tell the user: **The project is ready for release or handoff. Share the repository, deployment URL (if applicable), and the relevant project documentation with the next owner.**

## Rules

- Do not hide what the agent wrote. The handoff must make human decisions and corrections clear.
- A complete README is required for a useful handoff.
- Focus on the project’s operational knowledge, not a learning assessment.
