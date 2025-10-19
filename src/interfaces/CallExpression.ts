import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a function call expression.
 */
export interface CallExpressionNode {
  /** Type identifier for call expressions */
  type: 'CallExpression'
  /** Source code range */
  range: [number, number]
  /** Whether this is an optional call */
  optional: boolean
  /** The function being called */
  callee: ASTNode
  /** Type arguments for generic calls */
  typeArguments?: ASTNode | null
  /** Array of arguments passed to the function */
  arguments: Array<ASTNode>
  /** Optional parent node reference */
  parent?: ASTNode
}
