import type {
  ASTNode,
  CallExpressionNode,
  LintContext,
  LintFixer,
  NewExpressionNode
} from '@app/types.ts'
import { isCallExpression, isNewExpression } from '@shared/expression.ts'

/**
 * Array of known error classes.
 */
const knownErrorClasses = [
  'Error',
  'AssertionError',
  'RangeError',
  'ReferenceError',
  'SyntaxError',
  'SystemError',
  'TypeError',
  'EvalError',
  'URIError'
]

/**
 * Checks if a node is a new Error() constructor call.
 * @param node - The AST node to check
 * @returns True if the node is a new Error() call, false otherwise
 */
function isErrorConstructor(node: ASTNode): node is NewExpressionNode {
  if (!isNewExpression(node)) {
    return false
  }
  return (
    node.callee.type === 'Identifier' &&
    (knownErrorClasses.includes(node.callee.name) || node.callee.name.endsWith('Error'))
  )
}

/**
 * Checks if a node is a method call on an Error object.
 * @param node - The AST node to check
 * @returns True if the node is a method call on an Error object, false otherwise
 */
function isErrorMethodCall(node: ASTNode): boolean {
  if (!isCallExpression(node)) {
    return false
  }
  if (node.callee.type === 'MemberExpression') {
    const object = node.callee.object
    if (isNewExpression(object) && isErrorConstructor(object)) {
      return true
    }
    if (isNewExpression(object) && isErrorConstructor(object)) {
      return true
    }
  }
  return false
}

/**
 * Checks if a node is a Promise.reject() call.
 * @param node - The AST node to check
 * @returns True if the node is a Promise.reject() call, false otherwise
 */
function isPromiseReject(node: ASTNode): node is CallExpressionNode {
  if (!isCallExpression(node)) {
    return false
  }
  return (
    node.callee.type === 'MemberExpression' &&
    node.callee.object.type === 'Identifier' &&
    node.callee.object.name === 'Promise' &&
    node.callee.property.type === 'Identifier' &&
    node.callee.property.name === 'reject'
  )
}

/**
 * Checks if a Promise.reject() call uses an Error object.
 * @param node - The Promise.reject() call expression node
 * @returns True if the call uses an Error object, false otherwise
 */
function usesErrorObject(node: CallExpressionNode): boolean {
  if (node.arguments.length === 0) {
    return false
  }
  const firstArg = node.arguments[0]
  if (!firstArg) {
    return false
  }
  if (isErrorConstructor(firstArg)) {
    return true
  }
  if (isErrorConstructor(firstArg)) {
    return true
  }
  if (isErrorMethodCall(firstArg)) {
    return true
  }
  if (firstArg.type === 'Identifier') {
    const builtInGlobals = ['undefined', 'null', 'true', 'false', 'NaN', 'Infinity']
    if (firstArg.name && builtInGlobals.includes(firstArg.name)) {
      return false
    }
    return true
  }
  return false
}

/**
 * Lint rule for preferring Error objects in Promise.reject() calls.
 */
export const preferPromiseRejectErrorsRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: LintContext): Record<string, (node: ASTNode) => void> {
    return {
      /**
       * Visitor function for call expressions.
       * @param node - The AST node representing a call expression
       */
      CallExpression(node: ASTNode): void {
        if (!isPromiseReject(node)) {
          return
        }
        if (node.arguments.length > 0 && !usesErrorObject(node)) {
          context.report({
            node,
            message:
              'Promise.reject() should be called with an Error object, not a primitive value',
            fix(fixer: LintFixer): unknown {
              const firstArg = node.arguments[0]
              if (firstArg) {
                const argText = context.sourceCode.getText(firstArg)
                const newText = `new Error(${argText})`
                return fixer.replaceText(firstArg, newText)
              }
              return null
            }
          })
        }
      }
    }
  }
}
