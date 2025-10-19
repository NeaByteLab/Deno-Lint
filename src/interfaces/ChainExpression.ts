import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a chain expression (optional chaining).
 */
export interface ChainExpressionNode {
  /** Type identifier for chain expressions */
  type: 'ChainExpression'
  /** Source code range */
  range: [number, number]
  /** Chain element */
  expression: ASTNode
}
