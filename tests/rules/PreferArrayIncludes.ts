import { runnerTest, verifyAutoFix } from '@tests/index.ts'

const rulesId = 'deno-lint/prefer-array-includes'

Deno.test('array.includes() usage (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (arr.includes(item)) {
      console.log('found')
    }
  `,
    0
  ))

Deno.test('indexOf !== -1 in arrow function (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    const checkItem = (arr, item) => arr.indexOf(item) !== -1
  `,
    1
  ))

Deno.test('indexOf !== -1 in async function (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    async function checkItem(arr, item) {
      return arr.indexOf(item) !== -1
    }
  `,
    1
  ))

Deno.test('indexOf !== -1 in class method (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    class ArrayHelper {
      contains(arr, item) {
        return arr.indexOf(item) !== -1
      }
    }
  `,
    1
  ))

Deno.test('indexOf !== -1 in conditional expression (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    const result = arr.indexOf(item) !== -1 ? 'found' : 'not found'
  `,
    1
  ))

Deno.test('indexOf !== -1 in return statement (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    function checkItem(arr, item) {
      return arr.indexOf(item) !== -1
    }
  `,
    1
  ))

Deno.test('indexOf !== -1 in template literal (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    const message = \`Item is \${arr.indexOf(item) !== -1 ? 'found' : 'not found'}\`
  `,
    1
  ))

Deno.test('indexOf !== -1 in variable assignment (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    const found = arr.indexOf(item) !== -1
  `,
    1
  ))

Deno.test('indexOf !== -1 pattern (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (arr.indexOf(item) !== -1) {
      console.log('found')
    }
  `,
    1
  ))

Deno.test('indexOf !== -1 with complex expressions (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (getArray().indexOf(getItem()) !== -1) {
      console.log('found')
    }
  `,
    1
  ))

Deno.test('indexOf !== -1 with different variable names (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (items.indexOf(value) !== -1) {
      console.log('found')
    }
  `,
    1
  ))

Deno.test('indexOf !== -1 with method calls (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (arr.indexOf(getValue()) !== -1) {
      console.log('found')
    }
  `,
    1
  ))

Deno.test('indexOf !== -1 with property access (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (obj.items.indexOf(item) !== -1) {
      console.log('found')
    }
  `,
    1
  ))

Deno.test('indexOf === -1 pattern (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (arr.indexOf(item) === -1) {
      console.log('not found')
    }
  `,
    0
  ))

Deno.test('indexOf >= 0 pattern (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (arr.indexOf(item) >= 0) {
      console.log('found')
    }
  `,
    0
  ))

Deno.test('indexOf > -1 pattern (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (arr.indexOf(item) > -1) {
      console.log('found')
    }
  `,
    0
  ))

Deno.test('indexOf with assignment (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    const index = arr.indexOf(item)
  `,
    0
  ))

Deno.test('indexOf with different comparison (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (arr.indexOf(item) !== 0) {
      console.log('not first')
    }
  `,
    0
  ))

Deno.test('indexOf with different operator (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (arr.indexOf(item) != -1) {
      console.log('found')
    }
  `,
    0
  ))

Deno.test('multiple indexOf !== -1 patterns (should trigger multiple)', () =>
  runnerTest(
    rulesId,
    `
    const found1 = arr1.indexOf(item1) !== -1
    const found2 = arr2.indexOf(item2) !== -1
    const found3 = arr3.indexOf(item3) !== -1
  `,
    3
  ))

Deno.test('verify auto-fix for indexOf !== -1 in arrow function', () =>
  verifyAutoFix(
    rulesId,
    `
    const checkItem = (arr, item) => arr.indexOf(item) !== -1
  `,
    'arr.includes(item)',
    'Arrow function auto-fix test'
  ))

Deno.test('verify auto-fix for indexOf !== -1 in conditional', () =>
  verifyAutoFix(
    rulesId,
    `
    const result = arr.indexOf(item) !== -1 ? 'found' : 'not found'
  `,
    'arr.includes(item)',
    'Conditional expression auto-fix test'
  ))

Deno.test('verify auto-fix for indexOf !== -1 in function', () =>
  verifyAutoFix(
    rulesId,
    `
    function checkItem(arr, item) {
      return arr.indexOf(item) !== -1
    }
  `,
    'arr.includes(item)',
    'Function return auto-fix test'
  ))

Deno.test('verify auto-fix for indexOf !== -1 in variable', () =>
  verifyAutoFix(
    rulesId,
    `
    const found = arr.indexOf(item) !== -1
  `,
    'arr.includes(item)',
    'Variable assignment auto-fix test'
  ))

Deno.test('verify auto-fix for indexOf !== -1 with method calls', () =>
  verifyAutoFix(
    rulesId,
    `
    if (getArray().indexOf(getItem()) !== -1) {
      console.log('found')
    }
  `,
    'getArray().includes(getItem())',
    'Method calls auto-fix test'
  ))

Deno.test('verify auto-fix for indexOf !== -1 with property access', () =>
  verifyAutoFix(
    rulesId,
    `
    if (obj.items.indexOf(item) !== -1) {
      console.log('found')
    }
  `,
    'obj.items.includes(item)',
    'Property access auto-fix test'
  ))

Deno.test('verify auto-fix for simple indexOf !== -1', () =>
  verifyAutoFix(
    rulesId,
    `
    if (arr.indexOf(item) !== -1) {
      console.log('found')
    }
  `,
    'arr.includes(item)',
    'Simple indexOf !== -1 auto-fix test'
  ))
