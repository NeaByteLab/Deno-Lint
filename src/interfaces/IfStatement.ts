import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing an if statement.
 */
export interface IfStatementNode {
  /** Type identifier for if statements */
  type: 'IfStatement'
  /** Source code range */
  range: [number, number]
  /** Condition expression */
  test: ASTNode
  /** Then clause */
  consequent: ASTNode
  /** Else clause */
  alternate?: ASTNode
}
