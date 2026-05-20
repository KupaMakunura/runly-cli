# Tech Stack

RunlyAI CLI is a TypeScript-first command-line product that runs locally on the learner's machine and coordinates course content, local project files, and AI agent workflows.

## Core Runtime

- Language: TypeScript
- Runtime: Bun
- Package manager: pnpm
- CLI framework: Commander
- Terminal prompts: `@clack/prompts`
- Agent runtime: OpenAI Agents SDK
- Model/API client: OpenAI SDK
- Validation: Zod

These choices are core project defaults. Internal module boundaries, test tooling, build details, and backend API contracts may evolve as the product matures.

## Architecture Rules

### Local-first execution

The CLI should run on the learner's machine and operate on the selected project directory. The local agent may read and write project files only after the learning workflow allows implementation.

### Course-aware agent behavior

Agent behavior should be driven by:

- active course module
- current lesson step
- required learner task
- project context
- approved skills
- guardrails
- system prompts
- spec review results

The agent should know what the learner is supposed to do next and should block implementation when required preparation is missing.

### Explicit validation

Inputs from config files, API responses, session state, course content, and agent/tool boundaries should be validated explicitly. Zod is the default validation tool.

### Safe configuration

Local configuration lives under `~/.runlyai/config.json` and should use restrictive file permissions. OpenAI API keys stay local and should not be sent to RunlyAI servers.

### Minimal sync surface

Sync should include learning progress, scores, checkpoints, course state, and metadata. Source code, secrets, `.env` files, and project files are excluded by default.

## Expected Modules

The README describes this intended project shape:

- `src/main.ts`: CLI entry point and command router
- `src/commands/`: login, session, config, progress, flashcards, and other command flows
- `src/agent/`: agent setup, tools, hooks, streaming, sandboxing, and telemetry
- `src/lib/`: config, API client, session handling, auth, telemetry, and storage utilities
- `src/skills/`: reusable learning and agent workflow skills

The source tree may change, but the product should keep a clear separation between CLI command handling, local agent behavior, backend communication, local storage, and learning content.

## Development Requirements

- Bun v1.0 or newer
- pnpm v8 or newer
- OpenAI API key
- RunlyAI Learn account

## Engineering Bias

Prefer clear, explicit flows over hidden automation. The codebase should make it easy to trace:

- what course step is active
- what the learner has completed
- why implementation is allowed or blocked
- what the agent is allowed to do
- what data is stored locally
- what data is synced remotely
