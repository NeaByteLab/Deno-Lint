import type {
  TSCallSignatureDeclarationNode,
  TSConstructSignatureDeclarationNode,
  TSIndexSignatureNode,
  TSMethodSignatureNode,
  TSPropertySignatureNode
} from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript type literal.
 */
export interface TSTypeLiteralNode {
  /** Type identifier for TypeScript type literals */
  type: 'TSTypeLiteral'
  /** Array of members */
  members: Array<
    | TSPropertySignatureNode
    | TSMethodSignatureNode
    | TSCallSignatureDeclarationNode
    | TSConstructSignatureDeclarationNode
    | TSIndexSignatureNode
  >
}
