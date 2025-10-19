import type {
  ASTNode,
  ParameterNode,
  TSTypeAnnotationNode,
  TSTypeParameterDeclarationNode
} from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript method signature.
 */
export interface TSMethodSignatureNode {
  /** Type identifier for TypeScript method signatures */
  type: 'TSMethodSignature'
  /** Method key */
  key: ASTNode
  /** Optional type parameters */
  typeParameters?: TSTypeParameterDeclarationNode
  /** Method parameters */
  parameters: Array<ParameterNode>
  /** Optional return type annotation */
  typeAnnotation?: TSTypeAnnotationNode
  /** Whether the method is optional */
  optional?: boolean
  /** Whether the method is computed */
  computed?: boolean
}
