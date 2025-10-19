import type { TSASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript array type.
 */
export interface TSArrayTypeNode {
  /** Type identifier for TypeScript array types */
  type: 'TSArrayType'
  /** Element type */
  elementType: TSASTNode
}
