import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing an await expression.
 */
export interface AwaitExpressionNode {
  /** Type identifier for await expressions */
  type: 'AwaitExpression'
  /** Expression being awaited */
  argument: ASTNode
}
