/**
 * AST node representing a numeric separator in number literals.
 */
export interface NumericSeparatorNode {
  /** Type identifier for numeric separators */
  type: 'NumericSeparator'
  /** Source code range */
  range: [number, number]
  /** The separator character */
  value: string
}
