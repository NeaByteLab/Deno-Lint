import type { ASTNode, TemplateElementNode } from '@interfaces/index.ts'

/**
 * AST node representing a template literal (template string).
 */
export interface TemplateLiteralNode {
  /** Type identifier for template literals */
  type: 'TemplateLiteral'
  /** Array of string parts */
  quasis: Array<TemplateElementNode>
  /** Array of interpolated expressions */
  expressions: Array<ASTNode>
}
