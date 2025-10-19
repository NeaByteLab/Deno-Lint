/**
 * AST node representing function parameters.
 */
export interface ParameterNode {
  /** Type identifier for parameter nodes */
  type: 'Identifier' | 'ObjectPattern' | 'RestElement' | 'AssignmentPattern'
  /** Parameter name for identifier types */
  name?: string
  /** Type annotation for the parameter */
  typeAnnotation?: unknown
  /** Properties for destructured parameters */
  properties?: Array<{
    /** Type identifier for property nodes */
    type: 'Property'
    /** The key of the property */
    key: { name: string }
    /** The value of the property */
    value: ParameterNode
  }>
  /** Argument for rest parameters */
  argument?: ParameterNode
  /** Left side for assignment pattern parameters */
  left?: ParameterNode
  /** Right side for assignment pattern parameters */
  right?: unknown
}
