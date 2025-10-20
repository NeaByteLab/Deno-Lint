# Contributing to @neabyte/deno-lint

Thank you for your interest in contributing to this Deno lint plugin collection!

## Development Setup

1. **Prerequisites**: Deno 2.2.0+
2. **Clone the repository**
3. **Run tests**: `deno task test`
4. **Check code**: `deno task check`

## Adding New Rules

### 1. Create Rule Implementation

Create a new file in `src/rules/` following the naming convention `RuleName.ts`:

```typescript
import type * as types from '@interfaces/index.ts'
import * as utils from '@utils/index.ts'

/**
 * Lint rule for [rule description].
 */
export const yourRuleNameRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: types.LintContext): Record<string, (node: types.DenoASTNode) => void> {
    return {
      /**
       * Visitor function for [node type].
       * @param node - The AST node representing a [node type]
       */
      YourNodeType(node: types.DenoASTNode): void {
        if (!utils.isYourNodeType(node)) {
          return
        }
        // Rule logic here
        context.report({
          node,
          message: 'Your rule message',
          fix: fixer => fixer.replaceText(node, 'fixed code') // optional
        })
      }
    }
  }
}
```

### 2. Export Rule

Add your rule to `src/rules/index.ts`:

```typescript
export * from '@rules/YourRuleName.ts'
```

### 3. Register Rule

Add your rule to `src/index.ts`:

```typescript
const plugin: LintPlugin = {
  name: 'deno-lint',
  rules: {
    // ... existing rules
    'your-rule-name': rules.yourRuleNameRule
  }
}
```

### 4. Write Tests

Create tests in `tests/rules/YourRuleName.ts`:

```typescript
import { runnerTest, verifyAutoFix } from '@tests/index.ts'

const rulesId = 'deno-lint/your-rule-name'

Deno.test('your-rule-name (should trigger)', () => runnerTest(rulesId, 'problematic code', 1))

Deno.test('your-rule-name (should not trigger)', () => runnerTest(rulesId, 'valid code', 0))

Deno.test('verify auto-fix', () =>
  verifyAutoFix(rulesId, 'code to fix', 'expected fixed code', 'description')
)
```

### 5. Add Documentation

Create an example file in `examples/your-rule-name.md` with:

- Rule description
- Examples of violations
- Examples of correct usage
- Auto-fix examples (if applicable)

## Code Style

- Follow the project's TypeScript configuration
- Use JSDoc comments for functions and exports
- Prefer explicit type annotations
- Use arrow functions for callbacks
- Follow the existing naming conventions
- Use utility functions from `@utils/index.ts` when available
- Include comprehensive test coverage with both positive and negative cases
- **Import all types using namespace imports from `@interfaces/index.ts`** (may not be 100% complete yet) - if you find missing types, add them following the existing style

## Testing

- All rules must have comprehensive tests
- Test both positive and negative cases
- Include auto-fix tests when applicable
- Run `deno task test` before submitting

## Submitting Changes

1. Ensure all tests pass: `deno task test`
2. Run code checks: `deno task check`
3. Create a pull request with a clear description
4. Reference any related issues

## Rule Guidelines

- **Do not duplicate existing Deno lint features** - Check [Deno's built-in rules](./development/DENO-RULES.md) before creating new ones
- Rules should be focused and specific
- Provide helpful error messages
- Include auto-fixes when possible
- Consider performance implications
- Follow Deno's lint plugin conventions

## Questions?

Feel free to open an issue for questions about contributing or rule implementation.
