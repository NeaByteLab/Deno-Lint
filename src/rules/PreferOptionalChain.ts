import type { DenoASTNode, LintContext } from '@interfaces/index.ts'
import {
  canConvertToOptionalChain,
  convertToOptionalChain,
  createOptionalChainingFix,
  isLogicalExpression
} from '@utils/index.ts'

/**
 * Lint rule for enforcing the use of optional chaining (?.) over logical AND (&&) for property access.
 * Refactored to use centralized utilities.
 */
export const preferOptionalChainRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: LintContext): Record<string, (node: DenoASTNode) => void> {
    return {
      /**
       * Visitor function for logical expressions.
       * @param node - The AST node representing a logical expression
       */
      LogicalExpression(node: DenoASTNode): void {
        if (!isLogicalExpression(node)) {
          return
        }
        if (node.operator === '&&') {
          if (canConvertToOptionalChain(node, context)) {
            const convertedText = convertToOptionalChain(node, context)
            context.report({
              node,
              message: 'Prefer optional chaining (?.) over logical AND (&&) for property access.',
              fix: createOptionalChainingFix(context, node, convertedText)
            })
          }
        }
      }
    }
  }
}
