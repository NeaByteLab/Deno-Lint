import type { ASTNode, AwaitExpressionNode } from '@app/types.ts'
import { isCallExpression } from '@shared/expression.ts'

/**
 * Array of Deno file operations that require error handling.
 */
const possibleOperations = [
  'readTextFile',
  'writeTextFile',
  'readFile',
  'writeFile',
  'copyFile',
  'copy',
  'remove',
  'readDir',
  'readLink',
  'mkdir',
  'chmod',
  'chown',
  'stat',
  'lstat',
  'realPath',
  'symlink'
]

/**
 * Lint rule for enforcing error handling on Deno file operations.
 */
export const requireErrorHandlingRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: Deno.lint.Context): Record<string, (node: ASTNode) => void> {
    return {
      /**
       * Visitor function for call expressions.
       * @param node - The AST node representing a call expression
       */
      CallExpression(node: ASTNode): void {
        if (!isCallExpression(node)) {
          return
        }
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.type === 'Identifier' &&
          node.callee.object.name === 'Deno' &&
          node.callee.property.type === 'Identifier' &&
          possibleOperations.includes(node.callee.property.name)
        ) {
          let parent: unknown = node.parent
          let isAwaited = false
          while (parent) {
            if ((parent as AwaitExpressionNode).type === 'AwaitExpression') {
              isAwaited = true
              break
            }
            parent = (parent as { parent?: unknown }).parent
          }
          if (!isAwaited) {
            context.report({
              node,
              message: 'Deno file operations should be awaited or handled with .catch()'
            })
          }
        }
      }
    }
  }
}
