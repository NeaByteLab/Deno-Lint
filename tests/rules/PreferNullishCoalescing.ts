import { runnerTest, verifyAutoFix } from '@tests/index.ts'

const rulesId = 'deno-lint/prefer-nullish-coalescing'

Deno.test('logical OR with empty string (should trigger)', () =>
  runnerTest(rulesId, 'const result = value || ""', 1))

Deno.test('logical OR with zero (should trigger)', () =>
  runnerTest(rulesId, 'const result = value || 0', 1))

Deno.test('logical OR with false (should trigger)', () =>
  runnerTest(rulesId, 'const result = value || false', 1))

Deno.test('logical OR with non-falsy primitive (should not trigger)', () =>
  runnerTest(rulesId, 'const result = value || "default"', 0))

Deno.test('logical OR with non-falsy number (should not trigger)', () =>
  runnerTest(rulesId, 'const result = value || 42', 0))

Deno.test('logical OR with true (should not trigger)', () =>
  runnerTest(rulesId, 'const result = value || true', 0))

Deno.test('logical AND (should not trigger)', () =>
  runnerTest(rulesId, 'const result = value && "default"', 0))

Deno.test('nullish coalescing (should not trigger)', () =>
  runnerTest(rulesId, 'const result = value ?? "default"', 0))

Deno.test('multiple logical OR expressions', () =>
  runnerTest(
    rulesId,
    `
    const result1 = value || ""
    const result2 = value || 0
    const result3 = value || false
    const result4 = value || "default"
  `,
    3
  ))

Deno.test('logical OR in function parameter', () =>
  runnerTest(
    rulesId,
    `
    function test(value) {
      return value || ""
    }
  `,
    1
  ))

Deno.test('logical OR in arrow function', () =>
  runnerTest(
    rulesId,
    `
    const test = (value) => value || 0
  `,
    1
  ))

Deno.test('logical OR in return statement', () =>
  runnerTest(
    rulesId,
    `
    function getValue(value) {
      return value || false
    }
  `,
    1
  ))

Deno.test('logical OR in object property', () =>
  runnerTest(
    rulesId,
    `
    const obj = {
      value: input || ""
    }
  `,
    1
  ))

Deno.test('logical OR in array element', () =>
  runnerTest(
    rulesId,
    `
    const arr = [value || 0]
  `,
    1
  ))

Deno.test('nested logical OR expressions', () =>
  runnerTest(
    rulesId,
    `
    const result = (value || "") || false
  `,
    2
  ))

Deno.test('logical OR with complex expressions', () =>
  runnerTest(
    rulesId,
    `
    const result = (user?.name || "") || (user?.email || 0)
  `,
    2
  ))

Deno.test('logical OR in conditional expression', () =>
  runnerTest(
    rulesId,
    `
    const result = condition ? value || "" : otherValue || false
  `,
    2
  ))

Deno.test('logical OR with template literals', () =>
  runnerTest(
    rulesId,
    `
    const message = \`Hello \${name || ""}\`
  `,
    1
  ))

Deno.test('logical OR in class method', () =>
  runnerTest(
    rulesId,
    `
    class TestClass {
      getValue(value) {
        return value || 0
      }
    }
  `,
    1
  ))

Deno.test('logical OR in async function', () =>
  runnerTest(
    rulesId,
    `
    async function fetchData(id) {
      const data = await fetch(\`/api/\${id}\`)
      return data || ""
    }
  `,
    1
  ))

Deno.test('logical OR with destructuring', () =>
  runnerTest(
    rulesId,
    `
    const { value = "" } = obj || {}
  `,
    0
  ))

Deno.test('logical OR with function calls', () =>
  runnerTest(
    rulesId,
    `
    const result = getValue() || ""
  `,
    1
  ))

Deno.test('logical OR with member expressions', () =>
  runnerTest(
    rulesId,
    `
    const result = obj.property || 0
  `,
    1
  ))

Deno.test('verify auto-fix for empty string', () =>
  verifyAutoFix(rulesId, 'const result = value || ""', 'value ?? ""', 'Empty string auto-fix test'))

Deno.test('verify auto-fix for zero', () =>
  verifyAutoFix(rulesId, 'const result = value || 0', 'value ?? 0', 'Zero auto-fix test'))

Deno.test('verify auto-fix for false', () =>
  verifyAutoFix(rulesId, 'const result = value || false', 'value ?? false', 'False auto-fix test'))

Deno.test('verify auto-fix in function', () =>
  verifyAutoFix(
    rulesId,
    'function test(value) { return value || "" }',
    'value ?? ""',
    'Function auto-fix test'
  ))

Deno.test('verify auto-fix in arrow function', () =>
  verifyAutoFix(
    rulesId,
    'const test = (value) => value || 0',
    'value ?? 0',
    'Arrow function auto-fix test'
  ))

Deno.test('verify auto-fix with complex expression', () =>
  verifyAutoFix(
    rulesId,
    'const result = (user?.name || "") || false',
    '(user?.name ?? "") || false',
    'Complex expression auto-fix test',
    2
  ))

Deno.test('verify auto-fix in object property', () =>
  verifyAutoFix(
    rulesId,
    'const obj = { value: input || "" }',
    'input ?? ""',
    'Object property auto-fix test'
  ))

Deno.test('verify auto-fix in template literal', () =>
  verifyAutoFix(
    rulesId,
    'const message = `Hello ${name || ""}`',
    'name ?? ""',
    'Template literal auto-fix test'
  ))
