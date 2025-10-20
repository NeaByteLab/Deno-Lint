import type { DenoASTNode, LintContext } from '@interfaces/index.ts'
import {
  createArrayFlatFix,
  isCallExpression,
  isConcatApplyCall,
  isConcatCall,
  isConcatSpreadPattern
} from '@utils/index.ts'

/**
 * Lint rule for preferring array.flat() over [].concat(...array) patterns.
 */
export const preferArrayFlatRule = {
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
        if (isConcatCall(node) && isConcatSpreadPattern(node)) {
          context.report({
            node,
            message: 'Prefer array.flat() over [].concat(...array) for better readability',
            fix: createArrayFlatFix(context, node)
          })
        }
        if (isConcatApplyCall(node)) {
          context.report({
            node,
            message:
              'Prefer array.flat() over Array.prototype.concat.apply([], array) for better readability',
            fix: createArrayFlatFix(context, node)
          })
        }
      }
    }
  }
}
