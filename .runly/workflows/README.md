# Workflows

Runly workflow skills (`runly-think`, `runly-plan`, …) are **routers**. They do not replace community skills — they read `.runly/registry.json` and route the learner through the right skills for that step.

```txt
think → plan → build → review → test
              ↑ runly-debug anytime something breaks
```

| Router skill | Workflow | Routes to |
|--------------|----------|-----------|
| runly-think | think | grill-me |
| runly-plan | plan | office-hours → grill-with-docs → speckit-plan |
| runly-build | build | speckit-tasks → speckit-implement → tdd |
| runly-review | review | plan-eng-review → zoom-out |
| runly-test | test | qa |
| runly-debug | *(on demand)* | diagnose |

Skills live in `.runly/`. `runly export` copies them to your coding agent.
