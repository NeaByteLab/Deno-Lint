import { runnerTest, verifyAutoFix } from '@tests/index.ts'

const rulesId = 'deno-lint/prefer-const-assertions'

Deno.test('array already with const assertion (should not trigger)', () =>
  runnerTest(rulesId, 'const arr = [1, 2, 3] as const', 0))

Deno.test('array in arrow function parameter (should not trigger)', () =>
  runnerTest(rulesId, 'const test = (arr = [1, 2, 3]) => arr', 0))

Deno.test('array in function parameter (should not trigger)', () =>
  runnerTest(rulesId, 'function test(arr = [1, 2, 3]) { return arr }', 0))

Deno.test('array in return statement (should trigger)', () =>
  runnerTest(rulesId, 'function test() { return [1, 2, 3] }', 1))

Deno.test('array in variable declaration with let (should trigger)', () =>
  runnerTest(rulesId, 'let arr = [1, 2, 3]', 1))

Deno.test('array in variable declaration with var (should trigger)', () =>
  runnerTest(rulesId, 'var arr = [1, 2, 3]', 1))

Deno.test('array with boolean literals (should trigger)', () =>
  runnerTest(rulesId, 'const flags = [true, false, true]', 1))

Deno.test('array with complex const assertion (should not trigger)', () =>
  runnerTest(rulesId, 'const arr = [1, 2, 3] as const satisfies readonly number[]', 0))

Deno.test('array with complex nested structures (should trigger)', () =>
  runnerTest(rulesId, 'const arr = [{ id: 1, data: { value: "test" } }]', 1))

Deno.test('array with computed properties (should trigger)', () =>
  runnerTest(rulesId, 'const arr = [1, 2, 3, ...[4, 5]]', 1))

Deno.test('array with const assertion in different position (should not trigger)', () =>
  runnerTest(rulesId, 'const arr = [1, 2, 3] as const', 0))

Deno.test('array with function expressions (should trigger)', () =>
  runnerTest(rulesId, 'const handlers = [() => {}, () => {}]', 1))

Deno.test('array with mixed types (should trigger)', () =>
  runnerTest(rulesId, 'const arr = [1, "string", true]', 1))

Deno.test('array with multiple elements (should trigger)', () =>
  runnerTest(rulesId, 'const arr = [1, 2, 3]', 1))

Deno.test('array with null and undefined (should trigger)', () =>
  runnerTest(rulesId, 'const values = [null, undefined, "test"]', 1))

Deno.test('array with objects (should trigger)', () =>
  runnerTest(rulesId, 'const arr = [{ id: 1 }, { id: 2 }]', 1))

Deno.test('array with single element (should trigger)', () =>
  runnerTest(rulesId, 'const arr = [1]', 1))

Deno.test('array with spread operator (should trigger)', () =>
  runnerTest(rulesId, 'const combined = [...arr1, ...arr2]', 1))

Deno.test('array with string literals (should trigger)', () =>
  runnerTest(rulesId, 'const colors = ["red", "green", "blue"]', 1))

Deno.test('array with template literals (should trigger)', () =>
  runnerTest(rulesId, 'const messages = [`Hello ${name}`, `Goodbye ${name}`]', 1))

Deno.test('array with type annotations (should trigger)', () =>
  runnerTest(rulesId, 'const arr: number[] = [1, 2, 3]', 1))

Deno.test('empty array (should not trigger)', () => runnerTest(rulesId, 'const arr = []', 0))

Deno.test('empty object (should not trigger)', () => runnerTest(rulesId, 'const obj = {}', 0))

Deno.test('mixed arrays and objects with some const assertions (should trigger some)', () =>
  runnerTest(
    rulesId,
    `
    const arr1 = [1, 2, 3] as const
    const obj1 = { name: "test" }
    const arr2 = ["a", "b", "c"]
    const obj2 = { id: 1, active: true } as const
  `,
    2
  ))

Deno.test('multiple arrays and objects (should trigger multiple)', () =>
  runnerTest(
    rulesId,
    `
    const arr1 = [1, 2, 3]
    const obj1 = { name: "test" }
    const arr2 = ["a", "b", "c"]
    const obj2 = { id: 1, active: true }
  `,
    4
  ))

