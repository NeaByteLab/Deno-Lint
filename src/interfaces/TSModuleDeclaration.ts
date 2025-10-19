import type { ASTNode, TSModuleBlockNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript module declaration.
 */
export interface TSModuleDeclarationNode {
  /** Type identifier for TypeScript module declarations */
  type: 'TSModuleDeclaration'
  /** Module identifier */
  id: ASTNode
  /** Optional module body */
  body?: TSModuleBlockNode
  /** Whether the module is declare */
  declare?: boolean
  /** Whether the module is global */
  global?: boolean
}
