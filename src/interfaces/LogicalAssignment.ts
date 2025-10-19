import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a logical assignment expression.
 */
export interface LogicalAssignmentNode {
  /** Type identifier for logical assignments */
  type: 'LogicalAssignment'
  /** Source code range */
  range: [number, number]
  /** Assignment operator */
  operator: '&&=' | '||=' | '??='
  /** Left side of assignment */
  left: ASTNode
  /** Right side of assignment */
  right: ASTNode
}
