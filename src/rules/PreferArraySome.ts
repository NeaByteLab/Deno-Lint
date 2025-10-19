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
 * Checks if a for loop can be replaced with Array.some().
 * @param node - The for loop node
 * @param _context - The lint context for accessing source code
 * @returns True if the loop can be replaced, false otherwise
 */
function canReplaceWithArraySome(node: DenoASTNode, _context: LintContext): boolean {
  if (!isForStatement(node)) {
    return false
  }
  const forNode = node as ForStatementNode
  const body = forNode.body
  return containsReturnTrue(body)
}

/**
 * Creates a fix that replaces for loops with Array.some().
 * @param context - The lint context
 * @param node - The for loop node
 * @returns A fix function
 */
function createArraySomeFix(
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
            containsReturnTrue(ifNode.consequent) ||
            (ifNode.alternate && containsReturnTrue(ifNode.alternate))
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
        callbackBody = normalizedCondition
      }
    }
    const paramName = arrayName.endsWith('s') ? arrayName.slice(0, -1) : 'item'
    const arraySomeCall = `${arrayName}.some(${paramName} => ${callbackBody})`
    return fixer.replaceText(node, arraySomeCall)
  }
}

/**
 * Recursively checks if a statement contains a return true.
 * @param stmt - The statement to check
 * @returns True if the statement contains return true, false otherwise
 */
function containsReturnTrue(stmt: DenoASTNode): boolean {
  if (isReturnStatement(stmt)) {
    const returnArg = stmt.argument
    if (returnArg && isLiteral(returnArg) && returnArg.value === true) {
      return true
    }
  }
  if (isIfStatement(stmt)) {
    const ifStmt = stmt as IfStatementNode
    if (containsReturnTrue(ifStmt.consequent)) {
      return true
    }
    if (ifStmt.alternate && containsReturnTrue(ifStmt.alternate)) {
      return true
    }
  }
  if (isBlockStatement(stmt)) {
    const blockStmt = stmt as BlockStatementNode
    const statements = blockStmt.body || []
    return statements.some((s: DenoASTNode) => containsReturnTrue(s))
  }
  return false
}

/**
 * Lint rule for preferring Array.some() over manual for loops.
 */
export const preferArraySomeRule = {
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
        if (canReplaceWithArraySome(node, context)) {
          context.report({
            node,
            message: 'Prefer Array.some() over manual for loops that return true',
            fix: createArraySomeFix(context, node)
          })
        }
      }
    }
  }
}
