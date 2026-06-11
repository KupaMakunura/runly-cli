# Workflows

The default Runly path is five steps:

```txt
think → plan → build → review → test
```

| Workflow | Skill | What it does |
|----------|-------|----------------|
| think | runly-think | Clarify the idea (grill-me) |
| plan | runly-plan | Spec + plan together (grill-with-docs, speckit-plan) |
| build | runly-build | Tasks from plan, then TDD |
| review | runly-review | Code review |
| test | runly-test | QA verification |

**Standalone:** `runly-debug` — invoke when a bug appears during build or test (routes to diagnose).

Skills live in `.runly/`. `runly export` copies them to your coding agent.
