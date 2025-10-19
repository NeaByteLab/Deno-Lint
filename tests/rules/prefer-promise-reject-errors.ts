import { runnerTest, verifyAutoFix } from '@tests/index.ts'

const rulesId = 'deno-lint/prefer-promise-reject-errors'

Deno.test('array rejection (should trigger)', () =>
  runnerTest(rulesId, 'Promise.reject([1, 2, 3])', 1))

Deno.test('AssertionError rejection (should not trigger)', () =>
  runnerTest(rulesId, 'Promise.reject(new AssertionError("assertion error"))', 0))

Deno.test('boolean rejection (should trigger)', () =>
  runnerTest(rulesId, 'Promise.reject(false)', 1))

Deno.test('chained promise (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    Promise.resolve()
      .then(() => Promise.reject("error"))
  `,
    1
  ))

Deno.test('complex expression (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    const result = someCondition ? Promise.reject("error") : Promise.resolve()
  `,
    1
  ))

Deno.test('custom error class rejection (should not trigger)', () =>
  runnerTest(rulesId, 'Promise.reject(new CustomError("custom"))', 0))

Deno.test('Date object rejection (should trigger)', () =>
  runnerTest(rulesId, 'Promise.reject(new Date())', 1))

Deno.test('empty array rejection (should trigger)', () =>
  runnerTest(rulesId, 'Promise.reject([])', 1))

Deno.test('empty object rejection (should trigger)', () =>
  runnerTest(rulesId, 'Promise.reject({})', 1))

Deno.test('empty string rejection (should trigger)', () =>
  runnerTest(rulesId, 'Promise.reject("")', 1))

Deno.test('Error object rejection (should not trigger)', () =>
  runnerTest(rulesId, 'Promise.reject(new Error("error"))', 0))

Deno.test('Error with additional properties (should not trigger)', () =>
  runnerTest(rulesId, 'Promise.reject(new Error("error").withCode(500))', 0))

Deno.test('Error with custom properties (should not trigger)', () =>
  runnerTest(rulesId, 'Promise.reject(new Error("error").withCode(500))', 0))

Deno.test('EvalError rejection (should not trigger)', () =>
  runnerTest(rulesId, 'Promise.reject(new EvalError("eval error"))', 0))

Deno.test('function call rejection (should trigger)', () =>
  runnerTest(rulesId, 'Promise.reject(getMessage())', 1))

Deno.test('in array (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    const arr = [Promise.reject("error")]
  `,
    1
  ))

Deno.test('in arrow function (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    const test = () => Promise.reject("error")
  `,
    1
  ))

Deno.test('in async function (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    async function test() {
      return Promise.reject("error")
    }
  `,
    1
  ))

Deno.test('in class method (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    class Test {
      method() {
        return Promise.reject("error")
      }
    }
  `,
    1
  ))

Deno.test('in conditional (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (true) {
      Promise.reject("error")
    }
  `,
    1
  ))

Deno.test('in logical expression (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    const result = true && Promise.reject("error")
  `,
    1
  ))

Deno.test('in object property (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    const obj = {
      error: Promise.reject("error")
    }
  `,
    1
  ))

Deno.test('in ternary (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    const result = true ? Promise.reject("error") : null
  `,
    1
  ))

