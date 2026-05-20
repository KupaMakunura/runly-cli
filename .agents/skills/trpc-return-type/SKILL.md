---
name: trpc-return-type
description: Standardize tRPC procedure return values to a single envelope with `message`, `pop`, and `data`. Use when creating or refactoring tRPC procedures so queries and mutations return a consistent object shape instead of raw arrays, objects, or primitives.
---

# Trpc Return Type

## Overview

Use this skill when editing tRPC procedures that should return one consistent envelope:

```ts
{
  message: "success" | "error";
  pop: string;
  data: T;
}
```

Keep the shape stable across procedures so callers can rely on the same response contract.

## Rules

- Return an object, never a bare array, string, boolean, or primitive.
- Use `message: "success"` for successful mutations and reads.
- Use `message: "error"` only when returning a handled failure envelope.
- Use `pop` for the short user-facing sentence, such as `User created successfully`.
- Put the actual payload in `data`, either as an object or array depending on the result.
- Keep `data` typed so the procedure still reflects the real shape of the payload.

## Patterns

Successful mutation:

```ts
return {
  message: "success",
  pop: "Client created successfully",
  data: createdClient,
};
```

Successful list query:

```ts
return {
  message: "success",
  pop: "Clients loaded successfully",
  data: clients,
};
```

Handled error:

```ts
return {
  message: "error",
  pop: "Failed to create client",
  data: { reason: "validation_error" },
};
```

## Refactoring Approach

When updating an existing procedure, change the return shape only at the boundary where the response is constructed. Keep the inner database/service logic unchanged.
