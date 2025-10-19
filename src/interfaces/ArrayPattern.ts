import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing an array pattern.
 */
export interface ArrayPatternNode {
  /** Type identifier for array patterns */
  type: 'ArrayPattern'
  /** Source code range */
  range: [number, number]
  /** Pattern elements */
  elements: Array<ASTNode | null>
}
