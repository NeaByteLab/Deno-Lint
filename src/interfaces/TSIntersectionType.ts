import type { TSASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript intersection type.
 */
export interface TSIntersectionTypeNode {
  /** Type identifier for TypeScript intersection types */
  type: 'TSIntersectionType'
  /** Array of intersection member types */
  types: Array<TSASTNode>
}
