import type * as types from '@interfaces/index.ts'

/**
 * Type guard to check if a node is an array expression.
 * @param node - The AST node to check
 * @returns True if the node is an array expression, false otherwise
 */
export function isArrayExpression(node: types.DenoASTNode): node is types.ArrayExpressionNode {
  return node.type === 'ArrayExpression'
}

/**
 * Type guard to check if a node is an arrow function expression.
 * @param node - The AST node to check
 * @returns True if the node is an arrow function expression, false otherwise
 */
export function isArrowFunctionExpression(
  node: types.DenoASTNode
): node is types.ArrowFunctionExpressionNode {
  return node.type === 'ArrowFunctionExpression'
}

/**
 * Type guard to check if a node is an assignment expression.
 * @param node - The AST node to check
 * @returns True if the node is an assignment expression, false otherwise
 */
export function isAssignmentExpression(
  node: types.DenoASTNode
): node is types.AssignmentExpressionNode {
  return node.type === 'AssignmentExpression'
}

/**
 * Type guard to check if a node is an await expression.
 * @param node - The AST node to check
 * @returns True if the node is an await expression, false otherwise
 */
export function isAwaitExpression(node: types.DenoASTNode): node is types.AwaitExpressionNode {
  return node.type === 'AwaitExpression'
}

/**
 * Type guard to check if a node is a binary expression.
 * @param node - The AST node to check
 * @returns True if the node is a binary expression, false otherwise
 */
export function isBinaryExpression(node: types.DenoASTNode): node is types.BinaryExpressionNode {
  return node.type === 'BinaryExpression'
}

/**
 * Type guard to check if a node is a call expression.
 * @param node - The AST node to check
 * @returns True if the node is a call expression, false otherwise
 */
export function isCallExpression(node: types.DenoASTNode): node is types.CallExpressionNode {
  return node.type === 'CallExpression'
}

/**
 * Type guard to check if a node is a chain expression.
 * @param node - The AST node to check
 * @returns True if the node is a chain expression, false otherwise
 */
export function isChainExpression(node: types.DenoASTNode): node is types.ChainExpressionNode {
  return node.type === 'ChainExpression'
}

/**
 * Type guard to check if a node is a class expression.
 * @param node - The AST node to check
 * @returns True if the node is a class expression, false otherwise
 */
export function isClassExpression(node: types.DenoASTNode): node is types.ClassExpressionNode {
  return node.type === 'ClassExpression'
}

/**
 * Type guard to check if a node is a conditional expression.
 * @param node - The AST node to check
 * @returns True if the node is a conditional expression, false otherwise
 */
export function isConditionalExpression(
  node: types.DenoASTNode
): node is types.ConditionalExpressionNode {
  return node.type === 'ConditionalExpression'
}

/**
 * Type guard to check if a node is a function expression.
 * @param node - The AST node to check
 * @returns True if the node is a function expression, false otherwise
 */
export function isFunctionExpression(
  node: types.DenoASTNode
): node is types.FunctionExpressionNode {
  return node.type === 'FunctionExpression'
}

/**
 * Type guard to check if a node is a logical expression.
 * @param node - The AST node to check
 * @returns True if the node is a logical expression, false otherwise
 */
export function isLogicalExpression(node: types.DenoASTNode): node is types.LogicalExpressionNode {
  return node.type === 'LogicalExpression'
}

/**
 * Type guard to check if a node is a member expression.
 * @param node - The AST node to check
 * @returns True if the node is a member expression, false otherwise
 */
export function isMemberExpression(node: types.DenoASTNode): node is types.MemberExpressionNode {
  return node.type === 'MemberExpression'
}

/**
 * Type guard to check if a node is a new expression.
 * @param node - The AST node to check
 * @returns True if the node is a new expression, false otherwise
 */
export function isNewExpression(node: types.DenoASTNode): node is types.NewExpressionNode {
  return node.type === 'NewExpression'
}

/**
 * Type guard to check if a node is an object expression.
 * @param node - The AST node to check
 * @returns True if the node is an object expression, false otherwise
 */
export function isObjectExpression(node: types.DenoASTNode): node is types.ObjectExpressionNode {
  return node.type === 'ObjectExpression'
}

/**
 * Type guard to check if a node is a this expression.
 * @param node - The AST node to check
 * @returns True if the node is a this expression, false otherwise
 */
export function isThisExpression(node: types.DenoASTNode): node is types.ThisExpressionNode {
  return node.type === 'ThisExpression'
}

/**
 * Type guard to check if a node is a TypeScript as expression.
 * @param node - The AST node to check
 * @returns True if the node is a TypeScript as expression, false otherwise
 */
export function isTSAsExpression(node: types.DenoASTNode): node is types.TSAsExpressionNode {
  return node.type === 'TSAsExpression'
}

/**
 * Type guard to check if a node is a unary expression.
 * @param node - The AST node to check
 * @returns True if the node is a unary expression, false otherwise
 */
export function isUnaryExpression(node: types.DenoASTNode): node is types.UnaryExpressionNode {
  return node.type === 'UnaryExpression'
}

/**
 * Type guard to check if a node is an update expression.
 * @param node - The AST node to check
 * @returns True if the node is an update expression, false otherwise
 */
export function isUpdateExpression(node: types.DenoASTNode): node is types.UpdateExpressionNode {
  return node.type === 'UpdateExpression'
}

/**
 * Type guard to check if a node is a yield expression.
 * @param node - The AST node to check
 * @returns True if the node is a yield expression, false otherwise
 */
export function isYieldExpression(node: types.DenoASTNode): node is types.YieldExpressionNode {
  return node.type === 'YieldExpression'
}
