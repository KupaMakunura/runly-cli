# runly-cli

Local CLI for **[RunlyAI Learn](https://learn.runlyai.com)** — the hands-on program that teaches agentic software engineering on your machine.

RunlyAI Learn is **not** a coding agent. Students bring Cursor, Claude Code, Codex, Copilot, or Gemini. This CLI installs the **learning workflow** on their project:

- **Think → Plan → Build → Review → Test**
- Thin `runly-*` routers that point at proven skills (`/grill-me`, `/speckit-specify`, `/speckit-implement`, `/qa`, …)
- Artifacts in `.runly/docs/` so progress is visible and reviewable

The npm package is **`runly-cli`**; the command students run is **`runly`**.

---

## What it installs

| Piece | Location | Purpose |
|--------|-----------|---------|
| Learn workflow | `.runly/` | Registry, routers, `STATE.md`, doc templates |
| Spec Kit | `.specify/` | Spec-driven development infrastructure |
| Skills export | `.agents/skills/`, `.cursor/skills/`, etc. | Routers + bundled community + Spec Kit skills |

Skills are **regenerated** on the student machine — not committed to git.

---

## Install

```bash
npm install -g runly-cli
# or, in a project:
npx runly-cli init
```

Requires [Bun](https://bun.sh) to run the CLI (`#!/usr/bin/env bun`).

---

## Quick start (students)

```bash
cd your-course-project
runly init
```

`init` will:

1. Scaffold **`.runly/`** (RunlyAI Learn templates)
2. Install **`.specify/`** (Spec Kit)
3. Export skills to the agent folders you select (default: **Codex & Others** → `.agents/skills/`)
4. Create **`AGENTS.md`** if missing

Then work in your coding agent using the Learn workflow — e.g. invoke **`runly-think`**, then **`runly-plan`**, and so on.

```bash
runly export              # re-export after changing agents in registry
runly doctor              # health check
runly doctor --fix        # sync templates + re-export
runly doctor --fix --offline
```

---

## Commands

| Command | Description |
|---------|-------------|
| `runly init` | Set up RunlyAI Learn on a project |
| `runly export` | Re-export skills to configured agent folders |
| `runly doctor` | Check registry, skill files, and agent exports |
| `runly doctor --fix` | Refresh bundled templates and re-export |

---

## What students commit

```txt
.runly/
.specify/
.runly/docs/     # PROJECT_BRIEF, SPEC, PLAN, REVIEW_NOTES, TEST_PLAN, STATE.md
AGENTS.md
```

Add to **`.gitignore`** (regenerate with `runly export`):

```gitignore
.cursor/
.claude/
.agents/
.github/skills/
.gemini/
```

---

## For instructors & contributors

Bundled under `templates/` in this repo:

```txt
templates/
  runly/           # registry, runly-* routers, Learn doc templates
  spec-kit/        # .specify/ + speckit-* skills
  community/       # matt-pocock, gstack skills (classroom-pinned)
```

Course content, lessons, and certification live on **RunlyAI Learn** (cloud). This CLI is the open-source **local workflow layer** students use while building real projects.

---

## License

MIT
