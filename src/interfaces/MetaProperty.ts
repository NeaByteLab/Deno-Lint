import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a meta property (e.g., import.meta).
 */
export interface MetaPropertyNode {
  /** Type identifier for meta properties */
  type: 'MetaProperty'
  /** Source code range */
  range: [number, number]
  /** Meta object */
  meta: ASTNode
  /** Property name */
  property: ASTNode
}
