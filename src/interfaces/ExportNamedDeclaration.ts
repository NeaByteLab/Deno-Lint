import type { ASTNode, ExportSpecifierNode, LiteralNode } from '@interfaces/index.ts'

/**
 * AST node representing an export named declaration.
 */
export interface ExportNamedDeclarationNode {
  /** Type identifier for export named declarations */
  type: 'ExportNamedDeclaration'
  /** Source code range */
  range: [number, number]
  /** Optional declaration */
  declaration?: ASTNode
  /** Export specifiers */
  specifiers: ExportSpecifierNode[]
  /** Optional source module */
  source?: LiteralNode
}
