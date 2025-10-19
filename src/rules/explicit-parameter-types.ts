import type { ASTNode, ParameterNode } from '@app/types.ts'
import {
  isArrowFunctionExpression,
  isFunctionDeclaration,
  isFunctionExpression,
  isMethodDefinition
} from '@shared/expression.ts'

/**
 * Checks all parameters in a function for explicit type annotations.
 * @param context - The Deno lint context for reporting issues
 * @param node - The AST node containing the parameters
 * @param params - Array of parameter nodes to check
 */
function checkParameters(
  context: Deno.lint.Context,
  node: ASTNode,
  params: Array<ParameterNode>
): void {
  params.forEach((param: ParameterNode) => {
    checkParameter(context, node, param)
  })
}

/**
 * Checks a single parameter for explicit type annotation.
 * @param context - The Deno lint context for reporting issues
 * @param node - The AST node containing the parameter
 * @param param - The parameter node to check
 */
function checkParameter(context: Deno.lint.Context, node: ASTNode, param: ParameterNode): void {
  switch (param.type) {
    case 'Identifier':
      if (!param.typeAnnotation) {
        context.report({
          node: node as ASTNode,
          message: `Parameter '${param.name}' must have explicit type annotation`,
          fix(fixer: Deno.lint.Fixer): unknown {
            const original = context.sourceCode.getText(node as ASTNode)
            const newText = original.replace(
              new RegExp(`\\b${param.name}\\b`),
              `${param.name}: any`
            )
            return fixer.replaceText(node as ASTNode, newText)
          }
        })
      }
      break
    case 'ObjectPattern':
      if (!param.typeAnnotation) {
        context.report({
          node: node as ASTNode,
          message: `Destructured parameter must have explicit type annotation`,
          fix(fixer: Deno.lint.Fixer): unknown {
            const original = context.sourceCode.getText(node as ASTNode)
            const newText = original.replace(/\{([^}]+)\}/, '{$1}: any')
            return fixer.replaceText(node as ASTNode, newText)
          }
        })
      }
      break
    case 'RestElement':
      if (!param.typeAnnotation) {
        context.report({
          node: node as ASTNode,
          message: `Rest parameter must have explicit type annotation`,
          fix(fixer: Deno.lint.Fixer): unknown {
            const original = context.sourceCode.getText(node as ASTNode)
            const newText = original.replace(/\.\.\.(\w+)/, '...$1: any[]')
            return fixer.replaceText(node as ASTNode, newText)
          }
        })
      }
      break
    case 'AssignmentPattern': {
      const hasTypeAnnotation = param.typeAnnotation || (param.left && param.left.typeAnnotation)
      if (!hasTypeAnnotation) {
        context.report({
          node: node as ASTNode,
          message: `Default parameter must have explicit type annotation`,
          fix(fixer: Deno.lint.Fixer): unknown {
            const original = context.sourceCode.getText(node as ASTNode)
            const newText = original.replace(/(\w+)\s*=/g, '$1: any =')
            return fixer.replaceText(node as ASTNode, newText)
          }
        })
      }
      break
    }
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
  create(context: Deno.lint.Context): Record<string, (node: ASTNode) => void> {
    return {
      /**
       * Visitor function for function declarations.
       * @param node - The AST node representing a function declaration
       */
      FunctionDeclaration(node: ASTNode): void {
        if (!isFunctionDeclaration(node)) {
          return
        }
        checkParameters(context, node, node.params)
      },
      /**
       * Visitor function for arrow function expressions.
       * @param node - The AST node representing an arrow function expression
       */
      ArrowFunctionExpression(node: ASTNode): void {
        if (!isArrowFunctionExpression(node)) {
          return
        }
        checkParameters(context, node, node.params)
      },
      /**
       * Visitor function for function expressions.
       * @param node - The AST node representing a function expression
       */
      FunctionExpression(node: ASTNode): void {
        if (!isFunctionExpression(node)) {
          return
        }
        if (node.parent && isMethodDefinition(node.parent as ASTNode)) {
          return
        }
        checkParameters(context, node, node.params)
      },
      /**
       * Visitor function for method definitions.
       * @param node - The AST node representing a method definition
       */
      MethodDefinition(node: ASTNode): void {
        if (!isMethodDefinition(node)) {
          return
        }
        checkParameters(context, node, node.value.params)
      }
    }
  }
}
