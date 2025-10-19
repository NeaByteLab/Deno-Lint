import type { TSASTNode, TSTemplateElementTypeNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript template literal type.
 */
export interface TSTemplateLiteralTypeNode {
  /** Type identifier for TypeScript template literal types */
  type: 'TSTemplateLiteralType'
  /** Array of quasis (string parts) */
  quasis: Array<TSTemplateElementTypeNode>
  /** Array of expressions (interpolated parts) */
  types: Array<TSASTNode>
}
