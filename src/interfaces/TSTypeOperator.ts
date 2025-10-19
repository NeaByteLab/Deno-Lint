import type { TSASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript type operator.
 */
export interface TSTypeOperatorNode {
  /** Type identifier for TypeScript type operators */
  type: 'TSTypeOperator'
  /** Operator type */
  operator: 'keyof' | 'unique' | 'readonly'
  /** Type expression */
  typeAnnotation: TSASTNode
}
