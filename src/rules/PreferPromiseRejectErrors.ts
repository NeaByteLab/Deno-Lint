import type * as types from '@interfaces/index.ts'
import * as utils from '@utils/index.ts'

/**
 * Lint rule for preferring Error objects in Promise.reject() calls.
 */
export const preferPromiseRejectErrorsRule = {
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
        if (!utils.isPromiseReject(node)) {
          return
        }
        if (node.arguments.length > 0 && !utils.usesErrorObject(node)) {
          context.report({
            node,
            message:
              'Promise.reject() should be called with an Error object, not a primitive value',
            fix: utils.createWrapInErrorFix(context, node, 0)
          })
        }
      }
    }
  }
}
