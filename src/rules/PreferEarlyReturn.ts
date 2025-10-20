import type * as types from '@interfaces/index.ts'
import * as utils from '@utils/index.ts'

/**
 * Finds the first problematic if statement in a function that can be refactored.
 * @param node - The function node
 * @returns The problematic if statement or null
 */
function findProblematicIfStatement(node: types.DenoASTNode): types.DenoASTNode | null {
  if (
    !utils.isFunctionDeclaration(node) &&
    !utils.isFunctionExpression(node) &&
    !utils.isArrowFunctionExpression(node)
  ) {
    return null
  }
  const functionNode = node as
    | types.FunctionDeclarationNode
    | types.FunctionExpressionNode
    | types.ArrowFunctionExpressionNode
  if (!functionNode.body || !utils.isBlockStatement(functionNode.body)) {
    return null
  }
  const statements = functionNode.body.body
  for (const stmt of statements) {
    if (utils.isIfStatement(stmt)) {
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
function hasNestedIfStatement(statement: types.DenoASTNode): boolean {
  if (utils.isBlockStatement(statement)) {
    return statement.body.some((stmt) => hasNestedIfStatement(stmt as types.DenoASTNode))
  }
  if (utils.isIfStatement(statement)) {
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
  create(context: types.LintContext): Record<string, (node: types.DenoASTNode) => void> {
    return {
      /**
       * Visitor function for arrow function expressions.
       * @param node - The AST node representing an arrow function expression
       */
      ArrowFunctionExpression(node: types.DenoASTNode): void {
        if (utils.hasNestedConditions(node)) {
          const problematicIf = findProblematicIfStatement(node)
          if (problematicIf) {
            context.report({
              node: problematicIf,
              message: 'Prefer early returns over nested conditions for better readability',
              fix: utils.createEarlyReturnFix(context, problematicIf)
            })
          }
        }
      },
      /**
       * Visitor function for function declarations.
       * @param node - The AST node representing a function declaration
       */
      FunctionDeclaration(node: types.DenoASTNode): void {
        if (utils.hasNestedConditions(node)) {
          const problematicIf = findProblematicIfStatement(node)
          if (problematicIf) {
            context.report({
              node: problematicIf,
              message: 'Prefer early returns over nested conditions for better readability',
              fix: utils.createEarlyReturnFix(context, problematicIf)
            })
          }
        }
      },
      /**
       * Visitor function for function expressions.
       * @param node - The AST node representing a function expression
       */
      FunctionExpression(node: types.DenoASTNode): void {
        if (utils.hasNestedConditions(node)) {
          const problematicIf = findProblematicIfStatement(node)
          if (problematicIf) {
            context.report({
              node: problematicIf,
              message: 'Prefer early returns over nested conditions for better readability',
              fix: utils.createEarlyReturnFix(context, problematicIf)
            })
          }
        }
      }
    }
  }
}
