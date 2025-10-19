import type { TSTypeParameterNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript type parameter declaration.
 */
export interface TSTypeParameterDeclarationNode {
  /** Type identifier for TypeScript type parameter declarations */
  type: 'TSTypeParameterDeclaration'
  /** Array of type parameters */
  params: Array<TSTypeParameterNode>
}
