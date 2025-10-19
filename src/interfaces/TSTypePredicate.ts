import type { IdentifierNode, TSTypeAnnotationNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript type predicate.
 */
export interface TSTypePredicateNode {
  /** Type identifier for TypeScript type predicates */
  type: 'TSTypePredicate'
  /** Optional parameter name */
  parameterName?: IdentifierNode
  /** Optional this keyword */
  this?: boolean
  /** Predicate type */
  typeAnnotation: TSTypeAnnotationNode
}
