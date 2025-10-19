import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript module block.
 */
export interface TSModuleBlockNode {
  /** Type identifier for TypeScript module blocks */
  type: 'TSModuleBlock'
  /** Array of module body elements */
  body: Array<ASTNode>
}
