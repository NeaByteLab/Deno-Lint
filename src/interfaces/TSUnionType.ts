import type { TSASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript union type.
 */
export interface TSUnionTypeNode {
  /** Type identifier for TypeScript union types */
  type: 'TSUnionType'
  /** Array of union member types */
  types: Array<TSASTNode>
}
