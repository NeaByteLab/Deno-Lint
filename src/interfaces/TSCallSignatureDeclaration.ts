import type {
  ParameterNode,
  TSTypeAnnotationNode,
  TSTypeParameterDeclarationNode
} from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript call signature declaration.
 */
export interface TSCallSignatureDeclarationNode {
  /** Type identifier for TypeScript call signature declarations */
  type: 'TSCallSignatureDeclaration'
  /** Optional type parameters */
  typeParameters?: TSTypeParameterDeclarationNode
  /** Function parameters */
  parameters: Array<ParameterNode>
  /** Optional return type annotation */
  typeAnnotation?: TSTypeAnnotationNode
}
