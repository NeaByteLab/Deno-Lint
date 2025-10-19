/**
 * AST node representing a debugger statement.
 */
export interface DebuggerStatementNode {
  /** Type identifier for debugger statements */
  type: 'DebuggerStatement'
  /** Source code range */
  range: [number, number]
}
