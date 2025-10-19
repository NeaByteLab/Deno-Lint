import type {
  CallExpressionNode,
  DenoASTNode,
  LintContext,
  LogicalExpressionNode
} from '@interfaces/index.ts'
import { isCallExpression, isMemberExpression } from '@utils/index.ts'

/**
 * Converts a call expression to optional chaining.
 * @param callNode - The call expression node
 * @param leftText - The left side text to match
 * @param context - The lint context for accessing source code
 * @returns The converted right side as a string
 */
export function convertCallExpression(
  callNode: CallExpressionNode,
  leftText: string,
  context: LintContext
): string {
  const callee = callNode.callee
  if (isMemberExpression(callee) && !(callee as DenoASTNode).optional) {
    const rightObjectText = context.sourceCode.getText(callee.object)
    if (leftText === rightObjectText) {
      const rightText = context.sourceCode.getText(callNode)
      const isComputed = (callee as DenoASTNode).computed === true
      return convertToOptionalChaining(rightText, isComputed)
    }
    if (isCallExpression(callee.object)) {
      const convertedObject = convertCallExpression(callee.object, leftText, context)
      if (convertedObject !== context.sourceCode.getText(callee.object)) {
        const propertyText = context.sourceCode.getText(callee.property)
        const isComputed = (callee as DenoASTNode).computed === true
        const IS_METHOD_CALL = true
        return reconstructMemberExpression(
          convertedObject,
          propertyText,
          isComputed,
          IS_METHOD_CALL
        )
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
export function convertToOptionalChain(node: DenoASTNode, context: LintContext): string {
  const logicalNode = node as LogicalExpressionNode
  const leftText = context.sourceCode.getText(logicalNode.left)
  const rightText = context.sourceCode.getText(logicalNode.right)
  if (isMemberExpression(logicalNode.right)) {
    const rightObjectText = context.sourceCode.getText(logicalNode.right.object)
    if (leftText === rightObjectText) {
      const isComputed = logicalNode.right.computed === true
      const convertedRight = convertToOptionalChaining(rightText, isComputed)
      return `${leftText}${convertedRight}`
    }
    if (isCallExpression(logicalNode.right.object)) {
      const convertedObject = convertCallExpression(logicalNode.right.object, leftText, context)
      if (convertedObject !== rightObjectText) {
        const propertyText = context.sourceCode.getText(logicalNode.right.property)
        const isComputed = logicalNode.right.computed === true
        const IS_PROPERTY_ACCESS = false
        return reconstructMemberExpression(
          convertedObject,
          propertyText,
          isComputed,
          IS_PROPERTY_ACCESS
        )
      }
    }
    const isComputed = logicalNode.right.computed === true
    const convertedRight = convertToOptionalChaining(rightText, isComputed)
    return `${leftText}${convertedRight}`
  }
  if (isCallExpression(logicalNode.right)) {
    const convertedRight = convertCallExpression(logicalNode.right, leftText, context)
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
export function convertToOptionalChaining(text: string, isComputed: boolean): string {
  if (isComputed) {
    return text.replace(/^[^[]*\[/, '?.[')
  } else {
    return text.replace(/^[^.]*\./, '?.')
  }
}

/**
 * Creates a function signature with return type.
 * @param signature - The function signature parts
 * @param returnType - The return type to add
 * @returns The complete function signature
 */
export function createFunctionSignature(
  signature: {
    functionName: string
    params: string
    body: string
    asyncKeyword: string
  },
  returnType: string
): string {
  return `${signature.asyncKeyword}function ${signature.functionName}${signature.params}: ${returnType} ${signature.body}`
}

/**
 * Creates a regex pattern for matching a word boundary.
 * @param word - The word to match
 * @returns The regex pattern
 */
export function createWordBoundaryPattern(word: string): RegExp {
  return new RegExp(`\\b${escapeRegExp(word)}\\b`)
}

/**
 * Escapes special regex characters in a string.
 * @param string - The string to escape
 * @returns The escaped string
 */
export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Extracts function signature parts from source code.
 * @param node - The function node
 * @param context - The lint context for accessing source code
 * @returns Object containing function signature parts
 */
export function extractFunctionSignature(
  node: DenoASTNode,
  context: LintContext
): {
  functionName: string
  params: string
  body: string
  asyncKeyword: string
} {
  const original = context.sourceCode.getText(node)
  const functionName = (node as { id?: { name: string } }).id?.name || 'function'
  const params = original.match(/\([^)]*\)/)?.[0] || '()'
  const body = original.substring(original.indexOf('{'))
  const asyncKeyword = (node as { async?: boolean }).async ? 'async ' : ''
  return {
    functionName,
    params,
    body,
    asyncKeyword
  }
}

/**
 * Infers the return type of a function based on its body content.
 * @param node - The function node
 * @param context - The lint context for accessing source code
 * @returns The inferred return type
 */
export function inferReturnType(node: DenoASTNode, context: LintContext): string {
  const body = context.sourceCode.getText(node)
  if (body.includes('return')) {
    if (/\breturn\s+(true|false)\b/.test(body)) {
      return 'boolean'
    } else if (/\breturn\s+["'`]/.test(body)) {
      return 'string'
    } else if (/\breturn\s+\d+/.test(body)) {
      return 'number'
    } else if (/\breturn\s+\{/.test(body)) {
      return 'object'
    } else if (/\breturn\s+\[/.test(body)) {
      return 'any[]'
    } else {
      return 'any'
    }
  }
  return 'void'
}

/**
 * Reconstructs a member expression with the given object and property.
 * @param objectText - The text of the object
 * @param propertyText - The text of the property
 * @param isComputed - Whether this is computed property access
 * @param isCall - Whether this is a method call
 * @returns The reconstructed member expression
 */
export function reconstructMemberExpression(
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
