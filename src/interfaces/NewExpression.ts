import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a new expression (new Constructor()).
 */
export interface NewExpressionNode {
  /** Type identifier for new expressions */
  type: 'NewExpression'
  /** The constructor being called */
  callee: {
    /** Type identifier for identifiers */
    type: 'Identifier'
    /** The name of the constructor */
    name: string
  }
  /** Array of arguments passed to the constructor */
  arguments: Array<ASTNode>
}
