---
name: runly-submit-project
description: Runly submit-project router — final reflection and submission package.
---

# Runly Submit Project (workflow router)

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
- [ ] `.runly/docs/REFLECTION.md`
- [ ] `README.md` (in repo root)

## Route (from registry)

`workflows.submit.preferredSkills`:

1. **zoom-out** — invoke by name; help the learner write the final reflection by reviewing the full project from the outside.

## Reflection Questions to Answer

The learner must answer all 10 questions in `REFLECTION.md`:

1. What did you build?
2. What problem does it solve?
3. Which parts did the AI agent help with?
4. Which parts did you have to correct manually?
5. What did you learn about MCP tools?
6. What did you learn about authentication?
7. What did you learn about database design?
8. What would you improve in version 2?
9. How would you explain this project to another developer?
10. What mistakes did you make during the build?

## After this workflow

Update STATE.md: check off **submit**, `Active skill` → `none`, `Workflow` → `complete`.

Tell the learner: **You are done. Submit your GitHub repo URL, deployed server URL, and all `.runly/docs/` artifacts for certificate review.**

## Rules

- Do not hide what the agent wrote. The reflection must explain what the learner understood and what they corrected.
- A complete README is not optional — it is a submission requirement.
- The reflection is how the learner proves they understood the project, not the code.
