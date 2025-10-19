import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing an identifier.
 */
export interface IdentifierNode {
  /** Type identifier for identifiers */
  type: 'Identifier'
  /** Source code range */
  range: [number, number]
  /** The name of the identifier */
  name: string
  /** Whether this is an optional identifier */
  optional: boolean
  /** Type annotation if present */
  typeAnnotation?: ASTNode
}
