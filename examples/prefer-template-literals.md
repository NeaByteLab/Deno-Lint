# Expected Behavior: `prefer-template-literals` Rule

This rule enforces the use of template literals over string concatenation when both string literals and expressions are present.

## ❌ Invalid Examples

```typescript
// Simple string concatenation with variables
const message = 'Hello ' + name + '!'
const greeting = 'Welcome ' + user.name + '!'
const status = 'User ' + user.id + ' is ' + user.status

// Complex string concatenation with multiple parts
const result = 'User ' + user.name + ' has ' + count + ' items'
const url = 'https://api.example.com/users/' + userId + '/posts/' + postId
const log = '[' + new Date().toISOString() + '] ' + level + ': ' + message

// String concatenation with function calls
const output = 'Result: ' + getValue() + ' units'
const error = 'Error in ' + getFunctionName() + ': ' + error.message
const summary = 'Total: ' + calculateTotal() + ' items processed'

// String concatenation with method calls
const info = 'User: ' + user.getName() + ' (ID: ' + user.id + ')'
const path = 'File: ' + file.getPath() + ' (Size: ' + file.getSize() + ' bytes)'

// String concatenation with property access
const details = 'Value: ' + obj.prop + ' and ' + obj.other
const config = 'API: ' + settings.apiUrl + ' Timeout: ' + settings.timeout

// String concatenation with array access
const item = 'Item: ' + items[0] + ' at index ' + index
const selection = 'Selected: ' + options[selectedIndex] + ' from ' + options.length + ' options'

// String concatenation with ternary operator
const status = 'Status: ' + (isActive ? 'active' : 'inactive')
const result = 'Operation ' + (success ? 'succeeded' : 'failed') + ' in ' + duration + 'ms'

// String concatenation with empty string
const prefix = '' + value + ' suffix'
const suffix = 'prefix ' + value + ''

// String concatenation with whitespace
const spaced = ' ' + value + ' '
const padded = '  ' + text + '  '

// String concatenation with newlines
const multiline = 'Line 1\n' + value + '\nLine 3'
const formatted = 'Header:\n' + content + '\nFooter'

// String concatenation with quotes and special characters
const quoted = 'He said "' + message + '" to me'
const backticks = 'Code: `' + code + '`'
const dollars = 'Price: $' + price + '.00'

// Nested string concatenation
const nested = 'Hello ' + (firstName + ' ' + lastName)
const complex = 'User ' + (user.firstName + ' ' + user.lastName) + ' has ' + count + ' items'

// String concatenation in various contexts
function createMessage(name: string) {
  return 'Hello ' + name + '!'
}

const handler = (event: Event) => {
  console.log('Event: ' + event.type + ' at ' + new Date().toISOString())
}

class Logger {
  log(level: string, message: string) {
    return '[' + new Date().toISOString() + '] ' + level + ': ' + message
  }
}

// String concatenation in object properties
const config = {
  apiUrl: 'https://api.example.com/v' + version,
  timeout: 'Request timeout: ' + timeout + 'ms'
}

// String concatenation in array elements
const messages = ['Error: ' + error.message, 'Warning: ' + warning.text, 'Info: ' + info.content]

// String concatenation in conditional statements
if (isDebug) {
  console.log('Debug: ' + variable + ' = ' + value)
}

// String concatenation in loops
for (let i = 0; i < items.length; i++) {
  console.log('Item ' + i + ': ' + items[i])
}

// String concatenation in try-catch blocks
try {
  const result = processData()
  console.log('Success: ' + result)
} catch (error) {
  console.log('Error: ' + error.message)
}
```

## ✅ Valid Examples

```typescript
// Template literals (preferred)
const message = `Hello ${name}!`
const greeting = `Welcome ${user.name}!`
const status = `User ${user.id} is ${user.status}`

// Complex template literals
const result = `User ${user.name} has ${count} items`
const url = `https://api.example.com/users/${userId}/posts/${postId}`
const log = `[${new Date().toISOString()}] ${level}: ${message}`

// Template literals with function calls
const output = `Result: ${getValue()} units`
const error = `Error in ${getFunctionName()}: ${error.message}`
const summary = `Total: ${calculateTotal()} items processed`

// Template literals with method calls
const info = `User: ${user.getName()} (ID: ${user.id})`
const path = `File: ${file.getPath()} (Size: ${file.getSize()} bytes)`

