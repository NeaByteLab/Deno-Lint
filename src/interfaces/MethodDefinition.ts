import type { ParameterNode } from '@interfaces/index.ts'

/**
 * AST node representing a method definition.
 */
export interface MethodDefinitionNode {
  /** Type identifier for method definitions */
  type: 'MethodDefinition'
  /** Method key with name */
  key: { name: string }
  /** Method value containing function expression */
  value: {
    type: 'FunctionExpression'
    /** The parameters of the function */
    params: Array<ParameterNode>
    /** Whether the function is async */
    async?: boolean
  }
  /** Whether the method is static */
  static?: boolean
  /** Method kind */
  kind?: 'method' | 'get' | 'set'
}
