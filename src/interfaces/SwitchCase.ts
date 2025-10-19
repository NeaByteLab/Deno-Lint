import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a switch case.
 */
export interface SwitchCaseNode {
  /** Type identifier for switch cases */
  type: 'SwitchCase'
  /** Source code range */
  range: [number, number]
  /** Case test expression */
  test?: ASTNode
  /** Case body statements */
  consequent: ASTNode[]
}
