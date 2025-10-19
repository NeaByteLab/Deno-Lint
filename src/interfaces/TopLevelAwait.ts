import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a top-level await expression.
 */
export interface TopLevelAwaitNode {
  /** Type identifier for top-level await */
  type: 'TopLevelAwait'
  /** Source code range */
  range: [number, number]
  /** Expression being awaited */
  argument: ASTNode
}
