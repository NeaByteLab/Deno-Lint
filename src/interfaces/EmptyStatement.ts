/**
 * AST node representing an empty statement.
 */
export interface EmptyStatementNode {
  /** Type identifier for empty statements */
  type: 'EmptyStatement'
  /** Source code range */
  range: [number, number]
}
