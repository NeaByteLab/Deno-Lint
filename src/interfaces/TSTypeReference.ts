import type { TSTypeNameNode, TSTypeParameterInstantiationNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript type reference.
 */
export interface TSTypeReferenceNode {
  /** Type identifier for TypeScript type references */
  type: 'TSTypeReference'
  /** Type name */
  typeName: TSTypeNameNode
  /** Optional type arguments */
  typeParameters?: TSTypeParameterInstantiationNode
}
