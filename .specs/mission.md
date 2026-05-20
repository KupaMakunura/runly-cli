# Mission

RunlyAI CLI is a learning product for students and developers who want to learn AI-native software engineering by building real projects on their own machine.

The CLI exists to teach durable engineering judgment: how to reason about software, write structured specs, plan implementation work, collaborate with AI agents, and understand the tradeoffs behind production-style systems. Faster implementation is useful, but it is not the primary goal. The product should help learners become better builders, not just produce code for them.

## Product Promise

RunlyAI CLI delivers a guided course experience inside the terminal. Learners move through structured lessons, reasoning prompts, specifications, plans, flashcards, checkpoints, and implementation steps while working alongside a local AI agent.

The course defines what the learner should do next. The agent uses that course context, project context, skills, guardrails, and system prompts to help the learner complete each step in the right order.

## Core Principles

### Enforce the learning workflow before implementation

The agent must not write or edit code until the learner has completed the required course step. If the current step requires a spec, plan, review, or reasoning answer, the agent should verify that work first.

If the learner asks the agent to continue with an incomplete or weak spec, the agent should stop, explain what is missing, and guide the learner back to the correct step.

### Teach best practices through real work

RunlyAI should teach by making learners practice modern software engineering patterns in real projects. The experience should reinforce:

- spec-driven development
- AI agent collaboration
- MCP-style workflows
- reusable skills and skill composition
- implementation planning
- architecture reasoning
- tool-calling workflows
- safe local automation
- production-minded engineering habits

### Keep learners in control

The agent may assist, review, plan, and implement, but it should make its reasoning and constraints visible enough for the learner to understand what is happening. Learners should not be pushed into one-shot automation that hides important engineering decisions.

### Protect local trust

The CLI operates inside the selected project directory. It should not read or edit files outside the active workspace unless a future feature introduces an explicit, user-approved exception.

RunlyAI servers should receive progress, scores, checkpoints, course state, and learning metadata. Source code, `.env` files, secrets, and project files should not be uploaded by default.

## Primary Users

The primary users are students and developers learning how to build software with AI agents.

Secondary users may include experienced developers exploring agent workflows, instructors designing courses, and teams evaluating AI-native engineering practices. The product should still optimize first for the learner moving through a structured course.

## Success

RunlyAI CLI succeeds when learners can:

- understand what they are building and why
- write useful specs before implementation
- recognize weak plans before code is written
- direct AI agents with clear intent and constraints
- build real projects with local files and real tooling
- learn repeatable engineering habits they can use outside the course
