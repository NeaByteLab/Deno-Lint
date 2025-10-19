import type {
  CallExpressionNode,
  DenoASTNode,
  IdentifierNode,
  LintContext,
  LogicalExpressionNode,
  MemberExpressionNode,
  ParameterNode,
  TSAsExpressionNode,
  TSTypeNameNode,
  TSTypeReferenceNode
} from '@interfaces/index.ts'
import { isLiteral, isLogicalExpression } from '@utils/index.ts'
import { isDenoApiCall, isErrorConstructor, isPromiseReject } from '@utils/index.ts'

/**
 * Array of Deno file operations that require error handling.
 */
export const DENO_FILE_OPERATIONS = [
  'chmod',
  'chown',
  'copy',
  'copyFile',
  'lstat',
  'mkdir',
  'readDir',
  'readFile',
  'readLink',
  'readTextFile',
  'realPath',
  'remove',
  'stat',
  'symlink',
  'writeFile',
  'writeTextFile'
]

/**
 * Array of known error classes.
 */
export const KNOWN_ERROR_CLASSES = [
  'AssertionError',
  'Error',
  'EvalError',
  'RangeError',
  'ReferenceError',
  'SyntaxError',
  'SystemError',
  'TypeError',
  'URIError'
]

/**
 * Array of built-in global values that should not be used as Error objects.
 */
export const BUILT_IN_GLOBALS = ['undefined', 'null', 'true', 'false', 'NaN', 'Infinity']

/**
 * Checks if a logical AND expression can be converted to optional chaining.
 * @param node - The logical expression node
 * @param context - The lint context for accessing source code
 * @returns True if the expression can be converted to optional chaining, false otherwise
 */
export function canConvertToOptionalChain(node: DenoASTNode, context: LintContext): boolean {
  if (!isLogicalExpression(node)) {
    return false
  }
  const logicalNode = node as LogicalExpressionNode
  if (logicalNode.operator !== '&&') {
    return false
  }
  const leftText = context.sourceCode.getText(logicalNode.left)
  const rightNode = logicalNode.right
  if (rightNode.type === 'MemberExpression' && !rightNode.optional) {
    const rightObjectText = context.sourceCode.getText(rightNode.object)
    if (leftText === rightObjectText) {
      return true
    }
  }
  if (rightNode.type === 'CallExpression') {
    return canConvertCallExpression(rightNode, leftText, context)
  }
  return false
}

/**
 * Checks if a function name follows async naming convention.
 * @param node - The function node
 * @param suffix - The required suffix for async functions
 * @returns True if the function follows the naming convention, false otherwise
 */
export function followsAsyncNamingConvention(node: DenoASTNode, suffix = 'Async'): boolean {
  const functionName = (node as { id?: { name: string } }).id?.name
  if (!functionName) {
    return true
  }
  const isAsync = (node as { async?: boolean }).async === true
  if (isAsync) {
    return functionName.endsWith(suffix)
  }
  return true
}

/**
 * Checks if a node already has a const assertion.
 * @param node - The AST node to check
 * @returns True if the node has a const assertion, false otherwise
 */
export function hasConstAssertion(node: DenoASTNode): boolean {
  const parent = (node as DenoASTNode).parent
  if (!parent || parent.type !== 'TSAsExpression') {
    return false
  }
  const tsAsNode = parent as TSAsExpressionNode
  if (tsAsNode.typeAnnotation.type !== 'TSTypeReference') {
    return false
  }
  const typeRef = tsAsNode.typeAnnotation as TSTypeReferenceNode
  if (typeRef.typeName.type !== 'TSTypeName') {
    return false
  }
  const typeName = typeRef.typeName as TSTypeNameNode
  if (typeName.name.type !== 'Identifier') {
    return false
  }
  const identifier = typeName.name as IdentifierNode
  return identifier.name === 'const'
}

/**
 * Checks if all parameters in a function have explicit type annotations.
 * @param node - The function node
 * @returns True if all parameters have type annotations, false otherwise
 */
export function hasExplicitParameterTypes(node: DenoASTNode): boolean {
  const params = (node as { params?: ParameterNode[] }).params || []
  return params.every((param: ParameterNode) => {
    switch (param.type) {
      case 'Identifier':
        return param.typeAnnotation !== undefined
      case 'ObjectPattern':
        return param.typeAnnotation !== undefined
      case 'RestElement':
        return param.typeAnnotation !== undefined
      case 'AssignmentPattern':
        return (
          param.typeAnnotation !== undefined ||
          (param.left && param.left.typeAnnotation !== undefined)
        )
      default:
        return true
    }
  })
}

