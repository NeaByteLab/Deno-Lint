import type {
  ASTNode,
  ClassBodyNode,
  DecoratorNode,
  IdentifierNode,
  TSExpressionWithTypeArgumentsNode,
  TSTypeParameterDeclarationNode,
  TSTypeParameterInstantiationNode
} from '@interfaces/index.ts'

/**
 * AST node representing a class expression.
 */
export interface ClassExpressionNode {
  /** Type identifier for class expressions */
  type: 'ClassExpression'
  /** Source code range */
  range: [number, number]
  /** Optional class identifier */
  id?: IdentifierNode
  /** Super class */
  superClass?: ASTNode
  /** Class body */
  body: ClassBodyNode
  /** Class decorators */
  decorators?: DecoratorNode[]
  /** Type parameters */
  typeParameters?: TSTypeParameterDeclarationNode
  /** Implemented interfaces */
  implements?: TSExpressionWithTypeArgumentsNode[]
  /** Super class type parameters */
  superTypeParameters?: TSTypeParameterInstantiationNode
}
