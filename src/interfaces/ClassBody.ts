import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a class body.
 */
export interface ClassBodyNode {
  /** Type identifier for class bodies */
  type: 'ClassBody'
  /** Array of class members */
  body: Array<ASTNode>
}
