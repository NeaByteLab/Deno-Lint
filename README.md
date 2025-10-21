# @neabyte/deno-lint

A collection of custom lint rules built on Deno's native lint plugin system.

> **Requires Deno 2.2.0+.** Learn more about [Deno Lint Plugins](https://docs.deno.com/runtime/reference/lint_plugins/).

## Installation

Run the following command to add the lint plugin to your project:

```bash
deno add jsr:@neabyte/deno-lint
```

To exclude specific rules, configure them in your `deno.json`:

```json
{
  "lint": {
    "plugins": [
      "jsr:@neabyte/deno-lint@0.3.1" // add this module
    ],
    "rules": {
      "exclude": [
        "deno-lint/require-error-handling",
        "deno-lint/explicit-parameter-types"
        // Exclude any rules you don't want to use
      ]
    }
  }
}
```

## Available Rules

### Type Safety & Annotations

- [`explicit-parameter-types`](./examples/explicit-parameter-types.md) - Requires explicit type annotations on parameters
- [`explicit-return-types`](./examples/explicit-return-types.md) - Requires explicit return type annotations
- [`prefer-const-assertions`](./examples/prefer-const-assertions.md) - Prefers `as const` over type assertion for better type inference

### Modern JavaScript Features

- [`prefer-nullish-coalescing`](./examples/prefer-nullish-coalescing.md) - Prefers nullish coalescing (??) over logical OR (||) for null/undefined checks
- [`prefer-optional-chain`](./examples/prefer-optional-chain.md) - Prefers optional chaining (?.) over logical AND (&&) for property access
- [`prefer-template-literals`](./examples/prefer-template-literals.md) - Prefers template literals over string concatenation

### Array & Object Operations

- [`prefer-array-every`](./examples/prefer-array-every.md) - Prefers `Array.every()` over manual iteration patterns
- [`prefer-array-flat`](./examples/prefer-array-flat.md) - Prefers `Array.flat()` over manual flattening patterns
- [`prefer-array-includes`](./examples/prefer-array-includes.md) - Prefers `Array.includes()` over manual indexOf checks
- [`prefer-array-some`](./examples/prefer-array-some.md) - Prefers `Array.some()` over manual iteration patterns
- [`prefer-spread`](./examples/prefer-spread.md) - Prefers spread syntax (...) over manual array/object operations

### Code Quality & Style

- [`async-function-naming`](./examples/async-function-naming.md) - Enforces async functions to have 'Async' suffix
- [`prefer-arrow-callback`](./examples/prefer-arrow-callback.md) - Prefers arrow functions over regular function expressions in callback contexts
- [`prefer-early-return`](./examples/prefer-early-return.md) - Prefers early returns over nested conditions for better readability

### Error Handling & Safety

- [`prefer-promise-reject-errors`](./examples/prefer-promise-reject-errors.md) - Enforces Error objects in Promise.reject() calls
- [`prefer-string-starts-ends-with`](./examples/prefer-string-starts-ends-with.md) - Prefers `String.startsWith()` and `String.endsWith()` over substring checks
- [`require-error-handling`](./examples/require-error-handling.md) - Ensures Deno file operations are properly awaited

## License

MIT License - see [LICENSE](LICENSE) file for details.
