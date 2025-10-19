import type {
  ArrowFunctionExpressionNode,
  ASTNode,
  CallExpressionNode,
  ConditionalExpressionNode,
  FunctionDeclarationNode,
  FunctionExpressionNode,
  LiteralNode,
  LogicalExpressionNode,
  MemberExpressionNode,
  MethodDefinitionNode
} from '@app/types.ts'

/**
 * Type guard to check if a node is an arrow function expression.
 * @param node - The AST node to check
 * @returns True if the node is an arrow function expression, false otherwise
 */
export function isArrowFunctionExpression(node: ASTNode): node is ArrowFunctionExpressionNode {
  return node.type === 'ArrowFunctionExpression'
}

/**
 * Type guard to check if a node is a call expression.
 * @param node - The AST node to check
 * @returns True if the node is a call expression, false otherwise
 */
export function isCallExpression(node: ASTNode): node is CallExpressionNode {
  return node.type === 'CallExpression'
}

/**
 * Type guard to check if a node is a conditional expression.
 * @param node - The AST node to check
 * @returns True if the node is a conditional expression, false otherwise
 */
export function isConditionalExpression(node: ASTNode): node is ConditionalExpressionNode {
  return node.type === 'ConditionalExpression'
}

/**
 * Type guard to check if a node is a function declaration.
 * @param node - The AST node to check
 * @returns True if the node is a function declaration, false otherwise
 */
export function isFunctionDeclaration(node: ASTNode): node is FunctionDeclarationNode {
  return node.type === 'FunctionDeclaration'
}

/**
 * Type guard to check if a node is a function expression.
 * @param node - The AST node to check
 * @returns True if the node is a function expression, false otherwise
 */
export function isFunctionExpression(node: ASTNode): node is FunctionExpressionNode {
  return node.type === 'FunctionExpression'
}

/**
 * Type guard to check if a node is a literal.
 * @param node - The AST node to check
 * @returns True if the node is a literal, false otherwise
 */
export function isLiteral(node: ASTNode): node is LiteralNode {
  return node.type === 'Literal'
}

/**
 * Type guard to check if a node is a logical expression.
 * @param node - The AST node to check
 * @returns True if the node is a logical expression, false otherwise
 */
export function isLogicalExpression(node: ASTNode): node is LogicalExpressionNode {
  return node.type === 'LogicalExpression'
}

/**
 * Type guard to check if a node is a member expression.
 * @param node - The AST node to check
 * @returns True if the node is a member expression, false otherwise
 */
export function isMemberExpression(node: ASTNode): node is MemberExpressionNode {
  return node.type === 'MemberExpression'
}

/**
 * Type guard to check if a node is a method definition.
 * @param node - The AST node to check
 * @returns True if the node is a method definition, false otherwise
 */
export function isMethodDefinition(node: ASTNode): node is MethodDefinitionNode {
  return node.type === 'MethodDefinition'
}
