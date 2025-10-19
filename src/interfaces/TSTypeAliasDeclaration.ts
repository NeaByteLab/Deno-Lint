import type {
  IdentifierNode,
  TSASTNode,
  TSTypeParameterDeclarationNode
} from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript type alias declaration.
 */
export interface TSTypeAliasDeclarationNode {
  /** Type identifier for TypeScript type alias declarations */
  type: 'TSTypeAliasDeclaration'
  /** Type alias identifier */
  id: IdentifierNode
  /** Optional type parameters */
  typeParameters?: TSTypeParameterDeclarationNode
  /** Type annotation */
  typeAnnotation: TSASTNode
}
