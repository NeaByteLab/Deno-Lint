import type { LiteralNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript literal type.
 */
export interface TSLiteralTypeNode {
  /** Type identifier for TypeScript literal types */
  type: 'TSLiteralType'
  /** Literal value */
  literal: LiteralNode
}
