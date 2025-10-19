import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing an assignment pattern in destructuring.
 */
export interface AssignmentPatternNode {
  /** Type identifier for assignment patterns */
  type: 'AssignmentPattern'
  /** Source code range */
  range: [number, number]
  /** Left side of the assignment pattern */
  left: ASTNode
  /** Right side of the assignment pattern */
  right: ASTNode
}
