import type { DenoASTNode, LintContext, LintFixer, ParameterNode } from '@interfaces/index.ts'
import {
  createAddDefaultTypeFix,
  createAddDestructuredTypeFix,
  createAddParameterTypeFix,
  createAddRestTypeFix,
  getParameterName,
  hasParameterType,
  isArrowFunctionExpression,
  isFunctionDeclaration,
  isFunctionExpression,
  isMethodDefinition
} from '@utils/index.ts'

/**
 * Checks all parameters in a function for explicit type annotations.
 * @param context - The Deno lint context for reporting issues
 * @param node - The AST node containing the parameters
 * @param params - Array of parameter nodes to check
 */
function checkParameters(
  context: LintContext,
  node: DenoASTNode,
  params: Array<ParameterNode>
): void {
  params.forEach((param: ParameterNode) => {
    if (!hasParameterType(param)) {
      const paramName = getParameterName(param)
      const message = paramName
        ? `Parameter '${paramName}' must have explicit type annotation`
        : 'Parameter must have explicit type annotation'

      context.report({
        node,
        message,
        fix: getFixFunction(context, node, param)
      })
    }
  })
}

/**
 * Gets the appropriate fix function for a parameter type.
 * @param context - The lint context
 * @param node - The function node
 * @param param - The parameter node
 * @returns The appropriate fix function
 */
function getFixFunction(
  context: LintContext,
  node: DenoASTNode,
  param: ParameterNode
): (fixer: LintFixer) => unknown {
  switch (param.type) {
    case 'Identifier':
      return createAddParameterTypeFix(context, node, param.name || 'param')
    case 'ObjectPattern':
      return createAddDestructuredTypeFix(context, node)
    case 'RestElement':
      return createAddRestTypeFix(context, node)
    case 'AssignmentPattern':
      return createAddDefaultTypeFix(context, node)
    default:
      return createAddParameterTypeFix(context, node, 'param')
  }
}

/**
 * Lint rule for enforcing explicit parameter type annotations.
 * Refactored to use centralized utilities.
 */
export const explicitParameterTypesRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: LintContext): Record<string, (node: DenoASTNode) => void> {
    return {
      /**
       * Visitor function for function declarations.
       * @param node - The AST node representing a function declaration
       */
      FunctionDeclaration(node: DenoASTNode): void {
        if (!isFunctionDeclaration(node)) {
          return
        }
        checkParameters(context, node, node.params)
      },
      /**
       * Visitor function for arrow function expressions.
       * @param node - The AST node representing an arrow function expression
       */
      ArrowFunctionExpression(node: DenoASTNode): void {
        if (!isArrowFunctionExpression(node)) {
          return
        }
        checkParameters(context, node, node.params)
      },
      /**
       * Visitor function for function expressions.
       * @param node - The AST node representing a function expression
       */
      FunctionExpression(node: DenoASTNode): void {
        if (!isFunctionExpression(node)) {
          return
        }
        if (node.parent && isMethodDefinition(node.parent as DenoASTNode)) {
          return
        }
        checkParameters(context, node, node.params)
      },
      /**
       * Visitor function for method definitions.
       * @param node - The AST node representing a method definition
       */
      MethodDefinition(node: DenoASTNode): void {
        if (!isMethodDefinition(node)) {
          return
        }
        checkParameters(context, node, node.value.params)
      }
    }
  }
}
