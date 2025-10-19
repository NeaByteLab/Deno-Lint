import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a class method with modern syntax.
 */
export interface ClassMethodNode {
  /** Type identifier for class methods */
  type: 'ClassMethod'
  /** Source code range */
  range: [number, number]
  /** Method key */
  key: ASTNode
  /** Method parameters */
  params: ASTNode[]
  /** Method body */
  body: ASTNode
  /** Whether the method is static */
  static: boolean
  /** Whether the method is private */
  private: boolean
  /** Whether the method is async */
  async: boolean
  /** Whether the method is generator */
  generator: boolean
  /** Method decorators */
  decorators?: ASTNode[]
}
