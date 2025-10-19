import { runnerTest, verifyAutoFix } from '@tests/index.ts'

const rulesId = 'deno-lint/prefer-template-literals'

Deno.test('complex string concatenation with multiple parts', () =>
  runnerTest(rulesId, 'const message = "User " + user.name + " has " + count + " items"', 1))

Deno.test('nested string concatenation', () =>
  runnerTest(rulesId, 'const message = "Hello " + (firstName + " " + lastName)', 1))

Deno.test('simple string concatenation with expressions only (should not trigger)', () =>
  runnerTest(rulesId, 'const result = a + b', 0))

Deno.test('simple string concatenation with literals only (should not trigger)', () =>
  runnerTest(rulesId, 'const message = "Hello " + "World"', 0))

Deno.test('simple string concatenation with variables', () =>
  runnerTest(rulesId, 'const message = "Hello " + name + "!"', 1))

Deno.test('string concatenation in array element', () =>
  runnerTest(rulesId, 'const arr = ["prefix " + value + " suffix"]', 1))

Deno.test('string concatenation in arrow function', () =>
  runnerTest(rulesId, 'const greet = (name) => "Hello " + name + "!"', 1))

Deno.test('string concatenation in assignment', () =>
  runnerTest(rulesId, 'user.fullName = user.firstName + " " + user.lastName', 1))

Deno.test('string concatenation in class method', () =>
  runnerTest(rulesId, 'class User { greet() { return "Hello " + this.name + "!" } }', 1))

Deno.test('string concatenation in do-while loop', () =>
  runnerTest(rulesId, 'do { message = "Iteration " + i + " of " + total } while (condition)', 1))

Deno.test('string concatenation in do-while statement', () =>
  runnerTest(rulesId, 'do { const message = "Do: " + value } while (condition)', 1))

Deno.test('string concatenation in for loop', () =>
  runnerTest(
    rulesId,
    'for (let i = 0; i < items.length; i++) { console.log("Item " + i + ": " + items[i]) }',
    1
  ))

Deno.test('string concatenation in for statement', () =>
  runnerTest(rulesId, 'for (let i = 0; i < 10; i++) { const message = "For: " + i }', 1))

Deno.test('string concatenation in for-in loop', () =>
  runnerTest(
    rulesId,
    'for (const key in obj) { console.log("Key: " + key + " = " + obj[key]) }',
    1
  ))

Deno.test('string concatenation in for-in statement', () =>
  runnerTest(rulesId, 'for (const key in obj) { const message = "For-in: " + key }', 1))

Deno.test('string concatenation in for-of loop', () =>
  runnerTest(
    rulesId,
    'for (const item of items) { console.log("Item: " + item + " processed") }',
    1
  ))

Deno.test('string concatenation in for-of statement', () =>
  runnerTest(rulesId, 'for (const item of items) { const message = "For-of: " + item }', 1))

Deno.test('string concatenation in for-await-of statement', () =>
  runnerTest(
    rulesId,
    'for await (const item of asyncItems) { const message = "For-await-of: " + item }',
    1
  ))

Deno.test('string concatenation in function call', () =>
  runnerTest(rulesId, 'console.log("User: " + user.name + " logged in")', 1))

Deno.test('string concatenation in if statement', () =>
  runnerTest(rulesId, 'if (message === "Error: " + error.message) { /* handle */ }', 1))

Deno.test('string concatenation in if-else statement', () =>
  runnerTest(
    rulesId,
    'if (condition) { const message = "If: " + value } else { const message = "Else: " + other }',
    2
  ))

Deno.test('string concatenation in object property', () =>
  runnerTest(rulesId, 'const obj = { message: "Hello " + name + "!" }', 1))

Deno.test('string concatenation in regular function', () =>
  runnerTest(rulesId, 'function greet(name) { return "Hello " + name + "!" }', 1))

Deno.test('string concatenation in return statement', () =>
  runnerTest(rulesId, 'return "Error: " + error.message + " occurred"', 1))

Deno.test('string concatenation in switch case', () =>
  runnerTest(rulesId, 'switch (status) { case "Status: " + value: break }', 1))

Deno.test('string concatenation in try-catch', () =>
  runnerTest(rulesId, 'try { throw new Error("Error: " + message) } catch (e) { /* handle */ }', 1))

Deno.test('string concatenation in try-catch-finally', () =>
  runnerTest(
    rulesId,
    'try { const message = "Try: " + value } catch (e) { const message = "Catch: " + e } finally { const message = "Finally: " + value }',
    3
  ))

Deno.test('string concatenation in while loop', () =>
  runnerTest(rulesId, 'while (condition) { message = "Count: " + count + " and " + value }', 1))

Deno.test('string concatenation in while statement', () =>
  runnerTest(rulesId, 'while (condition) { const message = "While: " + value }', 1))

