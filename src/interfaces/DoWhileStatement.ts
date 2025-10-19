import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a do-while statement.
 */
export interface DoWhileStatementNode {
  /** Type identifier for do-while statements */
  type: 'DoWhileStatement'
  /** Source code range */
  range: [number, number]
  /** Loop body */
  body: ASTNode
  /** Loop test condition */
  test: ASTNode
}
