import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a variable declarator.
 */
export interface VariableDeclaratorNode {
  /** Type identifier for variable declarators */
  type: 'VariableDeclarator'
  /** Variable identifier with name */
  id?: { type: 'Identifier'; name: string }
  /** Initial value */
  init?: ASTNode
  /** Optional parent node reference */
  parent?: ASTNode
}
