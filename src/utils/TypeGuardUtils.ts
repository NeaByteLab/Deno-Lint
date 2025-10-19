import type {
  BlockStatementNode,
  DenoASTNode,
  ForStatementNode,
  FunctionDeclarationNode,
  IdentifierNode,
  IfStatementNode,
  LiteralNode,
  MethodDefinitionNode,
  ReturnStatementNode,
  VariableDeclarationNode,
  VariableDeclaratorNode
} from '@interfaces/index.ts'

/**
 * Type guard to check if a node is a block statement.
 * @param node - The AST node to check
 * @returns True if the node is a block statement, false otherwise
 */
export function isBlockStatement(node: DenoASTNode): node is BlockStatementNode {
  return node.type === 'BlockStatement'
}

/**
 * Type guard to check if a node is a for statement.
 * @param node - The AST node to check
 * @returns True if the node is a for statement, false otherwise
 */
export function isForStatement(node: DenoASTNode): node is ForStatementNode {
  return node.type === 'ForStatement'
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
 * Type guard to check if a node is an identifier.
 * @param node - The AST node to check
 * @returns True if the node is an identifier, false otherwise
 */
export function isIdentifier(node: DenoASTNode): node is IdentifierNode {
  return node.type === 'Identifier'
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
 * Type guard to check if a node is a method definition.
 * @param node - The AST node to check
 * @returns True if the node is a method definition, false otherwise
 */
export function isMethodDefinition(node: DenoASTNode): node is MethodDefinitionNode {
  return node.type === 'MethodDefinition'
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
 * Type guard to check if a node is a variable declaration.
 * @param node - The AST node to check
 * @returns True if the node is a variable declaration, false otherwise
 */
export function isVariableDeclaration(node: DenoASTNode): node is VariableDeclarationNode {
  return node.type === 'VariableDeclaration'
}

/**
 * Type guard to check if a node is a variable declarator.
 * @param node - The AST node to check
 * @returns True if the node is a variable declarator, false otherwise
 */
export function isVariableDeclarator(node: DenoASTNode): node is VariableDeclaratorNode {
  return node.type === 'VariableDeclarator'
}
