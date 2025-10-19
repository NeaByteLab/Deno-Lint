import type { IdentifierNode, TSQualifiedNameNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript type name.
 */
export interface TSTypeNameNode {
  /** Type identifier for TypeScript type names */
  type: 'TSTypeName'
  /** Type name (can be Identifier or TSQualifiedName) */
  name: IdentifierNode | TSQualifiedNameNode
}
