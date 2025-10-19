// deno-lint-ignore no-implicit-declare-namespace-export
declare global {
  namespace Deno {
    namespace lint {
      interface Plugin {
        name: string
        rules: Record<
          string,
          {
            create(context: Context): Record<string, (node: ASTNode) => void>
          }
        >
      }
      interface Context {
        sourceCode: {
          getText(node: ASTNode): string
        }
        report(options: { node: ASTNode; message: string; fix?: (fixer: Fixer) => unknown }): void
      }
      interface Fixer {
        replaceText(node: ASTNode, text: string): unknown
      }
    }
  }
}

/**
 * AST node representing an arrow function expression.
 */
export interface ArrowFunctionExpressionNode {
  /** Type identifier for arrow function expressions */
  type: 'ArrowFunctionExpression'
  /** Optional function identifier with name */
  id?: { name: string }
  /** Whether the function is declared as async */
  async?: boolean
  /** Array of function parameters */
  params: Array<ParameterNode>
}

/**
 * AST node representing an await expression.
 */
export interface AwaitExpressionNode {
  /** Type identifier for await expressions */
  type: 'AwaitExpression'
}

/**
 * AST node representing a function call expression.
 */
export interface CallExpressionNode {
  /** Type identifier for call expressions */
  type: 'CallExpression'
  /** The function being called */
  callee: {
    /** Type identifier for member expressions */
    type: 'MemberExpression'
    /** Object containing the method */
    object: { type: 'Identifier'; name: string }
    /** Property/method name being called */
    property: { type: 'Identifier'; name: string }
  }
  /** Optional parent node reference */
  parent?: unknown
}

/**
 * AST node representing a class declaration.
 */
export interface ClassDeclarationNode {
  /** Type identifier for class declarations */
  type: 'ClassDeclaration'
  /** Optional class identifier with name */
  id?: { name: string }
}

/**
 * AST node representing function parameters.
 */
export interface ParameterNode {
  /** Type identifier for parameter nodes */
  type: 'Identifier' | 'ObjectPattern' | 'RestElement' | 'AssignmentPattern'
  /** Parameter name for identifier types */
  name?: string
  /** Type annotation for the parameter */
  typeAnnotation?: unknown
  /** Properties for destructured parameters */
  properties?: Array<{
    type: 'Property'
    key: { name: string }
    value: ParameterNode
  }>
  /** Argument for rest parameters */
  argument?: ParameterNode
  /** Left side for assignment pattern parameters */
  left?: ParameterNode
  /** Right side for assignment pattern parameters */
  right?: unknown
}

/**
 * AST node representing a function declaration.
 */
export interface FunctionDeclarationNode {
  /** Type identifier for function declarations */
  type: 'FunctionDeclaration'
  /** Optional function identifier with name */
  id?: { name: string }
  /** Whether the function is declared as async */
  async?: boolean
  /** Return type annotation for the function */
  returnType?: unknown
  /** Array of function parameters */
  params: Array<ParameterNode>
}

/**
 * AST node representing a function expression.
 */
export interface FunctionExpressionNode {
  /** Type identifier for function expressions */
  type: 'FunctionExpression'
  /** Optional function identifier with name */
  id?: { name: string }
  /** Whether the function is declared as async */
  async?: boolean
  /** Array of function parameters */
  params: Array<ParameterNode>
  /** Optional parent node reference */
  parent?: { type: string }
}

/**
 * AST node representing a TypeScript interface declaration.
 */
export interface InterfaceDeclarationNode {
  /** Type identifier for interface declarations */
  type: 'InterfaceDeclaration'
  /** Optional interface identifier with name */
  id?: { name: string }
}

/**
 * AST node representing a TypeScript enum declaration.
 */
export interface TSEnumDeclarationNode {
  /** Type identifier for TypeScript enum declarations */
  type: 'TSEnumDeclaration'
  /** Optional enum identifier with name */
  id?: { name: string }
}

/**
 * AST node representing a TypeScript enum member.
 */
export interface TSEnumMemberNode {
  /** Type identifier for TypeScript enum members */
  type: 'TSEnumMember'
  /** Optional member identifier with name */
  id?: { type: 'Identifier'; name: string }
}

/**
 * AST node representing a TypeScript type alias declaration.
 */
export interface TSTypeAliasDeclarationNode {
  /** Type identifier for TypeScript type alias declarations */
  type: 'TSTypeAliasDeclaration'
  /** Optional type identifier with name */
  id?: { name: string }
}

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
    params: Array<ParameterNode>
    async?: boolean
  }
  /** Whether the method is static */
  static?: boolean
}

/**
 * AST node representing a variable declarator.
 */
export interface VariableDeclaratorNode {
  /** Type identifier for variable declarators */
  type: 'VariableDeclarator'
  /** Variable identifier with name */
  id: { type: 'Identifier'; name: string }
  /** Optional parent node reference */
  parent?: { kind: string }
}

/**
 * Union type of all supported AST node types.
 * @description Represents any valid AST node that can be processed by the linting rules.
 */
export type ASTNode =
  | ArrowFunctionExpressionNode
  | AwaitExpressionNode
  | CallExpressionNode
  | ClassDeclarationNode
  | FunctionDeclarationNode
  | FunctionExpressionNode
  | InterfaceDeclarationNode
  | MethodDefinitionNode
  | TSEnumDeclarationNode
  | TSEnumMemberNode
  | TSTypeAliasDeclarationNode
  | VariableDeclaratorNode
