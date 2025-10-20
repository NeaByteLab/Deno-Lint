import type { DenoASTNode, LintContext } from '@interfaces/index.ts'
import {
  createArrayIncludesFix,
  isBinaryExpression,
  isIndexOfCall,
  isNegativeOneComparison
} from '@utils/index.ts'

/**
 * Checks if a binary expression is an indexOf() !== -1 pattern.
 * @param node - The binary expression node
 * @returns True if the expression matches the pattern, false otherwise
 */
function isIndexOfNotEqualNegativeOne(node: DenoASTNode): boolean {
  if (!isBinaryExpression(node)) {
    return false
  }
  if (node.operator !== '!==') {
    return false
  }
  if (!isIndexOfCall(node.left)) {
    return false
  }
  if (!isNegativeOneComparison(node.right)) {
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
  create(context: LintContext): Record<string, (node: DenoASTNode) => void> {
    return {
      /**
       * Visitor function for binary expressions.
       * @param node - The AST node representing a binary expression
       */
      BinaryExpression(node: DenoASTNode): void {
        if (!isBinaryExpression(node)) {
          return
        }
        if (isIndexOfNotEqualNegativeOne(node)) {
          context.report({
            node,
            message: 'Prefer array.includes() over indexOf() !== -1 for better readability',
            fix: createArrayIncludesFix(context, node)
          })
        }
      }
    }
  }
}
