import type { IdentifierNode } from '@interfaces/index.ts'

/**
 * AST node representing an export specifier.
 */
export interface ExportSpecifierNode {
  /** Type identifier for export specifiers */
  type: 'ExportSpecifier'
  /** Source code range */
  range: [number, number]
  /** Exported identifier */
  exported: IdentifierNode
  /** Local identifier */
  local: IdentifierNode
}
