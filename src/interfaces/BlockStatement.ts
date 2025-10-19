import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a block statement (code block).
 */
export interface BlockStatementNode {
  /** Type identifier for block statements */
  type: 'BlockStatement'
  /** Array of statements in the block */
  body: Array<ASTNode>
}
