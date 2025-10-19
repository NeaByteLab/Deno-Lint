import type {
  ParameterNode,
  TSTypeAnnotationNode,
  TSTypeParameterDeclarationNode
} from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript function type.
 */
export interface TSFunctionTypeNode {
  /** Type identifier for TypeScript function types */
  type: 'TSFunctionType'
  /** Optional type parameters */
  typeParameters?: TSTypeParameterDeclarationNode
  /** Function parameters */
  parameters: Array<ParameterNode>
  /** Return type annotation */
  typeAnnotation: TSTypeAnnotationNode
}
