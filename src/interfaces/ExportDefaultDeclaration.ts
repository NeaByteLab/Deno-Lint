import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing an export default declaration.
 */
export interface ExportDefaultDeclarationNode {
  /** Type identifier for export default declarations */
  type: 'ExportDefaultDeclaration'
  /** Source code range */
  range: [number, number]
  /** Declaration being exported */
  declaration: ASTNode
}
