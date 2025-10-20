import type { DenoASTNode, LintContext } from '@interfaces/index.ts'
import {
  createStringStartsEndsWithFix,
  isBinaryExpression,
  isEndsWithPattern,
  isStartsWithPattern,
  isSubstringCall
} from '@utils/index.ts'

/**
 * Determines the type of fix needed (startsWith or endsWith).
 * @param node - The binary expression node
 * @returns The fix type or null if not applicable
 */
function getFixType(node: DenoASTNode): 'startsWith' | 'endsWith' | null {
  if (!isBinaryExpression(node)) {
    return null
  }
  if (isStartsWithPattern(node)) {
    return 'startsWith'
  }
  if (isEndsWithPattern(node)) {
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
        if (node.operator !== '===') {
          return
        }
        if (isSubstringCall(node.left)) {
          const fixType = getFixType(node)
          if (fixType) {
            context.report({
              node,
              message:
                `Prefer string.${fixType}() over substring() comparison for better readability`,
              fix: createStringStartsEndsWithFix(context, node, fixType)
            })
          }
        }
      }
    }
  }
}
