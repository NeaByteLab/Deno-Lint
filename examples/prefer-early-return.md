# Expected Behavior: `prefer-early-return` Rule

This rule enforces the use of early returns over nested conditions to improve code readability and reduce nesting levels.

## Examples

### Basic Nested Conditions

```diff
- function processUser(user) {
-   if (user) {
-     if (user.isActive) {
-       if (user.role === 'admin') {
-         return 'authorized'
-       }
-     }
-   }
-   return 'unauthorized'
- }
+ function processUser(user) {
+   if (!user) {
+     return 'unauthorized'
+   }
+
+   if (!user.isActive) {
+     return 'unauthorized'
+   }
+
+   if (user.role === 'admin') {
+     return 'authorized'
+   }
+
+   return 'unauthorized'
+ }
```

### Arrow Function with Nested Conditions

```diff
- const validateInput = input => {
-   if (input) {
-     if (typeof input === 'string') {
-       if (input.length > 0) {
-         return true
-       }
-     }
-   }
-   return false
- }
+ const validateInput = input => {
+   if (!input) {
+     return false
+   }
+
+   if (typeof input !== 'string') {
+     return false
+   }
+
+   if (input.length <= 0) {
+     return false
+   }
+
+   return true
+ }
```

### Async Function with Nested Conditions

```diff
- async function uploadFile(file) {
-   if (file) {
-     if (file.size > 0) {
-       if (file.type === 'image/jpeg') {
-         return await uploadToServer(file)
-       }
-     }
-   }
-   throw new Error('Invalid file')
- }
+ async function uploadFile(file) {
+   if (!file) {
+     throw new Error('Invalid file')
+   }
+
+   if (file.size <= 0) {
+     throw new Error('Invalid file')
+   }
+
+   if (file.type !== 'image/jpeg') {
+     throw new Error('Invalid file')
+   }
+
+   return await uploadToServer(file)
+ }
```

### Class Method with Nested Conditions

```diff
- class UserService {
-   async fetchUser(id) {
-     if (id) {
-       if (typeof id === 'string') {
-         if (id.length > 0) {
-           return await this.api.getUser(id)
-         }
-       }
-     }
-     throw new Error('Invalid ID')
-   }
- }
+ class UserService {
+   async fetchUser(id) {
+     if (!id) {
+       throw new Error('Invalid ID')
+     }
+
+     if (typeof id !== 'string') {
+       throw new Error('Invalid ID')
+     }
+
+     if (id.length <= 0) {
+       throw new Error('Invalid ID')
+     }
+
+     return await this.api.getUser(id)
+   }
+ }
```

### Complex Nested Conditions

```diff
- function validateUser(user) {
-   if (user && user.isActive) {
-     if (user.role === 'admin' || user.role === 'moderator') {
-       if (user.permissions && user.permissions.length > 0) {
-         return 'authorized'
-       }
-     }
-   }
-   return 'unauthorized'
- }
+ function validateUser(user) {
+   if (!(user && user.isActive)) {
+     return 'unauthorized'
+   }
+
+   if (!(user.role === 'admin' || user.role === 'moderator')) {
+     return 'unauthorized'
+   }
+
+   if (!(user.permissions && user.permissions.length > 0)) {
+     return 'unauthorized'
+   }
+
+   return 'authorized'
+ }
```

## Rule Scope

This rule **only applies to**:

- ✅ Functions with **nested if statements** (if inside if)
- ✅ Functions where the **first top-level if statement** contains nested conditions
- ✅ All function types: declarations, expressions, arrow functions, class methods, async functions, generator functions
- ✅ Both `consequent` and `alternate` branches of if statements

This rule **does NOT apply to**:

- ❌ Single if statements without nesting
- ❌ If-else statements without nesting
- ❌ Functions with no if statements
- ❌ Arrow functions with single expressions
- ❌ Arrow functions with single if statements
- ❌ Functions where only inner if statements have nesting (not the first one)

## Auto-fix Behavior

> **Note**: The auto-fix does not handle indentation automatically. You may need to run your code formatter (like `deno fmt`) after applying the auto-fix to ensure proper indentation.

The rule provides auto-fix suggestions that convert nested conditions to early returns:

- **Simple nesting**: `if (value) { if (value > 0) { return "positive" } }` → Early return pattern
- **Complex conditions**: `if (user && user.isActive) { if (user.role === "admin") { return "authorized" } }` → Early return pattern
- **Nested in else**: `if (value) { return "truthy" } else { if (value === 0) { return "zero" } }` → Early return pattern
- **Deep nesting**: `if (obj) { if (obj.user) { if (obj.user.profile) { return "valid" } } }` → Early return pattern
