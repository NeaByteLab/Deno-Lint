/**
 * AST node representing a RegExp with the 'd' flag (indices).
 */
export interface RegExpWithIndicesNode {
  /** Type identifier for RegExp with indices */
  type: 'RegExpWithIndices'
  /** Source code range */
  range: [number, number]
  /** RegExp pattern */
  pattern: string
  /** RegExp flags including 'd' */
  flags: string
  /** Raw string representation */
  raw?: string
}
