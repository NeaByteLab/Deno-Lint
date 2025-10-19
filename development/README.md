# Development Rules Testing

This directory contains development files for testing additional lint rules that leverage Deno's full AST capabilities to fill gaps in the official Deno rules. See [DENO-RULES.md](./DENO-RULES.md) for a complete reference of all official Deno lint rules.

These rules leverage Deno's amazing AST capabilities to provide enhanced auto-fix functionality with better performance than traditional LSP-based approaches, offering more customization opportunities for developers.

## ⚠️ Important Note

> **Known Issue**: Due to [Deno issue #31017](https://github.com/denoland/deno/issues/31017), the `include` configuration in `deno.json` rules section doesn't work for plugin rules. Only `exclude` works. This forces you to load all plugin rules and then disable unwanted ones until the issue is resolved.

## 📋 How to Test

### 1. Configure Rules to Test

Edit `deno.json` and add rules you don't want to test into the `exclude` section:

```json
{
  "lint": {
    "rules": {
      "exclude": [
        "deno-lint/prefer-early-return",
        "deno-lint/explicit-parameter-types"
        // Exclude any rules you don't want to use
      ]
    }
  }
}
```

> **Note**: You should use `exclude` instead of `include` due to the aforementioned Deno limitation.

### 2. Write Problematic Code

Create test files with problematic code related to the rules you want to test. This is like regular code that intentionally violates the lint rules to verify they work correctly. Consider mixing problematic code with other valid code to catch more bugs and edge cases.

**Example**: See `problematic.ts` for reference.

### 3. Run Linting

Navigate to the development directory and run:

```bash
cd development
deno lint problematic.ts
```

For automatic fixes:

```bash
deno lint problematic.ts --fix
```
