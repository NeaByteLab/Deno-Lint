import type { PropertyNode } from '@interfaces/index.ts'

/**
 * AST node representing an object destructuring pattern.
 */
export interface ObjectPatternNode {
  /** Type identifier for object patterns */
  type: 'ObjectPattern'
  /** Array of destructured properties */
  properties: Array<PropertyNode>
}
