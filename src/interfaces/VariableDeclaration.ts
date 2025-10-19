import type { VariableDeclaratorNode } from '@interfaces/index.ts'

/**
 * AST node representing a variable declaration.
 */
export interface VariableDeclarationNode {
  /** Type identifier for variable declarations */
  type: 'VariableDeclaration'
  /** Array of variable declarators */
  declarations: Array<VariableDeclaratorNode>
  /** Declaration kind */
  kind: 'var' | 'let' | 'const'
}
