import type { ASTNode, LintContext, LintFixer, LogicalExpressionNode } from '@app/types.ts'
import { isLiteral, isLogicalExpression } from '@shared/expression.ts'

/**
 * Lint rule for preferring nullish coalescing over logical OR.
 */
export const preferNullishCoalescingRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: LintContext): Record<string, (node: ASTNode) => void> {
    return {
      /**
       * Visitor function for logical expressions.
       * @param node - The AST node representing a logical expression
       */
      LogicalExpression(node: ASTNode): void {
        if (!isLogicalExpression(node)) {
          return
        }
        if (shouldUseNullishCoalescing(node)) {
          context.report({
            node,
            message:
              'Prefer nullish coalescing (??) over logical OR (||) for null/undefined checks',
            fix(fixer: LintFixer): unknown {
              const original = context.sourceCode.getText(node)
              const newText = original.replace('||', '??')
              return fixer.replaceText(node, newText)
            }
          })
        }
      }
    }
  }
}

/**
 * Checks if a logical expression should use nullish coalescing instead of logical OR.
 * @param node - The logical expression node to check
 * @returns True if the expression should use nullish coalescing, false otherwise
 */
function shouldUseNullishCoalescing(node: LogicalExpressionNode): boolean {
  if (node.operator !== '||') {
    return false
  }
  const rightSide = node.right
  if (isLiteral(rightSide)) {
    const value = rightSide.value
    if (value === '' || value === 0 || value === false) {
      return true
    }
  }
  return false
}
