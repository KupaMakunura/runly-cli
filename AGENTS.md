# AGENTS.md

You are working in a **Runly** project.

Runly is a workflow layer for learning agentic software engineering. It does **not** replace your coding agent (Cursor, Claude Code, Codex, Copilot, Gemini). It routes you through structured phases and community skills.

```txt
Think → Plan → Build → Review → Test
```

---

## What lives where

| Layer | Location | Committed to git? |
|--------|-----------|-------------------|
| Runly registry, routers, doc templates, **workflow state** | `.runly/` | Yes |
| Spec Kit infrastructure | `.specify/` (project root) | Yes |
| Exported skills (routers + community + speckit) | Agent folder (see below) | No — regenerated |

**Agent skill folders** (created by `runly init` / `runly export` / `runly doctor --fix`):

| Agent | Path |
|--------|------|
| Cursor | `.cursor/skills/` |
| Claude Code | `.claude/skills/` |
| Codex & Others (default) | `.agents/skills/` |
| GitHub Copilot | `.github/skills/` |
| Gemini CLI | `.gemini/skills/` |

Community and Spec Kit skills ship inside the `runly` npm package and are copied into those folders. They are **not** stored under `.runly/`.

---

## How to behave

Before doing Runly-guided work:

1. Read **`.runly/docs/STATE.md`** — current workflow, active skill, planning scope.
2. Read `.runly/registry.json`.
3. Load the matching **Runly router skill** from your agent skills folder (e.g. `runly-plan`).
4. Follow the router — it picks skills **by planning scope** (plan) or registry order (other phases). Invoke community and Spec Kit skills **by name** (e.g. `/speckit-specify`, `/speckit-plan`).
5. Produce or update artifacts under `.runly/docs/` and update **STATE.md** when the workflow advances.

Runly router skills are thin. They do not embed full engineering methods — they point at community and Spec Kit skills.

**Spec Kit skills** (`speckit-*`) use `.specify/` at the project root when invoked.

If `.runly/` is missing, tell the user to run:

```bash
npx runly-cli init
```

If agent skills are missing or stale:

```bash
runly export
# or
runly doctor --fix
```

---

## Workflow chain (teaching default)

```txt
STATE.md     → always read first; tracks workflow + planning scope

runly-think  → grill-me              → PROJECT_BRIEF.md
runly-plan   → scope-based route     → SPEC.md + PLAN.md
  mvp        → office-hours → grill-with-docs → speckit-specify → speckit-plan
  feature    → grill-with-docs → speckit-specify → speckit-plan
  epic       → office-hours → grill-with-docs → speckit-specify → speckit-clarify → speckit-plan
  spike      → grill-with-docs → speckit-specify → (optional speckit-plan)
  refactor   → grill-with-docs → zoom-out → speckit-plan
runly-build  → speckit-tasks → speckit-implement → tdd → working code
runly-review → plan-eng-review → zoom-out → REVIEW_NOTES.md
runly-test   → qa                   → TEST_PLAN.md
runly-debug  → diagnose              (returns to build/test via STATE.md)
```

Full catalog: `registry.json` → `workflows.*.preferredSkills`. **runly-plan** chooses the subset — do not run every listed skill every time.

---

## CLI (student machine)

```bash
runly init          # scaffold .runly/, install .specify/, export skills
runly export        # re-copy skills to configured agent folders
runly doctor        # health check
runly doctor --fix  # sync templates + re-export
```

Do not guess the workflow — follow what the student and `registry.json` indicate.
