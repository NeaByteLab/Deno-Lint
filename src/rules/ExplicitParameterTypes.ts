import type * as types from '@interfaces/index.ts'
import * as utils from '@utils/index.ts'

/**
 * Checks all parameters in a function for explicit type annotations.
 * @param context - The Deno lint context for reporting issues
 * @param node - The AST node containing the parameters
 * @param params - Array of parameter nodes to check
 */
function checkParameters(
  context: types.LintContext,
  node: types.DenoASTNode,
  params: Array<types.ParameterNode>
): void {
  params.forEach((param: types.ParameterNode) => {
    if (!utils.hasParameterType(param)) {
      const paramName = utils.getParameterName(param)
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
  context: types.LintContext,
  node: types.DenoASTNode,
  param: types.ParameterNode
): (fixer: types.LintFixer) => unknown {
  switch (param.type) {
    case 'AssignmentPattern':
      return utils.createAddDefaultTypeFix(context, node)
    case 'Identifier':
      return utils.createAddParameterTypeFix(context, node, param.name || 'param')
    case 'ObjectPattern':
      return utils.createAddDestructuredTypeFix(context, node)
    case 'RestElement':
      return utils.createAddRestTypeFix(context, node)
    default:
      return utils.createAddParameterTypeFix(context, node, 'param')
  }
}

/**
 * Lint rule for enforcing explicit parameter type annotations.
 */
export const explicitParameterTypesRule = {
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
        if (!utils.isArrowFunctionExpression(node)) {
          return
        }
        checkParameters(context, node, node.params)
      },
      /**
       * Visitor function for function declarations.
       * @param node - The AST node representing a function declaration
       */
      FunctionDeclaration(node: types.DenoASTNode): void {
        if (!utils.isFunctionDeclaration(node)) {
          return
        }
        checkParameters(context, node, node.params)
      },
      /**
       * Visitor function for function expressions.
       * @param node - The AST node representing a function expression
       */
      FunctionExpression(node: types.DenoASTNode): void {
        if (!utils.isFunctionExpression(node)) {
          return
        }
        if (node.parent && utils.isMethodDefinition(node.parent as types.DenoASTNode)) {
          return
        }
        checkParameters(context, node, node.params)
      },
      /**
       * Visitor function for method definitions.
       * @param node - The AST node representing a method definition
       */
      MethodDefinition(node: types.DenoASTNode): void {
        if (!utils.isMethodDefinition(node)) {
          return
        }
        checkParameters(context, node, node.value.params)
      }
    }
  }
}
