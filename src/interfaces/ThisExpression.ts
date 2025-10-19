/**
 * AST node representing a this expression.
 */
export interface ThisExpressionNode {
  /** Type identifier for this expressions */
  type: 'ThisExpression'
  /** Source code range */
  range: [number, number]
}
