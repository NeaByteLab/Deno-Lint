import type { TSASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript type parameter.
 */
export interface TSTypeParameterNode {
  /** Type identifier for TypeScript type parameters */
  type: 'TSTypeParameter'
  /** Parameter name */
  name: string
  /** Optional constraint */
  constraint?: TSASTNode
  /** Optional default type */
  default?: TSASTNode
}
