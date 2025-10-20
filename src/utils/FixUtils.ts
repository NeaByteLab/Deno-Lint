import type * as types from '@interfaces/index.ts'
import * as utils from '@utils/index.ts'

/**
 * Creates a fix that adds type annotation to default parameters.
 * @param context - The lint context
 * @param node - The function node
 * @returns A fix function
 */
export function createAddDefaultTypeFix(
  context: types.LintContext,
  node: types.DenoASTNode
): (fixer: types.LintFixer) => unknown {
  return (fixer: types.LintFixer): unknown => {
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
  context: types.LintContext,
  node: types.DenoASTNode
): (fixer: types.LintFixer) => unknown {
  return (fixer: types.LintFixer): unknown => {
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
  context: types.LintContext,
  node: types.DenoASTNode,
  paramName: string,
  typeAnnotation = 'any'
): (fixer: types.LintFixer) => unknown {
  return (fixer: types.LintFixer): unknown => {
    const original = context.sourceCode.getText(node)
    const newText = original.replace(
      utils.createWordBoundaryPattern(paramName),
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
  context: types.LintContext,
  node: types.DenoASTNode
): (fixer: types.LintFixer) => unknown {
  return (fixer: types.LintFixer): unknown => {
    const original = context.sourceCode.getText(node)
    const newText = original.replace(/\.\.\.(\w+)/, '...$1: any[]')
    return fixer.replaceText(node, newText)
  }
}

/**
 * Creates a fix that adds inferred return type annotation to a function.
 * @param context - The lint context
 * @param node - The function node
 * @returns A fix function
 */
export function createAddInferredReturnTypeFix(
  context: types.LintContext,
  node: types.DenoASTNode
): (fixer: types.LintFixer) => unknown {
  return (fixer: types.LintFixer): unknown => {
    const returnType = utils.inferReturnType(node, context)
    return createAddReturnTypeFix(context, node, returnType)(fixer)
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
  context: types.LintContext,
  node: types.DenoASTNode,
  returnType: string
): (fixer: types.LintFixer) => unknown {
  return (fixer: types.LintFixer): unknown => {
    const signature = utils.extractFunctionSignature(node, context)
    const newText = utils.createFunctionSignature(signature, returnType)
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
  context: types.LintContext,
  node: types.DenoASTNode,
  suffix: string
): (fixer: types.LintFixer) => unknown {
  return (fixer: types.LintFixer): unknown => {
    const original = context.sourceCode.getText(node)
    const functionName = utils.getFunctionName(node)
    if (!functionName) return null
    const newText = original.replace(
      new RegExp(`(async\\s+function\\s+)${utils.escapeRegExp(functionName)}(\\s*\\()`),
      `$1${functionName}${suffix}$2`
    )
    return fixer.replaceText(node, newText)
  }
}

/**
 * Creates a fix that replaces for loops with array methods.
 * @param context - The lint context
 * @param node - The for loop node
 * @param method - The array method to use ('every' or 'some')
 * @returns A fix function
 */
export function createArrayMethodFix(
  context: types.LintContext,
  node: types.DenoASTNode,
  method: 'every' | 'some'
): (fixer: types.LintFixer) => unknown {
  return (fixer: types.LintFixer): unknown => {
    const forNode = node as types.ForStatementNode
    const { arrayName, itemName } = extractForLoopVariables(context, forNode)
    const body = forNode.body
    const expectedValue = method === 'every' ? false : true
    let callbackBody = 'item'
    if (utils.isBlockStatement(body)) {
      const statements = body.body || []
      const ifStmt = statements.find((stmt) => {
        if (utils.isIfStatement(stmt)) {
          const ifNode = stmt as types.IfStatementNode
          const containsReturn = utils.containsReturnValue(ifNode.consequent, expectedValue) ||
            (ifNode.alternate && utils.containsReturnValue(ifNode.alternate, expectedValue))
          return containsReturn
        }
        return false
      }) as types.IfStatementNode
      if (ifStmt) {
        const conditionText = context.sourceCode.getText(ifStmt.test)
        const paramName = arrayName.endsWith('s') ? arrayName.slice(0, -1) : 'item'
        let normalizedCondition = conditionText.replace(
          new RegExp(`${arrayName}\\[${itemName}\\]`, 'g'),
          paramName
        )
        normalizedCondition = normalizedCondition.replace(
          new RegExp(`\\b${itemName}\\b`, 'g'),
          paramName
        )
        callbackBody = method === 'every' ? `!(${normalizedCondition})` : normalizedCondition
      }
    }
    const paramName = arrayName.endsWith('s') ? arrayName.slice(0, -1) : 'item'
    const arrayMethodCall = `${arrayName}.${method}(${paramName} => ${callbackBody})`
    return fixer.replaceText(node, arrayMethodCall)
  }
}

/**
 * Creates a fix function that adds const assertion to a node.
 * @param context - The lint context
 * @param node - The AST node to add const assertion to
 * @returns A fix function that adds 'as const' to the node
 */
export function createConstAssertionFix(
  context: types.LintContext,
  node: types.DenoASTNode
): (fixer: types.LintFixer) => unknown {
  return (fixer: types.LintFixer): unknown => {
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
  context: types.LintContext,
  node: types.DenoASTNode
): (fixer: types.LintFixer) => unknown {
  return (fixer: types.LintFixer): unknown => {
    if (!utils.isIfStatement(node)) {
      return null
    }
    const ifStatement = node as types.IfStatementNode
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
 * Creates a fix that converts logical AND to optional chaining.
 * @param node - The logical expression node
 * @param convertedText - The converted text
 * @returns A fix function
 */
export function createOptionalChainingFix(
  node: types.DenoASTNode,
  convertedText: string
): (fixer: types.LintFixer) => unknown {
  return (fixer: types.LintFixer): unknown => {
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
  context: types.LintContext,
  node: types.DenoASTNode,
  oldOperator: string,
  newOperator: string
): (fixer: types.LintFixer) => unknown {
  return (fixer: types.LintFixer): unknown => {
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
  context: types.LintContext,
  node: types.DenoASTNode,
  argumentIndex = 0
): (fixer: types.LintFixer) => unknown {
  return (fixer: types.LintFixer): unknown => {
    const callNode = node as types.CallExpressionNode
    if (!callNode.arguments || !callNode.arguments[argumentIndex]) {
      return null
    }
    const arg = callNode.arguments[argumentIndex]
    const argText = context.sourceCode.getText(arg)
    const newText = `new Error(${argText})`
    return fixer.replaceText(arg, newText)
  }
}

/**
 * Extracts array and item names from a for loop.
 * @param context - The lint context
 * @param forNode - The for statement node
 * @returns Object containing arrayName and itemName
 */
export function extractForLoopVariables(
  context: types.LintContext,
  forNode: types.ForStatementNode
): { arrayName: string; itemName: string } {
  let arrayName = 'arr'
  let itemName = 'item'
  const test = forNode.test
  if (test && utils.isBinaryExpression(test)) {
    if (test.right && utils.isMemberExpression(test.right)) {
      const rightText = context.sourceCode.getText(test.right)
      if (rightText.includes('.length')) {
        arrayName = rightText.split('.')[0] || 'arr'
      }
    }
  }
  const init = forNode.init
  if (init && utils.isVariableDeclaration(init)) {
    const declarations = init.declarations || []
    if (declarations.length > 0) {
      const declarator = declarations[0]
      if (declarator && declarator.id && utils.isIdentifier(declarator.id)) {
        itemName = declarator.id.name
      }
    }
  }
  return { arrayName, itemName }
}

/**
 * Creates a fix that converts indexOf() !== -1 to includes().
 * @param context - The lint context
 * @param node - The binary expression node
 * @returns A fix function
 */
export function createArrayIncludesFix(
  context: types.LintContext,
  node: types.DenoASTNode
): (fixer: types.LintFixer) => unknown {
  return (fixer: types.LintFixer): unknown => {
    if (!utils.isBinaryExpression(node)) {
      return null
    }
    const callNode = node.left
    if (!utils.isCallExpression(callNode)) {
      return null
    }
    const callee = callNode.callee
    if (!utils.isMemberExpression(callee)) {
      return null
    }
    const memberExpr = callee as types.MemberExpressionNode
    const arrayText = context.sourceCode.getText(memberExpr.object)
    if (!callNode.arguments || callNode.arguments.length === 0) {
      return null
    }
    const firstArgument = callNode.arguments[0]
    if (!firstArgument) {
      return null
    }
    const searchItemText = context.sourceCode.getText(firstArgument)
    const includesCall = `${arrayText}.includes(${searchItemText})`
    return fixer.replaceText(node, includesCall)
  }
}

/**
 * Creates a fix that converts substring() comparisons to startsWith() or endsWith().
 * @param context - The lint context
 * @param node - The binary expression node
 * @param fixType - The type of fix ('startsWith' or 'endsWith')
 * @returns A fix function
 */
export function createStringStartsEndsWithFix(
  context: types.LintContext,
  node: types.DenoASTNode,
  fixType: 'startsWith' | 'endsWith'
): (fixer: types.LintFixer) => unknown {
  return (fixer: types.LintFixer): unknown => {
    if (!utils.isBinaryExpression(node)) {
      return null
    }
    const callNode = node.left
    if (!utils.isCallExpression(callNode)) {
      return null
    }
    const callee = callNode.callee
    if (!utils.isMemberExpression(callee)) {
      return null
    }
    const memberExpr = callee as types.MemberExpressionNode
    const stringText = context.sourceCode.getText(memberExpr.object)
    if (!callNode.arguments || callNode.arguments.length === 0) {
      return null
    }
    const rightSide = node.right
    if (!utils.isLiteral(rightSide)) {
      return null
    }
    const stringLiteral = context.sourceCode.getText(rightSide)
    const methodCall = `${stringText}.${fixType}(${stringLiteral})`
    return fixer.replaceText(node, methodCall)
  }
}

/**
 * Creates a fix that converts concat patterns to flat().
 * @param context - The lint context
 * @param node - The call expression node
 * @returns A fix function
 */
export function createArrayFlatFix(
  context: types.LintContext,
  node: types.DenoASTNode
): (fixer: types.LintFixer) => unknown {
  return (fixer: types.LintFixer): unknown => {
    if (!utils.isCallExpression(node)) {
      return null
    }
    const callNode = node as types.CallExpressionNode
    if (utils.isConcatSpreadPattern(node)) {
      if (!callNode.arguments || callNode.arguments.length !== 1) {
        return null
      }
      const spreadArg = callNode.arguments[0]
      if (!spreadArg || !utils.isSpreadElement(spreadArg)) {
        return null
      }
      const arrayText = context.sourceCode.getText(spreadArg.argument)
      const flatCall = `${arrayText}.flat()`
      return fixer.replaceText(node, flatCall)
    }
    if (utils.isConcatApplyCall(node)) {
      if (!callNode.arguments || callNode.arguments.length !== 2) {
        return null
      }
      const arrayArg = callNode.arguments[1]
      if (!arrayArg) {
        return null
      }
      const arrayText = context.sourceCode.getText(arrayArg)
      const flatCall = `${arrayText}.flat()`
      return fixer.replaceText(node, flatCall)
    }
    return null
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
