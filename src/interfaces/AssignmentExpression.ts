import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing an assignment expression.
 */
export interface AssignmentExpressionNode {
  /** Type identifier for assignment expressions */
  type: 'AssignmentExpression'
  /** Source code range */
  range: [number, number]
  /** Assignment operator */
  operator:
    | '='
    | '+='
    | '-='
    | '*='
    | '/='
    | '%='
    | '**='
    | '<<='
    | '>>='
    | '>>>='
    | '&='
    | '^='
    | '|='
  /** Left side of the assignment */
  left: ASTNode
  /** Right side of the assignment */
  right: ASTNode
}
