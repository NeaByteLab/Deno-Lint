import type { LintPlugin } from '@app/types.ts'
import { asyncFunctionNamingRule } from '@rules/async-function-naming.ts'
import { explicitParameterTypesRule } from '@rules/explicit-parameter-types.ts'
import { explicitReturnTypesRule } from '@rules/explicit-return-types.ts'
import { preferNullishCoalescingRule } from '@rules/prefer-nullish-coalescing.ts'
import { preferOptionalChainRule } from '@rules/prefer-optional-chain.ts'
import { requireErrorHandlingRule } from '@rules/require-error-handling.ts'

/**
 * Deno lint plugin containing custom linting rules.
 */
const plugin: LintPlugin = {
  name: 'deno-lint',
  rules: {
    'async-function-naming': asyncFunctionNamingRule,
    'explicit-parameter-types': explicitParameterTypesRule,
    'explicit-return-types': explicitReturnTypesRule,
    'prefer-nullish-coalescing': preferNullishCoalescingRule,
    'prefer-optional-chain': preferOptionalChainRule,
    'require-error-handling': requireErrorHandlingRule
  }
}

/**
 * Default export of the deno-lint plugin.
 * @description Main plugin configuration containing all custom linting rules.
 */
export default plugin
