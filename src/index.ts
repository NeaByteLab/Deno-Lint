import type { LintPlugin } from '@interfaces/index.ts'
import { asyncFunctionNamingRule } from '@rules/AsyncFunctionNaming.ts'
import { explicitParameterTypesRule } from '@rules/ExplicitParameterTypes.ts'
import { explicitReturnTypesRule } from '@rules/ExplicitReturnTypes.ts'
import { preferConstAssertionsRule } from '@rules/PreferConstAssertions.ts'
import { preferNullishCoalescingRule } from '@rules/PreferNullishCoalescing.ts'
import { preferOptionalChainRule } from '@rules/PreferOptionalChain.ts'
import { preferPromiseRejectErrorsRule } from '@rules/PreferPromiseRejectErrors.ts'
import { preferTemplateLiteralsRule } from '@rules/PreferTemplateLiterals.ts'
import { preferEarlyReturnRule } from '@rules/PreferEarlyReturn.ts'
import { requireErrorHandlingRule } from '@rules/RequireErrorHandling.ts'

/**
 * Deno lint plugin containing custom linting rules.
 */
const plugin: LintPlugin = {
  name: 'deno-lint',
  rules: {
    'async-function-naming': asyncFunctionNamingRule,
    'explicit-parameter-types': explicitParameterTypesRule,
    'explicit-return-types': explicitReturnTypesRule,
    'prefer-const-assertions': preferConstAssertionsRule,
    'prefer-nullish-coalescing': preferNullishCoalescingRule,
    'prefer-optional-chain': preferOptionalChainRule,
    'prefer-template-literals': preferTemplateLiteralsRule,
    'prefer-early-return': preferEarlyReturnRule,
    'prefer-promise-reject-errors': preferPromiseRejectErrorsRule,
    'require-error-handling': requireErrorHandlingRule
  }
}

/**
 * Default export of the deno-lint plugin.
 * @description Main plugin configuration containing all custom linting rules.
 */
export default plugin
