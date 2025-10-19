/**
 * AST node representing a hashbang (shebang) comment.
 */
export interface HashbangNode {
  /** Type identifier for hashbang */
  type: 'Hashbang'
  /** Source code range */
  range: [number, number]
  /** Hashbang content */
  value: string
}
