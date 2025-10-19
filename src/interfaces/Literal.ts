/**
 * AST node representing a literal value (string, number, boolean, etc.).
 */
export interface LiteralNode {
  /** Type identifier for literal nodes */
  type: 'Literal'
  /** The literal value */
  value: string | number | boolean | null
  /** Raw string representation */
  raw?: string
}
