import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a pipeline operator expression.
 */
export interface PipelineOperatorNode {
  /** Type identifier for pipeline operators */
  type: 'PipelineOperator'
  /** Source code range */
  range: [number, number]
  /** Left side of the pipeline */
  left: ASTNode
  /** Right side of the pipeline */
  right: ASTNode
}
