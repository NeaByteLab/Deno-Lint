import type {
  CallExpressionNode,
  DenoASTNode,
  IfStatementNode,
  LintContext,
  LintFixer
} from '@interfaces/index.ts'
import { escapeRegExp, isIfStatement } from '@utils/index.ts'

/**
 * Creates a fix that adds type annotation to default parameters.
 * @param context - The lint context
 * @param node - The function node
 * @returns A fix function
 */
export function createAddDefaultTypeFix(
  context: LintContext,
  node: DenoASTNode
): (fixer: LintFixer) => unknown {
  return (fixer: LintFixer): unknown => {
    const original = context.sourceCode.getText(node)
    const newText = original.replace(/(\w+)\s*=/g, '$1: any =')
    return fixer.replaceText(node, newText)
  }
}

/**
 * Creates a fix that adds type annotation to destructured parameters.
 * @param context - The lint context
 * @param node - The function node
 * @returns A fix function
 */
export function createAddDestructuredTypeFix(
  context: LintContext,
  node: DenoASTNode
): (fixer: LintFixer) => unknown {
  return (fixer: LintFixer): unknown => {
    const original = context.sourceCode.getText(node)
    const newText = original.replace(/\{([^}]+)\}/, '{$1}: any')
    return fixer.replaceText(node, newText)
  }
}

/**
 * Creates a fix that adds type annotation to a parameter.
 * @param context - The lint context
 * @param node - The function node
 * @param paramName - The parameter name
 * @param typeAnnotation - The type annotation to add
 * @returns A fix function
 */
export function createAddParameterTypeFix(
  context: LintContext,
  node: DenoASTNode,
  paramName: string,
  typeAnnotation = 'any'
): (fixer: LintFixer) => unknown {
  return (fixer: LintFixer): unknown => {
    const original = context.sourceCode.getText(node)
    const newText = original.replace(
      new RegExp(`\\b${paramName}\\b`),
      `${paramName}: ${typeAnnotation}`
    )
    return fixer.replaceText(node, newText)
  }
}

/**
 * Creates a fix that adds type annotation to rest parameters.
 * @param context - The lint context
 * @param node - The function node
 * @returns A fix function
 */
export function createAddRestTypeFix(
  context: LintContext,
  node: DenoASTNode
): (fixer: LintFixer) => unknown {
  return (fixer: LintFixer): unknown => {
    const original = context.sourceCode.getText(node)
    const newText = original.replace(/\.\.\.(\w+)/, '...$1: any[]')
    return fixer.replaceText(node, newText)
  }
}

/**
 * Creates a fix that adds return type annotation to a function.
 * @param context - The lint context
 * @param node - The function node
 * @param returnType - The return type to add
 * @returns A fix function
 */
export function createAddReturnTypeFix(
  context: LintContext,
  node: DenoASTNode,
  returnType: string
): (fixer: LintFixer) => unknown {
  return (fixer: LintFixer): unknown => {
    const original = context.sourceCode.getText(node)
    const functionName = (node as { id?: { name: string } }).id?.name || 'function'
    const params = original.match(/\([^)]*\)/)?.[0] || '()'
    const body = original.substring(original.indexOf('{'))
    const asyncKeyword = (node as { async?: boolean }).async ? 'async ' : ''
    const newText = `${asyncKeyword}function ${functionName}${params}: ${returnType} ${body}`
    return fixer.replaceText(node, newText)
  }
}

/**
 * Creates a fix that adds a suffix to a function name.
 * @param context - The lint context
 * @param node - The function node
 * @param suffix - The suffix to add
 * @returns A fix function
 */
export function createAddSuffixFix(
  context: LintContext,
  node: DenoASTNode,
  suffix: string
): (fixer: LintFixer) => unknown {
  return (fixer: LintFixer): unknown => {
    const original = context.sourceCode.getText(node)
    const functionName = (node as { id?: { name: string } }).id?.name
    if (!functionName) return null
    const newText = original.replace(
      new RegExp(`(async\\s+function\\s+)${escapeRegExp(functionName)}(\\s*\\()`),
      `$1${functionName}${suffix}$2`
    )
    return fixer.replaceText(node, newText)
  }
}

