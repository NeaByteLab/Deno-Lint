import type { ASTNode, ParameterNode } from '@interfaces/index.ts'

/**
 * AST node representing a function declaration.
 */
export interface FunctionDeclarationNode {
  /** Type identifier for function declarations */
  type: 'FunctionDeclaration'
  /** Optional function identifier with name */
  id?: { name: string }
  /** Whether the function is declared as async */
  async?: boolean
  /** Return type annotation for the function */
  returnType?: unknown
  /** Array of function parameters */
  params: Array<ParameterNode>
  /** Function body */
  body: ASTNode
}
