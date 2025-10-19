/**
 * AST node representing a TypeScript template element type.
 */
export interface TSTemplateElementTypeNode {
  /** Type identifier for TypeScript template element types */
  type: 'TSTemplateElementType'
  /** The string value */
  value: { raw: string; cooked: string }
  /** Whether this is the tail element */
  tail: boolean
}
