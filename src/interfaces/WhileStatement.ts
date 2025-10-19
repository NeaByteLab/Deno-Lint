import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a while statement.
 */
export interface WhileStatementNode {
  /** Type identifier for while statements */
  type: 'WhileStatement'
  /** Source code range */
  range: [number, number]
  /** Loop condition */
  test: ASTNode
  /** Loop body */
  body: ASTNode
}
