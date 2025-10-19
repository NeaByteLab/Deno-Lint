import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a conditional expression (condition ? true : false).
 */
export interface ConditionalExpressionNode {
  /** Type identifier for conditional expressions */
  type: 'ConditionalExpression'
  /** The test condition */
  test: ASTNode
  /** The consequent (true branch) */
  consequent: ASTNode
  /** The alternate (false branch) */
  alternate: ASTNode
}
