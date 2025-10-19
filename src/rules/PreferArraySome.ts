import type { DenoASTNode, LintContext } from '@interfaces/index.ts'
import { canReplaceWithArrayMethod, createArrayMethodFix, isForStatement } from '@utils/index.ts'

/**
 * Lint rule for preferring Array.some() over manual for loops.
 */
export const preferArraySomeRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: LintContext): Record<string, (node: DenoASTNode) => void> {
    return {
      /**
       * Visitor function for for statements.
       * @param node - The AST node representing a for statement
       */
      ForStatement(node: DenoASTNode): void {
        if (!isForStatement(node)) {
          return
        }
        if (canReplaceWithArrayMethod(node, 'some')) {
          context.report({
            node,
            message: 'Prefer Array.some() over manual for loops that return true',
            fix: createArrayMethodFix(context, node, 'some')
          })
        }
      }
    }
  }
}
