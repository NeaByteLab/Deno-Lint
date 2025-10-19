import type { ASTNode } from '@interfaces/index.ts'

/**
 * AST node representing a binary expression.
 */
export interface BinaryExpressionNode {
  /** Type identifier for binary expressions */
  type: 'BinaryExpression'
  /** Source code range */
  range: [number, number]
  /** Binary operator */
  operator:
    | '+'
    | '-'
    | '*'
    | '/'
    | '%'
    | '**'
    | '=='
    | '!='
    | '==='
    | '!=='
    | '<'
    | '<='
    | '>'
    | '>='
    | '<<'
    | '>>'
    | '>>>'
    | '&'
    | '^'
    | '|'
    | '&&'
    | '||'
    | '??'
  /** Left side of the expression */
  left: ASTNode
  /** Right side of the expression */
  right: ASTNode
}
