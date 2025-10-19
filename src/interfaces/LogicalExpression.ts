import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a logical expression (&&, ||, ??).
 */
export interface LogicalExpressionNode {
  /** Type identifier for logical expressions */
  type: 'LogicalExpression'
  /** The logical operator */
  operator: '&&' | '||' | '??'
  /** Left side of the expression */
  left: ASTNode
  /** Right side of the expression */
  right: ASTNode
}
