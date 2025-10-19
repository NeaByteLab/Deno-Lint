import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a sequence expression (comma operator).
 */
export interface SequenceExpressionNode {
  /** Type identifier for sequence expressions */
  type: 'SequenceExpression'
  /** Source code range */
  range: [number, number]
  /** Array of expressions in the sequence */
  expressions: Array<ASTNode>
}
