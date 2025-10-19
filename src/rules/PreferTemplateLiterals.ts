import type { DenoASTNode, LintContext, LintFixer, StringPartType } from '@interfaces/index.ts'
import { isBinaryExpression, isStringConcatenation, isStringLiteral } from '@utils/index.ts'

/**
 * Checks if a binary expression can be converted to a template literal.
 * @param node - The binary expression node
 * @param context - The lint context for accessing source code
 * @returns True if the expression can be converted, false otherwise
 */
function canConvertToTemplateLiteral(node: DenoASTNode, context: LintContext): boolean {
  if (!isStringConcatenation(node)) {
    return false
  }
  const parent = node.parent
  if (parent && isBinaryExpression(parent) && parent.operator === '+') {
    return false
  }
  const parts = extractStringParts(node, context)
  if (parts.length < 2) {
    return false
  }
  const hasStringLiteral = parts.some((part) => part.isLiteral)
  if (!hasStringLiteral) {
    return false
  }
  const hasExpression = parts.some((part) => !part.isLiteral)
  if (!hasExpression) {
    return false
  }
  return true
}

/**
 * Creates a template literal from string parts.
 * @param parts - Array of string parts
 * @returns The template literal string
 */
function createTemplateLiteral(parts: Array<StringPartType>): string {
  let template = '`'
  for (const part of parts) {
    if (part.isLiteral) {
      const stringValue = part.text.slice(1, -1)
      const escapedValue = stringValue.replace(/`/g, '\\`').replace(/\$/g, '\\$')
      template += escapedValue
    } else {
      template += `\${${part.text}}`
    }
  }
  template += '`'
  return template
}

/**
 * Creates a fix that converts string concatenation to template literal.
 * @param context - The lint context
 * @param node - The binary expression node
 * @returns A fix function
 */
function createTemplateLiteralFix(
  context: LintContext,
  node: DenoASTNode
): (fixer: LintFixer) => unknown {
  return (fixer: LintFixer): unknown => {
    const parts = extractStringParts(node, context)
    const templateLiteral = createTemplateLiteral(parts)
    return fixer.replaceText(node, templateLiteral)
  }
}

/**
 * Recursively extracts string parts from a binary expression.
 * @param node - The binary expression node
 * @param context - The lint context for accessing source code
 * @returns Array of string parts and their positions
 */
function extractStringParts(node: DenoASTNode, context: LintContext): Array<StringPartType> {
  if (!isBinaryExpression(node)) {
    return []
  }
  const parts: Array<StringPartType> = []
  if (isBinaryExpression(node.left) && node.left.operator === '+') {
    parts.push(...extractStringParts(node.left, context))
  } else {
    const leftText = context.sourceCode.getText(node.left)
    parts.push({
      text: leftText,
      isLiteral: isStringLiteral(node.left),
      node: node.left
    })
  }
  if (isBinaryExpression(node.right) && node.right.operator === '+') {
    parts.push(...extractStringParts(node.right, context))
  } else {
    const rightText = context.sourceCode.getText(node.right)
    parts.push({
      text: rightText,
      isLiteral: isStringLiteral(node.right),
      node: node.right
    })
  }
  return parts
}

/**
 * Lint rule for preferring template literals over string concatenation.
 */
export const preferTemplateLiteralsRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: LintContext): Record<string, (node: DenoASTNode) => void> {
    return {
      /**
       * Visitor function for binary expressions.
       * @param node - The AST node representing a binary expression
       */
      BinaryExpression(node: DenoASTNode): void {
        if (!isBinaryExpression(node)) {
          return
        }
        if (canConvertToTemplateLiteral(node, context)) {
          context.report({
            node,
            message: 'Prefer template literals over string concatenation',
            fix: createTemplateLiteralFix(context, node)
          })
        }
      }
    }
  }
}
