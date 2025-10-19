import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing an object pattern.
 */
export interface ObjectPatternNode {
  /** Type identifier for object patterns */
  type: 'ObjectPattern'
  /** Source code range */
  range: [number, number]
  /** Pattern properties */
  properties: Array<ASTNode>
}