Deno.test('string concatenation with arithmetic operators', () =>
  runnerTest(rulesId, 'const message = "Math: " + (a + b) + " and " + (c * d)', 1))

Deno.test('string concatenation with array access', () =>
  runnerTest(rulesId, 'const message = "Item: " + items[0] + " at index " + index', 1))

Deno.test('string concatenation with arrow function expressions', () =>
  runnerTest(rulesId, 'const fn = () => "Result: " + value + " done"', 1))

Deno.test('string concatenation with assignment operators', () =>
  runnerTest(rulesId, 'let message = "Start"; message += " " + value + " end"', 1))

Deno.test('string concatenation with async functions', () =>
  runnerTest(rulesId, 'async function process() { return "Processing " + item + "..." }', 1))

Deno.test('string concatenation with await keyword', () =>
  runnerTest(
    rulesId,
    'async function test() { return "Awaited: " + await promise + " and " + await other }',
    1
  ))

Deno.test('string concatenation with backticks in string', () =>
  runnerTest(rulesId, 'const message = "Value: `" + value + "`"', 1))

Deno.test('string concatenation with bitwise operators', () =>
  runnerTest(rulesId, 'const message = "Binary: " + (a & b) + " and " + (c | d)', 1))

Deno.test('string concatenation with boolean values', () =>
  runnerTest(rulesId, 'const message = "Status: " + (isActive ? "active" : "inactive")', 1))

Deno.test('string concatenation with break statement', () =>
  runnerTest(rulesId, 'break; const message = "Break: " + value + " and " + other', 1))

Deno.test('string concatenation with class constructors', () =>
  runnerTest(rulesId, 'class User { constructor(name) { this.name = "User: " + name } }', 1))

Deno.test('string concatenation with comparison operators', () =>
  runnerTest(rulesId, 'const message = "Comparison: " + (a > b) + " and " + (c === d)', 1))

Deno.test('string concatenation with complex expressions', () =>
  runnerTest(rulesId, 'const message = "Result: " + (a + b) + " and " + (c * d)', 1))

Deno.test('string concatenation with computed properties', () =>
  runnerTest(rulesId, 'const obj = { ["key" + index]: "Value: " + value }', 2))

Deno.test('string concatenation with continue statement', () =>
  runnerTest(rulesId, 'continue; const message = "Continue: " + value + " and " + other', 1))

Deno.test('string concatenation with debugger statement', () =>
  runnerTest(rulesId, 'debugger; const message = "Debug: " + value + " and " + other', 1))

Deno.test('string concatenation with default parameters', () =>
  runnerTest(rulesId, 'function greet(name = "World") { return "Hello " + name + "!" }', 1))

Deno.test('string concatenation with delete operator', () =>
  runnerTest(
    rulesId,
    'const message = "Deleted: " + delete obj.prop + " and " + delete other.key',
    1
  ))

Deno.test('string concatenation with destructuring', () =>
  runnerTest(rulesId, 'const { message } = { message: "Hello " + name + "!" }', 1))

Deno.test('string concatenation with dollar signs in string', () =>
  runnerTest(rulesId, 'const message = "Price: $" + price + ".00"', 1))

Deno.test('string concatenation with empty string', () =>
  runnerTest(rulesId, 'const message = "" + value + " suffix"', 1))

Deno.test('string concatenation with escaped characters', () =>
  runnerTest(rulesId, 'const message = "Escaped: " + "\\t\\n\\r" + " and " + value', 1))

Deno.test('string concatenation with export expressions', () =>
  runnerTest(rulesId, 'export const message = "Exported: " + value + " and " + other', 1))

Deno.test('string concatenation with function calls', () =>
  runnerTest(rulesId, 'const message = "Result: " + getValue() + " units"', 1))

Deno.test('string concatenation with function expressions', () =>
  runnerTest(rulesId, 'const fn = function() { return "Result: " + value + " done" }', 1))

Deno.test('string concatenation with generator functions', () =>
  runnerTest(rulesId, 'function* generate() { yield "Generated " + value + " item" }', 1))

Deno.test('string concatenation with getters', () =>
  runnerTest(rulesId, 'class User { get displayName() { return "User: " + this.name } }', 1))

Deno.test('string concatenation with import expressions', () =>
  runnerTest(
    rulesId,
    'const message = "Module: " + import.meta.url + " and " + import.meta.main',
    1
  ))

Deno.test('string concatenation with in operator', () =>
  runnerTest(
    rulesId,
    'const message = "Property: " + ("prop" in obj) + " and " + ("other" in other)',
    1
  ))

Deno.test('string concatenation with increment/decrement', () =>
  runnerTest(rulesId, 'const message = "Count: " + (++count) + " and " + (--total)', 1))

