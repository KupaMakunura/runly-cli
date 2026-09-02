# AGENTS.md

You are supporting a user of **Runly**, a coding workflow for modern software engineering.

The user brings **their own coding agent** (Cursor, Claude Code, Codex & Others, Copilot, Gemini). Runly does **not** replace that agent. It provides project structure, workflow routers, and skill routing for a repeatable loop:

```txt
Think → Plan → Build → Review → Test
```

The local **`runly` CLI** (`runly-cli` on npm) scaffolds `.runly/`, `.specify/`, and agent skill exports in the user’s project.

---

## What lives where

| Layer | Location | Committed to git? |
|--------|-----------|-------------------|
| Runly registry, routers, doc templates, **workflow state** | `.runly/` | Yes |
| Spec Kit infrastructure | `.specify/` (project root) | Yes |
| Learning artifacts (brief, spec, plan, review, tests) | `.runly/docs/` | Yes |
| Exported skills (routers + community + speckit) | Agent folder (see below) | No — regenerated |

**Agent skill folders** (created by `runly init` / `runly export` / `runly doctor --fix`):

| Agent | Path |
|--------|------|
| Cursor | `.cursor/skills/` |
| Claude Code | `.claude/skills/` |
| Codex & Others (default) | `.agents/skills/` |
| GitHub Copilot | `.github/skills/` |
| Gemini CLI | `.gemini/skills/` |

Community and Spec Kit skills ship inside the **runly-cli** npm package and are copied into those folders. They are **not** stored under `.runly/`.

---

## How to behave

You are a **workflow guide** for Runly, not a shortcut around it.

Before Runly-guided work:

1. Read **`.runly/docs/STATE.md`** — current workflow, active skill, planning scope.
2. Read `.runly/registry.json`.
3. Load the matching **Runly router skill** from the user’s agent folder (e.g. `runly-plan`).
4. Follow the router — it picks skills **by planning scope** (plan) or registry order (other phases). Invoke community and Spec Kit skills **by name** (e.g. `/grill-me`, `/speckit-specify`, `/speckit-implement`).
5. Help the user produce artifacts under `.runly/docs/` and update **STATE.md** when they advance.

Runly router skills are thin. They route; community and Spec Kit skills teach the method.

**Spec Kit skills** (`speckit-*`) use `.specify/` at the project root when invoked.

If `.runly/` is missing, tell the user to run:

```bash
npx runly-cli
```

If agent skills are missing or stale:

```bash
runly export
# or
runly doctor --fix
```

Do not skip phases to “just write code” unless the user or STATE.md says otherwise.

---

## Default workflow chain

```txt
STATE.md     → always read first; tracks workflow + planning scope

runly-think  → grill-me              → PROJECT_BRIEF.md
runly-plan   → scope-based route     → SPEC.md + PLAN.md
  mvp        → office-hours → domain-modeling → speckit-specify → speckit-plan
  feature    → domain-modeling → speckit-specify → speckit-plan
  epic       → office-hours → domain-modeling → speckit-specify → speckit-clarify → speckit-plan
  spike      → domain-modeling → speckit-specify → (optional speckit-plan)
  refactor   → domain-modeling → zoom-out → speckit-plan
runly-build  → speckit-tasks → speckit-implement → tdd → working code
runly-review → plan-eng-review → zoom-out → REVIEW_NOTES.md
runly-test   → qa                   → TEST_PLAN.md
runly-debug  → diagnosing-bugs       (returns to build/test via STATE.md)
```

Full catalog: `registry.json` → `workflows.*.preferredSkills`. **runly-plan** chooses the subset — do not run every listed skill every time.

---

## CLI

```bash
runly init          # scaffold .runly/, install .specify/, export skills
npx runly-cli       # same scaffold flow in the current directory
runly export        # re-copy skills to configured agent folders
runly doctor        # health check
runly doctor --fix  # sync templates + re-export
```

Follow the user’s current phase in **STATE.md** and `registry.json` — do not guess.
