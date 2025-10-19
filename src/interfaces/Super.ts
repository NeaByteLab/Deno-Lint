/**
 * AST node representing a super expression.
 */
export interface SuperNode {
  /** Type identifier for super expressions */
  type: 'Super'
  /** Source code range */
  range: [number, number]
}
