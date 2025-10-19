import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing import assertions.
 */
export interface ImportAssertionNode {
  /** Type identifier for import assertions */
  type: 'ImportAssertion'
  /** Source code range */
  range: [number, number]
  /** Assertion key */
  key: ASTNode
  /** Assertion value */
  value: ASTNode
}
