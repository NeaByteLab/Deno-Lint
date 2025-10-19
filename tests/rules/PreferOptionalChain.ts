import { runnerTest, verifyAutoFix } from '@tests/index.ts'

const rulesId = 'deno-lint/prefer-optional-chain'

Deno.test('already using optional chaining (should not trigger)', () =>
  runnerTest(rulesId, 'const result = user?.name', 0))

Deno.test('already using optional chaining method (should not trigger)', () =>
  runnerTest(rulesId, 'const result = user?.getName()', 0))

Deno.test('chained method calls (should trigger)', () =>
  runnerTest(rulesId, 'const result = data && data.filter().map()', 1))

Deno.test('computed property access (should trigger)', () =>
  runnerTest(rulesId, 'const result = obj && obj[key]', 1))

Deno.test('complex expression with mixed patterns', () =>
  runnerTest(
    rulesId,
    `
    const result = user && user.name && user.profile && user.profile.email
    const method = api && api.getData && api.getData()
    const other = user && other.name
  `,
    2
  ))

Deno.test('logical AND in arrow function', () =>
  runnerTest(rulesId, 'const test = (user) => user && user.name', 1))

Deno.test('logical AND in array element', () =>
  runnerTest(rulesId, 'const arr = [user && user.name]', 1))

Deno.test('logical AND in async function', () =>
  runnerTest(
    rulesId,
    `
    async function fetchUser(id) {
      const user = await api.getUser(id)
      return user && user.name
    }
  `,
    1
  ))

Deno.test('logical AND in class method', () =>
  runnerTest(
    rulesId,
    `
    class UserService {
      getName(user) {
        return user && user.name
      }
    }
  `,
    1
  ))

Deno.test('logical AND in conditional expression', () =>
  runnerTest(rulesId, 'const result = user && user.name ? "yes" : "no"', 1))

Deno.test('logical AND in function parameter', () =>
  runnerTest(rulesId, 'function test(user) { return user && user.name }', 1))

Deno.test('logical AND in object property', () =>
  runnerTest(rulesId, 'const obj = { value: user && user.name }', 1))

Deno.test('logical AND in return statement', () =>
  runnerTest(rulesId, 'function test(user) { return user && user.name }', 1))

Deno.test('logical AND with different objects (should not trigger)', () =>
  runnerTest(rulesId, 'const result = user && profile.name', 0))

Deno.test('logical AND with destructuring', () =>
  runnerTest(rulesId, 'const { name } = user && user.profile', 1))

Deno.test('logical AND with function calls', () =>
  runnerTest(rulesId, 'const result = getUser() && getUser().name', 1))

Deno.test('logical AND with function calls (should not trigger)', () =>
  runnerTest(rulesId, 'const result = user && getName()', 0))

Deno.test('logical AND with literals (should not trigger)', () =>
  runnerTest(rulesId, 'const result = user && "name"', 0))

Deno.test('logical AND with member expressions', () =>
  runnerTest(rulesId, 'const result = data.user && data.user.profile', 1))

Deno.test('logical AND with template literals', () =>
  runnerTest(rulesId, 'const message = `Hello ${user && user.name}`', 1))

Deno.test('logical OR (should not trigger)', () =>
  runnerTest(rulesId, 'const result = user || user.name', 0))

Deno.test('method call with arguments (should trigger)', () =>
  runnerTest(rulesId, 'const result = api && api.getUser(id)', 1))

Deno.test('nested property access (should trigger)', () =>
  runnerTest(rulesId, 'const result = data && data.user && data.user.profile', 1))

Deno.test('object && object.method() (should not trigger)', () =>
  runnerTest(rulesId, 'const result = user && other.getName()', 0))

Deno.test('object && object.method() (should trigger)', () =>
  runnerTest(rulesId, 'const result = user && user.getName()', 1))

Deno.test('object && object.property (should not trigger)', () =>
  runnerTest(rulesId, 'const result = user && other.name', 0))

Deno.test('object && object.property (should trigger)', () =>
  runnerTest(rulesId, 'const result = user && user.name', 1))

Deno.test('verify auto-fix for property access', () =>
  verifyAutoFix(
    rulesId,
    'const result = user && user.name',
    'user?.name',
    'Property access auto-fix test'
  ))

Deno.test('verify auto-fix for method call', () =>
  verifyAutoFix(
    rulesId,
    'const result = user && user.getName()',
    'user?.getName()',
    'Method call auto-fix test'
  ))

Deno.test('verify auto-fix for computed property', () =>
  verifyAutoFix(
    rulesId,
    'const result = obj && obj[key]',
    'obj?.[key]',
    'Computed property auto-fix test'
  ))

Deno.test('verify auto-fix for method with arguments', () =>
  verifyAutoFix(
    rulesId,
    'const result = api && api.getUser(id)',
    'api?.getUser(id)',
    'Method with arguments auto-fix test'
  ))

Deno.test('verify auto-fix in function', () =>
  verifyAutoFix(
    rulesId,
    'function test(user) { return user && user.name }',
    'user?.name',
    'Function auto-fix test'
  ))

Deno.test('verify auto-fix in arrow function', () =>
  verifyAutoFix(
    rulesId,
    'const test = (user) => user && user.name',
    'user?.name',
    'Arrow function auto-fix test'
  ))

Deno.test('verify auto-fix in object property', () =>
  verifyAutoFix(
    rulesId,
    'const obj = { value: user && user.name }',
    'user?.name',
    'Object property auto-fix test'
  ))

Deno.test('verify auto-fix in template literal', () =>
  verifyAutoFix(
    rulesId,
    'const message = `Hello ${user && user.name}`',
    'user?.name',
    'Template literal auto-fix test'
  ))
