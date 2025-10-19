/**
 * AST node representing a private identifier.
 */
export interface PrivateIdentifierNode {
  /** Type identifier for private identifiers */
  type: 'PrivateIdentifier'
  /** Source code range */
  range: [number, number]
  /** The name of the private identifier */
  name: string
}
