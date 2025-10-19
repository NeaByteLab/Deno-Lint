import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a static block.
 */
export interface StaticBlockNode {
  /** Type identifier for static blocks */
  type: 'StaticBlock'
  /** Source code range */
  range: [number, number]
  /** Static block body */
  body: ASTNode
}