Deno.test('in try-catch (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    try {
      Promise.reject("error")
    } catch (e) {
      console.error(e)
    }
  `,
    1
  ))

Deno.test('Map object rejection (should trigger)', () =>
  runnerTest(rulesId, 'Promise.reject(new Map())', 1))

Deno.test('multiple arguments (should check first)', () =>
  runnerTest(rulesId, 'Promise.reject("error", new Error("ignored"))', 1))

Deno.test('no arguments (should not trigger)', () => runnerTest(rulesId, 'Promise.reject()', 0))

Deno.test('no auto-fix for Error objects', () =>
  runnerTest(rulesId, 'Promise.reject(new Error("error"))', 0))

Deno.test('no auto-fix for custom error objects', () =>
  runnerTest(rulesId, 'Promise.reject(new CustomError("error"))', 0))

Deno.test('no auto-fix for no arguments', () => runnerTest(rulesId, 'Promise.reject()', 0))

Deno.test('no auto-fix for TypeError objects', () =>
  runnerTest(rulesId, 'Promise.reject(new TypeError("error"))', 0))

Deno.test('no auto-fix for variables', () => runnerTest(rulesId, 'Promise.reject(errorVar)', 0))

Deno.test('not Promise.reject (should not trigger)', () =>
  runnerTest(rulesId, 'Promise.resolve("error")', 0))

Deno.test('not Promise.reject (should not trigger)', () =>
  runnerTest(rulesId, 'someOtherFunction("error")', 0))

Deno.test('not Promise.reject (should not trigger)', () =>
  runnerTest(rulesId, 'obj.reject("error")', 0))

Deno.test('null rejection (should trigger)', () => runnerTest(rulesId, 'Promise.reject(null)', 1))

Deno.test('number rejection (should trigger)', () => runnerTest(rulesId, 'Promise.reject(404)', 1))

Deno.test('nested promise (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    Promise.resolve(Promise.reject("error"))
  `,
    1
  ))

Deno.test('object rejection (should trigger)', () =>
  runnerTest(rulesId, 'Promise.reject({ code: 500 })', 1))

Deno.test('Promise object rejection (should trigger)', () =>
  runnerTest(rulesId, 'Promise.reject(Promise.resolve())', 1))

Deno.test('RangeError rejection (should not trigger)', () =>
  runnerTest(rulesId, 'Promise.reject(new RangeError("range error"))', 0))

Deno.test('ReferenceError rejection (should not trigger)', () =>
  runnerTest(rulesId, 'Promise.reject(new ReferenceError("ref error"))', 0))

Deno.test('RegExp object rejection (should trigger)', () =>
  runnerTest(rulesId, 'Promise.reject(new RegExp("test"))', 1))

Deno.test('Set object rejection (should trigger)', () =>
  runnerTest(rulesId, 'Promise.reject(new Set())', 1))

Deno.test('string rejection (should trigger)', () =>
  runnerTest(rulesId, 'Promise.reject("error")', 1))

Deno.test('SyntaxError rejection (should not trigger)', () =>
  runnerTest(rulesId, 'Promise.reject(new SyntaxError("syntax error"))', 0))

Deno.test('SystemError rejection (should not trigger)', () =>
  runnerTest(rulesId, 'Promise.reject(new SystemError("system error"))', 0))

Deno.test('template literal rejection (should trigger)', () =>
  runnerTest(rulesId, 'Promise.reject(`error: ${code}`)', 1))

Deno.test('TypeError rejection (should not trigger)', () =>
  runnerTest(rulesId, 'Promise.reject(new TypeError("type error"))', 0))

Deno.test('undefined rejection (should trigger)', () =>
  runnerTest(rulesId, 'Promise.reject(undefined)', 1))

Deno.test('URIError rejection (should not trigger)', () =>
  runnerTest(rulesId, 'Promise.reject(new URIError("uri error"))', 0))

Deno.test('variable rejection (should not trigger - conservative)', () =>
  runnerTest(rulesId, 'Promise.reject(errorVar)', 0))

Deno.test('zero rejection (should trigger)', () => runnerTest(rulesId, 'Promise.reject(0)', 1))

Deno.test('verify auto-fix for array to Error', () =>
  verifyAutoFix(
    rulesId,
    'Promise.reject([1, 2, 3])',
    'new Error([1, 2, 3])',
    'Array to Error auto-fix test'
  ))

Deno.test('verify auto-fix for boolean to Error', () =>
  verifyAutoFix(
    rulesId,
    'Promise.reject(false)',
    'new Error(false)',
    'Boolean to Error auto-fix test'
  ))

Deno.test('verify auto-fix for complex expression to Error', () =>
  verifyAutoFix(
    rulesId,
    'Promise.reject(condition ? "error1" : "error2")',
    'new Error(condition ? "error1" : "error2")',
    'Complex expression to Error auto-fix test'
  ))

