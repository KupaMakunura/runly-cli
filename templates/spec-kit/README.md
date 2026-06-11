# Bundled Spec Kit

This folder is the **pinned Spec Kit release** shipped with `runly-cli`. Students get these files on `runly init` — no `uv` or `specify` CLI required.

## Layout

```txt
templates/spec-kit/
  .specify/          # copied to <project>/.specify/ on init (project root only)
  skills/            # speckit-* SKILL.md → same agent folder as grill-me, runly-*
```

On `runly init`:

- **`.specify/`** lands at the **project root** (scripts, templates, extensions).
- **`speckit-*` skills** export to the agent skills folder (e.g. `.cursor/skills/speckit-plan/`) alongside `grill-me` and `runly-think`. They are invoked by name and run their own Spec Kit workflow.

## Updating (maintainers)

After you run `specify init` or upgrade Spec Kit in a scratch project:

```bash
# From runly-cli repo root, refresh the bundle:
rm -rf templates/spec-kit
mkdir -p templates/spec-kit/skills
cp -a .specify templates/spec-kit/
for d in .agents/skills/speckit-*; do
  cp -a "$d" "templates/spec-kit/skills/$(basename "$d")"
done
```

Then bump `specKitBundle.version` in `templates/runly/registry.json`.