/**
 * Checks if a function has explicit return type annotation.
 * @param node - The function node
 * @returns True if the function has return type, false otherwise
 */
export function hasExplicitReturnType(node: DenoASTNode): boolean {
  return (node as { returnType?: string }).returnType !== undefined
}

/**
 * Checks if a node is a top-level expression (not nested in other arrays/objects).
 * @param node - The AST node to check
 * @returns True if the node is top-level, false otherwise
 */
export function isTopLevelExpression(node: DenoASTNode): boolean {
  const parent = (node as DenoASTNode).parent
  if (!parent) {
    return true
  }
  return (
    parent.type === 'VariableDeclarator' ||
    parent.type === 'FunctionDeclaration' ||
    parent.type === 'ArrowFunctionExpression' ||
    parent.type === 'FunctionExpression' ||
    parent.type === 'ReturnStatement' ||
    parent.type === 'AssignmentExpression'
  )
}

/**
 * Checks if a Deno API call requires error handling.
 * @param node - The call expression node
 * @returns True if the call requires error handling, false otherwise
 */
export function requiresErrorHandling(node: DenoASTNode): boolean {
  if (!isDenoApiCall(node)) {
    return false
  }
  const callNode = node as CallExpressionNode
  const methodName = ((callNode.callee as MemberExpressionNode).property as IdentifierNode).name
  return DENO_FILE_OPERATIONS.includes(methodName)
}

/**
 * Checks if a logical expression should use nullish coalescing instead of logical OR.
 * @param node - The logical expression node to check
 * @returns True if the expression should use nullish coalescing, false otherwise
 */
export function shouldUseNullishCoalescing(node: DenoASTNode): boolean {
  if (!isLogicalExpression(node)) {
    return false
  }
  const logicalNode = node as LogicalExpressionNode
  if (logicalNode.operator !== '||') {
    return false
  }
  const rightSide = logicalNode.right
  if (isLiteral(rightSide)) {
    const value = rightSide.value
    if (value === '' || value === 0 || value === false) {
      return true
    }
  }
  return false
}

/**
 * Checks if a Promise.reject() call uses an Error object.
 * @param node - The Promise.reject() call expression node
 * @returns True if the call uses an Error object, false otherwise
 */
export function usesErrorObject(node: DenoASTNode): boolean {
  if (!isPromiseReject(node)) {
    return false
  }
  const callNode = node as CallExpressionNode
  if (callNode.arguments.length === 0) {
    return false
  }
  const firstArg = callNode.arguments[0]
  if (!firstArg) {
    return false
  }
  if (isErrorConstructor(firstArg)) {
    return true
  }
  if (firstArg.type === 'CallExpression') {
    const callee = firstArg.callee
    if (callee.type === 'MemberExpression') {
      const object = callee.object
      if (isErrorConstructor(object)) {
        return true
      }
    }
  }
  if (firstArg.type === 'Identifier') {
    if (firstArg.name && BUILT_IN_GLOBALS.includes(firstArg.name)) {
      return false
    }
    return true
  }
  return false
}

/**
 * Helper function to check if a call expression can be converted to optional chaining.
 * @param callNode - The call expression node
 * @param leftText - The left side text to match
 * @param context - The lint context for accessing source code
 * @returns True if the call can be converted, false otherwise
 */
function canConvertCallExpression(
  callNode: CallExpressionNode,
  leftText: string,
  context: LintContext
): boolean {
  const callee = callNode.callee
  if (callee.type === 'MemberExpression' && !(callee as DenoASTNode).optional) {
    const rightObjectText = context.sourceCode.getText(callee.object)
    if (leftText === rightObjectText) {
      return true
    }
    if ((callee.object as DenoASTNode).type === 'CallExpression') {
      return canConvertCallExpression(
        callee.object as unknown as CallExpressionNode,
        leftText,
        context
      )
    }
    return false
  }
  if ((callee as DenoASTNode).type === 'CallExpression') {
    return canConvertCallExpression(callee as unknown as CallExpressionNode, leftText, context)
  }
  return false
}
