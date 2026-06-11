# runly-cli

Workflow CLI for [RunlyAI](https://runlyai.com) — structured agentic engineering on your machine with your own coding agent.

Runly does **not** ship a coding model. It installs:

- **`.runly/`** — registry, workflow routers, doc templates
- **`.specify/`** — Spec Kit infrastructure (project root)
- **Agent skill exports** — routers + bundled community + Spec Kit skills into Cursor, Claude, Codex & Others (`.agents/skills/`), Copilot, or Gemini folders

Students learn: **Think → Plan → Build → Review → Test**, invoking skills like `/grill-me` and `/speckit-plan` through thin `runly-*` routers.

---

## Install

```bash
npm install -g runly-cli
# or
npx runly-cli init
```

Requires [Bun](https://bun.sh) or Node 20+ to run the CLI.

---

## Quick start

```bash
cd your-project
runly init
```

`init` will:

1. Copy `.runly/` from the package template
2. Install `.specify/` (Spec Kit)
3. Export skills to the agent folders you select
4. Create `AGENTS.md` if missing

Re-export after changing agents in `.runly/registry.json`:

```bash
runly export
```

Health check and repair:

```bash
runly doctor
runly doctor --fix
runly doctor --fix --offline   # use bundled templates only
```

---

## Commands

| Command | Description |
|---------|-------------|
| `runly init` | Scaffold `.runly/`, install `.specify/`, export skills |
| `runly export` | Re-export skills to configured agent folders |
| `runly doctor` | Check registry, skill files, and agent exports |
| `runly doctor --fix` | Sync Runly core + Spec Kit bundle + re-export |

---

## What gets committed

Commit:

- `.runly/`
- `.specify/`
- `.runly/docs/*` (artifacts)
- `AGENTS.md`

Do **not** commit agent export dirs (add to `.gitignore`):

```gitignore
.cursor/
.claude/
.agents/
.github/skills/
.gemini/
```

Regenerate with `runly export` or `runly doctor --fix`.

---

## Package layout

Bundled in the npm package (`templates/`):

```txt
templates/
  runly/           # registry, runly-* routers, docs
  spec-kit/        # .specify/ + speckit-* skills
  community/       # matt-pocock, gstack skills
```

At init, only `.runly/` and `.specify/` land in the student project. Skills are copied into the user’s agent config directories.

---

## License

MIT
