import type {
  CallExpressionNode,
  DenoASTNode,
  IdentifierNode,
  LintContext,
  LintFixer
} from '@interfaces/index.ts'
import { isCallExpression, isIdentifier, isMemberExpression } from '@utils/index.ts'

/**
 * Checks if a call expression can be converted to spread syntax.
 * @param node - The call expression node
 * @param _context - The lint context for accessing source code
 * @returns True if the expression can be converted, false otherwise
 */
function canConvertToSpread(node: DenoASTNode, _context: LintContext): boolean {
  if (!isCallExpression(node)) {
    return false
  }
  const callNode = node as CallExpressionNode
  const callee = callNode.callee
  const args = callNode.arguments || []
  if (isMemberExpression(callee)) {
    const object = callee.object as IdentifierNode
    const property = callee.property as IdentifierNode
    if (isIdentifier(object) && isIdentifier(property)) {
      if (object.name === 'Array' && property.name === 'from') {
        return args.length === 1
      }
    }
    if (isIdentifier(property) && property.name === 'concat') {
      return args.length > 0
    }
  }
  return false
}

/**
 * Creates a fix that converts call expressions to spread syntax.
 * @param context - The lint context
 * @param node - The call expression node
 * @returns A fix function
 */
function createSpreadFix(context: LintContext, node: DenoASTNode): (fixer: LintFixer) => unknown {
  return (fixer: LintFixer): unknown => {
    const callNode = node as CallExpressionNode
    const callee = callNode.callee
    const args = callNode.arguments || []
    if (isMemberExpression(callee)) {
      const object = callee.object as IdentifierNode
      const property = callee.property as IdentifierNode
      if (isIdentifier(object) && isIdentifier(property)) {
        if (object.name === 'Array' && property.name === 'from') {
          if (args.length === 1 && args[0]) {
            const argText = context.sourceCode.getText(args[0])
            if (argText) {
              return fixer.replaceText(node, `[...${argText}]`)
            }
          }
        }
        if (property.name === 'concat') {
          if (args.length > 0) {
            const objectText = context.sourceCode.getText(object)
            if (objectText) {
              const argsText = args
                .map((arg: DenoASTNode) => context.sourceCode.getText(arg))
                .filter((text) => text)
                .join(', ')
              if (argsText) {
                return fixer.replaceText(node, `[...${objectText}, ${argsText}]`)
              }
            }
          }
        }
      }
    }
    return fixer.replaceText(node, context.sourceCode.getText(node) || '')
  }
}

/**
 * Lint rule for preferring spread syntax over manual array operations.
 */
export const preferSpreadRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: LintContext): Record<string, (node: DenoASTNode) => void> {
    return {
      /**
       * Visitor function for call expressions.
       * @param node - The AST node representing a call expression
       */
      CallExpression(node: DenoASTNode): void {
        if (!isCallExpression(node)) {
          return
        }
        if (canConvertToSpread(node, context)) {
          context.report({
            node,
            message: 'Prefer spread syntax over manual array operations',
            fix: createSpreadFix(context, node)
          })
        }
      }
    }
  }
}
