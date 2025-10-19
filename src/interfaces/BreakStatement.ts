import type { IdentifierNode } from '@interfaces/index.ts'

/**
 * AST node representing a break statement.
 */
export interface BreakStatementNode {
  /** Type identifier for break statements */
  type: 'BreakStatement'
  /** Source code range */
  range: [number, number]
  /** Optional label */
  label?: IdentifierNode
}
