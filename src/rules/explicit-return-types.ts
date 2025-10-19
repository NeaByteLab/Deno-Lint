import type { ASTNode, LintContext, LintFixer } from '@app/types.ts'
import { isFunctionDeclaration } from '@shared/expression.ts'

/**
 * Lint rule for enforcing explicit return type annotations.
 */
export const explicitReturnTypesRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: LintContext): Record<string, (node: ASTNode) => void> {
    return {
      /**
       * Visitor function for function declarations.
       * @param node - The AST node representing a function declaration
       */
      FunctionDeclaration(node: ASTNode): void {
        if (!isFunctionDeclaration(node)) {
          return
        }
        if (!node.returnType) {
          context.report({
            node,
            message: 'Function must have explicit return type annotation',
            fix(fixer: LintFixer): unknown {
              const original = context.sourceCode.getText(node)
              const functionName = node.id?.name || 'function'
              const params = original.match(/\([^)]*\)/)?.[0] || '()'
              const body = original.substring(original.indexOf('{'))
              let returnType = ': void'
              if (body.includes('return')) {
                if (/\breturn\s+(true|false)\b/.test(body)) {
                  returnType = ': boolean'
                } else if (/\breturn\s+["'`]/.test(body)) {
                  returnType = ': string'
                } else if (/\breturn\s+\d+/.test(body)) {
                  returnType = ': number'
                } else if (/\breturn\s+\{/.test(body)) {
                  returnType = ': object'
                } else if (/\breturn\s+\[/.test(body)) {
                  returnType = ': any[]'
                } else {
                  returnType = ': any'
                }
              }
              const asyncKeyword = node.async ? 'async ' : ''
              const newText =
                `${asyncKeyword}function ${functionName}${params}${returnType} ${body}`
              return fixer.replaceText(node, newText)
            }
          })
        }
      }
    }
  }
}
