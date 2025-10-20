import type * as types from '@interfaces/index.ts'
import * as utils from '@utils/index.ts'

/**
 * Array methods that commonly use callbacks.
 */
const CALLBACK_METHODS = [
  'map',
  'filter',
  'find',
  'some',
  'every',
  'reduce',
  'forEach',
  'findIndex',
  'reduceRight',
  'flatMap',
  'sort'
]

/**
 * Checks if a function expression can be converted to arrow function.
 * @param node - The function expression node
 * @param context - The lint context for accessing source code
 * @returns True if the function can be converted, false otherwise
 */
function canConvertToArrowFunction(node: types.DenoASTNode, context: types.LintContext): boolean {
  if (!utils.isFunctionExpression(node)) {
    return false
  }
  const funcNode = node as types.FunctionExpressionNode
  if (funcNode.id) {
    return false
  }
  if (usesThisOrArguments(funcNode, context)) {
    return false
  }
  return true
}

/**
 * Creates a fix that converts function expressions to arrow functions.
 * @param context - The lint context
 * @param node - The function expression node
 * @returns A fix function
 */
function createArrowFunctionFix(
  context: types.LintContext,
  node: types.DenoASTNode
): (fixer: types.LintFixer) => unknown {
  return (fixer: types.LintFixer): unknown => {
    const funcNode = node as types.FunctionExpressionNode
    const params = funcNode.params || []
    const body = funcNode.body
    let paramsText = ''
    if (params.length === 0) {
      paramsText = '()'
    } else if (params.length === 1 && params[0] && utils.isIdentifier(params[0])) {
      paramsText = context.sourceCode.getText(params[0])
    } else {
      paramsText = '(' +
        params.map((param: types.DenoASTNode) => context.sourceCode.getText(param)).join(', ') +
        ')'
    }
    let bodyText = ''
    if (utils.isBlockStatement(body)) {
      bodyText = context.sourceCode.getText(body)
    } else {
      bodyText = context.sourceCode.getText(body)
    }
    const arrowFunction = `${paramsText} => ${bodyText}`
    return fixer.replaceText(node, arrowFunction)
  }
}

/**
 * Checks if a call expression uses a callback method.
 * @param node - The call expression node
 * @returns True if the call uses a callback method, false otherwise
 */
function isCallbackMethod(node: types.DenoASTNode): boolean {
  if (!utils.isCallExpression(node)) {
    return false
  }
  const callNode = node as types.CallExpressionNode
  const callee = callNode.callee
  if (utils.isMemberExpression(callee)) {
    const property = callee.property as types.IdentifierNode
    if (utils.isIdentifier(property)) {
      return CALLBACK_METHODS.includes(property.name)
    }
  }
  return false
}

/**
 * Checks if a function uses 'this' or 'arguments'.
 * @param funcNode - The function expression node
 * @param context - The lint context for accessing source code
 * @returns True if the function uses 'this' or 'arguments', false otherwise
 */
function usesThisOrArguments(
  funcNode: types.FunctionExpressionNode,
  context: types.LintContext
): boolean {
  const body = funcNode.body
  if (!body) {
    return false
  }
  const bodyText = context.sourceCode.getText(body)
  if (bodyText.includes('this') || bodyText.includes('arguments')) {
    return true
  }
  if (utils.containsThisExpression(body)) {
    return true
  }
  if (utils.containsArgumentsUsage(body)) {
    return true
  }
  return false
}

/**
 * Lint rule for preferring arrow functions over function expressions in callbacks.
 */
export const preferArrowCallbackRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: types.LintContext): Record<string, (node: types.DenoASTNode) => void> {
    return {
      /**
       * Visitor function for function expressions.
       * @param node - The AST node representing a function expression
       */
      FunctionExpression(node: types.DenoASTNode): void {
        if (!utils.isFunctionExpression(node)) {
          return
        }
        const parent = node.parent
        if (parent && utils.isCallExpression(parent)) {
          const callNode = parent as types.CallExpressionNode
          const args = callNode.arguments || []
          if (args.includes(node) && isCallbackMethod(parent)) {
            if (canConvertToArrowFunction(node, context)) {
              context.report({
                node,
                message: 'Prefer arrow functions over function expressions in callbacks',
                fix: createArrowFunctionFix(context, node)
              })
            }
          }
        }
      }
    }
  }
}
