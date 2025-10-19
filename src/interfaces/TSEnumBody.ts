import type { TSEnumMemberNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript enum body.
 */
export interface TSEnumBodyNode {
  /** Type identifier for TypeScript enum bodies */
  type: 'TSEnumBody'
  /** Array of enum members */
  members: Array<TSEnumMemberNode>
}
