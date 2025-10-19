import type { TSASTNode, TSTypeParameterNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript mapped type.
 */
export interface TSMappedTypeNode {
  /** Type identifier for TypeScript mapped types */
  type: 'TSMappedType'
  /** Optional readonly modifier */
  readonly?: boolean
  /** Type parameter */
  typeParameter: TSTypeParameterNode
  /** Optional name type */
  nameType?: TSASTNode
  /** Optional question token */
  optional?: boolean
  /** Value type */
  typeAnnotation: TSASTNode
}
