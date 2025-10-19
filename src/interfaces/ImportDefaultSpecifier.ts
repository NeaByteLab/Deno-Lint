import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing an import default specifier.
 */
export interface ImportDefaultSpecifierNode {
  /** Type identifier for import default specifiers */
  type: 'ImportDefaultSpecifier'
  /** Source code range */
  range: [number, number]
  /** Local identifier */
  local: ASTNode
}
