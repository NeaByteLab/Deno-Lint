import type { TSASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript type parameter instantiation.
 */
export interface TSTypeParameterInstantiationNode {
  /** Type identifier for TypeScript type parameter instantiations */
  type: 'TSTypeParameterInstantiation'
  /** Array of type arguments */
  params: Array<TSASTNode>
}
