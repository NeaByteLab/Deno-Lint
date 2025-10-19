/**
 * AST node representing a BigInt literal.
 */
export interface BigIntLiteralNode {
  /** Type identifier for BigInt literals */
  type: 'BigIntLiteral'
  /** Source code range */
  range: [number, number]
  /** BigInt value */
  value?: bigint | null
  /** BigInt string */
  bigint: string
  /** Raw string representation */
  raw?: string
}
