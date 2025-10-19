import type { ASTNode, ParameterNode } from '@interfaces/index.ts'

/**
 * AST node representing a function expression.
 */
export interface FunctionExpressionNode {
  /** Type identifier for function expressions */
  type: 'FunctionExpression'
  /** Optional function identifier with name */
  id?: { name: string }
  /** Whether the function is declared as async */
  async?: boolean
  /** Array of function parameters */
  params: Array<ParameterNode>
  /** Function body */
  body: ASTNode
  /** Optional parent node reference */
  parent?: ASTNode
}
