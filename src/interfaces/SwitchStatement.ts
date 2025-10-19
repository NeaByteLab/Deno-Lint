import type { ASTNode, SwitchCaseNode } from '@interfaces/index.ts'

/**
 * AST node representing a switch statement.
 */
export interface SwitchStatementNode {
  /** Type identifier for switch statements */
  type: 'SwitchStatement'
  /** Source code range */
  range: [number, number]
  /** Switch discriminant */
  discriminant: ASTNode
  /** Switch cases */
  cases: SwitchCaseNode[]
}
