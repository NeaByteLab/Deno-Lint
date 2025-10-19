import type {
  ASTNode,
  CallExpressionNode,
  DenoASTNode,
  LintContext,
  LintFixer,
  LogicalExpressionNode
} from '@app/types.ts'
import { isCallExpression, isLogicalExpression, isMemberExpression } from '@shared/expression.ts'

/** Constants for method call and property access */
const isMethodCall = true
const isPropertyAccess = false

/**
 * Checks if a call expression can be converted to optional chaining.
 * @param callNode - The call expression node
 * @param leftText - The left side text to match
 * @param context - The lint context for accessing source code
 * @returns True if the call can be converted
 */
function canConvertCallExpression(
  callNode: CallExpressionNode,
  leftText: string,
  context: LintContext
): boolean {
  const callee = callNode.callee
  if (isMemberExpression(callee) && !(callee as DenoASTNode).optional) {
    const rightObjectText = context.sourceCode.getText(callee.object)
    if (leftText === rightObjectText) {
      return true
    }
    if (isCallExpression(callee.object)) {
      return canConvertCallExpression(callee.object, leftText, context)
    }
    return false
  }
  if (isCallExpression(callee)) {
    return canConvertCallExpression(callee, leftText, context)
  }
  return false
}

/**
 * Checks if a logical AND expression can be converted to optional chaining.
 * @param node - The logical expression node
 * @param context - The lint context for accessing source code
 * @returns True if the expression can be converted to optional chaining
 */
function canConvertToOptionalChain(node: LogicalExpressionNode, context: LintContext): boolean {
  const leftText = context.sourceCode.getText(node.left)
  if (isMemberExpression(node.right) && !(node.right as DenoASTNode).optional) {
    const rightObjectText = context.sourceCode.getText(node.right.object)
    if (leftText === rightObjectText) {
      return true
    }
    if (isCallExpression(node.right.object)) {
      return canConvertCallExpression(node.right.object, leftText, context)
    }
    return false
  }
  if (isCallExpression(node.right)) {
    return canConvertCallExpression(node.right, leftText, context)
  }
  return false
}

/**
 * Converts a call expression to optional chaining.
 * @param callNode - The call expression node
 * @param leftText - The left side text to match
 * @param context - The lint context for accessing source code
 * @returns The converted right side as a string
 */
function convertCallExpression(
  callNode: CallExpressionNode,
  leftText: string,
  context: LintContext
): string {
  const callee = callNode.callee
  if (isMemberExpression(callee) && !(callee as DenoASTNode).optional) {
    const rightObjectText = context.sourceCode.getText(callee.object)
    if (leftText === rightObjectText) {
      const rightText = context.sourceCode.getText(callNode)
      const isComputed = isComputedProperty(callee as DenoASTNode)
      return convertToOptionalChaining(rightText, isComputed)
    }
    if (isCallExpression(callee.object)) {
      const convertedObject = convertCallExpression(callee.object, leftText, context)
      if (convertedObject !== context.sourceCode.getText(callee.object)) {
        const propertyText = context.sourceCode.getText(callee.property)
        const isComputed = isComputedProperty(callee as DenoASTNode)
        return reconstructMemberExpression(convertedObject, propertyText, isComputed, isMethodCall)
      }
    }
  }
  if (isCallExpression(callee)) {
    return convertCallExpression(callee, leftText, context)
  }
  return context.sourceCode.getText(callNode)
}

/**
 * Converts a logical AND expression to optional chaining.
 * @param node - The logical expression node
 * @param context - The lint context for accessing source code
 * @returns The converted code as a string
 */
function convertToOptionalChain(node: LogicalExpressionNode, context: LintContext): string {
  const leftText = context.sourceCode.getText(node.left)
  const rightText = context.sourceCode.getText(node.right)
  if (isMemberExpression(node.right)) {
    const rightObjectText = context.sourceCode.getText(node.right.object)
    if (leftText === rightObjectText) {
      const isComputed = isComputedProperty(node.right as DenoASTNode)
      const convertedRight = convertToOptionalChaining(rightText, isComputed)
      return `${leftText}${convertedRight}`
    }
    if (isCallExpression(node.right.object)) {
      const convertedObject = convertCallExpression(node.right.object, leftText, context)
      if (convertedObject !== rightObjectText) {
        const propertyText = context.sourceCode.getText(node.right.property)
        const isComputed = isComputedProperty(node.right as DenoASTNode)
        return reconstructMemberExpression(
          convertedObject,
          propertyText,
          isComputed,
          isPropertyAccess
        )
      }
    }
    const isComputed = isComputedProperty(node.right as DenoASTNode)
    const convertedRight = convertToOptionalChaining(rightText, isComputed)
    return `${leftText}${convertedRight}`
  }
  if (isCallExpression(node.right)) {
    const convertedRight = convertCallExpression(node.right, leftText, context)
    return `${leftText}${convertedRight}`
  }
  return rightText
}

/**
 * Converts a member expression to optional chaining by replacing the first dot or bracket.
 * @param text - The text to convert
 * @param isComputed - Whether this is computed property access
 * @returns The converted text
 */
function convertToOptionalChaining(text: string, isComputed: boolean): string {
  if (isComputed) {
    return text.replace(/^[^[]*\[/, '?.[')
  } else {
    return text.replace(/^[^.]*\./, '?.')
  }
}

/**
 * Checks if a member expression uses computed property access.
 * @param node - The member expression node
 * @returns True if the property access is computed
 */
function isComputedProperty(node: DenoASTNode): boolean {
  return node.computed === true
}

/**
 * Lint rule for enforcing the use of optional chaining (?.) over logical AND (&&) for property access.
 */
export const preferOptionalChainRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: LintContext): Record<string, (node: ASTNode) => void> {
    return {
      /**
       * Visitor function for logical expressions.
       * @param node - The AST node representing a logical expression
       */
      LogicalExpression(node: ASTNode): void {
        if (!isLogicalExpression(node)) {
          return
        }
        if (node.operator === '&&') {
          if (canConvertToOptionalChain(node, context)) {
            context.report({
              node,
              message: 'Prefer optional chaining (?.) over logical AND (&&) for property access.',
              fix(fixer: LintFixer): unknown {
                return fixer.replaceText(node, convertToOptionalChain(node, context))
              }
            })
          }
        }
      }
    }
  }
}

/**
 * Reconstructs a member expression with the given object and property.
 * @param objectText - The text of the object
 * @param propertyText - The text of the property
 * @param isComputed - Whether this is computed property access
 * @param isCall - Whether this is a method call
 * @returns The reconstructed member expression
 */
function reconstructMemberExpression(
  objectText: string,
  propertyText: string,
  isComputed: boolean,
  isCall = false
): string {
  const callSuffix = isCall ? '()' : ''
  if (isComputed) {
    return `${objectText}[${propertyText}]${callSuffix}`
  } else {
    return `${objectText}.${propertyText}${callSuffix}`
  }
}
