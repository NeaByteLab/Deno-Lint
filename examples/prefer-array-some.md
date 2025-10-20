# Expected Behavior: `prefer-array-some` Rule

This rule enforces the use of `Array.some()` over manual for loops that return `true` when a condition is met.

## Examples

### Basic Array Search

```diff
  function hasActiveUsers(users) {
-   for (let i = 0; i < users.length; i++) {
-     if (users[i].isActive) {
-       return true
-     }
-   }
-   return false
+   return users.some(user => user.isActive)
  }
```

### Number Array Search

```diff
  function hasPositiveNumbers(numbers) {
-   for (let i = 0; i < numbers.length; i++) {
-     if (numbers[i] > 0) {
-       return true
-     }
-   }
-   return false
+   return numbers.some(number => number > 0)
  }
```

### Method Call Search

```diff
  function hasValidItems(items) {
-   for (let i = 0; i < items.length; i++) {
-     if (items[i].isValid()) {
-       return true
-     }
-   }
-   return false
+   return items.some(item => item.isValid())
  }
```

### Complex Condition Search

```diff
  function hasComplexMatch(items) {
-   for (let i = 0; i < items.length; i++) {
-     if (items[i].active && items[i].value > threshold) {
-       return true
-     }
-   }
-   return false
+   return items.some(item => item.active && item.value > threshold)
  }
```

### Property Access Search

```diff
  function hasActiveUsers(users) {
-   for (let i = 0; i < users.length; i++) {
-     if (users[i].profile.isActive) {
-       return true
-     }
-   }
-   return false
+   return users.some(user => user.profile.isActive)
  }
```

## Rule Scope

This rule **only applies to**:

- ✅ For loops that contain a `return true` statement
- ✅ For loops where the return true is inside an if statement
- ✅ For loops that return `false` at the end (indicating no items matched)

This rule **does NOT apply to**:

- ❌ For loops that don't return `true`
- ❌ For loops that use `break` instead of `return true`
- ❌ For loops that return `false` in the middle (not at the end)
- ❌ For loops with side effects beyond searching
- ❌ For loops with multiple statements beyond searching
- ❌ Already using `Array.some()`

## Auto-fix Behavior

The rule provides auto-fix suggestions that convert for loops to `Array.some()`:

- `for (let i = 0; i < arr.length; i++) { if (arr[i].isValid) { return true } }` → `arr.some(item => item.isValid)`
- `for (let i = 0; i < items.length; i++) { if (items[i].value > 0) { return true } }` → `items.some(item => item.value > 0)`
- `for (let i = 0; i < users.length; i++) { if (users[i].active) { return true } }` → `users.some(user => user.active)`
