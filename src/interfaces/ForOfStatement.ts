import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a for...of statement.
 */
export interface ForOfStatementNode {
  /** Type identifier for for...of statements */
  type: 'ForOfStatement'
  /** Source code range */
  range: [number, number]
  /** Loop variable */
  left: ASTNode
  /** Iterable expression */
  right: ASTNode
  /** Loop body */
  body: ASTNode
  /** Whether this is an async for...of */
  await: boolean
}
