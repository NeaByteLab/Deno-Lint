import type { TSASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript rest type.
 */
export interface TSRestTypeNode {
  /** Type identifier for TypeScript rest types */
  type: 'TSRestType'
  /** Rest type annotation */
  typeAnnotation: TSASTNode
}
