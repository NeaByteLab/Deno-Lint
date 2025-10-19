import type { ParameterNode, TSTypeAnnotationNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript index signature.
 */
export interface TSIndexSignatureNode {
  /** Type identifier for TypeScript index signatures */
  type: 'TSIndexSignature'
  /** Optional readonly modifier */
  readonly?: boolean
  /** Optional static modifier */
  static?: boolean
  /** Index parameter */
  parameters: Array<ParameterNode>
  /** Index type annotation */
  typeAnnotation: TSTypeAnnotationNode
}
