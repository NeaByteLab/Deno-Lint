import type * as types from '@interfaces/index.ts'
import * as utils from '@utils/index.ts'

/**
 * Determines the type of fix needed (startsWith or endsWith).
 * @param node - The binary expression node
 * @returns The fix type or null if not applicable
 */
function getFixType(node: types.DenoASTNode): 'startsWith' | 'endsWith' | null {
  if (!utils.isBinaryExpression(node)) {
    return null
  }
  if (utils.isStartsWithPattern(node)) {
    return 'startsWith'
  }
  if (utils.isEndsWithPattern(node)) {
    return 'endsWith'
  }
  return null
}

/**
 * Lint rule for preferring string.startsWith() and string.endsWith() over substring() comparisons.
 */
export const preferStringStartsEndsWithRule = {
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
        if (node.operator !== '===') {
          return
        }
        if (utils.isSubstringCall(node.left)) {
          const fixType = getFixType(node)
          if (fixType) {
            context.report({
              node,
              message:
                `Prefer string.${fixType}() over substring() comparison for better readability`,
              fix: utils.createStringStartsEndsWithFix(context, node, fixType)
            })
          }
        }
      }
    }
  }
}