Deno.test('verify auto-fix for function call to Error', () =>
  verifyAutoFix(
    rulesId,
    'Promise.reject(getMessage())',
    'new Error(getMessage())',
    'Function call to Error auto-fix test'
  ))

Deno.test('verify auto-fix for multiple arguments (first only)', () =>
  verifyAutoFix(
    rulesId,
    'Promise.reject("error", new Error("ignored"))',
    'new Error("error")',
    'Multiple arguments auto-fix test'
  ))

Deno.test('verify auto-fix for null to Error', () =>
  verifyAutoFix(rulesId, 'Promise.reject(null)', 'new Error(null)', 'Null to Error auto-fix test'))

Deno.test('verify auto-fix for number to Error', () =>
  verifyAutoFix(rulesId, 'Promise.reject(404)', 'new Error(404)', 'Number to Error auto-fix test'))

Deno.test('verify auto-fix for object to Error', () =>
  verifyAutoFix(
    rulesId,
    'Promise.reject({ code: 500 })',
    'new Error({ code: 500 })',
    'Object to Error auto-fix test'
  ))

Deno.test('verify auto-fix for string to Error', () =>
  verifyAutoFix(
    rulesId,
    'Promise.reject("error")',
    'new Error("error")',
    'String to Error auto-fix test'
  ))

Deno.test('verify auto-fix for template literal to Error', () =>
  verifyAutoFix(
    rulesId,
    'Promise.reject(`error: ${code}`)',
    'new Error(`error: ${code}`)',
    'Template literal to Error auto-fix test'
  ))

Deno.test('verify auto-fix for undefined to Error', () =>
  verifyAutoFix(
    rulesId,
    'Promise.reject(undefined)',
    'new Error(undefined)',
    'Undefined to Error auto-fix test'
  ))

Deno.test('verify auto-fix in arrow function', () =>
  verifyAutoFix(
    rulesId,
    'const test = () => Promise.reject("error")',
    'new Error("error")',
    'Arrow function auto-fix test'
  ))

Deno.test('verify auto-fix in array', () =>
  verifyAutoFix(rulesId, '[Promise.reject("error")]', 'new Error("error")', 'Array auto-fix test'))

Deno.test('verify auto-fix in async function', () =>
  verifyAutoFix(
    rulesId,
    'async function test() { return Promise.reject("error") }',
    'new Error("error")',
    'Async function auto-fix test'
  ))

Deno.test('verify auto-fix in chained promise', () =>
  verifyAutoFix(
    rulesId,
    'Promise.resolve().then(() => Promise.reject("error"))',
    'new Error("error")',
    'Chained promise auto-fix test'
  ))

Deno.test('verify auto-fix in class method', () =>
  verifyAutoFix(
    rulesId,
    'class Test { method() { return Promise.reject("error") } }',
    'new Error("error")',
    'Class method auto-fix test'
  ))

Deno.test('verify auto-fix in complex expression', () =>
  verifyAutoFix(
    rulesId,
    'const result = someCondition ? Promise.reject("error") : Promise.resolve()',
    'new Error("error")',
    'Complex expression auto-fix test'
  ))

Deno.test('verify auto-fix in conditional', () =>
  verifyAutoFix(
    rulesId,
    'if (true) { Promise.reject("error") }',
    'new Error("error")',
    'Conditional auto-fix test'
  ))

Deno.test('verify auto-fix in logical expression', () =>
  verifyAutoFix(
    rulesId,
    'true && Promise.reject("error")',
    'new Error("error")',
    'Logical expression auto-fix test'
  ))

Deno.test('verify auto-fix in nested promise', () =>
  verifyAutoFix(
    rulesId,
    'Promise.resolve(Promise.reject("error"))',
    'new Error("error")',
    'Nested promise auto-fix test'
  ))

Deno.test('verify auto-fix in object property', () =>
  verifyAutoFix(
    rulesId,
    'const obj = { error: Promise.reject("error") }',
    'new Error("error")',
    'Object property auto-fix test'
  ))

Deno.test('verify auto-fix in ternary', () =>
  verifyAutoFix(
    rulesId,
    'true ? Promise.reject("error") : null',
    'new Error("error")',
    'Ternary auto-fix test'
  ))
