import { runnerTest, verifyAutoFix } from '@tests/index.ts'

const rulesId = 'deno-lint/async-function-naming'

Deno.test('anonymous async function (should not trigger)', () =>
  runnerTest(rulesId, 'const test = async function() { return "anonymous" }', 0))

Deno.test('async arrow function (should not trigger)', () =>
  runnerTest(rulesId, 'const test = async () => { return "test" }', 0))

Deno.test('async arrow function with name (should not trigger)', () =>
  runnerTest(rulesId, 'const test = async function named() { return "test" }', 0))

Deno.test('async class method (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    class TestClass {
      async method() { return "method" }
      async validMethodAsync() { return "valid" }
    }
  `,
    0
  ))

Deno.test('async function expression (should not trigger)', () =>
  runnerTest(rulesId, 'const test = async function() { return "test" }', 0))

Deno.test('async function inside regular function', () =>
  runnerTest(
    rulesId,
    `
    function regularFunction() {
      async function asyncFunction() { return "async" }
      async function validFunction() { return "valid" }
      return asyncFunction()
    }
  `,
    2
  ))

Deno.test('async function with complex parameters and Async suffix', () =>
  runnerTest(
    rulesId,
    'async function processDataAsync(data: {id: string, value: number}, options?: {}) { return data }',
    0
  ))

Deno.test('async function with complex parameters without Async suffix', () =>
  runnerTest(
    rulesId,
    'async function processData(data: {id: string, value: number}, options?: {}) { return data }',
    1
  ))

Deno.test('async function with descriptive Async suffix', () =>
  runnerTest(rulesId, 'async function fetchUserDataAsync() { return {} }', 0))

Deno.test('async function with parameters and Async suffix', () =>
  runnerTest(rulesId, 'async function getUserByIdAsync(id: string) { return {} }', 0))

Deno.test('async function with parameters without Async suffix', () =>
  runnerTest(rulesId, 'async function getUserById(id: string) { return {} }', 1))

Deno.test('async function with return type and Async suffix', () =>
  runnerTest(rulesId, 'async function calculateAsync(): Promise<number> { return 42 }', 0))

Deno.test('async function with return type without Async suffix', () =>
  runnerTest(rulesId, 'async function calculate(): Promise<number> { return 42 }', 1))

Deno.test('async function with single word Async suffix', () =>
  runnerTest(rulesId, 'async function processAsync() { return true }', 0))

Deno.test('async function with Async suffix', () =>
  runnerTest(rulesId, 'async function testAsync() { return "test" }', 0))

Deno.test('async function without Async suffix', () =>
  runnerTest(rulesId, 'async function test() { return "test" }', 1))

Deno.test('async functions with await statements', () =>
  runnerTest(
    rulesId,
    `
    async function fetchUserAsync() {
      const user = await fetch('/api/user')
      return user.json()
    }
    async function fetchPost() {
      const post = await fetch('/api/post')
      return post.json()
    }
  `,
    1
  ))

Deno.test('async functions with different naming patterns', () =>
  runnerTest(
    rulesId,
    `
    async function camelCaseAsync() { return "camel" }
    async function snake_case() { return "snake" }
    async function PascalCaseAsync() { return "pascal" }
    async function kebabCase() { return "kebab" }
  `,
    2
  ))

Deno.test('async functions with different return patterns', () =>
  runnerTest(
    rulesId,
    `
    async function returnStringAsync() { return "string" }
    async function returnNumber() { return 42 }
    async function returnObjectAsync() { return {} }
    async function returnArray() { return [] }
    async function returnBooleanAsync() { return true }
    async function returnNull() { return null }
    async function returnUndefinedAsync() { return undefined }
  `,
    3
  ))

Deno.test('async functions with error handling', () =>
  runnerTest(
    rulesId,
    `
    async function safeOperationAsync() {
      try {
        return await riskyOperation()
      } catch (error) {
        console.error(error)
        return null
      }
    }
    async function unsafeOperation() {
      try {
        return await riskyOperation()
      } catch (error) {
        console.error(error)
        return null
      }
    }
  `,
    1
  ))

Deno.test('async functions with special characters and numbers', () =>
  runnerTest(
    rulesId,
    `
    async function test123Async() { return "numbers" }
    async function test_123() { return "underscore numbers" }
    async function test$Async() { return "dollar" }
    async function testAt() { return "at symbol" }
  `,
    2
  ))

Deno.test('async functions with very long names', () =>
  runnerTest(
    rulesId,
    `
    async function thisIsAVeryLongFunctionNameThatDescribesWhatItDoesAsync() { return "long" }
    async function thisIsAVeryLongFunctionNameThatDescribesWhatItDoes() { return "long" }
  `,
    1
  ))

Deno.test('async static class method (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    class TestClass {
      static async staticMethod() { return "static" }
      static async validStaticMethodAsync() { return "valid" }
    }
  `,
    0
  ))

