import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a function call expression.
 */
export interface CallExpressionNode {
  /** Type identifier for call expressions */
  type: 'CallExpression'
  /** The function being called */
  callee: ASTNode
  /** Array of arguments passed to the function */
  arguments: Array<ASTNode>
  /** Optional parent node reference */
  parent?: ASTNode
}
