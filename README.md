````md
# runlyai-cli

The official CLI for [RunlyAI Learn](https://learn.runlyai.com) — an AI-native learning platform that teaches students and developers how to build modern software using AI agents, spec-driven development, MCP workflows, reusable skills, and real-world engineering practices.

RunlyAI Learn helps you learn by building real projects directly on your machine while working alongside AI agents.

---

# What it does

- Delivers lessons, reasoning prompts, and flashcards directly in your terminal
- Runs an AI agent locally that can read and write real project files
- Reviews and grades your specs before implementation
- Teaches modern AI-native software engineering workflows
- Helps students learn concepts like:
  - Spec-driven development
  - MCP workflows
  - AI agent collaboration
  - Reusable skills and skill composition
  - AI-assisted architecture planning
  - Tool-calling workflows
  - Modern AI engineering patterns
- Guides students through building real production-style projects
- Syncs learning progress and scores to the RunlyAI dashboard
- Awards a certificate of completion after finishing a course

---

# What you learn

RunlyAI Learn focuses on teaching students how modern engineers build software with AI.

Students learn how to:

- Think before prompting
- Write structured specifications
- Break features into reasoning steps
- Work effectively with AI coding agents
- Use MCP-style workflows and reusable skills
- Understand modern AI engineering patterns
- Build production-ready applications with AI assistance

The goal is not just generating code — it is learning how to direct AI systems effectively while understanding architecture, reasoning, and implementation.

---

# Installation

## Mac / Linux

```bash
curl -fsSL https://runlyai.com/install.sh | sh
```

## Windows

```powershell
powershell -c "irm https://runlyai.com/install.ps1 | iex"
```

---

# Getting started

## Log in

```bash
runly login
```

## Start learning

```bash
runly
```

Once inside a session, students interact with the platform using slash commands and natural language prompts.

Example:

```txt
/spec authentication flow
/plan
/implement
```

---

# Commands

| Command | Description |
|---|---|
| `runly login` | Authenticate with your RunlyAI Learn account |
| `runly` | Start or resume the interactive learning session |

---

# In-session slash commands

| Slash command | Description |
|---|---|
| `/spec` | Open spec-writing mode |
| `/review-spec` | Review and grade your spec |
| `/plan` | Generate an implementation plan |
| `/implement` | Let the agent implement the current feature |
| `/flashcards` | Review flashcards from the current phase |
| `/progress` | View progress and spec scores |
| `/checkpoint` | Save a learning checkpoint |
| `/sync` | Sync progress to your dashboard |
| `/help` | Show available commands |

---

# How it works

When you start a lesson, the CLI:

1. Fetches lesson content and agent instructions from the RunlyAI Learn server
2. Exchanges your account token for a short-lived session key
3. Runs an AI agent locally using your OpenAI API key
4. Allows the agent to read, write, and modify files in your project directory
5. Guides you through reasoning and specification phases before implementation
6. Reviews and grades your specs before writing code
7. Teaches modern AI workflows while building a real project
8. Syncs progress, scores, checkpoints, and learning metadata back to your dashboard

Your OpenAI API key is stored locally on your machine and is never sent to RunlyAI servers.

---

# Example workflow

```txt
$ runly

Welcome to RunlyAI Learn.

Project:
Build an AI SaaS Application

Current module:
Authentication

What would you like to do?

/spec
/plan
/implement
```

---

# Local config

Local configuration is stored at:

```txt
~/.runlyai/config.json
```

The file should be created with `0o600` permissions.

Example:

```json
{
  "student_id": "stu_abc123",
  "runlyai_token": "rly_...",
  "enrolled_courses": ["course_foundations"],
  "openai_key": "sk-..."
}
```

---

# Development

```bash
# Clone the repo
git clone https://github.com/KupaMakunura/runlyai-cli
cd runlyai-cli

# Install dependencies
pnpm install

# Run in development mode
bun run src/main.ts

# Build
pnpm build
```

---

# Requirements

- [Bun](https://bun.sh) v1.0+
- [pnpm](https://pnpm.io) v8+
- An [OpenAI API key](https://platform.openai.com)
- A RunlyAI Learn account at [learn.runlyai.com](https://learn.runlyai.com)

---

# Project structure

```txt
src/
  main.ts                  # Entry point and command router

  commands/
    login.ts               # Authentication flow
    session.ts             # Main interactive learning session

  slash/
    spec.ts                # /spec
    review-spec.ts         # /review-spec
    plan.ts                # /plan
    implement.ts           # /implement
    flashcards.ts          # /flashcards
    progress.ts            # /progress
    checkpoint.ts          # /checkpoint
    sync.ts                # /sync
    help.ts                # /help

  agent/
    index.ts               # Agent setup and runner
    tools.ts               # Agent tools and tool registry
    hooks.ts               # Tool call and lifecycle hooks
    stream.ts              # Streams agent output to terminal
    sandbox.ts             # Workspace and execution sandbox
    telemetry.ts           # Skill and tool usage metadata

  skills/
    spec-driven-dev/       # Spec-driven development skill
    mcp-basics/            # MCP workflow skill
    ai-planning/           # AI planning and reasoning skill

  lib/
    config.ts              # Read/write ~/.runlyai/config.json
    api.ts                 # HTTP client for learn.runlyai.com
    session.ts             # Session token exchange
    auth.ts                # requireAuth() guard
    telemetry.ts           # Event tracking
    storage.ts             # Local persistence utilities
```

---

# Security notes

- The CLI only operates inside the selected project directory
- API keys are stored locally and are never sent to RunlyAI servers
- Progress sync only includes metadata, scores, and learning state
- Source code, `.env` files, and secrets should not be uploaded by default
- The AI agent runs locally on the student's machine

---

# Philosophy

RunlyAI Learn is built around the idea that the future of software engineering is not just writing code manually — it is learning how to reason, plan, structure, and direct AI systems effectively.

The platform teaches students how to become modern AI-native builders by combining:

- Engineering fundamentals
- Structured reasoning
- Spec-driven development
- AI agents
- MCP workflows
- Modern software tooling
- Real-world project building

The focus is not replacing engineers with AI.

The focus is teaching engineers how to work effectively with AI.

---

# License

MIT
````
