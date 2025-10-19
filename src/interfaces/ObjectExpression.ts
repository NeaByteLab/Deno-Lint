import type { PropertyNode } from '@interfaces/index.ts'

/**
 * AST node representing an object literal.
 */
export interface ObjectExpressionNode {
  /** Type identifier for object expressions */
  type: 'ObjectExpression'
  /** Array of properties in the object */
  properties: Array<PropertyNode>
}
