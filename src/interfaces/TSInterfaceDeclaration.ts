import type {
  IdentifierNode,
  TSInterfaceBodyNode,
  TSInterfaceHeritageNode,
  TSTypeParameterDeclarationNode
} from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript interface declaration.
 */
export interface TSInterfaceDeclarationNode {
  /** Type identifier for TypeScript interface declarations */
  type: 'TSInterfaceDeclaration'
  /** Interface identifier */
  id: IdentifierNode
  /** Optional type parameters */
  typeParameters?: TSTypeParameterDeclarationNode
  /** Optional heritage clauses (extends/implements) */
  heritage?: Array<TSInterfaceHeritageNode>
  /** Interface body */
  body: TSInterfaceBodyNode
}
