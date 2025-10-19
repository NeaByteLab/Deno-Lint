import type * as types from '@interfaces/index.ts'

/**
 * Union type of all supported JavaScript AST node types.
 */
export type JSASTNode =
  | types.ArrayExpressionNode
  | types.ArrowFunctionExpressionNode
  | types.AssignmentExpressionNode
  | types.AssignmentPatternNode
  | types.AwaitExpressionNode
  | types.BigIntLiteralNode
  | types.BinaryExpressionNode
  | types.BlockStatementNode
  | types.BreakStatementNode
  | types.CallExpressionNode
  | types.CatchClauseNode
  | types.ChainExpressionNode
  | types.ClassBodyNode
  | types.ClassDeclarationNode
  | types.ClassExpressionNode
  | types.ClassFieldNode
  | types.ClassMethodNode
  | types.ConditionalExpressionNode
  | types.DebuggerStatementNode
  | types.DecoratorNode
  | types.DoWhileStatementNode
  | types.EmptyStatementNode
  | types.ExportAllDeclarationNode
  | types.ExportDefaultDeclarationNode
  | types.ExportNamedDeclarationNode
  | types.ExportSpecifierNode
  | types.ExpressionStatementNode
  | types.ForInStatementNode
  | types.ForOfStatementNode
  | types.ForStatementNode
  | types.FunctionDeclarationNode
  | types.FunctionExpressionNode
  | types.HashbangNode
  | types.IdentifierNode
  | types.IfStatementNode
  | types.ImportAssertionNode
  | types.ImportAttributeNode
  | types.ImportDeclarationNode
  | types.ImportDefaultSpecifierNode
  | types.ImportExpressionNode
  | types.ImportNamespaceSpecifierNode
  | types.ImportSpecifierNode
  | types.LabeledStatementNode
  | types.LiteralNode
  | types.LogicalAssignmentNode
  | types.LogicalExpressionNode
  | types.MemberExpressionNode
  | types.MetaPropertyNode
  | types.MethodDefinitionNode
  | types.NewExpressionNode
  | types.NullishCoalescingNode
  | types.NumericSeparatorNode
  | types.ObjectExpressionNode
  | types.ObjectPatternNode
  | types.OptionalChainingNode
  | types.ParameterNode
  | types.PipelineOperatorNode
  | types.PrivateIdentifierNode
  | types.ProgramNode
  | types.PropertyNode
  | types.PropertyDefinitionNode
  | types.RegExpLiteralNode
  | types.RegExpWithIndicesNode
  | types.RestElementNode
  | types.ReturnStatementNode
  | types.SequenceExpressionNode
  | types.SpreadElementNode
  | types.StaticBlockNode
  | types.SuperNode
  | types.SwitchCaseNode
  | types.SwitchStatementNode
  | types.TemplateElementNode
  | types.TemplateLiteralNode
  | types.ThisExpressionNode
  | types.ThrowStatementNode
  | types.TopLevelAwaitNode
  | types.TryStatementNode
  | types.UnaryExpressionNode
  | types.UpdateExpressionNode
  | types.VariableDeclarationNode
  | types.VariableDeclaratorNode
  | types.WhileStatementNode
  | types.WithStatementNode
  | types.YieldExpressionNode

/**
 * Union type of all supported TypeScript AST node types.
 */
export type TSASTNode =
  | types.TSAnyKeywordNode
  | types.TSArrayTypeNode
  | types.TSAsExpressionNode
  | types.TSBooleanKeywordNode
  | types.TSCallSignatureDeclarationNode
  | types.TSConditionalTypeNode
  | types.TSConstructSignatureDeclarationNode
  | types.TSDeclareFunctionNode
  | types.TSEnumBodyNode
  | types.TSEnumDeclarationNode
  | types.TSEnumMemberNode
  | types.TSExpressionWithTypeArgumentsNode
  | types.TSFunctionTypeNode
  | types.TSIndexedAccessTypeNode
  | types.TSIndexSignatureNode
  | types.TSInferTypeNode
  | types.TSInterfaceBodyNode
  | types.TSInterfaceDeclarationNode
  | types.TSInterfaceHeritageNode
  | types.TSIntersectionTypeNode
  | types.TSLiteralTypeNode
  | types.TSMappedTypeNode
  | types.TSMethodSignatureNode
  | types.TSModuleBlockNode
  | types.TSModuleDeclarationNode
  | types.TSNamedTupleMemberNode
  | types.TSNeverKeywordNode
  | types.TSNullKeywordNode
  | types.TSNumberKeywordNode
  | types.TSObjectKeywordNode
  | types.TSOptionalTypeNode
  | types.TSPropertySignatureNode
  | types.TSQualifiedNameNode
  | types.TSRestTypeNode
  | types.TSStringKeywordNode
  | types.TSSymbolKeywordNode
  | types.TSTemplateElementTypeNode
  | types.TSTemplateLiteralTypeNode
  | types.TSTupleTypeNode
  | types.TSTypeAliasDeclarationNode
  | types.TSTypeAnnotationNode
  | types.TSTypeLiteralNode
  | types.TSTypeNameNode
  | types.TSTypeOperatorNode
  | types.TSTypeParameterDeclarationNode
  | types.TSTypeParameterInstantiationNode
  | types.TSTypeParameterNode
  | types.TSTypePredicateNode
  | types.TSTypeQueryNode
  | types.TSTypeReferenceNode
  | types.TSUndefinedKeywordNode
  | types.TSUnionTypeNode
  | types.TSUnknownKeywordNode
  | types.TSVoidKeywordNode

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
