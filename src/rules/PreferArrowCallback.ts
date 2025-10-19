import type {
  CallExpressionNode,
  DenoASTNode,
  FunctionExpressionNode,
  IdentifierNode,
  LintContext,
  LintFixer
} from '@interfaces/index.ts'
import {
  isBlockStatement,
  isCallExpression,
  isFunctionExpression,
  isIdentifier,
  isMemberExpression,
  isThisExpression
} from '@utils/index.ts'

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
function canConvertToArrowFunction(node: DenoASTNode, context: LintContext): boolean {
  if (!isFunctionExpression(node)) {
    return false
  }
  const funcNode = node as FunctionExpressionNode
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
  context: LintContext,
  node: DenoASTNode
): (fixer: LintFixer) => unknown {
  return (fixer: LintFixer): unknown => {
    const funcNode = node as FunctionExpressionNode
    const params = funcNode.params || []
    const body = funcNode.body
    let paramsText = ''
    if (params.length === 0) {
      paramsText = '()'
    } else if (params.length === 1 && params[0] && isIdentifier(params[0])) {
      paramsText = context.sourceCode.getText(params[0])
    } else {
      paramsText =
        '(' + params.map((param: DenoASTNode) => context.sourceCode.getText(param)).join(', ') + ')'
    }
    let bodyText = ''
    if (isBlockStatement(body)) {
      bodyText = context.sourceCode.getText(body)
    } else {
      bodyText = context.sourceCode.getText(body)
    }
    const arrowFunction = `${paramsText} => ${bodyText}`
    return fixer.replaceText(node, arrowFunction)
  }
}

/**
 * Recursively checks if a statement contains 'arguments' usage.
 * @param stmt - The statement to check
 * @returns True if the statement contains 'arguments', false otherwise
 */
function containsArgumentsUsage(stmt: DenoASTNode): boolean {
  if (isIdentifier(stmt) && stmt.name === 'arguments') {
    return true
  }
  for (const key in stmt) {
    if (Object.prototype.hasOwnProperty.call(stmt, key)) {
      const value = (stmt as unknown as Record<string, unknown>)[key]
      if (value && typeof value === 'object') {
        if (Array.isArray(value)) {
          for (const item of value) {
            if (item && typeof item === 'object' && 'type' in item) {
              if (containsArgumentsUsage(item as DenoASTNode)) {
                return true
              }
            }
          }
        } else if ('type' in value) {
          if (containsArgumentsUsage(value as DenoASTNode)) {
            return true
          }
        }
      }
    }
  }
  return false
}

/**
 * Recursively checks if a statement contains a 'this' expression.
 * @param stmt - The statement to check
 * @returns True if the statement contains 'this', false otherwise
 */
function containsThisExpression(stmt: DenoASTNode): boolean {
  if (isThisExpression(stmt)) {
    return true
  }
  for (const key in stmt) {
    if (Object.prototype.hasOwnProperty.call(stmt, key)) {
      const value = (stmt as unknown as Record<string, unknown>)[key]
      if (value && typeof value === 'object') {
        if (Array.isArray(value)) {
          for (const item of value) {
            if (item && typeof item === 'object' && 'type' in item) {
              if (containsThisExpression(item as DenoASTNode)) {
                return true
              }
            }
          }
        } else if ('type' in value) {
          if (containsThisExpression(value as DenoASTNode)) {
            return true
          }
        }
      }
    }
  }
  return false
}

/**
 * Checks if a call expression uses a callback method.
 * @param node - The call expression node
 * @returns True if the call uses a callback method, false otherwise
 */
function isCallbackMethod(node: DenoASTNode): boolean {
  if (!isCallExpression(node)) {
    return false
  }
  const callNode = node as CallExpressionNode
  const callee = callNode.callee
  if (isMemberExpression(callee)) {
    const property = callee.property as IdentifierNode
    if (isIdentifier(property)) {
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
function usesThisOrArguments(funcNode: FunctionExpressionNode, context: LintContext): boolean {
  const body = funcNode.body
  if (!body) {
    return false
  }
  const bodyText = context.sourceCode.getText(body)
  if (bodyText.includes('this') || bodyText.includes('arguments')) {
    return true
  }
  if (containsThisExpression(body)) {
    return true
  }
  if (containsArgumentsUsage(body)) {
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
  create(context: LintContext): Record<string, (node: DenoASTNode) => void> {
    return {
      /**
       * Visitor function for function expressions.
       * @param node - The AST node representing a function expression
       */
      FunctionExpression(node: DenoASTNode): void {
        if (!isFunctionExpression(node)) {
          return
        }
        const parent = node.parent
        if (parent && isCallExpression(parent)) {
          const callNode = parent as CallExpressionNode
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
