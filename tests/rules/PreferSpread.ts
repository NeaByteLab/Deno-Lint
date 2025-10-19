import { runnerTest, verifyAutoFix } from '@tests/index.ts'

const rulesId = 'deno-lint/prefer-spread'

Deno.test('Array.from() in arrow function (should trigger)', () =>
  runnerTest(rulesId, 'const test = (data) => Array.from(data)', 1)
)

Deno.test('Array.from() in async function (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    async function fetchData(id) {
      const data = await fetch(\`/api/\${id}\`)
      return Array.from(data)
    }
  `,
    1
  )
)

Deno.test('Array.from() in function parameter (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    function test(data) {
      return Array.from(data)
    }
  `,
    1
  )
)

Deno.test('Array.from() in object property (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    const obj = {
      items: Array.from(iterable)
    }
  `,
    1
  )
)

Deno.test('Array.from() with complex expressions (should trigger)', () =>
  runnerTest(rulesId, 'const result = Array.from(user?.items || [])', 1)
)

Deno.test('Array.from() with function calls (should trigger)', () =>
  runnerTest(rulesId, 'const result = Array.from(getData())', 1)
)

Deno.test('Array.from() with multiple arguments (should not trigger)', () =>
  runnerTest(rulesId, 'const result = Array.from(iterable, mapFn)', 0)
)

Deno.test('Array.from() with single argument (should trigger)', () =>
  runnerTest(rulesId, 'const result = Array.from(iterable)', 1)
)

Deno.test('Array.from() with template literals (should trigger)', () =>
  runnerTest(rulesId, 'const result = Array.from(`${data}`)', 1)
)

Deno.test('array.concat() in array element (should trigger)', () =>
  runnerTest(rulesId, 'const result = [arr.concat(otherArr)]', 1)
)

Deno.test('array.concat() in class method (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    class TestClass {
      mergeItems(items) {
        return this.items.concat(items)
      }
    }
  `,
    1
  )
)

Deno.test('array.concat() in conditional expression (should trigger)', () =>
  runnerTest(rulesId, 'const result = condition ? arr.concat(a) : arr.concat(b)', 2)
)

Deno.test('array.concat() in return statement (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    function mergeArrays(arr1, arr2) {
      return arr1.concat(arr2)
    }
  `,
    1
  )
)

Deno.test('array.concat() with destructuring (should trigger)', () =>
  runnerTest(rulesId, 'const { items = [] } = obj; const result = items.concat(newItems)', 1)
)

Deno.test('array.concat() with member expressions (should trigger)', () =>
  runnerTest(rulesId, 'const result = obj.property.concat(other)', 1)
)

Deno.test('array.concat() with multiple arguments (should trigger)', () =>
  runnerTest(rulesId, 'const result = arr.concat(arr1, arr2)', 1)
)

Deno.test('array.concat() with no arguments (should not trigger)', () =>
  runnerTest(rulesId, 'const result = arr.concat()', 0)
)

Deno.test('array.concat() with single argument (should trigger)', () =>
  runnerTest(rulesId, 'const result = arr.concat(otherArr)', 1)
)

Deno.test('nested Array.from() expressions (should trigger)', () =>
  runnerTest(rulesId, 'const result = Array.from(Array.from(data))', 2)
)

Deno.test('verify auto-fix for Array.from()', () =>
  verifyAutoFix(
    rulesId,
    'const result = Array.from(iterable)',
    '[...iterable]',
    'Array.from() auto-fix test'
  )
)

Deno.test('verify auto-fix for array.concat()', () =>
  verifyAutoFix(
    rulesId,
    'const result = arr.concat(otherArr)',
    '[...arr, otherArr]',
    'Array.concat() auto-fix test'
  )
)

Deno.test('verify auto-fix in arrow function', () =>
  verifyAutoFix(
    rulesId,
    'const test = (arr1, arr2) => arr1.concat(arr2)',
    '[...arr1, arr2]',
    'Arrow function concat auto-fix test'
  )
)

Deno.test('verify auto-fix in function', () =>
  verifyAutoFix(
    rulesId,
    'function test(data) { return Array.from(data) }',
    '[...data]',
    'Function Array.from() auto-fix test'
  )
)

Deno.test('verify auto-fix in object property', () =>
  verifyAutoFix(
    rulesId,
    'const obj = { items: Array.from(data) }',
    '[...data]',
    'Object property Array.from() auto-fix test'
  )
)

Deno.test('verify auto-fix in template literal', () =>
  verifyAutoFix(
    rulesId,
    `const result = \`Items: \${Array.from(data)}\``,
    '[...data]',
    'Template literal Array.from() auto-fix test'
  )
)

Deno.test('verify auto-fix with complex expression', () =>
  verifyAutoFix(
    rulesId,
    'const result = Array.from(user?.items || [])',
    '[...user?.items || []]',
    'Complex expression Array.from() auto-fix test'
  )
)
