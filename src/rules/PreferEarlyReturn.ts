import type {
  ArrowFunctionExpressionNode,
  DenoASTNode,
  FunctionDeclarationNode,
  FunctionExpressionNode,
  LintContext
} from '@interfaces/index.ts'
import {
  createEarlyReturnFix,
  hasNestedConditions,
  isArrowFunctionExpression,
  isBlockStatement,
  isFunctionDeclaration,
  isFunctionExpression,
  isIfStatement
} from '@utils/index.ts'

/**
 * Finds the first problematic if statement in a function that can be refactored.
 * @param node - The function node
 * @returns The problematic if statement or null
 */
function findProblematicIfStatement(node: DenoASTNode): DenoASTNode | null {
  if (
    !isFunctionDeclaration(node) &&
    !isFunctionExpression(node) &&
    !isArrowFunctionExpression(node)
  ) {
    return null
  }
  const functionNode = node as
    | FunctionDeclarationNode
    | FunctionExpressionNode
    | ArrowFunctionExpressionNode
  if (!functionNode.body || !isBlockStatement(functionNode.body)) {
    return null
  }
  const statements = functionNode.body.body
  for (const stmt of statements) {
    if (isIfStatement(stmt)) {
      if (
        hasNestedIfStatement(stmt.consequent) ||
        (stmt.alternate && hasNestedIfStatement(stmt.alternate))
      ) {
        return stmt
      }
    }
  }
  return null
}

/**
 * Checks if a statement contains nested if statements.
 * @param statement - The statement to check
 * @returns True if the statement contains nested if statements
 */
function hasNestedIfStatement(statement: DenoASTNode): boolean {
  if (isBlockStatement(statement)) {
    return statement.body.some((stmt) => hasNestedIfStatement(stmt as DenoASTNode))
  }
  if (isIfStatement(statement)) {
    return true
  }
  return false
}

/**
 * Lint rule for preferring early returns over nested conditions.
 */
export const preferEarlyReturnRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: LintContext): Record<string, (node: DenoASTNode) => void> {
    return {
      /**
       * Visitor function for arrow function expressions.
       * @param node - The AST node representing an arrow function expression
       */
      ArrowFunctionExpression(node: DenoASTNode): void {
        if (hasNestedConditions(node)) {
          const problematicIf = findProblematicIfStatement(node)
          if (problematicIf) {
            context.report({
              node: problematicIf,
              message: 'Prefer early returns over nested conditions for better readability',
              fix: createEarlyReturnFix(context, problematicIf)
            })
          }
        }
      },
      /**
       * Visitor function for function declarations.
       * @param node - The AST node representing a function declaration
       */
      FunctionDeclaration(node: DenoASTNode): void {
        if (hasNestedConditions(node)) {
          const problematicIf = findProblematicIfStatement(node)
          if (problematicIf) {
            context.report({
              node: problematicIf,
              message: 'Prefer early returns over nested conditions for better readability',
              fix: createEarlyReturnFix(context, problematicIf)
            })
          }
        }
      },
      /**
       * Visitor function for function expressions.
       * @param node - The AST node representing a function expression
       */
      FunctionExpression(node: DenoASTNode): void {
        if (hasNestedConditions(node)) {
          const problematicIf = findProblematicIfStatement(node)
          if (problematicIf) {
            context.report({
              node: problematicIf,
              message: 'Prefer early returns over nested conditions for better readability',
              fix: createEarlyReturnFix(context, problematicIf)
            })
          }
        }
      }
    }
  }
}
