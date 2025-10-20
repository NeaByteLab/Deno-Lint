import type * as types from '@interfaces/index.ts'
import * as utils from '@utils/index.ts'

/**
 * Lint rule for enforcing const assertions on array and object literals.
 */
export const preferConstAssertionsRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: types.LintContext): Record<string, (node: types.DenoASTNode) => void> {
    return {
      /**
       * Visitor function for array expressions.
       * @param node - The AST node representing an array expression
       */
      ArrayExpression(node: types.DenoASTNode): void {
        if (!utils.isArrayExpression(node)) {
          return
        }
        if (node.elements.length === 0) {
          return
        }
        if (utils.hasConstAssertion(node)) {
          return
        }
        if (!utils.isTopLevelExpression(node)) {
          return
        }
        context.report({
          node,
          message: 'Array literal should use const assertion for better type inference',
          fix: utils.createConstAssertionFix(context, node)
        })
      },
      /**
       * Visitor function for object expressions.
       * @param node - The AST node representing an object expression
       */
      ObjectExpression(node: types.DenoASTNode): void {
        if (!utils.isObjectExpression(node)) {
          return
        }
        if (node.properties.length === 0) {
          return
        }
        if (utils.hasConstAssertion(node)) {
          return
        }
        if (!utils.isTopLevelExpression(node)) {
          return
        }
        context.report({
          node,
          message: 'Object literal should use const assertion for better type inference',
          fix: utils.createConstAssertionFix(context, node)
        })
      }
    }
  }
}
