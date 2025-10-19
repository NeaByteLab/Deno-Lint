import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a unary expression.
 */
export interface UnaryExpressionNode {
  /** Type identifier for unary expressions */
  type: 'UnaryExpression'
  /** Source code range */
  range: [number, number]
  /** Unary operator */
  operator: '-' | '+' | '!' | '~' | 'typeof' | 'void' | 'delete'
  /** Operand */
  argument: ASTNode
  /** Whether the operator is prefix */
  prefix: boolean
}
