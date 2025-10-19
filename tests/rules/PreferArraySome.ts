import { runnerTest, verifyAutoFix } from '@tests/index.ts'

const rulesId = 'deno-lint/prefer-array-some'

Deno.test('for loop in arrow function (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    const hasActiveUser = (users) => {
      for (let i = 0; i < users.length; i++) {
        if (users[i].active) {
          return true
        }
      }
      return false
    }
  `,
    1
  )
)

Deno.test('for loop in async function (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    async function checkUsers(users) {
      for (let i = 0; i < users.length; i++) {
        if (await users[i].isValid()) {
          return true
        }
      }
      return false
    }
  `,
    1
  )
)

Deno.test('for loop in class method (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    class UserService {
      hasActiveUser(users) {
        for (let i = 0; i < users.length; i++) {
          if (users[i].active) {
            return true
          }
        }
        return false
      }
    }
  `,
    1
  )
)

Deno.test('for loop in function (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    function hasActiveUser(users) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].active) {
          return true
        }
      }
      return false
    }
  `,
    1
  )
)

Deno.test('for loop with break instead of return (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    let found = false
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > 0) {
        found = true
        break
      }
    }
    return found
  `,
    0
  )
)

Deno.test('for loop with complex condition (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    for (let i = 0; i < items.length; i++) {
      if (items[i].active && items[i].value > threshold) {
        return true
      }
    }
    return false
  `,
    1
  )
)

Deno.test('for loop with continue (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] <= 0) {
        continue
      }
      if (arr[i] > 10) {
        return true
      }
    }
    return false
  `,
    1
  )
)

Deno.test('for loop with counter initialization (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    let i = 0
    for (; i < arr.length; i++) {
      if (arr[i] > 0) {
        return true
      }
    }
    return false
  `,
    1
  )
)

Deno.test('for loop with different array names (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    for (let i = 0; i < data.length; i++) {
      if (data[i].active) {
        return true
      }
    }
    return false
  `,
    1
  )
)

Deno.test('for loop with different increment (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    for (let i = 0; i < arr.length; i += 2) {
      if (arr[i] > 0) {
        return true
      }
    }
    return false
  `,
    1
  )
)

Deno.test('for loop with different variable names (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    for (let j = 0; j < items.length; j++) {
      if (items[j] > 0) {
        return true
      }
    }
    return false
  `,
    1
  )
)

Deno.test('for loop with method calls (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    for (let i = 0; i < items.length; i++) {
      if (items[i].isValid()) {
        return true
      }
    }
    return false
  `,
    1
  )
)

Deno.test('for loop with multiple conditions (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    for (let i = 0; i < users.length; i++) {
      if (users[i].age >= 18 && users[i].verified) {
        return true
      }
    }
    return false
  `,
    1
  )
)

Deno.test('for loop with multiple returns (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > 0) {
        return true
      }
      if (arr[i] < -10) {
        return true
      }
    }
    return false
  `,
    1
  )
)

Deno.test('for loop with nested conditions (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === 'active') {
        if (data[i].permissions.includes('read')) {
          return true
        }
      }
    }
    return false
  `,
    1
  )
)

Deno.test('for loop with no return statement (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i])
    }
  `,
    0
  )
)

Deno.test('for loop with property access (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    for (let i = 0; i < users.length; i++) {
      if (users[i].profile.isActive) {
        return true
      }
    }
    return false
  `,
    1
  )
)

Deno.test('for loop with return false (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > 0) {
        return false
      }
    }
    return true
  `,
    0
  )
)

Deno.test('for loop with return true (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > 0) {
        return true
      }
    }
    return false
  `,
    1
  )
)

Deno.test('verify auto-fix for complex condition', () =>
  verifyAutoFix(
    rulesId,
    `
    for (let i = 0; i < items.length; i++) {
      if (items[i].active && items[i].value > threshold) {
        return true
      }
    }
    return false
  `,
    'items.some(item => item.active && item.value > threshold)',
    'Complex condition auto-fix test'
  )
)

Deno.test('verify auto-fix for simple for loop', () =>
  verifyAutoFix(
    rulesId,
    `
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > 0) {
        return true
      }
    }
    return false
  `,
    'arr.some(item => item > 0)',
    'Simple for loop auto-fix test'
  )
)

Deno.test('verify auto-fix in arrow function', () =>
  verifyAutoFix(
    rulesId,
    `
    const hasActiveUser = (users) => {
      for (let i = 0; i < users.length; i++) {
        if (users[i].active) {
          return true
        }
      }
      return false
    }
  `,
    'users.some(user => user.active)',
    'Arrow function for loop auto-fix test'
  )
)

Deno.test('verify auto-fix in function', () =>
  verifyAutoFix(
    rulesId,
    `
    function hasActiveUser(users) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].active) {
          return true
        }
      }
      return false
    }
  `,
    'users.some(user => user.active)',
    'Function for loop auto-fix test'
  )
)

Deno.test('verify auto-fix with method calls', () =>
  verifyAutoFix(
    rulesId,
    `
    for (let i = 0; i < items.length; i++) {
      if (items[i].isValid()) {
        return true
      }
    }
    return false
  `,
    'items.some(item => item.isValid())',
    'Method calls auto-fix test'
  )
)

Deno.test('verify auto-fix with property access', () =>
  verifyAutoFix(
    rulesId,
    `
    for (let i = 0; i < users.length; i++) {
      if (users[i].profile.isActive) {
        return true
      }
    }
    return false
  `,
    'users.some(user => user.profile.isActive)',
    'Property access auto-fix test'
  )
)
