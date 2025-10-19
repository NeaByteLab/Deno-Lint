import type {
  ArrowFunctionExpressionNode,
  BlockStatementNode,
  CallExpressionNode,
  DenoASTNode,
  ForStatementNode,
  FunctionDeclarationNode,
  FunctionExpressionNode,
  IdentifierNode,
  IfStatementNode,
  LiteralNode,
  MemberExpressionNode,
  MethodDefinitionNode,
  ParameterNode,
  ReturnStatementNode
} from '@interfaces/index.ts'
import {
  isBinaryExpression,
  isBlockStatement,
  isCallExpression,
  isForStatement,
  isIdentifier,
  isIfStatement,
  isLiteral,
  isNewExpression,
  isReturnStatement,
  isThisExpression,
  KNOWN_ERROR_CLASSES
} from '@utils/index.ts'

/**
 * Checks if a for loop can be replaced with a specific array method.
 * @param node - The for loop node
 * @param method - The array method to check for ('every' or 'some')
 * @returns True if the loop can be replaced, false otherwise
 */
export function canReplaceWithArrayMethod(node: DenoASTNode, method: 'every' | 'some'): boolean {
  if (!isForStatement(node)) {
    return false
  }
  const forNode = node as ForStatementNode
  const body = forNode.body
  const expectedValue = method === 'every' ? false : true
  return containsReturnValue(body, expectedValue)
}

/**
 * Checks if a statement contains 'arguments' usage.
 * @param stmt - The statement to check
 * @returns True if the statement contains 'arguments'
 */
export function containsArgumentsUsage(stmt: DenoASTNode): boolean {
  return containsMatchingNode(stmt, (node) => isIdentifier(node) && node.name === 'arguments')
}

/**
 * Generic AST traversal function that searches for specific patterns.
 * @param node - The AST node to traverse
 * @param predicate - Function that determines if a node matches the search criteria
 * @returns True if any node matches the predicate, false otherwise
 */
export function containsMatchingNode(
  node: DenoASTNode,
  predicate: (node: DenoASTNode) => boolean
): boolean {
  if (predicate(node)) {
    return true
  }
  for (const key in node) {
    if (Object.prototype.hasOwnProperty.call(node, key)) {
      const value = (node as unknown as Record<string, unknown>)[key]
      if (value && typeof value === 'object') {
        if (Array.isArray(value)) {
          for (const item of value) {
            if (item && typeof item === 'object' && 'type' in item) {
              if (containsMatchingNode(item as DenoASTNode, predicate)) {
                return true
              }
            }
          }
        } else if ('type' in value) {
          if (containsMatchingNode(value as DenoASTNode, predicate)) {
            return true
          }
        }
      }
    }
  }
  return false
}

/**
 * Checks if a statement contains a return statement with specific value.
 * @param stmt - The statement to check
 * @param expectedValue - The expected return value (true/false)
 * @returns True if the statement contains the expected return value
 */
export function containsReturnValue(stmt: DenoASTNode, expectedValue: boolean): boolean {
  if (isReturnStatement(stmt)) {
    const returnNode = stmt as ReturnStatementNode
    const returnArg = returnNode.argument
    if (returnArg && isLiteral(returnArg) && returnArg.value === expectedValue) {
      return true
    }
  }
  if (isIfStatement(stmt)) {
    const ifStmt = stmt as IfStatementNode
    if (containsReturnValue(ifStmt.consequent, expectedValue)) {
      return true
    }
    if (ifStmt.alternate && containsReturnValue(ifStmt.alternate, expectedValue)) {
      return true
    }
  }
  if (isBlockStatement(stmt)) {
    const blockStmt = stmt as BlockStatementNode
    const statements = blockStmt.body || []
    return statements.some((s: DenoASTNode) => containsReturnValue(s, expectedValue))
  }
  return false
}

/**
 * Checks if a statement contains 'this' expression usage.
 * @param stmt - The statement to check
 * @returns True if the statement contains 'this'
 */
export function containsThisExpression(stmt: DenoASTNode): boolean {
  return containsMatchingNode(stmt, isThisExpression)
}

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
