import type { IdentifierNode, TSASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript named tuple member.
 */
export interface TSNamedTupleMemberNode {
  /** Type identifier for TypeScript named tuple members */
  type: 'TSNamedTupleMember'
  /** Optional label */
  label?: IdentifierNode
  /** Optional question token */
  optional?: boolean
  /** Element type */
  elementType: TSASTNode
}
