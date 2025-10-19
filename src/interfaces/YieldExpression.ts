import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a yield expression.
 */
export interface YieldExpressionNode {
  /** Type identifier for yield expressions */
  type: 'YieldExpression'
  /** Source code range */
  range: [number, number]
  /** Yielded expression */
  argument?: ASTNode
  /** Whether this is a yield* expression */
  delegate: boolean
}
