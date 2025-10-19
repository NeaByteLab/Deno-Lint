import { asyncFunctionNamingRule } from '@rules/async-function-naming.ts'
import { explicitParameterTypesRule } from '@rules/explicit-parameter-types.ts'
import { explicitReturnTypesRule } from '@rules/explicit-return-types.ts'
import { requireErrorHandlingRule } from '@rules/require-error-handling.ts'

/**
 * Deno lint plugin containing custom linting rules.
 */
const plugin: Deno.lint.Plugin = {
  name: 'deno-lint',
  rules: {
    'async-function-naming': asyncFunctionNamingRule,
    'explicit-parameter-types': explicitParameterTypesRule,
    'explicit-return-types': explicitReturnTypesRule,
    'require-error-handling': requireErrorHandlingRule
  }
}

/**
 * Default export of the deno-lint plugin.
 * @description Main plugin configuration containing all custom linting rules.
 */
export default plugin
