# Roadmap

This roadmap describes where RunlyAI CLI is going. The current repository may not yet implement every item. The roadmap should guide future specs and implementation plans.

## Phase 1: CLI Foundation

Create the basic command-line shell and local project structure.

- initialize the `runly` CLI entry point
- support `runly login`
- support starting or resuming an interactive learning session
- load and save local config from `~/.runlyai/config.json`
- establish clear command routing
- define local error handling and terminal output patterns

## Phase 2: Authentication and Session Setup

Authenticate learners and prepare the local session context.

- authenticate with a RunlyAI Learn account
- store the RunlyAI token locally with safe permissions
- exchange account credentials for short-lived session keys
- confirm the learner has access to enrolled courses
- keep the OpenAI API key local

## Phase 3: Course and Lesson Flow

Make the CLI aware of the structured course path.

- fetch enrolled course content
- identify the active course, module, lesson, and step
- show the learner what they should do next
- support lesson prompts, reasoning tasks, and flashcards
- track local progress through course steps
- make course state available to the agent

## Phase 4: Spec Workflow and Review Gate

Require learners to complete strong specs before implementation.

- support `/spec`
- support `/review-spec`
- review specs against the active course objective
- grade whether the spec includes goal, constraints, acceptance criteria, risks, and reasoning
- block implementation when the required spec work is incomplete
- guide the learner back to the missing piece instead of writing code prematurely

## Phase 5: Planning Workflow

Help learners turn approved specs into implementation plans.

- support `/plan`
- generate step-by-step implementation plans
- connect each plan to the approved spec
- identify dependencies, risks, files, and verification steps
- require enough planning before implementation begins

## Phase 6: Local Agent Execution

Allow the agent to implement only after the learning workflow permits it.

- support `/implement`
- run the agent locally in the selected project directory
- enforce workspace boundaries
- load relevant skills and guardrails
- stream agent output to the terminal
- track tool calls and implementation metadata
- prevent file edits when course prerequisites are missing

## Phase 7: Checkpoints, Progress, and Sync

Persist learning progress locally and sync safe metadata to RunlyAI.

- support `/checkpoint`
- support `/progress`
- support `/sync`
- sync progress, scores, checkpoints, course state, and learning metadata
- avoid uploading source code, `.env` files, secrets, or project files by default

## Phase 8: Certification

Award completion only after the learning and grading systems are reliable.

- calculate course completion from verified progress
- include spec scores and checkpoint history
- issue certificates after the required modules are complete
- make completion criteria transparent to learners

## Later Product Questions

These topics need separate specs before implementation:

- spec grading rubric
- course content schema
- lesson state machine
- agent permission model
- skill packaging and selection
- checkpoint format
- telemetry policy
- offline behavior
- instructor/course creator tools
