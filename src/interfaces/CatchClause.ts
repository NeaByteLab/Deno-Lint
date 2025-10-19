import type { ASTNode, BlockStatementNode } from '@interfaces/index.ts'

/**
 * AST node representing a catch clause.
 */
export interface CatchClauseNode {
  /** Type identifier for catch clauses */
  type: 'CatchClause'
  /** Source code range */
  range: [number, number]
  /** Catch parameter */
  param: ASTNode | null
  /** Catch block body */
  body: BlockStatementNode
}