Deno.test('string concatenation with instanceof operator', () =>
  runnerTest(
    rulesId,
    'const message = "Instance: " + (obj instanceof Array) + " and " + (other instanceof Object)',
    1
  ))

Deno.test('string concatenation with label statement', () =>
  runnerTest(rulesId, 'label: { const message = "Label: " + value + " and " + other }', 1))

Deno.test('string concatenation with logical operators', () =>
  runnerTest(
    rulesId,
    'const message = "Status: " + (isActive && "active") + " or " + (!isActive && "inactive")',
    1
  ))

Deno.test('string concatenation with method calls', () =>
  runnerTest(rulesId, 'const message = "User: " + user.getName() + " (ID: " + user.id + ")"', 1))

Deno.test('string concatenation with mixed types but no string literals (should not trigger)', () =>
  runnerTest(rulesId, 'const result = a + b + "c"', 1))

Deno.test('string concatenation with multiple violations', () =>
  runnerTest(
    rulesId,
    'const msg1 = "Hello " + name; const msg2 = "World " + value; const msg3 = "Test " + result',
    3
  ))

Deno.test('string concatenation with nested violations', () =>
  runnerTest(rulesId, 'const message = "Outer " + ("Inner " + value + " end") + " outer"', 1))

Deno.test('string concatenation with new operator', () =>
  runnerTest(rulesId, 'const message = "Instance: " + new Date() + " and " + new Error("test")', 1))

Deno.test('string concatenation with newlines', () =>
  runnerTest(rulesId, 'const message = "Line 1\\n" + value + "\\nLine 3"', 1))

Deno.test('string concatenation with null/undefined', () =>
  runnerTest(rulesId, 'const message = "Value: " + (value ?? "default")', 1))

Deno.test('string concatenation with nullish coalescing', () =>
  runnerTest(rulesId, 'const message = "Value: " + (value ?? "default") + " units"', 1))

Deno.test('string concatenation with numbers only (should not trigger)', () =>
  runnerTest(rulesId, 'const result = a + b + c', 0))

Deno.test('string concatenation with object property', () =>
  runnerTest(rulesId, 'const message = "Value: " + obj.prop + " and " + obj.other', 1))

Deno.test('string concatenation with optional chaining', () =>
  runnerTest(rulesId, 'const message = "User: " + user?.name + " (ID: " + user?.id + ")"', 1))

Deno.test('string concatenation with property access', () =>
  runnerTest(rulesId, 'const message = "Value: " + obj.prop + " and " + obj.other', 1))

Deno.test('string concatenation with quotes', () =>
  runnerTest(rulesId, 'const message = "He said \\"Hello\\" to " + name', 1))

Deno.test('string concatenation with rest parameters', () =>
  runnerTest(rulesId, 'function log(...args) { console.log("Args: " + args.join(", ")) }', 1))

Deno.test('string concatenation with return statement', () =>
  runnerTest(rulesId, 'return "Return: " + value + " and " + other', 1))

Deno.test('string concatenation with setters', () =>
  runnerTest(rulesId, 'class User { set fullName(value) { this.name = "Full: " + value } }', 1))

Deno.test('string concatenation with single string literal (should not trigger)', () =>
  runnerTest(rulesId, 'const message = "Hello World"', 0))

Deno.test('string concatenation with single variable (should not trigger)', () =>
  runnerTest(rulesId, 'const message = name', 0))

Deno.test('string concatenation with special characters', () =>
  runnerTest(rulesId, 'const message = "Special chars: " + "!@#$%^&*()" + " and " + value', 1))

Deno.test('string concatenation with spread operator', () =>
  runnerTest(rulesId, 'const arr = ["prefix", ...items, "suffix " + value]', 1))

Deno.test('string concatenation with static methods', () =>
  runnerTest(rulesId, 'class Utils { static format(value) { return "Formatted: " + value } }', 1))

Deno.test('string concatenation with super keyword', () =>
  runnerTest(rulesId, 'const message = "Super: " + super.method() + " and " + super.property', 1))

Deno.test('string concatenation with switch statement', () =>
  runnerTest(
    rulesId,
    'switch (value) { case "Case: " + other: const message = "Switch: " + value }',
    2
  ))

Deno.test('string concatenation with template literal (should not trigger)', () =>
  runnerTest(rulesId, 'const message = `Hello ${name}!`', 0))

Deno.test('string concatenation with template literal already present (should not trigger)', () =>
  runnerTest(rulesId, 'const message = `Hello ${name}` + " and " + other', 1))

Deno.test('string concatenation with ternary operator', () =>
  runnerTest(rulesId, 'const message = "Status: " + (isActive ? "active" : "inactive")', 1))

