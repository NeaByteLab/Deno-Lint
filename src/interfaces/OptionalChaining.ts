import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing an optional chaining expression.
 */
export interface OptionalChainingNode {
  /** Type identifier for optional chaining */
  type: 'OptionalChaining'
  /** Source code range */
  range: [number, number]
  /** Object being accessed */
  object: ASTNode
  /** Property being accessed */
  property: ASTNode
  /** Whether this is computed access */
  computed: boolean
}
