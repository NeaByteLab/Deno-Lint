import type * as types from '@interfaces/index.ts'
import * as utils from '@utils/index.ts'

/**
 * Checks if a call expression can be converted to spread syntax.
 * @param node - The call expression node
 * @param _context - The lint context for accessing source code
 * @returns True if the expression can be converted, false otherwise
 */
function canConvertToSpread(node: types.DenoASTNode, _context: types.LintContext): boolean {
  if (!utils.isCallExpression(node)) {
    return false
  }
  const callNode = node as types.CallExpressionNode
  const callee = callNode.callee
  const args = callNode.arguments || []
  if (utils.isMemberExpression(callee)) {
    const object = callee.object as types.IdentifierNode
    const property = callee.property as types.IdentifierNode
    if (utils.isIdentifier(object) && utils.isIdentifier(property)) {
      if (object.name === 'Array' && property.name === 'from') {
        return args.length === 1
      }
    }
    if (utils.isIdentifier(property) && property.name === 'concat') {
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
function createSpreadFix(
  context: types.LintContext,
  node: types.DenoASTNode
): (fixer: types.LintFixer) => unknown {
  return (fixer: types.LintFixer): unknown => {
    const callNode = node as types.CallExpressionNode
    const callee = callNode.callee
    const args = callNode.arguments || []
    if (utils.isMemberExpression(callee)) {
      const object = callee.object as types.IdentifierNode
      const property = callee.property as types.IdentifierNode
      if (utils.isIdentifier(object) && utils.isIdentifier(property)) {
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
                .map((arg: types.DenoASTNode) => context.sourceCode.getText(arg))
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
  create(context: types.LintContext): Record<string, (node: types.DenoASTNode) => void> {
    return {
      /**
       * Visitor function for call expressions.
       * @param node - The AST node representing a call expression
       */
      CallExpression(node: types.DenoASTNode): void {
        if (!utils.isCallExpression(node)) {
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
