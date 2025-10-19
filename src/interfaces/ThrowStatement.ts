import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a throw statement.
 */
export interface ThrowStatementNode {
  /** Type identifier for throw statements */
  type: 'ThrowStatement'
  /** Source code range */
  range: [number, number]
  /** Thrown expression */
  argument: ASTNode
}
