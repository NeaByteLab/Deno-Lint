import type * as types from '@interfaces/index.ts'
import * as utils from '@utils/index.ts'

/**
 * Lint rule for enforcing async function naming conventions.
 */
export const asyncFunctionNamingRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: types.LintContext): Record<string, (node: types.DenoASTNode) => void> {
    return {
      /**
       * Visitor function for function declarations.
       * @param node - The AST node representing a function declaration
       */
      FunctionDeclaration(node: types.DenoASTNode): void {
        if (utils.isAsyncFunction(node) && !utils.followsAsyncNamingConvention(node, 'Async')) {
          const functionName = utils.getFunctionName(node)
          if (functionName) {
            context.report({
              node,
              message: "Async functions should be named with 'Async' suffix",
              fix: utils.createAddSuffixFix(context, node, 'Async')
            })
          }
        }
      }
    }
  }
}
