import type { TSTypeParameterNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript infer type.
 */
export interface TSInferTypeNode {
  /** Type identifier for TypeScript infer types */
  type: 'TSInferType'
  /** Type parameter to infer */
  typeParameter: TSTypeParameterNode
}
