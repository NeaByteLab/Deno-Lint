import type { TSTypeNameNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript type query.
 */
export interface TSTypeQueryNode {
  /** Type identifier for TypeScript type queries */
  type: 'TSTypeQuery'
  /** Expression name */
  exprName: TSTypeNameNode
}
