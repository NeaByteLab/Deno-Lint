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
  /** Array of arguments passed to the function */
  arguments: Array<ASTNode>
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
 * AST node representing a conditional expression (condition ? true : false).
 */
export interface ConditionalExpressionNode {
  /** Type identifier for conditional expressions */
  type: 'ConditionalExpression'
  /** The test condition */
  test: ASTNode
  /** The consequent (true branch) */
  consequent: ASTNode
  /** The alternate (false branch) */
  alternate: ASTNode
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
 * AST node representing an identifier.
 */
export interface IdentifierNode {
  /** Type identifier for identifiers */
  type: 'Identifier'
  /** The name of the identifier */
  name: string
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
 * Context object provided to lint rules for reporting issues and accessing source code.
 */
export interface LintContext {
  /** The source code of the file */
  sourceCode: {
    /** Get the text of a node */
    getText(node: ASTNode): string
  }
  /** Report an issue */
  report(options: { node: ASTNode; message: string; fix?: (fixer: LintFixer) => unknown }): void
}

/**
 * Fixer object provided to lint rules for applying automatic fixes to source code.
 */
export interface LintFixer {
  /** Replace the text of a node */
  replaceText(node: ASTNode, text: string): unknown
}

/**
 * Plugin configuration object for Deno lint rules.
 */
export interface LintPlugin {
  /** The name of the plugin */
  name: string
  /** The rules of the plugin */
  rules: Record<
    string,
    {
      /** Create the rule */
      create(context: LintContext): Record<string, (node: ASTNode) => void>
    }
  >
}

/**
 * AST node representing a literal value (string, number, boolean, etc.).
 */
export interface LiteralNode {
  /** Type identifier for literal nodes */
  type: 'Literal'
  /** The literal value */
  value: string | number | boolean | null
}

/**
 * AST node representing a logical expression (&&, ||, ??).
 */
export interface LogicalExpressionNode {
  /** Type identifier for logical expressions */
  type: 'LogicalExpression'
  /** The logical operator */
  operator: '&&' | '||' | '??'
  /** Left side of the expression */
  left: ASTNode
  /** Right side of the expression */
  right: ASTNode
}

/**
 * AST node representing a member expression (object.property).
 */
export interface MemberExpressionNode {
  /** Type identifier for member expressions */
  type: 'MemberExpression'
  /** The object being accessed */
  object: ASTNode
  /** The property being accessed */
  property: ASTNode
  /** Whether this is computed property access (object[property]) */
  computed?: boolean
  /** Whether this is optional chaining (object?.property) */
  optional?: boolean
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
    /** The parameters of the function */
    params: Array<ParameterNode>
    /** Whether the function is async */
    async?: boolean
  }
  /** Whether the method is static */
  static?: boolean
}

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
    /** Type identifier for property nodes */
    type: 'Property'
    /** The key of the property */
    key: { name: string }
    /** The value of the property */
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
 * AST node representing a variable declarator.
 */
export interface VariableDeclaratorNode {
  /** Type identifier for variable declarators */
  type: 'VariableDeclarator'
  /** Variable identifier with name */
  id?: { type: 'Identifier'; name: string }
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
  | ConditionalExpressionNode
  | FunctionDeclarationNode
  | FunctionExpressionNode
  | IdentifierNode
  | InterfaceDeclarationNode
  | LiteralNode
  | LogicalExpressionNode
  | MemberExpressionNode
  | MethodDefinitionNode
  | NewExpressionNode
  | ParameterNode
  | TSEnumDeclarationNode
  | TSEnumMemberNode
  | TSTypeAliasDeclarationNode
  | VariableDeclaratorNode

/**
 * Extended AST node type with additional Deno-specific properties.
 */
export type DenoASTNode = ASTNode & {
  /** Whether this node represents optional chaining (e.g., obj?.prop) */
  optional?: boolean
  /** Whether this node represents computed property access (e.g., obj[prop]) */
  computed?: boolean
}
