import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a class field with initialization.
 */
export interface ClassFieldNode {
  /** Type identifier for class fields */
  type: 'ClassField'
  /** Source code range */
  range: [number, number]
  /** Field key */
  key: ASTNode
  /** Field value */
  value?: ASTNode
  /** Whether the field is static */
  static: boolean
  /** Whether the field is private */
  private: boolean
  /** Whether the field is readonly */
  readonly: boolean
  /** Field decorators */
  decorators?: ASTNode[]
}
