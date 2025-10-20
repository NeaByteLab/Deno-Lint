import type * as types from '@interfaces/index.ts'
import * as utils from '@utils/index.ts'

/**
 * Checks if a for loop can be replaced with a specific array method.
 * @param node - The for loop node
 * @param method - The array method to check for ('every' or 'some')
 * @returns True if the loop can be replaced, false otherwise
 */
export function canReplaceWithArrayMethod(
  node: types.DenoASTNode,
  method: 'every' | 'some'
): boolean {
  if (!utils.isForStatement(node)) {
    return false
  }
  const forNode = node as types.ForStatementNode
  const body = forNode.body
  const expectedValue = method === 'every' ? false : true
  return containsReturnValue(body, expectedValue)
}

/**
 * Checks if a statement contains 'arguments' usage.
 * @param stmt - The statement to check
 * @returns True if the statement contains 'arguments'
 */
export function containsArgumentsUsage(stmt: types.DenoASTNode): boolean {
  return containsMatchingNode(stmt, (node) => utils.isIdentifier(node) && node.name === 'arguments')
}

/**
 * Generic AST traversal function that searches for specific patterns.
 * @param node - The AST node to traverse
 * @param predicate - Function that determines if a node matches the search criteria
 * @returns True if any node matches the predicate, false otherwise
 */