Deno.test('mixed async and regular functions', () =>
  runnerTest(
    rulesId,
    `
    function regularFunction() { return "regular" }
    async function asyncFunction() { return "async" }
    async function validFunction() { return "valid" }
  `,
    2
  ))

Deno.test('multiple async function declarations with various naming patterns', () =>
  runnerTest(
    rulesId,
    `
    async function fetchDataAsync() { return {} }
    async function processData() { return {} }
    async function saveDataAsync() { return {} }
    async function deleteData() { return {} }
    async function updateDataAsync() { return {} }
    async function validateData() { return {} }
  `,
    3
  ))

Deno.test('multiple async functions with mixed naming', () =>
  runnerTest(
    rulesId,
    `
    async function validAsync() { return "valid" }
    async function invalid() { return "invalid" }
    async function anotherValidAsync() { return "another" }
    async function anotherInvalid() { return "another" }
  `,
    2
  ))

Deno.test('nested async functions with mixed naming', () =>
  runnerTest(
    rulesId,
    `
    async function outerAsync() {
      async function inner() { return "inner" }
      async function innerValidAsync() { return "inner valid" }
      return inner()
    }
  `,
    1
  ))

Deno.test('regular function (not async)', () =>
  runnerTest(rulesId, 'function test() { return "test" }', 0))

Deno.test('verify auto-fix for simple async function', () =>
  verifyAutoFix(
    rulesId,
    'async function test() { return "test" }',
    'async function testAsync() { return "test" }',
    'Simple async function auto-fix test'
  ))

Deno.test('verify auto-fix for async function with parameters', () =>
  verifyAutoFix(
    rulesId,
    'async function getUser(id) { return {} }',
    'async function getUserAsync(id) { return {} }',
    'Async function with parameters auto-fix test'
  ))

Deno.test('verify auto-fix for async function with complex parameters', () =>
  verifyAutoFix(
    rulesId,
    'async function processData(data, options) { return data }',
    'async function processDataAsync(data, options) { return data }',
    'Async function with complex parameters auto-fix test'
  ))

Deno.test('verify auto-fix for async function with return type', () =>
  verifyAutoFix(
    rulesId,
    'async function calculate(): Promise<number> { return 42 }',
    'async function calculateAsync(): Promise<number> { return 42 }',
    'Async function with return type auto-fix test'
  ))

Deno.test('verify auto-fix for async function with await statements', () =>
  verifyAutoFix(
    rulesId,
    'async function fetchData() { const data = await fetch("/api"); return data.json(); }',
    'async function fetchDataAsync() { const data = await fetch("/api"); return data.json(); }',
    'Async function with await statements auto-fix test'
  ))

Deno.test('verify auto-fix for async function with descriptive name', () =>
  verifyAutoFix(
    rulesId,
    'async function fetchUserData() { return {} }',
    'async function fetchUserDataAsync() { return {} }',
    'Async function with descriptive name auto-fix test'
  ))

Deno.test('verify auto-fix for async function with single word name', () =>
  verifyAutoFix(
    rulesId,
    'async function process() { return true }',
    'async function processAsync() { return true }',
    'Async function with single word name auto-fix test'
  ))

Deno.test('verify auto-fix for async function with numbers in name', () =>
  verifyAutoFix(
    rulesId,
    'async function test123() { return "numbers" }',
    'async function test123Async() { return "numbers" }',
    'Async function with numbers in name auto-fix test'
  ))

Deno.test('verify auto-fix for async function with special characters', () =>
  verifyAutoFix(
    rulesId,
    'async function test$() { return "dollar" }',
    'async function test$Async() { return "dollar" }',
    'Async function with special characters auto-fix test'
  ))

Deno.test('verify auto-fix for async function with very long name', () =>
  verifyAutoFix(
    rulesId,
    'async function thisIsAVeryLongFunctionNameThatDescribesWhatItDoes() { return "long" }',
    'async function thisIsAVeryLongFunctionNameThatDescribesWhatItDoesAsync() { return "long" }',
    'Async function with very long name auto-fix test'
  ))
