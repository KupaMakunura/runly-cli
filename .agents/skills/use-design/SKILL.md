---
name: use-design
description: Strictly follow this repo's design system before changing frontend UI. Use this whenever the user asks to build, redesign, normalize, polish, simplify, clarify, or review UI in this project, especially alongside frontend-design, polish, distill, clarify, normalize, or web-design-guidelines.
user-invokable: true
args:
  - name: target
    description: The page, component, route, or feature to align with the design system
    required: false
---

# Use Design

Follow the repo's design system first. Creative UI work is allowed only after the existing system is understood and respected.

## Required Context

Before editing UI:

1. Read `DESIGN.md`.
2. Inspect the target file.
3. Inspect at least one nearby or referenced page/component that already represents the intended pattern.
4. Prefer existing components from `apps/web/components/ui/` and shared components from `apps/web/components/`.

Do not invent a new visual language when the repo already has one.

## Design Rules

- Use the colors, typography, radii, spacing, and component direction from `DESIGN.md`.
- Keep cards simple: clear label, strong value/title, useful supporting text.
- Avoid nested cards, decorative gradients, glass effects, glow, heavy shadows, and noisy icon containers.
- Use icons only when they clarify scanning or action recognition.
- Keep copy short, specific, and consistent with surrounding pages.
- Use existing shadcn-style UI components instead of one-off markup.
- Use design tokens and Tailwind theme classes before hard-coded colors.
- Match the density and information hierarchy of nearby operational pages.

## Working With Other Design Skills

When combined with other skills, apply them in this order:

1. `use-design`: establish the repo design rules and matching reference UI.
2. `frontend-design`: improve the interface within those constraints.
3. `distill`: remove visual and content clutter.
4. `clarify`: tighten labels, descriptions, empty states, and action copy.
5. `normalize`: align components, spacing, and tokens with the system.
6. `polish`: final pass for alignment, responsiveness, states, and details.

## Verification

Before finishing:

- Compare the result against `DESIGN.md`.
- Compare the result against the referenced page/component.
- Check responsive behavior.
- Run the relevant typecheck or lint command when available.
- Mention any verification that could not be run.
