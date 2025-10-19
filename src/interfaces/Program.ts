import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing the root program node.
 */
export interface ProgramNode {
  /** Type identifier for program nodes */
  type: 'Program'
  /** Array of top-level statements */
  body: Array<ASTNode>
}
