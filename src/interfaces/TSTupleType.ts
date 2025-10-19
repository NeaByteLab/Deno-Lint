import type { TSASTNode, TSNamedTupleMemberNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript tuple type.
 */
export interface TSTupleTypeNode {
  /** Type identifier for TypeScript tuple types */
  type: 'TSTupleType'
  /** Array of element types */
  elementTypes: Array<TSASTNode | TSNamedTupleMemberNode>
}
