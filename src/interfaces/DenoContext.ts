import type {
  ArrayExpressionNode,
  ArrowFunctionExpressionNode,
  AssignmentExpressionNode,
  AssignmentPatternNode,
  AwaitExpressionNode,
  BinaryExpressionNode,
  BlockStatementNode,
  BreakStatementNode,
  CallExpressionNode,
  CatchClauseNode,
  ChainExpressionNode,
  ClassBodyNode,
  ClassDeclarationNode,
  ClassExpressionNode,
  ConditionalExpressionNode,
  DecoratorNode,
  ExportNamedDeclarationNode,
  ExportSpecifierNode,
  ExpressionStatementNode,
  ForOfStatementNode,
  ForStatementNode,
  FunctionDeclarationNode,
  FunctionExpressionNode,
  IdentifierNode,
  IfStatementNode,
  LiteralNode,
  LogicalExpressionNode,
  MemberExpressionNode,
  MethodDefinitionNode,
  NewExpressionNode,
  ObjectExpressionNode,
  ObjectPatternNode,
  ParameterNode,
  ProgramNode,
  PropertyDefinitionNode,
  PropertyNode,
  RestElementNode,
  ReturnStatementNode,
  SpreadElementNode,
  SwitchCaseNode,
  SwitchStatementNode,
  TemplateElementNode,
  TemplateLiteralNode,
  ThisExpressionNode,
  ThrowStatementNode,
  TryStatementNode,
  TSAnyKeywordNode,
  TSArrayTypeNode,
  TSAsExpressionNode,
  TSBooleanKeywordNode,
  TSCallSignatureDeclarationNode,
  TSConditionalTypeNode,
  TSConstructSignatureDeclarationNode,
  TSDeclareFunctionNode,
  TSEnumBodyNode,
  TSEnumDeclarationNode,
  TSEnumMemberNode,
  TSFunctionTypeNode,
  TSIndexedAccessTypeNode,
  TSIndexSignatureNode,
  TSInferTypeNode,
  TSInterfaceBodyNode,
  TSInterfaceDeclarationNode,
  TSInterfaceHeritageNode,
  TSIntersectionTypeNode,
  TSLiteralTypeNode,
  TSMappedTypeNode,
  TSMethodSignatureNode,
  TSModuleBlockNode,
  TSModuleDeclarationNode,
  TSNamedTupleMemberNode,
  TSNeverKeywordNode,
  TSNullKeywordNode,
  TSNumberKeywordNode,
  TSObjectKeywordNode,
  TSOptionalTypeNode,
  TSPropertySignatureNode,
  TSQualifiedNameNode,
  TSRestTypeNode,
  TSStringKeywordNode,
  TSSymbolKeywordNode,
  TSTemplateElementTypeNode,
  TSTemplateLiteralTypeNode,
  TSTupleTypeNode,
  TSTypeAliasDeclarationNode,
  TSTypeAnnotationNode,
  TSTypeLiteralNode,
  TSTypeNameNode,
  TSTypeOperatorNode,
  TSTypeParameterDeclarationNode,
  TSTypeParameterInstantiationNode,
  TSTypeParameterNode,
  TSTypePredicateNode,
  TSTypeQueryNode,
  TSTypeReferenceNode,
  TSUndefinedKeywordNode,
  TSUnionTypeNode,
  TSUnknownKeywordNode,
  TSVoidKeywordNode,
  UnaryExpressionNode,
  UpdateExpressionNode,
  VariableDeclarationNode,
  VariableDeclaratorNode,
  WhileStatementNode,
  YieldExpressionNode
} from '@interfaces/index.ts'

/**
 * Union type of all supported JavaScript AST node types.
 */
