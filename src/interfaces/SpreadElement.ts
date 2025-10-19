import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a spread element.
 */
export interface SpreadElementNode {
  /** Type identifier for spread elements */
  type: 'SpreadElement'
  /** Source code range */
  range: [number, number]
  /** Spread argument */
  argument: ASTNode
}
