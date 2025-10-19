import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a return statement.
 */
export interface ReturnStatementNode {
  /** Type identifier for return statements */
  type: 'ReturnStatement'
  /** Return value (optional) */
  argument?: ASTNode
}
