import type {
  TSCallSignatureDeclarationNode,
  TSIndexSignatureNode,
  TSMethodSignatureNode,
  TSPropertySignatureNode
} from '@interfaces/index.ts'

/**
 * AST node representing a TypeScript interface body.
 */
export interface TSInterfaceBodyNode {
  /** Type identifier for TypeScript interface bodies */
  type: 'TSInterfaceBody'
  /** Array of body elements (properties, methods, etc.) */
  body: Array<
    | TSPropertySignatureNode
    | TSMethodSignatureNode
    | TSIndexSignatureNode
    | TSCallSignatureDeclarationNode
  >
}
