# Expected Behavior: `prefer-template-literals` Rule

This rule enforces the use of template literals over string concatenation when both string literals and expressions are present.

## Examples

### Basic String Concatenation

```diff
- const message = 'Hello ' + name + '!'
- const greeting = 'Welcome ' + user.name + '!'
- const status = 'User ' + user.id + ' is ' + user.status
+ const message = `Hello ${name}!`
+ const greeting = `Welcome ${user.name}!`
+ const status = `User ${user.id} is ${user.status}`
```

### Complex Concatenation

```diff
- const result = 'User ' + user.name + ' has ' + count + ' items'
- const url = 'https://api.example.com/users/' + userId + '/posts/' + postId
- const log = '[' + new Date().toISOString() + '] ' + level + ': ' + message
+ const result = `User ${user.name} has ${count} items`
+ const url = `https://api.example.com/users/${userId}/posts/${postId}`
+ const log = `[${new Date().toISOString()}] ${level}: ${message}`
```

### Function Calls

```diff
- const output = 'Result: ' + getValue() + ' units'
- const error = 'Error in ' + getFunctionName() + ': ' + error.message
- const summary = 'Total: ' + calculateTotal() + ' items processed'
+ const output = `Result: ${getValue()} units`
+ const error = `Error in ${getFunctionName()}: ${error.message}`
+ const summary = `Total: ${calculateTotal()} items processed`
```

### Function Returns

```diff
- function createMessage(name: string) {
-   return 'Hello ' + name + '!'
- }
-
- const handler = (event: Event) => {
-   console.log('Event: ' + event.type + ' at ' + new Date().toISOString())
- }
+ function createMessage(name: string) {
+   return `Hello ${name}!`
+ }
+
+ const handler = (event: Event) => {
+   console.log(`Event: ${event.type} at ${new Date().toISOString()}`)
+ }
```

### Object Properties

```diff
- const config = {
-   apiUrl: 'https://api.example.com/v' + version,
-   timeout: 'Request timeout: ' + timeout + 'ms'
- }
+ const config = {
+   apiUrl: `https://api.example.com/v${version}`,
+   timeout: `Request timeout: ${timeout}ms`
+ }
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
