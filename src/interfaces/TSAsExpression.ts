import type { ASTNode, TSASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript as expression.
 */
export interface TSAsExpressionNode {
  /** Type identifier for TypeScript as expressions */
  type: 'TSAsExpression'
  /** Expression to cast */
  expression: ASTNode
  /** Type annotation */
  typeAnnotation: TSASTNode
}
