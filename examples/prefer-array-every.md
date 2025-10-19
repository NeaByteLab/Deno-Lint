# Expected Behavior: `prefer-array-every` Rule

This rule enforces the use of `Array.every()` over manual for loops that return `false` when a condition is not met.

## ❌ Invalid Examples

```typescript
// Manual for loop that can be replaced with Array.every()
function validateUsers(users) {
  for (let i = 0; i < users.length; i++) {
    if (!users[i].isActive) {
      return false
    }
  }
  return true
}

// For loop with different variable names
function checkNumbers(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] <= 0) {
      return false
    }
  }
  return true
}

// For loop in function
function processItems(items) {
  for (let i = 0; i < items.length; i++) {
    if (!items[i].isValid()) {
      return false
    }
  }
  return true
}

// For loop in arrow function
const validateData = data => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].value < 0) {
      return false
    }
  }
  return true
}

// For loop in class method
class Validator {
  checkAll(items) {
    for (let i = 0; i < items.length; i++) {
      if (!items[i].isValid) {
        return false
      }
    }
    return true
  }
}

// For loop with complex condition
function validateComplex(items) {
  for (let i = 0; i < items.length; i++) {
    if (!items[i].active || items[i].value <= threshold) {
      return false
    }
  }
  return true
}

// For loop with property access
function checkUsers(users) {
  for (let i = 0; i < users.length; i++) {
    if (!users[i].profile.isActive) {
      return false
    }
  }
  return true
}

// For loop with method calls
function validateItems(items) {
  for (let i = 0; i < items.length; i++) {
    if (!items[i].isValid()) {
      return false
    }
  }
  return true
}

// For loop with continue (should trigger)
function processWithContinue(items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].skip) {
      continue
    }
    if (!items[i].isValid) {
      return false
    }
  }
  return true
}

// For loop with multiple returns
function complexValidation(items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].type === 'invalid') {
      return false
    }
    if (items[i].value < 0) {
      return false
    }
  }
  return true
}
```

## ✅ Valid Examples

```typescript
// Using Array.every() (preferred)
function validateUsers(users) {
  return users.every(user => user.isActive)
}

// Array.every() with different variable names
function checkNumbers(numbers) {
  return numbers.every(number => number > 0)
}

// Array.every() in function
function processItems(items) {
  return items.every(item => item.isValid())
}

// Array.every() in arrow function
const validateData = data => {
  return data.every(item => item.value >= 0)
}

// Array.every() in class method
class Validator {
  checkAll(items) {
    return items.every(item => item.isValid)
  }
}

// Array.every() with complex condition
function validateComplex(items) {
  return items.every(item => item.active && item.value > threshold)
}

// Array.every() with property access
function checkUsers(users) {
  return users.every(user => user.profile.isActive)
}

// Array.every() with method calls
function validateItems(items) {
  return items.every(item => item.isValid())
}

// For loop that doesn't return false (not affected by this rule)
function findFirstInvalid(items) {
  for (let i = 0; i < items.length; i++) {
    if (!items[i].isValid) {
      return items[i] // Returns the item, not false
    }
  }
  return null
}

// For loop with break instead of return (not affected by this rule)
function processItems(items) {
  for (let i = 0; i < items.length; i++) {
    if (!items[i].isValid) {
      break // Uses break, not return false
    }
  }
}

// For loop that returns true (not affected by this rule)
function hasAnyValid(items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].isValid) {
      return true // Returns true, not false
    }
  }
  return false
}

// Already using Array.every() (not affected by this rule)
function validateUsers(users) {
  return users.every(user => user.isActive)
}

// For loop with side effects (not affected by this rule)
function processItems(items) {
  for (let i = 0; i < items.length; i++) {
    items[i].processed = true
    if (!items[i].isValid) {
      return false
    }
  }
  return true
}

// For loop with multiple statements (not affected by this rule)
function complexProcess(items) {
  for (let i = 0; i < items.length; i++) {
    console.log(`Processing item ${i}`)
    if (!items[i].isValid) {
      return false
    }
  }
  return true
}
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

The auto-fix properly handles:

- **Condition negation** - Converts `!item.isValid` to `item.isValid` in the every callback
- **Complex conditions** - Handles nested property access and method calls
- **Variable naming** - Uses appropriate parameter names in the callback
- **Array naming** - Derives callback parameter from array name (e.g., `users` → `user`)
