import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing an update expression.
 */
export interface UpdateExpressionNode {
  /** Type identifier for update expressions */
  type: 'UpdateExpression'
  /** Source code range */
  range: [number, number]
  /** Update operator */
  operator: '++' | '--'
  /** Operand */
  argument: ASTNode
  /** Whether the operator is prefix */
  prefix: boolean
}
