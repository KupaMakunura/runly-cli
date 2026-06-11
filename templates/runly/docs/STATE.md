# Runly State

> **Agents:** Read this file at the start of every Runly workflow. Update it when the workflow, active skill, or planning scope changes.

## Current position

| Field | Value |
|-------|--------|
| **Workflow** | `think` |
| **Active skill** | `none` |
| **Planning scope** | `unset` |
| **Return workflow** | `none` |

### Allowed values

- **Workflow:** `think` | `plan` | `build` | `review` | `test` | `debug`
- **Planning scope** (plan only): `unset` | `mvp` | `feature` | `epic` | `spike` | `refactor`
- **Return workflow:** workflow to resume after `runly-debug` (e.g. `build`, `test`)

## Workflow progress

Check off when the artifact exists and the learner is ready to move on.

- [ ] **think** — `.runly/docs/PROJECT_BRIEF.md`
- [ ] **plan** — `.runly/docs/SPEC.md` + `.runly/docs/PLAN.md` (and Spec Kit `specs/` when used)
- [ ] **build** — working code (vertical slice from the plan)
- [ ] **review** — `.runly/docs/REVIEW_NOTES.md`
- [ ] **test** — `.runly/docs/TEST_PLAN.md`

**Next workflow after current:** see `registry.json` → `workflows.<current>.nextWorkflow`

## Notes

<!-- Instructor, learner, or agent — scope decisions, blockers, what was skipped and why -->
