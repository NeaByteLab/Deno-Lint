import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing an import namespace specifier.
 */
export interface ImportNamespaceSpecifierNode {
  /** Type identifier for import namespace specifiers */
  type: 'ImportNamespaceSpecifier'
  /** Source code range */
  range: [number, number]
  /** Local identifier */
  local: ASTNode
}
