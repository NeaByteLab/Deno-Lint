/**
 * AST node representing a RegExp literal.
 */
export interface RegExpLiteralNode {
  /** Type identifier for RegExp literals */
  type: 'RegExpLiteral'
  /** Source code range */
  range: [number, number]
  /** RegExp value */
  value?: RegExp | null
  /** RegExp pattern */
  pattern: string
  /** RegExp flags */
  flags: string
  /** Raw string representation */
  raw?: string
}
