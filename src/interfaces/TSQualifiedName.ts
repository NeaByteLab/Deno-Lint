import type { IdentifierNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript qualified name.
 */
export interface TSQualifiedNameNode {
  /** Type identifier for TypeScript qualified names */
  type: 'TSQualifiedName'
  /** Left side of the qualified name */
  left: IdentifierNode | TSQualifiedNameNode
  /** Right side of the qualified name */
  right: IdentifierNode
}
