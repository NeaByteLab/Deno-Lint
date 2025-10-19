/**
 * AST node representing a template literal element (string part).
 */
export interface TemplateElementNode {
  /** Type identifier for template elements */
  type: 'TemplateElement'
  /** String value */
  value: {
    /** Raw string value */
    raw: string
    /** Cooked string value */
    cooked: string
  }
  /** Whether this is the last element */
  tail: boolean
}
