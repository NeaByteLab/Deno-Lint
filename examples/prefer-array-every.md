# Expected Behavior: `prefer-array-every` Rule

This rule enforces the use of `Array.every()` over manual for loops that return `false` when a condition is not met.

## Examples

### Basic Array Validation

```diff
- function validateUsers(users) {
-   for (let i = 0; i < users.length; i++) {
-     if (!users[i].isActive) {
-       return false
-     }
-   }
-   return true
- }
+ function validateUsers(users) {
+   return users.every(user => user.isActive)
+ }
```

### Number Array Validation

```diff
- function checkNumbers(numbers) {
-   for (let i = 0; i < numbers.length; i++) {
-     if (numbers[i] <= 0) {
-       return false
-     }
-   }
-   return true
- }
+ function checkNumbers(numbers) {
+   return numbers.every(number => number > 0)
+ }
```

### Method Call Validation

```diff
- function processItems(items) {
-   for (let i = 0; i < items.length; i++) {
-     if (!items[i].isValid()) {
-       return false
-     }
-   }
-   return true
- }
+ function processItems(items) {
+   return items.every(item => item.isValid())
+ }
```

### Complex Condition Validation

```diff
- function validateComplex(items) {
-   for (let i = 0; i < items.length; i++) {
-     if (!items[i].active || items[i].value <= threshold) {
-       return false
-     }
-   }
-   return true
- }
+ function validateComplex(items) {
+   return items.every(item => item.active && item.value > threshold)
+ }
```

### Property Access Validation

```diff
- function checkUsers(users) {
-   for (let i = 0; i < users.length; i++) {
-     if (!users[i].profile.isActive) {
-       return false
-     }
-   }
-   return true
- }
+ function checkUsers(users) {
+   return users.every(user => user.profile.isActive)
+ }
```

## Rule Scope

This rule **only applies to**:

- ✅ For loops that contain a `return false` statement
- ✅ For loops where the return false is inside an if statement
- ✅ For loops that return `true` at the end (indicating all items passed validation)

This rule **does NOT apply to**:

- ❌ For loops that don't return `false`
- ❌ For loops that use `break` instead of `return false`
- ❌ For loops that return `true` in the middle (not at the end)
- ❌ For loops with side effects beyond validation
- ❌ For loops with multiple statements beyond validation
- ❌ Already using `Array.every()`

## Auto-fix Behavior

The rule provides auto-fix suggestions that convert for loops to `Array.every()`:

- `for (let i = 0; i < arr.length; i++) { if (!arr[i].isValid) { return false } }` → `arr.every(item => item.isValid)`
- `for (let i = 0; i < items.length; i++) { if (items[i].value <= 0) { return false } }` → `items.every(item => item.value > 0)`
- `for (let i = 0; i < users.length; i++) { if (!users[i].active) { return false } }` → `users.every(user => user.active)`
