import type { TSTypeParameterInstantiationNode, TSTypeReferenceNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript interface heritage.
 */
export interface TSInterfaceHeritageNode {
  /** Type identifier for TypeScript interface heritage */
  type: 'TSInterfaceHeritage'
  /** Heritage expression */
  expression: TSTypeReferenceNode
  /** Optional type arguments */
  typeParameters?: TSTypeParameterInstantiationNode
}
