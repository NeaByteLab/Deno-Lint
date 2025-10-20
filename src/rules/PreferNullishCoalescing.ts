import type * as types from '@interfaces/index.ts'
import * as utils from '@utils/index.ts'

/**
 * Lint rule for preferring nullish coalescing over logical OR.
 */
export const preferNullishCoalescingRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: types.LintContext): Record<string, (node: types.DenoASTNode) => void> {
    return {
      /**
       * Visitor function for logical expressions.
       * @param node - The AST node representing a logical expression
       */
      LogicalExpression(node: types.DenoASTNode): void {
        if (!utils.isLogicalExpression(node)) {
          return
        }
        if (utils.shouldUseNullishCoalescing(node)) {
          context.report({
            node,
            message:
              'Prefer nullish coalescing (??) over logical OR (||) for null/undefined checks',
            fix: utils.createReplaceOperatorFix(context, node, '||', '??')
          })
        }
      }
    }
  }
}
