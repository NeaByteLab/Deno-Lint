import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing an array literal.
 */
export interface ArrayExpressionNode {
  /** Type identifier for array expressions */
  type: 'ArrayExpression'
  /** Array of elements in the array */
  elements: Array<ASTNode | null>
}
