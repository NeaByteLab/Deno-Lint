import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing an object property.
 */
export interface PropertyNode {
  /** Type identifier for property nodes */
  type: 'Property'
  /** Property key */
  key: ASTNode
  /** Property value */
  value: ASTNode
  /** Whether this is a computed property */
  computed?: boolean
  /** Whether this is a shorthand property */
  shorthand?: boolean
  /** Property kind */
  kind?: 'init' | 'get' | 'set'
}
