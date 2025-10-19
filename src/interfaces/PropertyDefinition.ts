import type { ASTNode, DecoratorNode, TSTypeAnnotationNode } from '@interfaces/index.ts'

/**
 * AST node representing a property definition in a class.
 */
export interface PropertyDefinitionNode {
  /** Type identifier for property definitions */
  type: 'PropertyDefinition'
  /** Source code range */
  range: [number, number]
  /** Property key */
  key: ASTNode
  /** Property value */
  value?: ASTNode
  /** Whether the key is computed */
  computed: boolean
  /** Whether the property is static */
  static: boolean
  /** Property decorators */
  decorators?: DecoratorNode[]
  /** Whether the property is optional */
  optional: boolean
  /** Whether the property is definite */
  definite: boolean
  /** Type annotation */
  typeAnnotation?: TSTypeAnnotationNode
  /** Property accessibility */
  accessibility?: 'public' | 'private' | 'protected'
  /** Whether the property is readonly */
  readonly: boolean
  /** Whether the property is declared */
  declare: boolean
}
