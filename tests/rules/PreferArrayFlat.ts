import { runnerTest, verifyAutoFix } from '@tests/index.ts'

const rulesId = 'deno-lint/prefer-array-flat'

Deno.test('Array.prototype.concat.apply pattern (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    const flattened = Array.prototype.concat.apply([], nestedArray)
  `,
    1
  ))

Deno.test('array.flat() usage (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    const flattened = nestedArray.flat()
  `,
    0
  ))

Deno.test('array.flat(2) usage (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    const flattened = nestedArray.flat(2)
  `,
    0
  ))

Deno.test('concat with mixed spread and regular elements (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    const combined = [].concat(...arr1, item, ...arr2)
  `,
    0
  ))

Deno.test('concat with multiple spread operators (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    const flattened = [].concat(...arr1, ...arr2, ...arr3)
  `,
    0
  ))

Deno.test('concat with non-array spread (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    const combined = [].concat(...obj)
  `,
    1
  ))

Deno.test('concat with regular elements (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    const combined = [].concat(item1, item2, item3)
  `,
    0
  ))

Deno.test('concat with spread operator (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    const flattened = [].concat(...nestedArray)
  `,
    1
  ))

Deno.test('concat.apply in arrow function (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    const flattenArray = (arr) => Array.prototype.concat.apply([], arr)
  `,
    1
  ))

Deno.test('concat.apply in class method (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    class ArrayUtils {
      flatten(arr) {
        return Array.prototype.concat.apply([], arr)
      }
    }
  `,
    1
  ))

Deno.test('concat.apply in function (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    function flattenArray(arr) {
      return Array.prototype.concat.apply([], arr)
    }
  `,
    1
  ))

Deno.test('concat.apply with complex expression (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    const flattened = Array.prototype.concat.apply([], getNestedArrays())
  `,
    1
  ))

Deno.test('concat.apply with conditional (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    const flattened = Array.prototype.concat.apply([], condition ? arr1 : arr2)
  `,
    1
  ))

Deno.test('concat.apply with different array (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    const flattened = Array.prototype.concat.apply([1, 2], nestedArray)
  `,
    0
  ))

Deno.test('concat.apply with non-array (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    const result = Array.prototype.concat.apply([], obj)
  `,
    1
  ))

Deno.test('multiple concat patterns (should trigger multiple)', () =>
  runnerTest(
    rulesId,
    `
    const flattened1 = [].concat(...arr1)
    const flattened2 = Array.prototype.concat.apply([], arr2)
    const flattened3 = [].concat(...arr3, item)
  `,
    2
  ))

Deno.test('regular concat without spread (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    const combined = [].concat(arr1, arr2)
  `,
    0
  ))

Deno.test('verify auto-fix for concat with spread', () =>
  verifyAutoFix(
    rulesId,
    `
    const flattened = [].concat(...nestedArray)
  `,
    'nestedArray.flat()',
    'Concat with spread auto-fix test'
  ))

Deno.test('verify auto-fix for concat.apply pattern', () =>
  verifyAutoFix(
    rulesId,
    `
    const flattened = Array.prototype.concat.apply([], nestedArray)
  `,
    'nestedArray.flat()',
    'Concat.apply auto-fix test'
  ))

Deno.test('verify auto-fix in arrow function', () =>
  verifyAutoFix(
    rulesId,
    `
    const flattenArray = (arr) => Array.prototype.concat.apply([], arr)
  `,
    'arr.flat()',
    'Arrow function concat.apply auto-fix test'
  ))

Deno.test('verify auto-fix in function', () =>
  verifyAutoFix(
    rulesId,
    `
    function flattenArray(arr) {
      return Array.prototype.concat.apply([], arr)
    }
  `,
    'arr.flat()',
    'Function concat.apply auto-fix test'
  ))

Deno.test('verify auto-fix with complex expression', () =>
  verifyAutoFix(
    rulesId,
    `
    const flattened = Array.prototype.concat.apply([], getNestedArrays())
  `,
    'getNestedArrays().flat()',
    'Complex expression auto-fix test'
  ))
