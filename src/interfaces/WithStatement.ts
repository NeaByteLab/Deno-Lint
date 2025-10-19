import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a with statement.
 */
export interface WithStatementNode {
  /** Type identifier for with statements */
  type: 'WithStatement'
  /** Source code range */
  range: [number, number]
  /** Object expression */
  object: ASTNode
  /** Statement body */
  body: ASTNode
}
