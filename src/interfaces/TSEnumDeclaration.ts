import type { TSEnumBodyNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript enum declaration.
 */
export interface TSEnumDeclarationNode {
  /** Type identifier for TypeScript enum declarations */
  type: 'TSEnumDeclaration'
  /** Optional enum identifier with name */
  id?: { name: string }
  /** Enum body containing members */
  body: TSEnumBodyNode
  /** Whether the enum is const */
  const?: boolean
}