Deno.test('nested arrays and objects (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    const data = {
      users: [
        { id: 1, name: "John" },
        { id: 2, name: "Jane" }
      ],
      settings: {
        theme: "dark",
        notifications: true
      }
    }
  `,
    1
  ))

Deno.test('object already with const assertion (should not trigger)', () =>
  runnerTest(rulesId, 'const obj = { name: "test" } as const', 0))

Deno.test('object in arrow function parameter (should not trigger)', () =>
  runnerTest(rulesId, 'const test = (obj = { name: "test" }) => obj', 0))

Deno.test('object in function parameter (should not trigger)', () =>
  runnerTest(rulesId, 'function test(obj = { name: "test" }) { return obj }', 0))

Deno.test('object in return statement (should trigger)', () =>
  runnerTest(rulesId, 'function test() { return { name: "test" } }', 1))

Deno.test('object in variable declaration with let (should trigger)', () =>
  runnerTest(rulesId, 'let obj = { name: "test" }', 1))

Deno.test('object in variable declaration with var (should trigger)', () =>
  runnerTest(rulesId, 'var obj = { name: "test" }', 1))

Deno.test('object with arrays (should trigger)', () =>
  runnerTest(rulesId, 'const obj = { items: [1, 2], tags: ["a", "b"] }', 1))

Deno.test('object with boolean literals (should trigger)', () =>
  runnerTest(rulesId, 'const config = { debug: true, production: false }', 1))

Deno.test('object with complex const assertion (should not trigger)', () =>
  runnerTest(rulesId, 'const obj = { name: "test" } as const satisfies { name: string }', 0))

Deno.test('object with complex nested structures (should trigger)', () =>
  runnerTest(rulesId, 'const obj = { config: { settings: { enabled: true } } }', 1))

Deno.test('object with computed properties (should trigger)', () =>
  runnerTest(rulesId, 'const obj = { [key]: value, ...rest }', 1))

Deno.test('object with const assertion in different position (should not trigger)', () =>
  runnerTest(rulesId, 'const obj = { name: "test" } as const', 0))

Deno.test('object with function expressions (should trigger)', () =>
  runnerTest(rulesId, 'const api = { get: () => {}, post: () => {} }', 1))

Deno.test('object with multiple properties (should trigger)', () =>
  runnerTest(rulesId, 'const obj = { name: "test", age: 25 }', 1))

Deno.test('object with nested properties (should trigger)', () =>
  runnerTest(rulesId, 'const obj = { user: { name: "test" } }', 1))

Deno.test('object with null and undefined (should trigger)', () =>
  runnerTest(rulesId, 'const data = { value: null, error: undefined }', 1))

Deno.test('object with single property (should trigger)', () =>
  runnerTest(rulesId, 'const obj = { name: "test" }', 1))

Deno.test('object with spread operator (should trigger)', () =>
  runnerTest(rulesId, 'const merged = { ...obj1, ...obj2 }', 1))

Deno.test('object with string literals (should trigger)', () =>
  runnerTest(rulesId, 'const status = { pending: "pending", done: "done" }', 1))

Deno.test('object with template literals (should trigger)', () =>
  runnerTest(
    rulesId,
    'const templates = { greeting: `Hello ${name}`, farewell: `Goodbye ${name}` }',
    1
  ))

Deno.test('object with type annotations (should trigger)', () =>
  runnerTest(rulesId, 'const obj: { name: string } = { name: "test" }', 1))

Deno.test('verify auto-fix for array with boolean literals', () =>
  verifyAutoFix(
    rulesId,
    'const flags = [true, false, true]',
    '[true, false, true] as const',
    'Array with boolean literals auto-fix test'
  ))

Deno.test('verify auto-fix for array with mixed types', () =>
  verifyAutoFix(
    rulesId,
    'const arr = [1, "string", true]',
    '[1, "string", true] as const',
    'Array with mixed types auto-fix test'
  ))

Deno.test('verify auto-fix for array with objects', () =>
  verifyAutoFix(
    rulesId,
    'const arr = [{ id: 1 }, { id: 2 }]',
    '[{ id: 1 }, { id: 2 }] as const',
    'Array with objects auto-fix test'
  ))

Deno.test('verify auto-fix for array with string literals', () =>
  verifyAutoFix(
    rulesId,
    'const colors = ["red", "green", "blue"]',
    '["red", "green", "blue"] as const',
    'Array with string literals auto-fix test'
  ))

Deno.test('verify auto-fix for object with arrays', () =>
  verifyAutoFix(
    rulesId,
    'const obj = { items: [1, 2], tags: ["a", "b"] }',
    '{ items: [1, 2], tags: ["a", "b"] } as const',
    'Object with arrays auto-fix test'
  ))

Deno.test('verify auto-fix for object with boolean literals', () =>
  verifyAutoFix(
    rulesId,
    'const config = { debug: true, production: false }',
    '{ debug: true, production: false } as const',
    'Object with boolean literals auto-fix test'
  ))

Deno.test('verify auto-fix for object with nested properties', () =>
  verifyAutoFix(
    rulesId,
    'const obj = { user: { name: "test" } }',
    '{ user: { name: "test" } } as const',
    'Object with nested properties auto-fix test'
  ))

Deno.test('verify auto-fix for object with string literals', () =>
  verifyAutoFix(
    rulesId,
    'const status = { pending: "pending", done: "done" }',
    '{ pending: "pending", done: "done" } as const',
    'Object with string literals auto-fix test'
  ))

Deno.test('verify auto-fix for simple array', () =>
  verifyAutoFix(
    rulesId,
    'const arr = [1, 2, 3]',
    '[1, 2, 3] as const',
    'Simple array auto-fix test'
  ))

Deno.test('verify auto-fix for simple object', () =>
  verifyAutoFix(
    rulesId,
    'const obj = { name: "test" }',
    '{ name: "test" } as const',
    'Simple object auto-fix test'
  ))