export type JSASTNode =
  | ArrayExpressionNode
  | ArrowFunctionExpressionNode
  | AssignmentExpressionNode
  | AssignmentPatternNode
  | AwaitExpressionNode
  | BinaryExpressionNode
  | BlockStatementNode
  | BreakStatementNode
  | CallExpressionNode
  | CatchClauseNode
  | ChainExpressionNode
  | ClassBodyNode
  | ClassDeclarationNode
  | ClassExpressionNode
  | ConditionalExpressionNode
  | DecoratorNode
  | ExportNamedDeclarationNode
  | ExportSpecifierNode
  | ExpressionStatementNode
  | ForOfStatementNode
  | ForStatementNode
  | FunctionDeclarationNode
  | FunctionExpressionNode
  | IdentifierNode
  | IfStatementNode
  | LiteralNode
  | LogicalExpressionNode
  | MemberExpressionNode
  | MethodDefinitionNode
  | NewExpressionNode
  | ObjectExpressionNode
  | ObjectPatternNode
  | ParameterNode
  | ProgramNode
  | PropertyNode
  | PropertyDefinitionNode
  | RestElementNode
  | ReturnStatementNode
  | SpreadElementNode
  | SwitchCaseNode
  | SwitchStatementNode
  | TemplateElementNode
  | TemplateLiteralNode
  | ThisExpressionNode
  | ThrowStatementNode
  | TryStatementNode
  | UnaryExpressionNode
  | UpdateExpressionNode
  | VariableDeclarationNode
  | VariableDeclaratorNode
  | WhileStatementNode
  | YieldExpressionNode

/**
 * Union type of all supported TypeScript AST node types.
 */
export type TSASTNode =
  | TSAnyKeywordNode
  | TSArrayTypeNode
  | TSAsExpressionNode
  | TSBooleanKeywordNode
  | TSCallSignatureDeclarationNode
  | TSConditionalTypeNode
  | TSConstructSignatureDeclarationNode
  | TSDeclareFunctionNode
  | TSEnumBodyNode
  | TSEnumDeclarationNode
  | TSEnumMemberNode
  | TSFunctionTypeNode
  | TSIndexedAccessTypeNode
  | TSIndexSignatureNode
  | TSInferTypeNode
  | TSInterfaceBodyNode
  | TSInterfaceDeclarationNode
  | TSInterfaceHeritageNode
  | TSIntersectionTypeNode
  | TSLiteralTypeNode
  | TSMappedTypeNode
  | TSMethodSignatureNode
  | TSModuleBlockNode
  | TSModuleDeclarationNode
  | TSNamedTupleMemberNode
  | TSNeverKeywordNode
  | TSNullKeywordNode
  | TSNumberKeywordNode
  | TSObjectKeywordNode
  | TSOptionalTypeNode
  | TSPropertySignatureNode
  | TSQualifiedNameNode
  | TSRestTypeNode
  | TSStringKeywordNode
  | TSSymbolKeywordNode
  | TSTemplateElementTypeNode
  | TSTemplateLiteralTypeNode
  | TSTupleTypeNode
  | TSTypeAliasDeclarationNode
  | TSTypeAnnotationNode
  | TSTypeLiteralNode
  | TSTypeNameNode
  | TSTypeOperatorNode
  | TSTypeParameterDeclarationNode
  | TSTypeParameterInstantiationNode
  | TSTypeParameterNode
  | TSTypePredicateNode
  | TSTypeQueryNode
  | TSTypeReferenceNode
  | TSUndefinedKeywordNode
  | TSUnionTypeNode
  | TSUnknownKeywordNode
  | TSVoidKeywordNode

/**
 * Union type of all supported AST node types (JavaScript and TypeScript).
 */
export type ASTNode = JSASTNode | TSASTNode

/**
 * Extended AST node type with additional Deno-specific properties.
 */
export type DenoASTNode = ASTNode & {
  /** Whether this node represents optional chaining (e.g., obj?.prop) */
  optional?: boolean
  /** Whether this node represents computed property access (e.g., obj[prop]) */
  computed?: boolean
  /** Node range for precise positioning */
  range?: [number, number]
  /** Parent node reference */
  parent?: ASTNode
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
      create(context: LintContext): Record<string, (node: DenoASTNode) => void>
    }
  >
}
