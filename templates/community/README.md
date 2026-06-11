# Bundled community skills

Pinned copies of skills used by Runly workflow routers. Shipped inside the npm package — not fetched from skills.sh at init.

## Layout

```txt
templates/community/
  matt-pocock/   # grill-me, grill-with-docs, zoom-out, tdd, diagnose
  gstack/        # office-hours, plan-eng-review, review, qa
```

On `runly init`, these export directly to the student's agent skills folder (e.g. `.cursor/skills/grill-me/`). They are **not** copied into `.runly/skills/community/`.

## Updating (maintainers)

Refresh from your local `.agents/skills/` after verifying skill content, then bump `registry.version`.
