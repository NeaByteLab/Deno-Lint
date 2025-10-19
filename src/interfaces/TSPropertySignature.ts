import type { ASTNode, TSTypeAnnotationNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript property signature.
 */
export interface TSPropertySignatureNode {
  /** Type identifier for TypeScript property signatures */
  type: 'TSPropertySignature'
  /** Property key */
  key: ASTNode
  /** Optional type annotation */
  typeAnnotation?: TSTypeAnnotationNode
  /** Whether the property is optional */
  optional?: boolean
  /** Whether the property is readonly */
  readonly?: boolean
  /** Whether the property is computed */
  computed?: boolean
}
