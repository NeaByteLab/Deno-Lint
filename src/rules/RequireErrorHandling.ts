import type { DenoASTNode, LintContext } from '@interfaces/index.ts'
import { isAwaited, isCallExpression, isDenoApiCall, requiresErrorHandling } from '@utils/index.ts'

/**
 * Lint rule for enforcing error handling on Deno file operations.
 */
export const requireErrorHandlingRule = {
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
        if (!isDenoApiCall(node)) {
          return
        }
        if (!requiresErrorHandling(node)) {
          return
        }
        if (!isAwaited(node)) {
          context.report({
            node,
            message: 'Deno file operations should be awaited or handled with .catch()'
          })
        }
      }
    }
  }
}
