import type * as types from '@interfaces/index.ts'
import * as utils from '@utils/index.ts'

/**
 * Lint rule for preferring Array.some() over manual for loops.
 */
export const preferArraySomeRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: types.LintContext): Record<string, (node: types.DenoASTNode) => void> {
    return {
      /**
       * Visitor function for for statements.
       * @param node - The AST node representing a for statement
       */
      ForStatement(node: types.DenoASTNode): void {
        if (!utils.isForStatement(node)) {
          return
        }
        if (utils.canReplaceWithArrayMethod(node, 'some')) {
          context.report({
            node,
            message: 'Prefer Array.some() over manual for loops that return true',
            fix: utils.createArrayMethodFix(context, node, 'some')
          })
        }
      }
    }
  }
}
