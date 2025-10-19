import type { BlockStatementNode, CatchClauseNode } from '@interfaces/index.ts'

/**
 * AST node representing a try statement.
 */
export interface TryStatementNode {
  /** Type identifier for try statements */
  type: 'TryStatement'
  /** Source code range */
  range: [number, number]
  /** Try block */
  block: BlockStatementNode
  /** Catch clause */
  handler?: CatchClauseNode
  /** Finally block */
  finalizer?: BlockStatementNode
}
