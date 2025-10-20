import type * as types from '@interfaces/index.ts'

/**
 * Type guard to check if a node is a block statement.
 * @param node - The AST node to check
 * @returns True if the node is a block statement, false otherwise
 */
export function isBlockStatement(node: types.DenoASTNode): node is types.BlockStatementNode {
  return node.type === 'BlockStatement'
}

/**
 * Type guard to check if a node is a for statement.
 * @param node - The AST node to check
 * @returns True if the node is a for statement, false otherwise
 */
export function isForStatement(node: types.DenoASTNode): node is types.ForStatementNode {
  return node.type === 'ForStatement'
}

/**
 * Type guard to check if a node is a function declaration.
 * @param node - The AST node to check
 * @returns True if the node is a function declaration, false otherwise
 */
export function isFunctionDeclaration(
  node: types.DenoASTNode
): node is types.FunctionDeclarationNode {
  return node.type === 'FunctionDeclaration'
}

/**
 * Type guard to check if a node is an identifier.
 * @param node - The AST node to check
 * @returns True if the node is an identifier, false otherwise
 */
export function isIdentifier(node: types.DenoASTNode): node is types.IdentifierNode {
  return node.type === 'Identifier'
}

/**
 * Type guard to check if a node is an if statement.
 * @param node - The AST node to check
 * @returns True if the node is an if statement, false otherwise
 */
export function isIfStatement(node: types.DenoASTNode): node is types.IfStatementNode {
  return node.type === 'IfStatement'
}

/**
 * Type guard to check if a node is a literal.
 * @param node - The AST node to check
 * @returns True if the node is a literal, false otherwise
 */
export function isLiteral(node: types.DenoASTNode): node is types.LiteralNode {
  return node.type === 'Literal'
}

/**
 * Type guard to check if a node is a method definition.
 * @param node - The AST node to check
 * @returns True if the node is a method definition, false otherwise
 */
export function isMethodDefinition(node: types.DenoASTNode): node is types.MethodDefinitionNode {
  return node.type === 'MethodDefinition'
}

/**
 * Type guard to check if a node is a return statement.
 * @param node - The AST node to check
 * @returns True if the node is a return statement, false otherwise
 */
export function isReturnStatement(node: types.DenoASTNode): node is types.ReturnStatementNode {
  return node.type === 'ReturnStatement'
}

/**
 * Type guard to check if a node is a spread element.
 * @param node - The AST node to check
 * @returns True if the node is a spread element, false otherwise
 */
export function isSpreadElement(node: types.DenoASTNode): node is types.SpreadElementNode {
  return node.type === 'SpreadElement'
}

/**
 * Type guard to check if a node is a variable declaration.
 * @param node - The AST node to check
 * @returns True if the node is a variable declaration, false otherwise
 */
export function isVariableDeclaration(
  node: types.DenoASTNode
): node is types.VariableDeclarationNode {
  return node.type === 'VariableDeclaration'
}

/**
 * Type guard to check if a node is a variable declarator.
 * @param node - The AST node to check
 * @returns True if the node is a variable declarator, false otherwise
 */
export function isVariableDeclarator(
  node: types.DenoASTNode
): node is types.VariableDeclaratorNode {
  return node.type === 'VariableDeclarator'
}
