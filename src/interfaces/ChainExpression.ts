import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing optional chaining expression.
 */
export interface ChainExpressionNode {
  /** Type identifier for chain expressions */
  type: 'ChainExpression'
  /** The chained expression */
  expression: ASTNode
}
