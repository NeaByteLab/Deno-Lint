import type * as types from '@interfaces/index.ts'
import * as utils from '@utils/index.ts'

/**
 * Checks if a binary expression is an indexOf() !== -1 pattern.
 * @param node - The binary expression node
 * @returns True if the expression matches the pattern, false otherwise
 */
function isIndexOfNotEqualNegativeOne(node: types.DenoASTNode): boolean {
  if (!utils.isBinaryExpression(node)) {
    return false
  }
  if (node.operator !== '!==') {
    return false
  }
  if (!utils.isIndexOfCall(node.left)) {
    return false
  }
  if (!utils.isNegativeOneComparison(node.right)) {
    return false
  }
  return true
}

/**
 * Lint rule for preferring array.includes() over indexOf() !== -1.
 */
export const preferArrayIncludesRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: types.LintContext): Record<string, (node: types.DenoASTNode) => void> {
    return {
      /**
       * Visitor function for binary expressions.
       * @param node - The AST node representing a binary expression
       */
      BinaryExpression(node: types.DenoASTNode): void {
        if (!utils.isBinaryExpression(node)) {
          return
        }
        if (isIndexOfNotEqualNegativeOne(node)) {
          context.report({
            node,
            message: 'Prefer array.includes() over indexOf() !== -1 for better readability',
            fix: utils.createArrayIncludesFix(context, node)
          })
        }
      }
    }
  }
}
