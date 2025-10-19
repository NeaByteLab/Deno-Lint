import type { LintPlugin } from '@interfaces/index.ts'
import * as rules from '@rules/index.ts'

/**
 * Deno lint plugin containing custom linting rules.
 */
const plugin: LintPlugin = {
  name: 'deno-lint',
  rules: {
    'async-function-naming': rules.asyncFunctionNamingRule,
    'explicit-parameter-types': rules.explicitParameterTypesRule,
    'explicit-return-types': rules.explicitReturnTypesRule,
    'prefer-array-every': rules.preferArrayEveryRule,
    'prefer-arrow-callback': rules.preferArrowCallbackRule,
    'prefer-array-some': rules.preferArraySomeRule,
    'prefer-const-assertions': rules.preferConstAssertionsRule,
    'prefer-early-return': rules.preferEarlyReturnRule,
    'prefer-nullish-coalescing': rules.preferNullishCoalescingRule,
    'prefer-optional-chain': rules.preferOptionalChainRule,
    'prefer-promise-reject-errors': rules.preferPromiseRejectErrorsRule,
    'prefer-spread': rules.preferSpreadRule,
    'prefer-template-literals': rules.preferTemplateLiteralsRule,
    'require-error-handling': rules.requireErrorHandlingRule
  }
}

/**
 * Default export of the deno-lint plugin.
 * @description Main plugin configuration containing all custom linting rules.
 */
export default plugin
