---
name: frontend-crud-guardrails
description: Use when building or refactoring CRUD-heavy frontend settings/admin pages and the goal is consistent, table-first workflows, explicit required select choices with no hidden defaults, and badge styling that stays aligned with an established module pattern such as EMV limits.
---

# Frontend CRUD Guardrails

Apply these rules when wiring backend CRUD into an existing admin or settings page.

## Workflow

1. Check the existing page before redesigning it.
2. Keep the dominant work surface as a table if the module already uses table-driven CRUD.
3. Reuse backend-derived types from tRPC or shared contracts where possible.
4. Add local UI-only types only when the form needs states the backend type cannot represent, such as an unselected required field.
5. Verify loading, empty, error, and pending mutation states before finishing.

## Table-First Rule

- Preserve the established table workflow unless the user explicitly asks for a different interaction model.
- Do not replace a working table flow with tabs, cards, or segmented layouts just to reorganize the page.
- Keep primary actions close to the table header and row actions inside the table.

## Required Select Rule

- For required `Select` inputs in create flows, start with no selected value.
- Do not prefill required selects from a filter, the first fetched record, or a guessed default.
- Show a placeholder such as `Select currency` or `Select tariff group`.
- Validate before save and stop submission if the user has not made an explicit choice.
- Editing an existing record may pre-populate the current saved value.

## Badge Consistency Rule

- If a related module already defines a recognizable badge treatment, reuse that visual pattern instead of inventing a new one.
- For currency-like badges, keep the same class logic and color mapping across modules when the meaning matches.
- If there is no established badge treatment, prefer the closest shared design-system pattern over a custom variant.

## Type Rule

- Infer API data and mutation input types from `AppRouter` or the shared contract instead of redeclaring server shapes locally.
- Keep a separate local form type only when it represents UI state rather than API state.
- Document that separation in code with a concise type name, for example `FormDraft`.

## Done Check

- Create dialogs require explicit selection for required selects.
- Edit dialogs retain saved selections.
- Tables stay as the primary CRUD surface.
- Badge styling matches the established module pattern.
- The page typechecks after the refactor.
