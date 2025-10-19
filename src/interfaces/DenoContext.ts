import type {
  ArrayExpressionNode,
  ArrowFunctionExpressionNode,
  AssignmentExpressionNode,
  AssignmentPatternNode,
  AwaitExpressionNode,
  BigIntLiteralNode,
  BinaryExpressionNode,
  BlockStatementNode,
  BreakStatementNode,
  CallExpressionNode,
  CatchClauseNode,
  ChainExpressionNode,
  ClassBodyNode,
  ClassDeclarationNode,
  ClassExpressionNode,
  ClassFieldNode,
  ClassMethodNode,
  ConditionalExpressionNode,
  DebuggerStatementNode,
  DecoratorNode,
  DoWhileStatementNode,
  EmptyStatementNode,
  ExportAllDeclarationNode,
  ExportDefaultDeclarationNode,
  ExportNamedDeclarationNode,
  ExportSpecifierNode,
  ExpressionStatementNode,
  ForInStatementNode,
  ForOfStatementNode,
  ForStatementNode,
  FunctionDeclarationNode,
  FunctionExpressionNode,
  HashbangNode,
  IdentifierNode,
  IfStatementNode,
  ImportAssertionNode,
  ImportAttributeNode,
  ImportDeclarationNode,
  ImportDefaultSpecifierNode,
  ImportExpressionNode,
  ImportNamespaceSpecifierNode,
  ImportSpecifierNode,
  LabeledStatementNode,
  LiteralNode,
  LogicalAssignmentNode,
  LogicalExpressionNode,
  MemberExpressionNode,
  MetaPropertyNode,
  MethodDefinitionNode,
  NewExpressionNode,
  NullishCoalescingNode,
  NumericSeparatorNode,
  ObjectExpressionNode,
  ObjectPatternNode,
  OptionalChainingNode,
  ParameterNode,
  PipelineOperatorNode,
  PrivateIdentifierNode,
  ProgramNode,
  PropertyDefinitionNode,
  PropertyNode,
  RegExpLiteralNode,
  RegExpWithIndicesNode,
  RestElementNode,
  ReturnStatementNode,
  SequenceExpressionNode,
  SpreadElementNode,
  StaticBlockNode,
  SuperNode,
  SwitchCaseNode,
  SwitchStatementNode,
  TemplateElementNode,
  TemplateLiteralNode,
  ThisExpressionNode,
  ThrowStatementNode,
  TopLevelAwaitNode,
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
  TSExpressionWithTypeArgumentsNode,
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
  WithStatementNode,
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
  | BigIntLiteralNode
  | BinaryExpressionNode
  | BlockStatementNode
  | BreakStatementNode
  | CallExpressionNode
  | CatchClauseNode
  | ChainExpressionNode
  | ClassBodyNode
  | ClassDeclarationNode
  | ClassExpressionNode
  | ClassFieldNode
  | ClassMethodNode
  | ConditionalExpressionNode
  | DebuggerStatementNode
  | DecoratorNode
  | DoWhileStatementNode
  | EmptyStatementNode
  | ExportAllDeclarationNode
  | ExportDefaultDeclarationNode
  | ExportNamedDeclarationNode
  | ExportSpecifierNode
  | ExpressionStatementNode
  | ForInStatementNode
  | ForOfStatementNode
  | ForStatementNode
  | FunctionDeclarationNode
  | FunctionExpressionNode
  | HashbangNode
  | IdentifierNode
  | IfStatementNode
  | ImportAssertionNode
  | ImportAttributeNode
  | ImportDeclarationNode
  | ImportDefaultSpecifierNode
  | ImportExpressionNode
  | ImportNamespaceSpecifierNode
  | ImportSpecifierNode
  | LabeledStatementNode
  | LiteralNode
  | LogicalAssignmentNode
  | LogicalExpressionNode
  | MemberExpressionNode
  | MetaPropertyNode
  | MethodDefinitionNode
  | NewExpressionNode
  | NullishCoalescingNode
  | NumericSeparatorNode
  | ObjectExpressionNode
  | ObjectPatternNode
  | OptionalChainingNode
  | ParameterNode
  | PipelineOperatorNode
  | PrivateIdentifierNode
  | ProgramNode
  | PropertyNode
  | PropertyDefinitionNode
  | RegExpLiteralNode
  | RegExpWithIndicesNode
  | RestElementNode
  | ReturnStatementNode
  | SequenceExpressionNode
  | SpreadElementNode
  | StaticBlockNode
  | SuperNode
  | SwitchCaseNode
  | SwitchStatementNode
  | TemplateElementNode
  | TemplateLiteralNode
  | ThisExpressionNode
  | ThrowStatementNode
  | TopLevelAwaitNode
  | TryStatementNode
  | UnaryExpressionNode
  | UpdateExpressionNode
  | VariableDeclarationNode
  | VariableDeclaratorNode
  | WhileStatementNode
  | WithStatementNode
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
  | TSExpressionWithTypeArgumentsNode
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
  /** Insert text after the given node */
  insertTextAfter(node: ASTNode, text: string): unknown
  /** Insert text after the given range */
  insertTextAfterRange(range: [number, number], text: string): unknown
  /** Insert text before the given node */
  insertTextBefore(node: ASTNode, text: string): unknown
  /** Insert text before the given range */
  insertTextBeforeRange(range: [number, number], text: string): unknown
  /** Remove the given node */
  remove(node: ASTNode): unknown
  /** Remove text in the given range */
  removeRange(range: [number, number]): unknown
  /** Replace the text of a node */
  replaceText(node: ASTNode, text: string): unknown
  /** Replace text in the given range */
  replaceTextRange(range: [number, number], text: string): unknown
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
