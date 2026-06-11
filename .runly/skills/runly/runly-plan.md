---
name: runly-plan
description: Runly plan router — scope-aware spec and technical planning.
---

# Runly Plan (workflow router)

You are a **lightweight router**, not the full method.

## Before anything else

1. Read **`.runly/docs/STATE.md`** — confirm or set `Workflow` to `plan`.
2. Read **`.runly/registry.json`** → `workflows.plan`.
3. Read **`.runly/docs/PROJECT_BRIEF.md`** if it exists.

## Step 1 — Choose planning scope

If `Planning scope` in STATE.md is `unset`, ask the learner **one question** to classify the work. Update STATE.md with the chosen scope before routing.

| Scope | Use when | Examples |
|-------|----------|----------|
| **mvp** | First shippable slice, greenfield, course capstone starter | "CLI with one command", "landing page + signup" |
| **feature** | One user-visible addition to an existing codebase | "Add export to CSV", "OAuth login" |
| **epic** | Large multi-story effort needing clarification before architecture | "Billing system", "multi-tenant workspaces" |
| **spike** | Time-boxed research; may throw code away | "Can we use library X?", "prototype streaming" |
| **refactor** | Improve internals; little or no new product behavior | "Split init service", "rename agent paths" |

Do not guess scope from enthusiasm — ask if unclear.

## Step 2 — Route by scope

Invoke skills **by name** in the order below. Skip a step only when this router explicitly says optional. Spec Kit skills use `.specify/` at the project root.

### `mvp`

Framing matters — do not skip product thinking on greenfield work.

1. **office-hours** — challenge demand, wedge, and scope before spec.
2. **grill-with-docs** — align with `.runly/docs/PROJECT_BRIEF.md` and update CONTEXT as needed.
3. **speckit-specify** — produce the feature spec (Spec Kit `specs/` + align `.runly/docs/SPEC.md`).
4. **speckit-plan** — technical implementation plan → `.runly/docs/PLAN.md`.

### `feature`

Existing product — lighter framing, still specify before plan.

1. **grill-with-docs** — pressure-test against current docs and code context.
2. **speckit-specify** — spec for this feature only.
3. **speckit-plan** — implementation plan for this feature.

Optional: **office-hours** if the feature changes product direction.

### `epic`

Large scope — add clarification before committing to architecture.

1. **office-hours** — force narrow wedge and success criteria.
2. **grill-with-docs** — update CONTEXT / DECISIONS as scope crystallizes.
3. **speckit-specify** — spec the first tracer bullet or phase, not the whole epic at once.
4. **speckit-clarify** — resolve underspecified areas before planning (recommended).
5. **speckit-plan** — plan for the **current slice** only; note follow-on phases in PLAN.md.

### `spike`

Research, not production. Keep artifacts short.

1. **grill-with-docs** (light) — one paragraph goal + time box in STATE.md notes.
2. **speckit-specify** — minimal spec: hypothesis, success signal, time box.
3. **speckit-plan** — **optional**; only if the spike will produce code to keep. Otherwise document findings in STATE.md notes and stop.

### `refactor`

Behavior should stay the same unless the learner explicitly expands scope.

1. **grill-with-docs** — document invariants and what must not break.
2. **zoom-out** — map modules and callers before changing structure.
3. **speckit-plan** — refactor plan → `.runly/docs/PLAN.md`.
4. **speckit-specify** — **only if** behavior or API changes; otherwise skip.

## Registry reference

Full skill catalog: `workflows.plan.preferredSkills` in registry.json:

`office-hours`, `grill-with-docs`, `speckit-specify`, `speckit-clarify`, `speckit-plan`, `zoom-out`

Your route is the **subset** for the chosen scope — not the full list every time.

## Artifacts

- **SPEC** — `.runly/docs/SPEC.md` plus Spec Kit output under `specs/` when **speckit-specify** ran.
- **PLAN** — `.runly/docs/PLAN.md` when **speckit-plan** ran (or spike notes in STATE if plan skipped).

Update STATE.md progress checkboxes when artifacts exist.

## Rules

- Do not write production code in this workflow.
- Do not run **speckit-plan** before **speckit-specify** when specify is in the route for that scope.
- When done, set STATE.md `Active skill` to `none`, check off **plan** if artifacts exist, tell the learner to invoke **`runly-build`**.
