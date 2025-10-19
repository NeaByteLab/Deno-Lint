import type {
  ArrowFunctionExpressionNode,
  CallExpressionNode,
  DenoASTNode,
  FunctionDeclarationNode,
  FunctionExpressionNode,
  IdentifierNode,
  LiteralNode,
  MemberExpressionNode,
  MethodDefinitionNode,
  ParameterNode
} from '@interfaces/index.ts'
import {
  isBinaryExpression,
  isCallExpression,
  isLiteral,
  isNewExpression,
  KNOWN_ERROR_CLASSES
} from '@utils/index.ts'

/**
 * Gets the method name from a Deno API call.
 * @param node - The Deno API call node
 * @returns The method name or null if not a Deno API call
 */
export function getDenoMethodName(node: DenoASTNode): string | null {
  if (!isDenoApiCall(node)) {
    return null
  }
  const callNode = node as CallExpressionNode
  return ((callNode.callee as MemberExpressionNode).property as IdentifierNode).name
}

/**
 * Gets the function name from various function node types.
 * @param node - The function node
 * @returns The function name or null if not available
 */
export function getFunctionName(node: DenoASTNode): string | null {
  switch (node.type) {
    case 'FunctionDeclaration':
      return (node as FunctionDeclarationNode).id?.name || null
    case 'FunctionExpression':
      return (node as FunctionExpressionNode).id?.name || null
    case 'ArrowFunctionExpression':
      return (node as ArrowFunctionExpressionNode).id?.name || null
    case 'MethodDefinition':
      return (node as MethodDefinitionNode).key?.name || null
    default:
      return null
  }
}

/**
 * Gets parameters from a function node.
 * @param node - The function node
 * @returns Array of parameter nodes
 */
export function getFunctionParams(node: DenoASTNode): ParameterNode[] {
  return (node as { params?: ParameterNode[] }).params || []
}

/**
 * Gets the parameter name from a parameter node.
 * @param param - The parameter node
 * @returns The parameter name or null if not available
 */
export function getParameterName(param: ParameterNode): string | null {
  switch (param.type) {
    case 'Identifier':
      return param.name || null
    case 'ObjectPattern':
      return 'destructured parameter'
    case 'RestElement':
      return param.argument?.name || 'rest parameter'
    case 'AssignmentPattern':
      return param.left?.name || 'default parameter'
    default:
      return null
  }
}

/**
 * Gets the return type from a function node.
 * @param node - The function node
 * @returns The return type or null if not available
 */
export function getReturnType(node: DenoASTNode): string | null {
  return (node as { returnType?: string }).returnType || null
}

/**
 * Checks if a parameter has type annotation.
 * @param param - The parameter node
 * @returns True if the parameter has type annotation, false otherwise
 */
export function hasParameterType(param: ParameterNode): boolean {
  switch (param.type) {
    case 'Identifier':
      return param.typeAnnotation !== undefined
    case 'ObjectPattern':
      return param.typeAnnotation !== undefined
    case 'RestElement':
      return param.typeAnnotation !== undefined
    case 'AssignmentPattern':
      return param.typeAnnotation !== undefined || param.left?.typeAnnotation !== undefined
    default:
      return true
  }
}

/**
 * Checks if a function has explicit return type annotation.
 * @param node - The function node
 * @returns True if the function has return type, false otherwise
 */
export function hasReturnType(node: DenoASTNode): boolean {
  return getReturnType(node) !== null
}

/**
 * Checks if a function is async.
 * @param node - The function node
 * @returns True if the function is async, false otherwise
 */
export function isAsyncFunction(node: DenoASTNode): boolean {
  return (node as { async?: boolean }).async === true
}

/**
 * Checks if a node is awaited by traversing up the AST.
 * @param node - The AST node to check
 * @returns True if the node is awaited, false otherwise
 */
export function isAwaited(node: DenoASTNode): boolean {
  const nodeWithParent = node as { parent?: unknown }
  let parent: unknown = nodeWithParent.parent
  while (parent) {
    if ((parent as DenoASTNode).type === 'AwaitExpression') {
      return true
    }
    parent = (parent as { parent?: unknown }).parent
  }
  return false
}

/**
 * Checks if a node is a Deno API call.
 * @param node - The AST node to check
 * @returns True if the node is a Deno API call, false otherwise
 */
export function isDenoApiCall(node: DenoASTNode): boolean {
  if (!isCallExpression(node)) {
    return false
  }
  return (
    node.callee.type === 'MemberExpression' &&
    node.callee.object.type === 'Identifier' &&
    node.callee.object.name === 'Deno' &&
    node.callee.property.type === 'Identifier'
  )
}

/**
 * Checks if a node is an Error constructor call.
 * @param node - The AST node to check
 * @returns True if the node is an Error constructor call, false otherwise
 */
export function isErrorConstructor(node: DenoASTNode): boolean {
  if (!isNewExpression(node)) {
    return false
  }
  return (
    node.callee.type === 'Identifier' &&
    (KNOWN_ERROR_CLASSES.includes(node.callee.name) || node.callee.name.endsWith('Error'))
  )
}

/**
 * Checks if a node is a Promise.reject() call.
 * @param node - The AST node to check
 * @returns True if the node is a Promise.reject() call, false otherwise
 */
export function isPromiseReject(node: DenoASTNode): boolean {
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
 * Checks if a binary expression is string concatenation.
 * @param node - The binary expression node
 * @returns True if the expression is string concatenation, false otherwise
 */
export function isStringConcatenation(node: DenoASTNode): boolean {
  if (!isBinaryExpression(node)) {
    return false
  }
  return node.operator === '+'
}

/**
 * Checks if a node is a string literal.
 * @param node - The AST node to check
 * @returns True if the node is a string literal, false otherwise
 */
export function isStringLiteral(node: DenoASTNode): boolean {
  return isLiteral(node) && typeof (node as LiteralNode).value === 'string'
}
