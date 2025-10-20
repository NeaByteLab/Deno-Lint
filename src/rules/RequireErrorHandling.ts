import type * as types from '@interfaces/index.ts'
import * as utils from '@utils/index.ts'

/**
 * Lint rule for enforcing error handling on Deno file operations.
 */
export const requireErrorHandlingRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: types.LintContext): Record<string, (node: types.DenoASTNode) => void> {
    return {
      /**
       * Visitor function for call expressions.
       * @param node - The AST node representing a call expression
       */
      CallExpression(node: types.DenoASTNode): void {
        if (!utils.isCallExpression(node)) {
          return
        }
        if (!utils.isDenoApiCall(node)) {
          return
        }
        if (!utils.requiresErrorHandling(node)) {
          return
        }
        if (!utils.isAwaited(node)) {
          context.report({
            node,
            message: 'Deno file operations should be awaited or handled with .catch()'
          })
        }
      }
    }
  }
}
