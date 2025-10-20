import type * as types from '@interfaces/index.ts'
import * as utils from '@utils/index.ts'

/**
 * Lint rule for enforcing the use of optional chaining (?.) over logical AND (&&) for property access.
 */
export const preferOptionalChainRule = {
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
        if (node.operator === '&&') {
          if (utils.canConvertToOptionalChain(node, context)) {
            const convertedText = utils.convertToOptionalChain(node, context)
            context.report({
              node,
              message: 'Prefer optional chaining (?.) over logical AND (&&) for property access.',
              fix: utils.createOptionalChainingFix(node, convertedText)
            })
          }
        }
      }
    }
  }
}
