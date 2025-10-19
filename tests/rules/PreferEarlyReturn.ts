import { runnerTest, verifyAutoFix } from '@tests/index.ts'

const rulesId = 'deno-lint/prefer-early-return'

Deno.test('arrow function with nested conditions (should trigger)', () =>
  runnerTest(
    rulesId,
    `
const test = (value) => {
  if (value) {
    if (value > 0) {
      return "positive"
    }
  }
  return "default"
}`,
    1
  ))

Deno.test('arrow function with single expression (should not trigger)', () =>
  runnerTest(rulesId, 'const test = (value) => value ? "truthy" : "falsy"', 0))

Deno.test('arrow function with single if (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
const test = (value) => {
  if (value) {
    return "truthy"
  }
  return "default"
}`,
    0
  ))

Deno.test('async arrow function with nested conditions (should trigger)', () =>
  runnerTest(
    rulesId,
    `
const test = async (value) => {
  if (value) {
    if (value > 0) {
      return "positive"
    }
  }
  return "default"
}`,
    1
  ))

Deno.test('async function with nested conditions (should trigger)', () =>
  runnerTest(
    rulesId,
    `
async function test(value) {
  if (value) {
    if (value > 0) {
      return "positive"
    }
  }
  return "default"
}`,
    1
  ))

Deno.test('class method with nested conditions (should trigger)', () =>
  runnerTest(
    rulesId,
    `
class Test {
  method(value) {
    if (value) {
      if (value > 0) {
        return "positive"
      }
    }
    return "default"
  }
}`,
    1
  ))

Deno.test('function expression with nested conditions (should trigger)', () =>
  runnerTest(
    rulesId,
    `
const test = function(value) {
  if (value) {
    if (value > 0) {
      return "positive"
    }
  }
  return "default"
}`,
    1
  ))

Deno.test('function with complex condition expressions (should trigger)', () =>
  runnerTest(
    rulesId,
    `
function test(user) {
  if (user && user.isActive) {
    if (user.role === "admin" || user.role === "moderator") {
      return "authorized"
    }
  }
  return "unauthorized"
}`,
    1
  ))

Deno.test('function with deeply nested conditions (should trigger)', () =>
  runnerTest(
    rulesId,
    `
function test(value) {
  if (value) {
    if (value > 0) {
      if (value > 10) {
        return "large"
      }
    }
  }
  return "default"
}`,
    1
  ))

Deno.test('function with empty if blocks (should trigger)', () =>
  runnerTest(
    rulesId,
    `
function test(value) {
  if (value) {
    if (value > 0) {
      // empty block
    }
  }
  return "default"
}`,
    1
  ))

Deno.test('function with if-else but no nesting (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
function test(value) {
  if (value) {
    return "truthy"
  } else {
    return "falsy"
  }
}`,
    0
  ))

Deno.test('function with method calls in conditions (should trigger)', () =>
  runnerTest(
    rulesId,
    `
function test(data) {
  if (data.isValid()) {
    if (data.getType() === "important") {
      return "processed"
    }
  }
  return "skipped"
}`,
    1
  ))

Deno.test('function with multiple nested if statements (should trigger)', () =>
  runnerTest(
    rulesId,
    `
function test(value) {
  if (value) {
    if (value > 0) {
      return "positive"
    }
  }
  if (value < 0) {
    if (value < -10) {
      return "very negative"
    }
  }
  return "default"
}`,
    1
  ))

Deno.test('function with multiple statements and nested conditions (should trigger)', () =>
  runnerTest(
    rulesId,
    `
function test(value) {
  const processed = value * 2
  if (processed) {
    if (processed > 10) {
      return "large"
    }
  }
  console.log("processing")
  return "default"
}`,
    1
  ))

Deno.test('function with nested if but no return in nested block (should trigger)', () =>
  runnerTest(
    rulesId,
    `
function test(value) {
  if (value) {
    if (value > 0) {
      console.log("positive")
    }
  }
  return "default"
}`,
    1
  ))

Deno.test('function with nested if in alternate (should trigger)', () =>
  runnerTest(
    rulesId,
    `
function test(value) {
  if (value) {
    return "truthy"
  } else {
    if (value === 0) {
      return "zero"
    }
  }
  return "default"
}`,
    1
  ))

Deno.test('function with nested if in both consequent and alternate (should trigger)', () =>
  runnerTest(
    rulesId,
    `
function test(value) {
  if (value) {
    if (value > 0) {
      return "positive"
    }
  } else {
    if (value === 0) {
      return "zero"
    }
  }
  return "default"
}`,
    1
  ))

Deno.test('function with nested if in consequent (should trigger)', () =>
  runnerTest(
    rulesId,
    `
function test(value) {
  if (value) {
    if (value > 0) {
      return "positive"
    }
  }
  return "default"
}`,
    1
  ))

