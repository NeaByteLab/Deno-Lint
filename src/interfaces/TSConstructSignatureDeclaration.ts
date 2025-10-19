import type {
  ParameterNode,
  TSTypeAnnotationNode,
  TSTypeParameterDeclarationNode
} from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript construct signature declaration.
 */
export interface TSConstructSignatureDeclarationNode {
  /** Type identifier for TypeScript construct signature declarations */
  type: 'TSConstructSignatureDeclaration'
  /** Optional type parameters */
  typeParameters?: TSTypeParameterDeclarationNode
  /** Constructor parameters */
  parameters: Array<ParameterNode>
  /** Optional return type annotation */
  typeAnnotation?: TSTypeAnnotationNode
}
