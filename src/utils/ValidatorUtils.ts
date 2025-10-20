import type * as types from '@interfaces/index.ts'
import * as utils from '@utils/index.ts'

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
export function canConvertToOptionalChain(
  node: types.DenoASTNode,
  context: types.LintContext
): boolean {
  if (!utils.isLogicalExpression(node)) {
    return false
  }
  const logicalNode = node as types.LogicalExpressionNode
  if (logicalNode.operator !== '&&') {
    return false
  }
  const leftText = context.sourceCode.getText(logicalNode.left)
  const rightNode = logicalNode.right
  if (utils.isMemberExpression(rightNode) && !rightNode.optional) {
    const rightObjectText = context.sourceCode.getText(rightNode.object)
    if (leftText === rightObjectText) {
      return true
    }
  }
  if (utils.isCallExpression(rightNode)) {
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
export function followsAsyncNamingConvention(node: types.DenoASTNode, suffix = 'Async'): boolean {
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
export function hasConstAssertion(node: types.DenoASTNode): boolean {
  const parent = (node as types.DenoASTNode).parent
  if (!parent || !utils.isTSAsExpression(parent)) {
    return false
  }
  const tsAsNode = parent as types.TSAsExpressionNode
  if (tsAsNode.typeAnnotation.type !== 'TSTypeReference') {
    return false
  }
  const typeRef = tsAsNode.typeAnnotation as types.TSTypeReferenceNode
  if (typeRef.typeName.type !== 'TSTypeName') {
    return false
  }
  const typeName = typeRef.typeName as types.TSTypeNameNode
  if (!utils.isIdentifier(typeName.name)) {
    return false
  }
  const identifier = typeName.name as types.IdentifierNode
  return identifier.name === 'const'
}

/**
 * Checks if all parameters in a function have explicit type annotations.
 * @param node - The function node
 * @returns True if all parameters have type annotations, false otherwise
 */
export function hasExplicitParameterTypes(node: types.DenoASTNode): boolean {
  const params = (node as { params?: types.ParameterNode[] }).params || []
  return params.every((param: types.ParameterNode) => {
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
export function hasExplicitReturnType(node: types.DenoASTNode): boolean {
  return (node as { returnType?: string }).returnType !== undefined
}

/**
 * Checks if a function has nested conditions that could benefit from early returns.
 * @param node - The function node to analyze
 * @returns True if the function has nested conditions that could be refactored
 */
export function hasNestedConditions(node: types.DenoASTNode): boolean {
  if (
    !utils.isFunctionDeclaration(node) &&
    !utils.isFunctionExpression(node) &&
    !utils.isArrowFunctionExpression(node)
  ) {
    return false
  }
  const functionNode = node as
    | types.FunctionDeclarationNode
    | types.FunctionExpressionNode
    | types.ArrowFunctionExpressionNode
  if (!functionNode.body || !utils.isBlockStatement(functionNode.body)) {
    return false
  }
  const blockStatement = functionNode.body as types.BlockStatementNode
  const statements = blockStatement.body
  if (statements.length === 0) {
    return false
  }
  for (const statement of statements) {
    if (utils.isIfStatement(statement)) {
      if (statement.alternate && hasNestedIfStatement(statement.alternate)) {
        return true
      }
      if (hasNestedIfStatement(statement.consequent)) {
        return true
      }
    }
  }
  return false
}

/**
 * Checks if a statement contains nested if statements that could benefit from early returns.
 * @param statement - The statement to analyze
 * @returns True if the statement contains nested if statements
 */
export function hasNestedIfStatement(statement: types.DenoASTNode): boolean {
  if (utils.isBlockStatement(statement)) {
    return statement.body.some((stmt: types.DenoASTNode) =>
      hasNestedIfStatement(stmt as types.DenoASTNode)
    )
  }
  if (utils.isIfStatement(statement)) {
    return true
  }
  return false
}

/**
 * Checks if a node is a top-level expression (not nested in other arrays/objects).
 * @param node - The AST node to check
 * @returns True if the node is top-level, false otherwise
 */
export function isTopLevelExpression(node: types.DenoASTNode): boolean {
  const parent = (node as types.DenoASTNode).parent
  if (!parent) {
    return true
  }
  return (
    utils.isVariableDeclarator(parent) ||
    utils.isFunctionDeclaration(parent) ||
    utils.isArrowFunctionExpression(parent) ||
    utils.isFunctionExpression(parent) ||
    utils.isReturnStatement(parent) ||
    utils.isAssignmentExpression(parent)
  )
}

/**
 * Checks if a Deno API call requires error handling.
 * @param node - The call expression node
 * @returns True if the call requires error handling, false otherwise
 */
export function requiresErrorHandling(node: types.DenoASTNode): boolean {
  if (!utils.isDenoApiCall(node)) {
    return false
  }
  const callNode = node as types.CallExpressionNode
  const methodName = (
    (callNode.callee as types.MemberExpressionNode).property as types.IdentifierNode
  ).name
  return DENO_FILE_OPERATIONS.includes(methodName)
}

/**
 * Checks if a logical expression should use nullish coalescing instead of logical OR.
 * @param node - The logical expression node to check
 * @returns True if the expression should use nullish coalescing, false otherwise
 */
export function shouldUseNullishCoalescing(node: types.DenoASTNode): boolean {
  if (!utils.isLogicalExpression(node)) {
    return false
  }
  const logicalNode = node as types.LogicalExpressionNode
  if (logicalNode.operator !== '||') {
    return false
  }
  const rightSide = logicalNode.right
  if (utils.isLiteral(rightSide)) {
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
export function usesErrorObject(node: types.DenoASTNode): boolean {
  if (!utils.isPromiseReject(node)) {
    return false
  }
  const callNode = node as types.CallExpressionNode
  if (callNode.arguments.length === 0) {
    return false
  }
  const firstArg = callNode.arguments[0]
  if (!firstArg) {
    return false
  }
  if (utils.isErrorConstructor(firstArg)) {
    return true
  }
  if (utils.isCallExpression(firstArg)) {
    const callee = firstArg.callee
    if (utils.isMemberExpression(callee)) {
      const object = callee.object
      if (utils.isErrorConstructor(object)) {
        return true
      }
    }
  }
  if (utils.isIdentifier(firstArg)) {
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
  callNode: types.CallExpressionNode,
  leftText: string,
  context: types.LintContext
): boolean {
  const callee = callNode.callee
  if (utils.isMemberExpression(callee) && !(callee as types.DenoASTNode).optional) {
    const rightObjectText = context.sourceCode.getText(callee.object)
    if (leftText === rightObjectText) {
      return true
    }
    if (utils.isCallExpression(callee.object as types.DenoASTNode)) {
      return canConvertCallExpression(
        callee.object as unknown as types.CallExpressionNode,
        leftText,
        context
      )
    }
    return false
  }
  if (utils.isCallExpression(callee as types.DenoASTNode)) {
    return canConvertCallExpression(
      callee as unknown as types.CallExpressionNode,
      leftText,
      context
    )
  }
  return false
}
