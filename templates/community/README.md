# Bundled community skills

Pinned copies of skills used by Runly workflow routers. Shipped inside the npm package — not fetched from skills.sh at init.

## Layout

```txt
templates/community/
  matt-pocock/   # grill-me/grilling, domain-modeling, zoom-out, tdd, diagnosing-bugs
  gstack/        # office-hours, plan-eng-review, review, qa
  impeccable/    # UI shaping and quality workflow (including its scripts and references)
```

On `runly init`, these export directly to the project’s agent skills folder (e.g. `.cursor/skills/grill-me/`). They are **not** copied into `.runly/skills/community/`.

## Updating (maintainers)

Refresh from the official source, verify the workflow compatibility, and then bump
`registry.version`. Community skills are copied as complete directories so skills
with scripts or references (such as Impeccable) remain functional after export.

See [UPSTREAM.md](UPSTREAM.md) for the pinned revisions in this release.
