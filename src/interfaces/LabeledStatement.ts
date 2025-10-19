import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a labeled statement.
 */
export interface LabeledStatementNode {
  /** Type identifier for labeled statements */
  type: 'LabeledStatement'
  /** Source code range */
  range: [number, number]
  /** Label identifier */
  label: ASTNode
  /** Statement body */
  body: ASTNode
}
