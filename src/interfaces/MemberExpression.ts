import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a member expression (object.property).
 */
export interface MemberExpressionNode {
  /** Type identifier for member expressions */
  type: 'MemberExpression'
  /** The object being accessed */
  object: ASTNode
  /** The property being accessed */
  property: ASTNode
  /** Whether this is computed property access (object[property]) */
  computed?: boolean
  /** Whether this is optional chaining (object?.property) */
  optional?: boolean
}
