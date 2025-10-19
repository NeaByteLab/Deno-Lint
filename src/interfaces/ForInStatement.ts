import type { ASTNode, VariableDeclarationNode } from '@interfaces/index.ts'

/**
 * AST node representing a for...in statement.
 */
export interface ForInStatementNode {
  /** Type identifier for for...in statements */
  type: 'ForInStatement'
  /** Source code range */
  range: [number, number]
  /** Loop variable declaration */
  left: VariableDeclarationNode
  /** Object expression */
  right: ASTNode
  /** Loop body */
  body: ASTNode
}
