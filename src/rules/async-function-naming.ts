import type { ASTNode } from '@app/types.ts'
import { isFunctionDeclaration } from '@shared/expression.ts'

/**
 * Lint rule for enforcing async function naming conventions.
 */
export const asyncFunctionNamingRule = {
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
        if (node.async && node.id?.name && !node.id.name.endsWith('Async')) {
          const nodeId = node.id
          context.report({
            node,
            message: "Async functions should be named with 'Async' suffix",
            fix(fixer: Deno.lint.Fixer): unknown {
              const original = context.sourceCode.getText(node)
              const newName = `${nodeId.name}Async`
              const newText = original.replace(
                `async function ${nodeId.name}`,
                `async function ${newName}`
              )
              return fixer.replaceText(node, newText)
            }
          })
        }
      }
    }
  }
}
