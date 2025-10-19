import type {
  ArrowFunctionExpressionNode,
  ASTNode,
  CallExpressionNode,
  FunctionDeclarationNode,
  FunctionExpressionNode,
  MethodDefinitionNode
} from '@app/types.ts'

/**
 * Type guard to check if a node is a call expression.
 * @param node - The AST node to check
 * @returns True if the node is a call expression, false otherwise
 */
export function isCallExpression(node: ASTNode): node is CallExpressionNode {
  return node.type === 'CallExpression'
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
 * Type guard to check if a node is an arrow function expression.
 * @param node - The AST node to check
 * @returns True if the node is an arrow function expression, false otherwise
 */
export function isArrowFunctionExpression(node: ASTNode): node is ArrowFunctionExpressionNode {
  return node.type === 'ArrowFunctionExpression'
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
 * Type guard to check if a node is a method definition.
 * @param node - The AST node to check
 * @returns True if the node is a method definition, false otherwise
 */
export function isMethodDefinition(node: ASTNode): node is MethodDefinitionNode {
  return node.type === 'MethodDefinition'
}
