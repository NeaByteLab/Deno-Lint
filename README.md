# @neabyte/deno-lint

Deno lint plugin collection for identifying and reporting on patterns found in code

## Available Rules

- [`async-function-naming`](./examples/async-function-naming.md) - Enforces async functions to have 'Async' suffix
- [`explicit-parameter-types`](./examples/explicit-parameter-types.md) - Requires explicit type annotations on parameters
- [`explicit-return-types`](./examples/explicit-return-types.md) - Requires explicit return type annotations
- [`prefer-nullish-coalescing`](./examples/prefer-nullish-coalescing.md) - Prefers nullish coalescing (??) over logical OR (||) for null/undefined checks
- [`prefer-optional-chain`](./examples/prefer-optional-chain.md) - Prefers optional chaining (?.) over logical AND (&&) for property access
- [`prefer-template-literals`](./examples/prefer-template-literals.md) - Prefers template literals over string concatenation
- [`prefer-promise-reject-errors`](./examples/prefer-promise-reject-errors.md) - Enforces Error objects in Promise.reject() calls
- [`require-error-handling`](./examples/require-error-handling.md) - Ensures Deno file operations are properly awaited

## Installation

To exclude specific rules, configure them in your `deno.json`:

```json
{
  "lint": {
    "plugins": [
      "jsr:@neabyte/deno-lint@0.2.1" // add this module
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

## License

MIT License - see [LICENSE](LICENSE) file for details.
