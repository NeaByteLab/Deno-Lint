import type { TSASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript type annotation.
 */
export interface TSTypeAnnotationNode {
  /** Type identifier for TypeScript type annotations */
  type: 'TSTypeAnnotation'
  /** The type expression */
  typeAnnotation: TSASTNode
}
