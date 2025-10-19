import type { ClassBodyNode } from '@interfaces/index.ts'

/**
 * AST node representing a class declaration.
 */
export interface ClassDeclarationNode {
  /** Type identifier for class declarations */
  type: 'ClassDeclaration'
  /** Optional class identifier with name */
  id?: { name: string }
  /** Class body containing methods and properties */
  body: ClassBodyNode
}