Deno.test('function with no if statements (should not trigger)', () =>
  runnerTest(rulesId, 'function test() { return "hello" }', 0))

Deno.test('function with only variable declarations in nested blocks (should trigger)', () =>
  runnerTest(
    rulesId,
    `
function test(value) {
  if (value) {
    if (value > 0) {
      const x = 1
    }
  }
  return "default"
}`,
    1
  ))

Deno.test('function with single if statement (should not trigger)', () =>
  runnerTest(
    rulesId,
    `
function test(value) {
  if (value) {
    return "truthy"
  }
  return "default"
}`,
    0
  ))

Deno.test('generator function with nested conditions (should trigger)', () =>
  runnerTest(
    rulesId,
    `
function* test(value) {
  if (value) {
    if (value > 0) {
      yield "positive"
    }
  }
  yield "default"
}`,
    1
  ))

Deno.test('multiple functions with mixed nesting patterns', () =>
  runnerTest(
    rulesId,
    `
function test1(value) {
  if (value) {
    if (value > 0) {
      return "positive"
    }
  }
  return "default"
}

const test2 = function(value) {
  if (value) {
    return "truthy"
  }
  return "falsy"
}

const test3 = (value) => {
  if (value) {
    if (value > 0) {
      return "positive"
    }
  }
  return "default"
}`,
    2
  ))

Deno.test('static class method with nested conditions (should trigger)', () =>
  runnerTest(
    rulesId,
    `
class Test {
  static method(value) {
    if (value) {
      if (value > 0) {
        return "positive"
      }
    }
    return "default"
  }
}`,
    1
  ))

Deno.test('verify auto-fix for arrow function', () =>
  verifyAutoFix(
    rulesId,
    `
const test = (value) => {
  if (value) {
    if (value > 0) {
      return "positive"
    }
  }
  return "default"
}`,
    `if (!value) {
  return
}

if (value > 0) {
    return "positive"
  }`,
    'Arrow function auto-fix test'
  ))

Deno.test('verify auto-fix for async function', () =>
  verifyAutoFix(
    rulesId,
    `
async function test(value) {
  if (value) {
    if (value > 0) {
      return "positive"
    }
  }
  return "default"
}`,
    `if (!value) {
  return
}

if (value > 0) {
    return "positive"
  }`,
    'Async function auto-fix test'
  ))

Deno.test('verify auto-fix for class method', () =>
  verifyAutoFix(
    rulesId,
    `
class Test {
  method(value) {
    if (value) {
      if (value > 0) {
        return "positive"
      }
    }
    return "default"
  }
}`,
    `if (!value) {
  return
}

if (value > 0) {
      return "positive"
    }`,
    'Class method auto-fix test'
  ))

Deno.test('verify auto-fix for complex condition', () =>
  verifyAutoFix(
    rulesId,
    `
function test(user) {
  if (user && user.isActive) {
    if (user.role === "admin") {
      return "authorized"
    }
  }
  return "unauthorized"
}`,
    `if (!(user && user.isActive)) {
  return
}

if (user.role === "admin") {
    return "authorized"
  }`,
    'Complex condition auto-fix test'
  ))

Deno.test('verify auto-fix for deeply nested conditions', () =>
  verifyAutoFix(
    rulesId,
    `
function test(value) {
  if (value) {
    if (value > 0) {
      if (value > 10) {
        return "large"
      }
    }
  }
  return "default"
}`,
    `if (!value) {
  return
}

if (value > 0) {
    if (value > 10) {
      return "large"
    }
  }`,
    'Deeply nested conditions auto-fix test'
  ))

Deno.test('verify auto-fix for function expression', () =>
  verifyAutoFix(
    rulesId,
    `
const test = function(value) {
  if (value) {
    if (value > 0) {
      return "positive"
    }
  }
  return "default"
}`,
    `if (!value) {
  return
}

if (value > 0) {
    return "positive"
  }`,
    'Function expression auto-fix test'
  ))

Deno.test('verify auto-fix for nested if in alternate', () =>
  verifyAutoFix(
    rulesId,
    `
function test(value) {
  if (value) {
    return "truthy"
  } else {
    if (value === 0) {
      return "zero"
    }
  }
  return "default"
}`,
    `if (!value) {
  return
}

return "truthy"

{
    if (value === 0) {
      return "zero"
    }
  }`,
    'Nested if in alternate auto-fix test'
  ))

Deno.test('verify auto-fix for simple nested if in consequent', () =>
  verifyAutoFix(
    rulesId,
    `
function test(value) {
  if (value) {
    if (value > 0) {
      return "positive"
    }
  }
  return "default"
}`,
    `if (!value) {
  return
}

if (value > 0) {
    return "positive"
  }`,
    'Simple nested if in consequent auto-fix test'
  ))
