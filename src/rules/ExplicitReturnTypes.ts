import type * as types from '@interfaces/index.ts'
import * as utils from '@utils/index.ts'

/**
 * Lint rule for enforcing explicit return type annotations.
 */
export const explicitReturnTypesRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: types.LintContext): Record<string, (node: types.DenoASTNode) => void> {
    return {
      /**
       * Visitor function for function declarations.
       * @param node - The AST node representing a function declaration
       */
      FunctionDeclaration(node: types.DenoASTNode): void {
        if (!utils.isFunctionDeclaration(node)) {
          return
        }
        if (!utils.hasReturnType(node)) {
          const returnType = utils.inferReturnType(node, context)
          context.report({
            node,
            message: 'Function must have explicit return type annotation',
            fix: utils.createAddReturnTypeFix(context, node, returnType)
          })
        }
      }
    }
  }
}
