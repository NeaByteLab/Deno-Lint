import type { DenoASTNode, LintContext } from '@interfaces/index.ts'
import {
  createAddSuffixFix,
  followsAsyncNamingConvention,
  getFunctionName,
  isAsyncFunction
} from '@utils/index.ts'

/**
 * Lint rule for enforcing async function naming conventions.
 * Refactored to use centralized utilities.
 */
export const asyncFunctionNamingRule = {
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
        if (isAsyncFunction(node) && !followsAsyncNamingConvention(node, 'Async')) {
          const functionName = getFunctionName(node)
          if (functionName) {
            context.report({
              node,
              message: "Async functions should be named with 'Async' suffix",
              fix: createAddSuffixFix(context, node, 'Async')
            })
          }
        }
      }
    }
  }
}
