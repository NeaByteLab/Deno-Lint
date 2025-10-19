import type { DenoASTNode, LintContext } from '@interfaces/index.ts'
import {
  createWrapInErrorFix,
  isCallExpression,
  isPromiseReject,
  usesErrorObject
} from '@utils/index.ts'

/**
 * Lint rule for preferring Error objects in Promise.reject() calls.
 */
export const preferPromiseRejectErrorsRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: LintContext): Record<string, (node: DenoASTNode) => void> {
    return {
      /**
       * Visitor function for call expressions.
       * @param node - The AST node representing a call expression
       */
      CallExpression(node: DenoASTNode): void {
        if (!isCallExpression(node)) {
          return
        }
        if (!isPromiseReject(node)) {
          return
        }
        if (node.arguments.length > 0 && !usesErrorObject(node)) {
          context.report({
            node,
            message:
              'Promise.reject() should be called with an Error object, not a primitive value',
            fix: createWrapInErrorFix(context, node, 0)
          })
        }
      }
    }
  }
}
