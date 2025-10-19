import { runnerTest, verifyAutoFix } from '@tests/index.ts'

const rulesId = 'deno-lint/explicit-return-types'

Deno.test('arrow function with return type (should not trigger)', () =>
  runnerTest(rulesId, 'const test = (): string => "test"', 0))

Deno.test('arrow function without return type (should not trigger)', () =>
  runnerTest(rulesId, 'const test = () => "test"', 0))

Deno.test('async function with return type', () =>
  runnerTest(rulesId, 'async function test(): Promise<string> { return "test" }', 0))

Deno.test('async function without return type', () =>
  runnerTest(rulesId, 'async function test() { return "test" }', 1))

Deno.test('class method without return type (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    class Test {
      method() { return "test" }
    }
  `,
    0
  ))

Deno.test('function expression with return type (should not trigger)', () =>
  runnerTest(rulesId, 'const test = function(): string { return "test" }', 0))

Deno.test('function expression without return type (should not trigger)', () =>
  runnerTest(rulesId, 'const test = function() { return "test" }', 0))

Deno.test('function returning array', () => runnerTest(rulesId, 'function test() { return [] }', 1))

Deno.test('function returning boolean', () =>
  runnerTest(rulesId, 'function test() { return true }', 1))

Deno.test('function returning number', () =>
  runnerTest(rulesId, 'function test() { return 42 }', 1))

Deno.test('function returning object', () =>
  runnerTest(rulesId, 'function test() { return {} }', 1))

Deno.test('function returning string', () =>
  runnerTest(rulesId, 'function test() { return "hello" }', 1))

Deno.test('function with complex return logic', () =>
  runnerTest(
    rulesId,
    `
    function processData(data: any[]) {
      const result = data
        .filter(item => item.valid)
        .map(item => item.value)
        .reduce((sum, val) => sum + val, 0)
      return result
    }
  `,
    1
  ))

Deno.test('function with conditional returns', () =>
  runnerTest(
    rulesId,
    `
    function test(condition: boolean) {
      if (condition) {
        return "yes"
      }
      return "no"
    }
  `,
    1
  ))

Deno.test('function with early return', () =>
  runnerTest(
    rulesId,
    `
    function test(value?: string) {
      if (!value) return
      return value.toUpperCase()
    }
  `,
    1
  ))

Deno.test('function with multiple returns', () =>
  runnerTest(
    rulesId,
    `
    function test(value: number) {
      if (value > 0) return "positive"
      if (value < 0) return "negative"
      return "zero"
    }
  `,
    1
  ))

Deno.test('function with no return statement', () =>
  runnerTest(rulesId, 'function test() { console.log("no return") }', 1))

Deno.test('function with return type', () =>
  runnerTest(rulesId, 'function test(): string { return "test" }', 0))

Deno.test('function without return type', () =>
  runnerTest(rulesId, 'function test() { return "test" }', 1))

Deno.test('void function with return type', () =>
  runnerTest(rulesId, 'function test(): void { console.log("test") }', 0))

Deno.test('void function without return type', () =>
  runnerTest(rulesId, 'function test() { console.log("test") }', 1))

Deno.test('verify auto-fix suggests correct types', () =>
  verifyAutoFix(
    rulesId,
    'function test() { return "hello" }',
    'function test(): string { return "hello" }',
    'Return type auto-fix test'
  ))
