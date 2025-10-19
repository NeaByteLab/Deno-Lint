import { runnerTest, verifyAutoFix } from '@tests/index.ts'

const rulesId = 'deno-lint/explicit-parameter-types'

Deno.test('arrow function with destructured typed parameters', () =>
  runnerTest(rulesId, 'const test = ({a, b}: {a: string, b: number}) => a + b', 0))

Deno.test('arrow function with destructured untyped parameters', () =>
  runnerTest(rulesId, 'const test = ({a, b}) => a + b', 1))

Deno.test('arrow function with rest parameters', () =>
  runnerTest(rulesId, 'const test = (...args) => args.length', 1))

Deno.test('arrow function with rest typed parameters', () =>
  runnerTest(rulesId, 'const test = (...args: string[]) => args.length', 0))

Deno.test('arrow function with typed parameter', () =>
  runnerTest(rulesId, 'const test = (param: string) => param', 0))

Deno.test('arrow function with untyped parameter', () =>
  runnerTest(rulesId, 'const test = (param) => param', 1))

Deno.test('arrow function with complex mixed parameters', () =>
  runnerTest(
    rulesId,
    'const test = (a: string, {b, c}, d, ...rest: number[]) => a + b + c + d + rest.length',
    2
  ))

Deno.test('async function with typed parameter', () =>
  runnerTest(rulesId, 'async function test(param: string) { return param }', 0))

Deno.test('async function with untyped parameter', () =>
  runnerTest(rulesId, 'async function test(param) { return param }', 1))

Deno.test('class method with destructured typed parameters', () =>
  runnerTest(
    rulesId,
    `
class Test {
  method({user, settings}: {user: string, settings: object}) { return user }
}
    `,
    0
  ))

Deno.test('class method with destructured untyped parameters', () =>
  runnerTest(
    rulesId,
    `
class Test {
  method({user, settings}) { return user }
}
    `,
    1
  ))

Deno.test('class methods with untyped parameters', () =>
  runnerTest(
    rulesId,
    `
class Test {
  method(param) { return param }
  async asyncMethod(param) { return param }
}
    `,
    2
  ))

Deno.test('function expression with typed parameter', () =>
  runnerTest(rulesId, 'const test = function(param: string) { return param }', 0))

Deno.test('function expression with untyped parameter', () =>
  runnerTest(rulesId, 'const test = function(param) { return param }', 1))

Deno.test('function with array type parameters', () =>
  runnerTest(rulesId, 'function test(a: string[]) { return a }', 0))

Deno.test('function with default typed parameters', () =>
  runnerTest(rulesId, 'function test(a: number = 5) { return a }', 0))

Deno.test('function with default untyped parameters', () =>
  runnerTest(rulesId, 'function test(a = 5) { return a }', 1))

Deno.test('function with mixed typed/untyped parameters', () =>
  runnerTest(rulesId, 'function test(a: string, b, c: number) { return a + b + c }', 1))

Deno.test('function with multiple untyped parameters', () =>
  runnerTest(rulesId, 'function test(a, b, c) { return a + b + c }', 3))

Deno.test('function with object type parameters', () =>
  runnerTest(rulesId, 'function test(a: {name: string}) { return a }', 0))

Deno.test('function with optional typed parameters', () =>
  runnerTest(rulesId, 'function test(a?: string) { return a }', 0))

Deno.test('function with optional untyped parameters', () =>
  runnerTest(rulesId, 'function test(a?) { return a }', 1))

Deno.test('function with typed parameter', () =>
  runnerTest(rulesId, 'function test(param: string) { return param }', 0))

Deno.test('function with union type parameters', () =>
  runnerTest(rulesId, 'function test(a: string | number) { return a }', 0))

Deno.test('function with untyped parameter', () =>
  runnerTest(rulesId, 'function test(param) { return param }', 1))

Deno.test('nested functions with mixed types', () =>
  runnerTest(
    rulesId,
    `
function outer(a: string) {
  function inner(b) { return a + b }
  return inner
}
    `,
    1
  ))

Deno.test('verify auto-fix for default parameters', () =>
  verifyAutoFix(
    rulesId,
    'function test(count = 5) { return count }',
    'function test(count: any = 5) { return count }',
    'Default parameter auto-fix test'
  ))

Deno.test('verify auto-fix for destructured parameters', () =>
  verifyAutoFix(
    rulesId,
    'function test({user, settings}) { return user }',
    'function test({user, settings}: any) { return user }',
    'Destructured auto-fix test'
  ))

Deno.test('verify auto-fix for rest parameters', () =>
  verifyAutoFix(
    rulesId,
    'function test(...args) { return args.length }',
    'function test(...args: any[]) { return args.length }',
    'Rest parameter auto-fix test'
  ))

Deno.test('verify auto-fix suggests correct types', () =>
  verifyAutoFix(
    rulesId,
    'function test(param) { return param }',
    'function test(param: any) { return param }',
    'Parameter auto-fix test'
  ))
