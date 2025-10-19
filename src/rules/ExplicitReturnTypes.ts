import type { DenoASTNode, LintContext } from '@interfaces/index.ts'
import {
  createAddReturnTypeFix,
  hasReturnType,
  inferReturnType,
  isFunctionDeclaration
} from '@utils/index.ts'

/**
 * Lint rule for enforcing explicit return type annotations.
 * Refactored to use centralized utilities.
 */
export const explicitReturnTypesRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: LintContext): Record<string, (node: DenoASTNode) => void> {
    return {
      /**
       * Visitor function for function declarations.
       * @param node - The AST node representing a function declaration
       */
      FunctionDeclaration(node: DenoASTNode): void {
        if (!isFunctionDeclaration(node)) {
          return
        }
        if (!hasReturnType(node)) {
          const returnType = inferReturnType(node, context)
          context.report({
            node,
            message: 'Function must have explicit return type annotation',
            fix: createAddReturnTypeFix(context, node, returnType)
          })
        }
      }
    }
  }
}
