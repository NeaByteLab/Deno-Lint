/**
 * AST node representing an identifier.
 */
export interface IdentifierNode {
  /** Type identifier for identifiers */
  type: 'Identifier'
  /** The name of the identifier */
  name: string
}
