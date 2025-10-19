import type { ASTNode, DenoASTNode, TemplateElementNode } from '@interfaces/index.ts'

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

/**
 * Interface for a string part.
 */
export interface StringPartType {
  /** The text of the string part. */
  text: string
  /** Whether the string part is a literal. */
  isLiteral: boolean
  /** The node of the string part. */
  node: DenoASTNode
}