export function containsMatchingNode(
  node: types.DenoASTNode,
  predicate: (node: types.DenoASTNode) => boolean
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
              if (containsMatchingNode(item as types.DenoASTNode, predicate)) {
                return true
              }
            }
          }
        } else if ('type' in value) {
          if (containsMatchingNode(value as types.DenoASTNode, predicate)) {
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
export function containsReturnValue(stmt: types.DenoASTNode, expectedValue: boolean): boolean {
  if (utils.isReturnStatement(stmt)) {
    const returnNode = stmt as types.ReturnStatementNode
    const returnArg = returnNode.argument
    if (returnArg && utils.isLiteral(returnArg) && returnArg.value === expectedValue) {
      return true
    }
  }
  if (utils.isIfStatement(stmt)) {
    const ifStmt = stmt as types.IfStatementNode
    if (containsReturnValue(ifStmt.consequent, expectedValue)) {
      return true
    }
    if (ifStmt.alternate && containsReturnValue(ifStmt.alternate, expectedValue)) {
      return true
    }
  }
  if (utils.isBlockStatement(stmt)) {
    const blockStmt = stmt as types.BlockStatementNode
    const statements = blockStmt.body || []
    return statements.some((s: types.DenoASTNode) => containsReturnValue(s, expectedValue))
  }
  return false
}

/**
 * Checks if a statement contains 'this' expression usage.
 * @param stmt - The statement to check
 * @returns True if the statement contains 'this'
 */
export function containsThisExpression(stmt: types.DenoASTNode): boolean {
  return containsMatchingNode(stmt, utils.isThisExpression)
}

/**
 * Extracts call expression information including callee and arguments.
 * @param node - The AST node to check
 * @returns Object with call expression information, or null if not a call expression
 */
export function extractCallExpressionInfo(node: types.DenoASTNode): {
  callee: types.DenoASTNode
  arguments: types.DenoASTNode[]
} | null {
  if (!utils.isCallExpression(node)) {
    return null
  }
  const callNode = node as types.CallExpressionNode
  return {
    callee: callNode.callee,
    arguments: callNode.arguments || []
  }
}

/**
 * Extracts object and property information from a member expression.
 * @param node - The AST node to check
 * @returns Object with object and property information, or null if not a member expression
 */
export function extractMemberExpressionInfo(node: types.DenoASTNode): {
  object: types.DenoASTNode
  property: string
} | null {
  if (!utils.isMemberExpression(node)) {
    return null
  }
  const memberExpr = node as types.MemberExpressionNode
  if (!utils.isIdentifier(memberExpr.property)) {
    return null
  }
  return {
    object: memberExpr.object,
    property: memberExpr.property.name
  }
}

/**
 * Gets the method name from a Deno API call.
 * @param node - The Deno API call node
 * @returns The method name or null if not a Deno API call
 */
export function getDenoMethodName(node: types.DenoASTNode): string | null {
  if (!isDenoApiCall(node)) {
    return null
  }
  const callNode = node as types.CallExpressionNode
  return ((callNode.callee as types.MemberExpressionNode).property as types.IdentifierNode).name
}

/**
 * Gets the function name from various function node types.
 * @param node - The function node
 * @returns The function name or null if not available
 */
export function getFunctionName(node: types.DenoASTNode): string | null {
  switch (node.type) {
    case 'FunctionDeclaration':
      return (node as types.FunctionDeclarationNode).id?.name || null
    case 'FunctionExpression':
      return (node as types.FunctionExpressionNode).id?.name || null
    case 'ArrowFunctionExpression':
      return (node as types.ArrowFunctionExpressionNode).id?.name || null
    case 'MethodDefinition':
      return (node as types.MethodDefinitionNode).key?.name || null
    default:
      return null
  }
}

/**
 * Gets parameters from a function node.
 * @param node - The function node
 * @returns Array of parameter nodes
 */
export function getFunctionParams(node: types.DenoASTNode): types.ParameterNode[] {
  return (node as { params?: types.ParameterNode[] }).params || []
}

/**
 * Gets the parameter name from a parameter node.
 * @param param - The parameter node
 * @returns The parameter name or null if not available
 */
export function getParameterName(param: types.ParameterNode): string | null {
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
export function getReturnType(node: types.DenoASTNode): string | null {
  return (node as { returnType?: string }).returnType || null
}

/**
 * Checks if a parameter has type annotation.
 * @param param - The parameter node
 * @returns True if the parameter has type annotation, false otherwise
 */
export function hasParameterType(param: types.ParameterNode): boolean {
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
export function hasReturnType(node: types.DenoASTNode): boolean {
  return getReturnType(node) !== null
}

/**
 * Checks if a function is async.
 * @param node - The function node
 * @returns True if the function is async, false otherwise
 */
export function isAsyncFunction(node: types.DenoASTNode): boolean {
  return (node as { async?: boolean }).async === true
}

/**
 * Checks if a node is awaited by traversing up the AST.
 * @param node - The AST node to check
 * @returns True if the node is awaited, false otherwise
 */
export function isAwaited(node: types.DenoASTNode): boolean {
  const nodeWithParent = node as { parent?: unknown }
  let parent: unknown = nodeWithParent.parent
  while (parent) {
    if (utils.isAwaitExpression(parent as types.DenoASTNode)) {
      return true
    }
    parent = (parent as { parent?: unknown }).parent
  }
  return false
}

/**
 * Checks if a call expression matches the Array.prototype.concat.apply([], array) pattern.
 * @param node - The call expression node
 * @returns True if the expression matches the concat apply pattern, false otherwise
 */
export function isConcatApplyCall(node: types.DenoASTNode): boolean {
  if (!utils.isCallExpression(node)) {
    return false
  }
  const callNode = node as types.CallExpressionNode
  const callee = callNode.callee
  if (!utils.isMemberExpression(callee)) {
    return false
  }
  const memberExpr = callee as types.MemberExpressionNode
  if (!utils.isIdentifier(memberExpr.property) || memberExpr.property.name !== 'apply') {
    return false
  }
  if (!utils.isMemberExpression(memberExpr.object)) {
    return false
  }
  const concatMember = memberExpr.object as types.MemberExpressionNode
  if (!utils.isIdentifier(concatMember.property) || concatMember.property.name !== 'concat') {
    return false
  }
  if (!utils.isMemberExpression(concatMember.object)) {
    return false
  }
  const prototypeMember = concatMember.object as types.MemberExpressionNode
  if (
    !utils.isIdentifier(prototypeMember.property) ||
    prototypeMember.property.name !== 'prototype'
  ) {
    return false
  }
  if (!utils.isIdentifier(prototypeMember.object)) {
    return false
  }
  const arrayIdentifier = prototypeMember.object as types.IdentifierNode
  if (arrayIdentifier.name !== 'Array') {
    return false
  }
  if (!callNode.arguments || callNode.arguments.length !== 2) {
    return false
  }
  const firstArg = callNode.arguments[0]
  if (!firstArg) {
    return false
  }
  if (!isEmptyArrayExpression(firstArg)) {
    return false
  }
  return true
}

/**
 * Checks if a node is a concat() method call.
 * @param node - The AST node to check
 * @returns True if the node is a concat() call, false otherwise
 */
export function isConcatCall(node: types.DenoASTNode): boolean {
  return isMethodCall(node, 'concat')
}

/**
 * Checks if a call expression matches the [].concat(...array) pattern.
 * @param node - The call expression node
 * @returns True if the expression matches the concat spread pattern, false otherwise
 */
export function isConcatSpreadPattern(node: types.DenoASTNode): boolean {
  if (!utils.isCallExpression(node)) {
    return false
  }
  const callNode = node as types.CallExpressionNode
  if (!isConcatCall(node)) {
    return false
  }
  const callee = callNode.callee
  if (!utils.isMemberExpression(callee)) {
    return false
  }
  const memberExpr = callee as types.MemberExpressionNode
  if (!isEmptyArrayExpression(memberExpr.object)) {
    return false
  }
  if (!callNode.arguments || callNode.arguments.length !== 1) {
    return false
  }
  const firstArg = callNode.arguments[0]
  if (!firstArg) {
    return false
  }
  if (!utils.isSpreadElement(firstArg)) {
    return false
  }
  return true
}

/**
 * Checks if a node is a Deno API call.
 * @param node - The AST node to check
 * @returns True if the node is a Deno API call, false otherwise
 */
export function isDenoApiCall(node: types.DenoASTNode): boolean {
  if (!utils.isCallExpression(node)) {
    return false
  }
  return (
    utils.isMemberExpression(node.callee) &&
    utils.isIdentifier(node.callee.object) &&
    node.callee.object.name === 'Deno' &&
    utils.isIdentifier(node.callee.property)
  )
}

/**
 * Checks if a binary expression matches the endsWith pattern.
 * @param node - The binary expression node
 * @returns True if the expression matches endsWith pattern, false otherwise
 */
export function isEndsWithPattern(node: types.DenoASTNode): boolean {
  if (!utils.isBinaryExpression(node)) {
    return false
  }
  const callNode = node.left
  if (!utils.isCallExpression(callNode)) {
    return false
  }
  const callExpr = callNode as types.CallExpressionNode
  if (!callExpr.arguments || callExpr.arguments.length !== 1) {
    return false
  }
  const firstArg = callExpr.arguments[0]
  if (!firstArg) {
    return false
  }
  if (!utils.isBinaryExpression(firstArg)) {
    return false
  }
  const binaryArg = firstArg as types.BinaryExpressionNode
  if (binaryArg.operator !== '-') {
    return false
  }
  if (!utils.isMemberExpression(binaryArg.left)) {
    return false
  }
  const leftMember = binaryArg.left as types.MemberExpressionNode
  if (!utils.isIdentifier(leftMember.property) || leftMember.property.name !== 'length') {
    return false
  }
  if (!utils.isLiteral(binaryArg.right)) {
    return false
  }
  const rightValue = (binaryArg.right as types.LiteralNode).value
  if (typeof rightValue !== 'number' || rightValue <= 0) {
    return false
  }
  return true
}

/**
 * Checks if an array expression is empty.
 * @param node - The AST node to check
 * @returns True if the node is an empty array expression, false otherwise
 */
export function isEmptyArrayExpression(node: types.DenoASTNode): boolean {
  if (!utils.isArrayExpression(node)) {
    return false
  }
  const arrayExpr = node as types.ArrayExpressionNode
  return arrayExpr.elements.length === 0
}

/**
 * Checks if a node is an Error constructor call.
 * @param node - The AST node to check
 * @returns True if the node is an Error constructor call, false otherwise
 */
export function isErrorConstructor(node: types.DenoASTNode): boolean {
  if (!utils.isNewExpression(node)) {
    return false
  }
  return (
    utils.isIdentifier(node.callee) &&
    (utils.KNOWN_ERROR_CLASSES.includes(node.callee.name) || node.callee.name.endsWith('Error'))
  )
}

/**
 * Checks if a node is an indexOf() method call.
 * @param node - The AST node to check
 * @returns True if the node is an indexOf() call, false otherwise
 */
export function isIndexOfCall(node: types.DenoASTNode): boolean {
  return isMethodCall(node, 'indexOf')
}

/**
 * Checks if a call expression is a method call with the specified method name.
 * @param node - The AST node to check
 * @param methodName - The method name to check for
 * @returns True if the node is a call to the specified method, false otherwise
 */
export function isMethodCall(node: types.DenoASTNode, methodName: string): boolean {
  if (!utils.isCallExpression(node)) {
    return false
  }
  const callNode = node as types.CallExpressionNode
  const memberInfo = extractMemberExpressionInfo(callNode.callee)
  return memberInfo?.property === methodName || false
}

/**
 * Checks if a node represents a comparison with -1.
 * @param node - The AST node to check
 * @returns True if the node is a comparison with -1, false otherwise
 */
export function isNegativeOneComparison(node: types.DenoASTNode): boolean {
  if (utils.isLiteral(node) && (node as types.LiteralNode).value === -1) {
    return true
  }
  if (utils.isUnaryExpression(node)) {
    const unaryNode = node as types.UnaryExpressionNode
    if (
      unaryNode.operator === '-' &&
      utils.isLiteral(unaryNode.argument) &&
      (unaryNode.argument as types.LiteralNode).value === 1
    ) {
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
export function isPromiseReject(node: types.DenoASTNode): boolean {
  if (!utils.isCallExpression(node)) {
    return false
  }
  return (
    utils.isMemberExpression(node.callee) &&
    utils.isIdentifier(node.callee.object) &&
    node.callee.object.name === 'Promise' &&
    utils.isIdentifier(node.callee.property) &&
    node.callee.property.name === 'reject'
  )
}

/**
 * Checks if a binary expression matches the startsWith pattern.
 * @param node - The binary expression node
 * @returns True if the expression matches startsWith pattern, false otherwise
 */
export function isStartsWithPattern(node: types.DenoASTNode): boolean {
  if (!utils.isBinaryExpression(node)) {
    return false
  }
  const callNode = node.left
  if (!utils.isCallExpression(callNode)) {
    return false
  }
  const callExpr = callNode as types.CallExpressionNode
  if (!callExpr.arguments || callExpr.arguments.length !== 2) {
    return false
  }
  const firstArg = callExpr.arguments[0]
  const secondArg = callExpr.arguments[1]
  if (!firstArg || !secondArg) {
    return false
  }
  if (!utils.isLiteral(firstArg) || (firstArg as types.LiteralNode).value !== 0) {
    return false
  }
  if (!utils.isLiteral(secondArg)) {
    return false
  }
  const secondValue = (secondArg as types.LiteralNode).value
  if (typeof secondValue !== 'number' || secondValue <= 0) {
    return false
  }
  return true
}

/**
 * Checks if a binary expression is string concatenation.
 * @param node - The binary expression node
 * @returns True if the expression is string concatenation, false otherwise
 */
export function isStringConcatenation(node: types.DenoASTNode): boolean {
  if (!utils.isBinaryExpression(node)) {
    return false
  }
  return node.operator === '+'
}

/**
 * Checks if a node is a string literal.
 * @param node - The AST node to check
 * @returns True if the node is a string literal, false otherwise
 */
export function isStringLiteral(node: types.DenoASTNode): boolean {
  return utils.isLiteral(node) && typeof (node as types.LiteralNode).value === 'string'
}

/**
 * Checks if a node is a substring() method call.
 * @param node - The AST node to check
 * @returns True if the node is a substring() call, false otherwise
 */
export function isSubstringCall(node: types.DenoASTNode): boolean {
  return isMethodCall(node, 'substring')
}
