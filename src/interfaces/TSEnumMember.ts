import type { ASTNode, IdentifierNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript enum member.
 */
export interface TSEnumMemberNode {
  /** Type identifier for TypeScript enum members */
  type: 'TSEnumMember'
  /** Member identifier */
  id: IdentifierNode
  /** Optional initializer value */
  initializer?: ASTNode
}
