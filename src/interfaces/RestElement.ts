import type { ASTNode, TSTypeAnnotationNode } from '@interfaces/index.ts'

/**
 * AST node representing a rest element.
 */
export interface RestElementNode {
  /** Type identifier for rest elements */
  type: 'RestElement'
  /** Source code range */
  range: [number, number]
  /** Rest argument */
  argument: ASTNode
  /** Type annotation */
  typeAnnotation?: TSTypeAnnotationNode
}