Deno.test('string concatenation with this keyword', () =>
  runnerTest(rulesId, 'const message = "This: " + this.name + " and " + this.value', 1))

Deno.test('string concatenation with throw statement', () =>
  runnerTest(rulesId, 'throw new Error("Throw: " + value + " and " + other)', 1))

Deno.test('string concatenation with type coercion', () =>
  runnerTest(
    rulesId,
    'const message = "Number: " + String(num) + " is " + (num > 0 ? "positive" : "negative")',
    1
  ))

Deno.test('string concatenation with typeof operator', () =>
  runnerTest(rulesId, 'const message = "Type: " + typeof value + " and " + typeof other', 1))

Deno.test('string concatenation with unicode characters', () =>
  runnerTest(rulesId, 'const message = "Unicode: " + "🚀" + " and " + value + " 🌟"', 1))

Deno.test('string concatenation with very long expressions', () =>
  runnerTest(
    rulesId,
    'const message = "This is a very long message that contains " + user.firstName + " " + user.lastName + " and their age is " + user.age + " years old and they live in " + user.address.city + ", " + user.address.state',
    1
  ))

Deno.test('string concatenation with void operator', () =>
  runnerTest(rulesId, 'const message = "Void: " + void 0 + " and " + void value', 1))

Deno.test('string concatenation with whitespace only', () =>
  runnerTest(rulesId, 'const message = " " + value + " "', 1))

Deno.test('string concatenation with with statement', () =>
  runnerTest(rulesId, 'with (obj) { const message = "With: " + prop + " and " + other }', 1))

Deno.test('string concatenation with yield keyword', () =>
  runnerTest(rulesId, 'function* gen() { yield "Yielded: " + value + " and " + other }', 1))

Deno.test('verify auto-fix for nested string concatenation', () =>
  verifyAutoFix(
    rulesId,
    'const message = "Hello " + (firstName + " " + lastName)',
    '`Hello ${firstName} ${lastName}`',
    'Nested string concatenation auto-fix test'
  ))

Deno.test('verify auto-fix for simple string concatenation', () =>
  verifyAutoFix(
    rulesId,
    'const message = "Hello " + name + "!"',
    '`Hello ${name}!`',
    'Simple string concatenation auto-fix test'
  ))

Deno.test('verify auto-fix for string concatenation with array access', () =>
  verifyAutoFix(
    rulesId,
    'const message = "Item: " + items[0] + " at index " + index',
    '`Item: ${items[0]} at index ${index}`',
    'String concatenation with array access auto-fix test'
  ))

Deno.test('verify auto-fix for string concatenation with empty string', () =>
  verifyAutoFix(
    rulesId,
    'const message = "" + value + " suffix"',
    '`${value} suffix`',
    'String concatenation with empty string auto-fix test'
  ))

Deno.test('verify auto-fix for string concatenation with function calls', () =>
  verifyAutoFix(
    rulesId,
    'const message = "Result: " + getValue() + " units"',
    '`Result: ${getValue()} units`',
    'String concatenation with function calls auto-fix test'
  ))

Deno.test('verify auto-fix for string concatenation with method calls', () =>
  verifyAutoFix(
    rulesId,
    'const message = "User: " + user.getName() + " (ID: " + user.id + ")"',
    '`User: ${user.getName()} (ID: ${user.id})`',
    'String concatenation with method calls auto-fix test'
  ))

Deno.test('verify auto-fix for string concatenation with newlines', () =>
  verifyAutoFix(
    rulesId,
    'const message = "Line 1\\n" + value + "\\nLine 3"',
    '`Line 1\\n${value}\\nLine 3`',
    'String concatenation with newlines auto-fix test'
  ))

Deno.test('verify auto-fix for string concatenation with property access', () =>
  verifyAutoFix(
    rulesId,
    'const message = "Value: " + obj.prop + " and " + obj.other',
    '`Value: ${obj.prop} and ${obj.other}`',
    'String concatenation with property access auto-fix test'
  ))

Deno.test('verify auto-fix for string concatenation with ternary operator', () =>
  verifyAutoFix(
    rulesId,
    'const message = "Status: " + (isActive ? "active" : "inactive")',
    '`Status: ${isActive ? "active" : "inactive"}`',
    'String concatenation with ternary operator auto-fix test'
  ))

Deno.test('verify auto-fix for string concatenation with whitespace only', () =>
  verifyAutoFix(
    rulesId,
    'const message = " " + value + " "',
    '` ${value} `',
    'String concatenation with whitespace only auto-fix test'
  ))

Deno.test('verify auto-fix for complex string concatenation', () =>
  verifyAutoFix(
    rulesId,
    'const message = "User " + user.name + " has " + count + " items"',
    '`User ${user.name} has ${count} items`',
    'Complex string concatenation auto-fix test'
  ))
