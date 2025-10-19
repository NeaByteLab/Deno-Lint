import type { ASTNode, ParameterNode } from '@interfaces/index.ts'

/**
 * AST node representing an arrow function expression.
 */
export interface ArrowFunctionExpressionNode {
  /** Type identifier for arrow function expressions */
  type: 'ArrowFunctionExpression'
  /** Optional function identifier with name */
  id?: { name: string }
  /** Whether the function is declared as async */
  async?: boolean
  /** Array of function parameters */
  params: Array<ParameterNode>
  /** Function body */
  body: ASTNode
}