/**
 * Creates a fix function that adds const assertion to a node.
 * @param context - The lint context
 * @param node - The AST node to add const assertion to
 * @returns A fix function that adds 'as const' to the node
 */
export function createConstAssertionFix(
  context: LintContext,
  node: DenoASTNode
): (fixer: LintFixer) => unknown {
  return (fixer: LintFixer): unknown => {
    const sourceText = context.sourceCode.getText(node)
    return fixer.replaceText(node, `${sourceText} as const`)
  }
}

/**
 * Creates a fix that refactors nested conditions to early returns.
 * @param context - The lint context for accessing source code
 * @param node - The if statement node to refactor
 * @returns A fix function
 */
export function createEarlyReturnFix(
  context: LintContext,
  node: DenoASTNode
): (fixer: LintFixer) => unknown {
  return (fixer: LintFixer): unknown => {
    if (!isIfStatement(node)) {
      return null
    }
    const ifStatement = node as IfStatementNode
    const conditionText = context.sourceCode.getText(ifStatement.test)
    const consequentText = context.sourceCode.getText(ifStatement.consequent)
    const negatedCondition = negateCondition(conditionText)
    let consequentContent = consequentText
    if (consequentText.startsWith('{') && consequentText.endsWith('}')) {
      const innerContent = consequentText.slice(1, -1).trim()
      const lines = innerContent.split('\n')
      const cleanedLines = lines
        .map((line) => {
          if (line.startsWith('  ')) {
            return line.slice(2)
          }
          return line
        })
        .filter((line) => line.trim() !== '')
      consequentContent = cleanedLines.join('\n')
    }
    const earlyReturnText = `if (${negatedCondition}) {\n  return\n}\n\n${consequentContent}`
    if (ifStatement.alternate) {
      const alternateText = context.sourceCode.getText(ifStatement.alternate)
      const elseEarlyReturnText =
        `if (${negatedCondition}) {\n  return\n}\n\n${consequentContent}\n\n${alternateText}`
      return fixer.replaceText(ifStatement, elseEarlyReturnText)
    }
    return fixer.replaceText(ifStatement, earlyReturnText)
  }
}

/**
 * Negates a condition properly, handling complex expressions.
 * @param condition - The condition text to negate
 * @returns The negated condition
 */
function negateCondition(condition: string): string {
  const trimmed = condition.trim()
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(trimmed)) {
    return `!${trimmed}`
  }
  return `!(${trimmed})`
}

/**
 * Creates a fix that converts logical AND to optional chaining.
 * @param node - The logical expression node
 * @param convertedText - The converted text
 * @returns A fix function
 */
export function createOptionalChainingFix(
  node: DenoASTNode,
  convertedText: string
): (fixer: LintFixer) => unknown {
  return (fixer: LintFixer): unknown => {
    return fixer.replaceText(node, convertedText)
  }
}

/**
 * Creates a fix that replaces an operator in a logical expression.
 * @param context - The lint context
 * @param node - The logical expression node
 * @param oldOperator - The operator to replace
 * @param newOperator - The new operator
 * @returns A fix function
 */
export function createReplaceOperatorFix(
  context: LintContext,
  node: DenoASTNode,
  oldOperator: string,
  newOperator: string
): (fixer: LintFixer) => unknown {
  return (fixer: LintFixer): unknown => {
    const original = context.sourceCode.getText(node)
    const newText = original.replace(oldOperator, newOperator)
    return fixer.replaceText(node, newText)
  }
}

/**
 * Creates a fix that wraps an argument in a new Error constructor.
 * @param context - The lint context
 * @param node - The call expression node
 * @param argumentIndex - The index of the argument to wrap
 * @returns A fix function
 */
export function createWrapInErrorFix(
  context: LintContext,
  node: DenoASTNode,
  argumentIndex = 0
): (fixer: LintFixer) => unknown {
  return (fixer: LintFixer): unknown => {
    const callNode = node as CallExpressionNode
    if (!callNode.arguments || !callNode.arguments[argumentIndex]) {
      return null
    }
    const arg = callNode.arguments[argumentIndex]
    const argText = context.sourceCode.getText(arg)
    const newText = `new Error(${argText})`
    return fixer.replaceText(arg, newText)
  }
}
