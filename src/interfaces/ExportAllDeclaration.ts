import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing an export all declaration.
 */
export interface ExportAllDeclarationNode {
  /** Type identifier for export all declarations */
  type: 'ExportAllDeclaration'
  /** Source code range */
  range: [number, number]
  /** Exported identifier */
  exported: ASTNode | null
  /** Import attributes */
  attributes: Array<ASTNode>
  /** Module source */
  source: ASTNode
}
