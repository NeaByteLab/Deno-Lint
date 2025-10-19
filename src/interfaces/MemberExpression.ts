import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a member expression (object.property).
 */
export interface MemberExpressionNode {
  /** Type identifier for member expressions */
  type: 'MemberExpression'
  /** Source code range */
  range: [number, number]
  /** Whether this is an optional member access */
  optional: boolean
  /** Whether this is computed property access (object[property]) */
  computed: boolean
  /** The object being accessed */
  object: ASTNode
  /** The property being accessed */
  property: ASTNode
}
