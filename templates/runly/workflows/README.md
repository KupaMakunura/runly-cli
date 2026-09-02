# Workflows

Runly workflow skills (`runly-think`, `runly-spec`, `runly-plan`, …) are **routers**. They do not replace community skills — they read `.runly/registry.json` and route the user through the right skills for that step.

```txt
think → spec → plan → build → review → test → submit
                                   ↑ runly-debug anytime something breaks
```

| Router skill | Workflow | Routes to |
|--------------|----------|-----------|
| runly-think | think | grill-me |
| runly-spec | spec | domain-modeling → speckit-specify |
| runly-plan | plan | office-hours → domain-modeling → speckit-plan |
| runly-build | build | speckit-tasks → speckit-implement → tdd |
| runly-review | review | plan-eng-review → zoom-out |
| runly-test | test | qa |
| runly-submit | submit | zoom-out (project handoff) |
| runly-debug | *(on demand)* | diagnosing-bugs |

Skills live in `.runly/`. `runly export` copies them to your coding agent.
