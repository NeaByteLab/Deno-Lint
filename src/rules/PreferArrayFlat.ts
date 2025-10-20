import type * as types from '@interfaces/index.ts'
import * as utils from '@utils/index.ts'

/**
 * Lint rule for preferring array.flat() over [].concat(...array) patterns.
 */
export const preferArrayFlatRule = {
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
        if (utils.isConcatCall(node) && utils.isConcatSpreadPattern(node)) {
          context.report({
            node,
            message: 'Prefer array.flat() over [].concat(...array) for better readability',
            fix: utils.createArrayFlatFix(context, node)
          })
        }
        if (utils.isConcatApplyCall(node)) {
          context.report({
            node,
            message:
              'Prefer array.flat() over Array.prototype.concat.apply([], array) for better readability',
            fix: utils.createArrayFlatFix(context, node)
          })
        }
      }
    }
  }
}
