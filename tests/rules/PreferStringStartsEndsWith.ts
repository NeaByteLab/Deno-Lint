import { runnerTest, verifyAutoFix } from '@tests/index.ts'

const rulesId = 'deno-lint/prefer-string-starts-ends-with'

Deno.test('string.endsWith() usage (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (str.endsWith("xyz")) {
      console.log('already using endsWith')
    }
  `,
    0
  ))

Deno.test('string.startsWith() usage (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (str.startsWith("abc")) {
      console.log('already using startsWith')
    }
  `,
    0
  ))

Deno.test('substring with assignment (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    const result = str.substring(0, 3)
  `,
    0
  ))

Deno.test('substring with different comparison (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (str.substring(0, 3) !== "abc") {
      console.log('different comparison')
    }
  `,
    0
  ))

Deno.test('substring with different operator (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (str.substring(0, 3) > "abc") {
      console.log('different operator')
    }
  `,
    0
  ))

Deno.test('substring with different start index (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (str.substring(1, 4) === "abc") {
      console.log('different start index')
    }
  `,
    0
  ))

Deno.test('substring with non-zero start (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (str.substring(2, 5) === "abc") {
      console.log('non-zero start')
    }
  `,
    0
  ))

Deno.test('substring(0, 3) === "abc" pattern (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (str.substring(0, 3) === "abc") {
      console.log('starts with abc')
    }
  `,
    1
  ))

Deno.test('substring(0, prefix.length) === prefix pattern (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (str.substring(0, prefix.length) === prefix) {
      console.log('starts with prefix')
    }
  `,
    0
  ))

Deno.test('substring(str.length - 3) === "xyz" pattern (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (str.substring(str.length - 3) === "xyz") {
      console.log('ends with xyz')
    }
  `,
    1
  ))

Deno.test('substring(str.length - suffix.length) === suffix pattern (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    if (str.substring(str.length - suffix.length) === suffix) {
      console.log('ends with suffix')
    }
  `,
    0
  ))

Deno.test('verify auto-fix for endsWith with literal', () =>
  verifyAutoFix(
    rulesId,
    `
    if (str.substring(str.length - 3) === "xyz") {
      console.log('ends with xyz')
    }
  `,
    'str.endsWith("xyz")',
    'EndsWith with literal auto-fix test'
  ))

Deno.test('verify auto-fix for startsWith with literal', () =>
  verifyAutoFix(
    rulesId,
    `
    if (str.substring(0, 3) === "abc") {
      console.log('starts with abc')
    }
  `,
    'str.startsWith("abc")',
    'StartsWith with literal auto-fix test'
  ))
