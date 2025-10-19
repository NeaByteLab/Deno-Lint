import type {
  BlockStatementNode,
  DenoASTNode,
  ForStatementNode,
  IfStatementNode,
  LintContext,
  LintFixer
} from '@interfaces/index.ts'
import {
  isBinaryExpression,
  isBlockStatement,
  isForStatement,
  isIdentifier,
  isIfStatement,
  isLiteral,
  isMemberExpression,
  isReturnStatement,
  isVariableDeclaration
} from '@utils/index.ts'

/**
 * Checks if a for loop can be replaced with Array.every().
 * @param node - The for loop node
 * @returns True if the loop can be replaced, false otherwise
 */
function canReplaceWithArrayEvery(node: DenoASTNode): boolean {
  if (!isForStatement(node)) {
    return false
  }
  const forNode = node as ForStatementNode
  const body = forNode.body
  return containsReturnFalse(body)
}

/**
 * Creates a fix that replaces for loops with Array.every().
 * @param context - The lint context
 * @param node - The for loop node
 * @returns A fix function
 */
function createArrayEveryFix(
  context: LintContext,
  node: DenoASTNode
): (fixer: LintFixer) => unknown {
  return (fixer: LintFixer): unknown => {
    const forNode = node as ForStatementNode
    const init = forNode.init
    const test = forNode.test
    const body = forNode.body
    let arrayName = 'arr'
    let itemName = 'item'
    if (test && isBinaryExpression(test)) {
      if (test.right && isMemberExpression(test.right)) {
        const rightText = context.sourceCode.getText(test.right)
        if (rightText.includes('.length')) {
          arrayName = rightText.split('.')[0] || 'arr'
        }
      }
    }
    if (init && isVariableDeclaration(init)) {
      const declarations = init.declarations || []
      if (declarations.length > 0) {
        const declarator = declarations[0]
        if (declarator && declarator.id && isIdentifier(declarator.id)) {
          itemName = declarator.id.name
        }
      }
    }
    let callbackBody = 'item'
    if (isBlockStatement(body)) {
      const statements = body.body || []
      const ifStmt = statements.find((stmt) => {
        if (isIfStatement(stmt)) {
          const ifNode = stmt as IfStatementNode
          return (
            containsReturnFalse(ifNode.consequent) ||
            (ifNode.alternate && containsReturnFalse(ifNode.alternate))
          )
        }
        return false
      }) as IfStatementNode
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
        callbackBody = `!(${normalizedCondition})`
      }
    }
    const paramName = arrayName.endsWith('s') ? arrayName.slice(0, -1) : 'item'
    const arrayEveryCall = `${arrayName}.every(${paramName} => ${callbackBody})`
    return fixer.replaceText(node, arrayEveryCall)
  }
}

/**
 * Recursively checks if a statement contains a return false.
 * @param stmt - The statement to check
 * @returns True if the statement contains return false, false otherwise
 */
function containsReturnFalse(stmt: DenoASTNode): boolean {
  if (isReturnStatement(stmt)) {
    const returnArg = stmt.argument
    if (returnArg && isLiteral(returnArg) && returnArg.value === false) {
      return true
    }
  }
  if (isIfStatement(stmt)) {
    const ifStmt = stmt as IfStatementNode
    if (containsReturnFalse(ifStmt.consequent)) {
      return true
    }
    if (ifStmt.alternate && containsReturnFalse(ifStmt.alternate)) {
      return true
    }
  }
  if (isBlockStatement(stmt)) {
    const blockStmt = stmt as BlockStatementNode
    const statements = blockStmt.body || []
    return statements.some((s: DenoASTNode) => containsReturnFalse(s))
  }
  return false
}

/**
 * Lint rule for preferring Array.every() over manual for loops.
 */
export const preferArrayEveryRule = {
  /**
   * Creates the lint rule implementation.
   * @param context - The Deno lint context for reporting issues and fixes
   * @returns Object containing visitor functions for AST node types
   */
  create(context: LintContext): Record<string, (node: DenoASTNode) => void> {
    return {
      /**
       * Visitor function for for statements.
       * @param node - The AST node representing a for statement
       */
      ForStatement(node: DenoASTNode): void {
        if (!isForStatement(node)) {
          return
        }
        if (canReplaceWithArrayEvery(node)) {
          context.report({
            node,
            message: 'Prefer Array.every() over manual for loops that return false',
            fix: createArrayEveryFix(context, node)
          })
        }
      }
    }
  }
}
