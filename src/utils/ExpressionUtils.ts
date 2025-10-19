import type {
  ArrayExpressionNode,
  ArrowFunctionExpressionNode,
  AssignmentExpressionNode,
  AwaitExpressionNode,
  BinaryExpressionNode,
  BlockStatementNode,
  CallExpressionNode,
  ChainExpressionNode,
  ClassExpressionNode,
  ConditionalExpressionNode,
  DenoASTNode,
  FunctionDeclarationNode,
  FunctionExpressionNode,
  IfStatementNode,
  LiteralNode,
  LogicalExpressionNode,
  MemberExpressionNode,
  MethodDefinitionNode,
  NewExpressionNode,
  ObjectExpressionNode,
  ReturnStatementNode,
  ThisExpressionNode,
  TSAsExpressionNode,
  UnaryExpressionNode,
  UpdateExpressionNode,
  YieldExpressionNode
} from '@interfaces/index.ts'

/**
 * Type guard to check if a node is an array expression.
 * @param node - The AST node to check
 * @returns True if the node is an array expression, false otherwise
 */
export function isArrayExpression(node: DenoASTNode): node is ArrayExpressionNode {
  return node.type === 'ArrayExpression'
}

/**
 * Type guard to check if a node is an arrow function expression.
 * @param node - The AST node to check
 * @returns True if the node is an arrow function expression, false otherwise
 */
export function isArrowFunctionExpression(node: DenoASTNode): node is ArrowFunctionExpressionNode {
  return node.type === 'ArrowFunctionExpression'
}

/**
 * Type guard to check if a node is an assignment expression.
 * @param node - The AST node to check
 * @returns True if the node is an assignment expression, false otherwise
 */
export function isAssignmentExpression(node: DenoASTNode): node is AssignmentExpressionNode {
  return node.type === 'AssignmentExpression'
}

/**
 * Type guard to check if a node is an await expression.
 * @param node - The AST node to check
 * @returns True if the node is an await expression, false otherwise
 */
export function isAwaitExpression(node: DenoASTNode): node is AwaitExpressionNode {
  return node.type === 'AwaitExpression'
}

/**
 * Type guard to check if a node is a binary expression.
 * @param node - The AST node to check
 * @returns True if the node is a binary expression, false otherwise
 */
export function isBinaryExpression(node: DenoASTNode): node is BinaryExpressionNode {
  return node.type === 'BinaryExpression'
}

/**
 * Type guard to check if a node is a block statement.
 * @param node - The AST node to check
 * @returns True if the node is a block statement, false otherwise
 */
export function isBlockStatement(node: DenoASTNode): node is BlockStatementNode {
  return node.type === 'BlockStatement'
}

/**
 * Type guard to check if a node is a call expression.
 * @param node - The AST node to check
 * @returns True if the node is a call expression, false otherwise
 */
export function isCallExpression(node: DenoASTNode): node is CallExpressionNode {
  return node.type === 'CallExpression'
}

/**
 * Type guard to check if a node is a chain expression.
 * @param node - The AST node to check
 * @returns True if the node is a chain expression, false otherwise
 */
export function isChainExpression(node: DenoASTNode): node is ChainExpressionNode {
  return node.type === 'ChainExpression'
}

/**
 * Type guard to check if a node is a class expression.
 * @param node - The AST node to check
 * @returns True if the node is a class expression, false otherwise
 */
export function isClassExpression(node: DenoASTNode): node is ClassExpressionNode {
  return node.type === 'ClassExpression'
}

/**
 * Type guard to check if a node is a conditional expression.
 * @param node - The AST node to check
 * @returns True if the node is a conditional expression, false otherwise
 */
export function isConditionalExpression(node: DenoASTNode): node is ConditionalExpressionNode {
  return node.type === 'ConditionalExpression'
}

/**
 * Type guard to check if a node is a function declaration.
 * @param node - The AST node to check
 * @returns True if the node is a function declaration, false otherwise
 */
