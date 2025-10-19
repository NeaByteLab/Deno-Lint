import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing an import declaration.
 */
export interface ImportDeclarationNode {
  /** Type identifier for import declarations */
  type: 'ImportDeclaration'
  /** Source code range */
  range: [number, number]
  /** Import specifiers */
  specifiers: Array<ASTNode>
  /** Import attributes */
  attributes: Array<ASTNode>
  /** Module source */
  source: ASTNode
}
