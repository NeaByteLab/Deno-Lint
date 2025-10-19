import type { TSASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript indexed access type.
 */
export interface TSIndexedAccessTypeNode {
  /** Type identifier for TypeScript indexed access types */
  type: 'TSIndexedAccessType'
  /** Object type */
  objectType: TSASTNode
  /** Index type */
  indexType: TSASTNode
}
