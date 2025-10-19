import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing import attributes.
 */
export interface ImportAttributeNode {
  /** Type identifier for import attributes */
  type: 'ImportAttribute'
  /** Source code range */
  range: [number, number]
  /** Attribute key */
  key: ASTNode
  /** Attribute value */
  value: ASTNode
}
