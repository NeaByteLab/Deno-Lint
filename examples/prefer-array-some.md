# Expected Behavior: `prefer-array-some` Rule

This rule enforces the use of `Array.some()` over manual for loops that return `true` when a condition is met.

## ❌ Invalid Examples

```typescript
// Manual for loop that can be replaced with Array.some()
function hasActiveUsers(users) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].isActive) {
      return true
    }
  }
  return false
}

// For loop with different variable names
function hasPositiveNumbers(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 0) {
      return true
    }
  }
  return false
}

// For loop in function
function hasValidItems(items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].isValid()) {
      return true
    }
  }
  return false
}

// For loop in arrow function
const hasValidData = data => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].value >= 0) {
      return true
    }
  }
  return false
}

// For loop in class method
class Validator {
  hasAnyValid(items) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].isValid) {
        return true
      }
    }
    return false
  }
}

// For loop with complex condition
function hasComplexMatch(items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].active && items[i].value > threshold) {
      return true
    }
  }
  return false
}

// For loop with property access
function hasActiveUsers(users) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].profile.isActive) {
      return true
    }
  }
  return false
}

// For loop with method calls
function hasValidItems(items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].isValid()) {
      return true
    }
  }
  return false
}

// For loop with continue (should trigger)
function processWithContinue(items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].skip) {
      continue
    }
    if (items[i].isValid) {
      return true
    }
  }
  return false
}

// For loop with multiple returns
function complexSearch(items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].type === 'special') {
      return true
    }
    if (items[i].value > 100) {
      return true
    }
  }
  return false
}
```

## ✅ Valid Examples

```typescript
// Using Array.some() (preferred)
function hasActiveUsers(users) {
  return users.some(user => user.isActive)
}

// Array.some() with different variable names
function hasPositiveNumbers(numbers) {
  return numbers.some(number => number > 0)
}

// Array.some() in function
function hasValidItems(items) {
  return items.some(item => item.isValid())
}

// Array.some() in arrow function
const hasValidData = data => {
  return data.some(item => item.value >= 0)
}

// Array.some() in class method
class Validator {
  hasAnyValid(items) {
    return items.some(item => item.isValid)
  }
}

// Array.some() with complex condition
function hasComplexMatch(items) {
  return items.some(item => item.active && item.value > threshold)
}

// Array.some() with property access
function hasActiveUsers(users) {
  return users.some(user => user.profile.isActive)
}

// Array.some() with method calls
function hasValidItems(items) {
  return items.some(item => item.isValid())
}

// For loop that doesn't return true (not affected by this rule)
function findFirstValid(items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].isValid) {
      return items[i] // Returns the item, not true
    }
  }
  return null
}

// For loop with break instead of return (not affected by this rule)
function processItems(items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].isValid) {
      break // Uses break, not return true
    }
  }
}

// For loop that returns false (not affected by this rule)
function hasAnyInvalid(items) {
  for (let i = 0; i < items.length; i++) {
    if (!items[i].isValid) {
      return true // Returns true, but for invalid items
    }
  }
  return false
}

// Already using Array.some() (not affected by this rule)
function hasActiveUsers(users) {
  return users.some(user => user.isActive)
}

// For loop with side effects (not affected by this rule)
function processItems(items) {
  for (let i = 0; i < items.length; i++) {
    items[i].processed = true
    if (items[i].isValid) {
      return true
    }
  }
  return false
}

// For loop with multiple statements (not affected by this rule)
function complexProcess(items) {
  for (let i = 0; i < items.length; i++) {
    console.log(`Processing item ${i}`)
    if (items[i].isValid) {
      return true
    }
  }
  return false
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

The auto-fix properly handles:

- **Condition preservation** - Keeps the original condition logic in the some callback
- **Complex conditions** - Handles nested property access and method calls
- **Variable naming** - Uses appropriate parameter names in the callback
- **Array naming** - Derives callback parameter from array name (e.g., `users` → `user`)