// Template literals with property access
const details = `Value: ${obj.prop} and ${obj.other}`
const config = `API: ${settings.apiUrl} Timeout: ${settings.timeout}`

// Template literals with array access
const item = `Item: ${items[0]} at index ${index}`
const selection = `Selected: ${options[selectedIndex]} from ${options.length} options`

// Template literals with ternary operator
const status = `Status: ${isActive ? 'active' : 'inactive'}`
const result = `Operation ${success ? 'succeeded' : 'failed'} in ${duration}ms`

// Template literals with empty string
const prefix = `${value} suffix`
const suffix = `prefix ${value}`

// Template literals with whitespace
const spaced = ` ${value} `
const padded = `  ${text}  `

// Template literals with newlines
const multiline = `Line 1\n${value}\nLine 3`
const formatted = `Header:\n${content}\nFooter`

// Template literals with quotes and special characters
const quoted = `He said "${message}" to me`
const backticks = `Code: \`${code}\``
const dollars = `Price: $${price}.00`

// Nested template literals
const nested = `Hello ${firstName} ${lastName}`
const complex = `User ${user.firstName} ${user.lastName} has ${count} items`

// Template literals in various contexts
function createMessage(name: string) {
  return `Hello ${name}!`
}

const handler = (event: Event) => {
  console.log(`Event: ${event.type} at ${new Date().toISOString()}`)
}

class Logger {
  log(level: string, message: string) {
    return `[${new Date().toISOString()}] ${level}: ${message}`
  }
}

// Template literals in object properties
const config = {
  apiUrl: `https://api.example.com/v${version}`,
  timeout: `Request timeout: ${timeout}ms`
}

// Template literals in array elements
const messages = [`Error: ${error.message}`, `Warning: ${warning.text}`, `Info: ${info.content}`]

// Template literals in conditional statements
if (isDebug) {
  console.log(`Debug: ${variable} = ${value}`)
}

// Template literals in loops
for (let i = 0; i < items.length; i++) {
  console.log(`Item ${i}: ${items[i]}`)
}

// Template literals in try-catch blocks
try {
  const result = processData()
  console.log(`Success: ${result}`)
} catch (error) {
  console.log(`Error: ${error.message}`)
}

// Pure string literals (not affected by this rule)
const message = 'Hello World'
const greeting = 'Welcome to our app'
const staticText = 'This is a static message'

// Pure expressions (not affected by this rule)
const result = a + b
const sum = x + y + z
const calculation = a * b + c / d

// Already using template literals (not affected by this rule)
const message = `Hello ${name}!`
const status = `User ${user.id} is ${user.status}`

// String concatenation with only string literals (not affected by this rule)
const message = 'Hello ' + 'World'
const greeting = 'Welcome ' + 'to ' + 'our ' + 'app'

// String concatenation with only expressions (not affected by this rule)
const result = a + b + c
const sum = x + y + z
```

## Rule Scope

This rule **only applies to**:

- ✅ String concatenation using `+` operator where **both** string literals and expressions are present
- ✅ Binary expressions with `+` operator that contain at least one string literal and one non-literal expression

This rule **does NOT apply to**:

- ❌ Pure string literals (`"hello" + "world"`)
- ❌ Pure expressions (`a + b + c`)
- ❌ Single string literals (`"Hello World"`)
- ❌ Single variables (`name`)
- ❌ Already using template literals (`` `Hello ${name}!` ``)
- ❌ String concatenation with only string literals
- ❌ String concatenation with only expressions

## Auto-fix Behavior

The rule provides auto-fix suggestions that convert string concatenation to template literals:

- `"Hello " + name + "!"` → `` `Hello ${name}!` ``
- `"User " + user.name + " has " + count + " items"` → `` `User ${user.name} has ${count} items` ``
- `"Result: " + getValue() + " units"` → `` `Result: ${getValue()} units` ``
- `"" + value + " suffix"` → `` `${value} suffix` ``
- `"Line 1\n" + value + "\nLine 3"` → `` `Line 1\n${value}\nLine 3` ``

The auto-fix properly handles:

- **String escaping** - Escapes backticks and dollar signs in string literals
- **Nested concatenations** - Converts complex nested expressions correctly
- **Special characters** - Preserves newlines, quotes, and other special characters
- **Complex expressions** - Handles function calls, property access, ternary operators, etc.
