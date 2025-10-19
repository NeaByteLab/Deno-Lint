import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a nullish coalescing expression.
 */
export interface NullishCoalescingNode {
  /** Type identifier for nullish coalescing */
  type: 'NullishCoalescing'
  /** Source code range */
  range: [number, number]
  /** Left side of expression */
  left: ASTNode
  /** Right side of expression */
  right: ASTNode
}
