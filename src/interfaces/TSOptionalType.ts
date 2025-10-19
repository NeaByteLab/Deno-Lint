import type { TSASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript optional type.
 */
export interface TSOptionalTypeNode {
  /** Type identifier for TypeScript optional types */
  type: 'TSOptionalType'
  /** Optional type annotation */
  typeAnnotation: TSASTNode
}
