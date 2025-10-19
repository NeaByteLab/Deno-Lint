import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing an import specifier.
 */
export interface ImportSpecifierNode {
  /** Type identifier for import specifiers */
  type: 'ImportSpecifier'
  /** Source code range */
  range: [number, number]
  /** Imported identifier */
  imported: ASTNode
  /** Local identifier */
  local: ASTNode
}
