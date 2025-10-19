import type { DenoASTNode, LintContext } from '@interfaces/index.ts'
import { canReplaceWithArrayMethod, createArrayMethodFix, isForStatement } from '@utils/index.ts'

/**
 * Lint rule for preferring Array.every() over manual for loops.
 */
export const preferArrayEveryRule = {
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
        if (canReplaceWithArrayMethod(node, 'every')) {
          context.report({
            node,
            message: 'Prefer Array.every() over manual for loops that return false',
            fix: createArrayMethodFix(context, node, 'every')
          })
        }
      }
    }
  }
}
