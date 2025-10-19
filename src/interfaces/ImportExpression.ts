import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a dynamic import expression.
 */
export interface ImportExpressionNode {
  /** Type identifier for import expressions */
  type: 'ImportExpression'
  /** Source code range */
  range: [number, number]
  /** Module source */
  source: ASTNode
  /** Optional import attributes */
  attributes?: ASTNode
}
