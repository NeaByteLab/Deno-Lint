import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a decorator.
 */
export interface DecoratorNode {
  /** Type identifier for decorators */
  type: 'Decorator'
  /** Source code range */
  range: [number, number]
  /** Decorator expression */
  expression: ASTNode
}
