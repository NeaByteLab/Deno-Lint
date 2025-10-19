import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing an expression statement (standalone expressions).
 */
export interface ExpressionStatementNode {
  /** Type identifier for expression statements */
  type: 'ExpressionStatement'
  /** The expression being wrapped as a statement */
  expression: ASTNode
}
