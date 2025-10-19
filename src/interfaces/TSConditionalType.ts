import type { TSASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript conditional type.
 */
export interface TSConditionalTypeNode {
  /** Type identifier for TypeScript conditional types */
  type: 'TSConditionalType'
  /** Check type */
  checkType: TSASTNode
  /** Extends type */
  extendsType: TSASTNode
  /** True type */
  trueType: TSASTNode
  /** False type */
  falseType: TSASTNode
}