export function isFunctionDeclaration(node: DenoASTNode): node is FunctionDeclarationNode {
  return node.type === 'FunctionDeclaration'
}

/**
 * Type guard to check if a node is a function expression.
 * @param node - The AST node to check
 * @returns True if the node is a function expression, false otherwise
 */
export function isFunctionExpression(node: DenoASTNode): node is FunctionExpressionNode {
  return node.type === 'FunctionExpression'
}

/**
 * Type guard to check if a node is an if statement.
 * @param node - The AST node to check
 * @returns True if the node is an if statement, false otherwise
 */
export function isIfStatement(node: DenoASTNode): node is IfStatementNode {
  return node.type === 'IfStatement'
}

/**
 * Type guard to check if a node is a literal.
 * @param node - The AST node to check
 * @returns True if the node is a literal, false otherwise
 */
export function isLiteral(node: DenoASTNode): node is LiteralNode {
  return node.type === 'Literal'
}

/**
 * Type guard to check if a node is a logical expression.
 * @param node - The AST node to check
 * @returns True if the node is a logical expression, false otherwise
 */
export function isLogicalExpression(node: DenoASTNode): node is LogicalExpressionNode {
  return node.type === 'LogicalExpression'
}

/**
 * Type guard to check if a node is a member expression.
 * @param node - The AST node to check
 * @returns True if the node is a member expression, false otherwise
 */
export function isMemberExpression(node: DenoASTNode): node is MemberExpressionNode {
  return node.type === 'MemberExpression'
}

/**
 * Type guard to check if a node is a method definition.
 * @param node - The AST node to check
 * @returns True if the node is a method definition, false otherwise
 */
export function isMethodDefinition(node: DenoASTNode): node is MethodDefinitionNode {
  return node.type === 'MethodDefinition'
}

/**
 * Type guard to check if a node is a new expression.
 * @param node - The AST node to check
 * @returns True if the node is a new expression, false otherwise
 */
export function isNewExpression(node: DenoASTNode): node is NewExpressionNode {
  return node.type === 'NewExpression'
}

/**
 * Type guard to check if a node is an object expression.
 * @param node - The AST node to check
 * @returns True if the node is an object expression, false otherwise
 */
export function isObjectExpression(node: DenoASTNode): node is ObjectExpressionNode {
  return node.type === 'ObjectExpression'
}

/**
 * Type guard to check if a node is a return statement.
 * @param node - The AST node to check
 * @returns True if the node is a return statement, false otherwise
 */
export function isReturnStatement(node: DenoASTNode): node is ReturnStatementNode {
  return node.type === 'ReturnStatement'
}

/**
 * Type guard to check if a node is a TypeScript as expression.
 * @param node - The AST node to check
 * @returns True if the node is a TypeScript as expression, false otherwise
 */
export function isTSAsExpression(node: DenoASTNode): node is TSAsExpressionNode {
  return node.type === 'TSAsExpression'
}

/**
 * Type guard to check if a node is a this expression.
 * @param node - The AST node to check
 * @returns True if the node is a this expression, false otherwise
 */
export function isThisExpression(node: DenoASTNode): node is ThisExpressionNode {
  return node.type === 'ThisExpression'
}

/**
 * Type guard to check if a node is a unary expression.
 * @param node - The AST node to check
 * @returns True if the node is a unary expression, false otherwise
 */
export function isUnaryExpression(node: DenoASTNode): node is UnaryExpressionNode {
  return node.type === 'UnaryExpression'
}

/**
 * Type guard to check if a node is an update expression.
 * @param node - The AST node to check
 * @returns True if the node is an update expression, false otherwise
 */
export function isUpdateExpression(node: DenoASTNode): node is UpdateExpressionNode {
  return node.type === 'UpdateExpression'
}

/**
 * Type guard to check if a node is a yield expression.
 * @param node - The AST node to check
 * @returns True if the node is a yield expression, false otherwise
 */
export function isYieldExpression(node: DenoASTNode): node is YieldExpressionNode {
  return node.type === 'YieldExpression'
}
