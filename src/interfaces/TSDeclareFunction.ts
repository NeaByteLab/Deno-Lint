import type {
  IdentifierNode,
  ParameterNode,
  TSTypeAnnotationNode,
  TSTypeParameterDeclarationNode
} from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript declare function.
 */
export interface TSDeclareFunctionNode {
  /** Type identifier for TypeScript declare functions */
  type: 'TSDeclareFunction'
  /** Function identifier */
  id: IdentifierNode
  /** Optional type parameters */
  typeParameters?: TSTypeParameterDeclarationNode
  /** Function parameters */
  parameters: Array<ParameterNode>
  /** Optional return type annotation */
  typeAnnotation?: TSTypeAnnotationNode
  /** Whether the function is declare */
  declare?: boolean
}
