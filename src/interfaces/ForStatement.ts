import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a for statement.
 */
export interface ForStatementNode {
  /** Type identifier for for statements */
  type: 'ForStatement'
  /** Source code range */
  range: [number, number]
  /** Loop initialization */
  init?: ASTNode
  /** Loop condition */
  test?: ASTNode
  /** Loop update */
  update?: ASTNode
  /** Loop body */
  body: ASTNode
}
