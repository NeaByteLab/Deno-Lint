import type { DenoASTNode, LintContext } from '@interfaces/index.ts'
import {
  createReplaceOperatorFix,
  isLogicalExpression,
  shouldUseNullishCoalescing
} from '@utils/index.ts'

/**
 * Lint rule for preferring nullish coalescing over logical OR.
 */
export const preferNullishCoalescingRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: LintContext): Record<string, (node: DenoASTNode) => void> {
    return {
      /**
       * Visitor function for logical expressions.
       * @param node - The AST node representing a logical expression
       */
      LogicalExpression(node: DenoASTNode): void {
        if (!isLogicalExpression(node)) {
          return
        }
        if (shouldUseNullishCoalescing(node)) {
          context.report({
            node,
            message:
              'Prefer nullish coalescing (??) over logical OR (||) for null/undefined checks',
            fix: createReplaceOperatorFix(context, node, '||', '??')
          })
        }
      }
    }
  }
}
