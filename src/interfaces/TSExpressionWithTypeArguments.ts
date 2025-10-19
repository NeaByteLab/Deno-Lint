import type { ASTNode, TSASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript expression with type arguments.
 */
export interface TSExpressionWithTypeArgumentsNode {
  /** Type identifier for TypeScript expressions with type arguments */
  type: 'TSExpressionWithTypeArguments'
  /** The expression */
  expression: ASTNode
  /** Type arguments */
  typeArguments?: TSASTNode[]
}
