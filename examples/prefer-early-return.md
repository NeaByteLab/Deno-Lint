# Expected Behavior: `prefer-early-return` Rule

This rule enforces the use of early returns over nested conditions to improve code readability and reduce nesting levels.

## ❌ Invalid Examples

```typescript
// Function with nested if statements
function processUser(user) {
  if (user) {
    if (user.isActive) {
      if (user.role === 'admin') {
        return 'authorized'
      }
    }
  }
  return 'unauthorized'
}

// Arrow function with nested conditions
const validateInput = input => {
  if (input) {
    if (typeof input === 'string') {
      if (input.length > 0) {
        return true
      }
    }
  }
  return false
}

// Function expression with nested if
const processData = function (data) {
  if (data) {
    if (data.isValid) {
      if (data.value > 0) {
        return 'positive'
      }
    }
  }
  return 'invalid'
}

// Class method with nested conditions
class UserService {
  async fetchUser(id) {
    if (id) {
      if (typeof id === 'string') {
        if (id.length > 0) {
          return await this.api.getUser(id)
        }
      }
    }
    throw new Error('Invalid ID')
  }
}

// Async function with nested conditions
async function uploadFile(file) {
  if (file) {
    if (file.size > 0) {
      if (file.type === 'image/jpeg') {
        return await uploadToServer(file)
      }
    }
  }
  throw new Error('Invalid file')
}

// Generator function with nested conditions
function* processItems(items) {
  if (items) {
    if (Array.isArray(items)) {
      if (items.length > 0) {
        for (const item of items) {
          yield processItem(item)
        }
      }
    }
  }
}

// Function with nested if in else clause
function checkStatus(value) {
  if (value) {
    return 'active'
  } else {
    if (value === null) {
      return 'null'
    }
  }
  return 'unknown'
}

// Function with nested if in both branches
function processValue(value) {
  if (value) {
    if (value > 0) {
      return 'positive'
    }
  } else {
    if (value === 0) {
      return 'zero'
    }
  }
  return 'negative'
}

// Complex nested conditions
function validateUser(user) {
  if (user && user.isActive) {
    if (user.role === 'admin' || user.role === 'moderator') {
      if (user.permissions && user.permissions.length > 0) {
        return 'authorized'
      }
    }
  }
  return 'unauthorized'
}

// Function with method calls in nested conditions
function processData(data) {
  if (data.isValid()) {
    if (data.getType() === 'important') {
      if (data.getValue() > 100) {
        return 'processed'
      }
    }
  }
  return 'skipped'
}

// Function with multiple statements and nested conditions
function calculateResult(input) {
  const processed = input * 2
  if (processed) {
    if (processed > 10) {
      console.log('Large value')
      return 'large'
    }
  }
  return 'small'
}

// Function with empty nested blocks
function checkValue(value) {
  if (value) {
    if (value > 0) {
      // empty block
    }
  }
  return 'done'
}

// Function with only variable declarations in nested blocks
function processItem(item) {
  if (item) {
    if (item.id) {
      const processed = item.id * 2
    }
  }
  return 'processed'
}

// Function with console.log in nested blocks
function logValue(value) {
  if (value) {
    if (value > 0) {
      console.log('Positive value')
    }
  }
  return 'logged'
}

// Static class method with nested conditions
class ConfigService {
  static validateConfig(config) {
    if (config) {
      if (config.apiUrl) {
        if (config.timeout > 0) {
          return true
        }
      }
    }
    return false
  }
}

// Function with deeply nested conditions (3+ levels)
function deepValidation(obj) {
  if (obj) {
    if (obj.user) {
      if (obj.user.profile) {
        if (obj.user.profile.settings) {
          if (obj.user.profile.settings.notifications) {
            return 'valid'
          }
        }
      }
    }
  }
  return 'invalid'
}

// Multiple functions with mixed nesting patterns
function processUser(user) {
  if (user) {
    if (user.isActive) {
      return 'active'
    }
  }
  return 'inactive'
}

const processData = function (data) {
  if (data) {
    return 'valid'
  }
  return 'invalid'
}

const validateInput = input => {
  if (input) {
    if (input.length > 0) {
      return true
    }
  }
  return false
}
```

## ✅ Valid Examples

```typescript
// Function with early returns
function processUser(user) {
  if (!user) {
    return 'unauthorized'
  }

  if (!user.isActive) {
    return 'unauthorized'
  }

  if (user.role === 'admin') {
    return 'authorized'
  }

  return 'unauthorized'
}

// Arrow function with early returns
const validateInput = input => {
  if (!input) {
    return false
  }

  if (typeof input !== 'string') {
    return false
  }

  if (input.length <= 0) {
    return false
  }

  return true
}

// Function expression with early returns
const processData = function (data) {
  if (!data) {
    return 'invalid'
  }

  if (!data.isValid) {
    return 'invalid'
  }

  if (data.value <= 0) {
    return 'invalid'
  }

  return 'positive'
}

// Class method with early returns
class UserService {
  async fetchUser(id) {
    if (!id) {
      throw new Error('Invalid ID')
    }

    if (typeof id !== 'string') {
      throw new Error('Invalid ID')
    }

    if (id.length <= 0) {
      throw new Error('Invalid ID')
    }

    return await this.api.getUser(id)
  }
}

// Async function with early returns
async function uploadFile(file) {
  if (!file) {
    throw new Error('Invalid file')
  }

  if (file.size <= 0) {
    throw new Error('Invalid file')
  }

  if (file.type !== 'image/jpeg') {
    throw new Error('Invalid file')
  }

  return await uploadToServer(file)
}

// Generator function with early returns
function* processItems(items) {
  if (!items) {
    return
  }

  if (!Array.isArray(items)) {
    return
  }

  if (items.length <= 0) {
    return
  }

  for (const item of items) {
    yield processItem(item)
  }
}

// Function with early return for else clause
function checkStatus(value) {
  if (!value) {
    if (value === null) {
      return 'null'
    }
    return 'unknown'
  }

  return 'active'
}

// Function with early returns for both branches
function processValue(value) {
  if (!value) {
    if (value === 0) {
      return 'zero'
    }
    return 'negative'
  }

  if (value > 0) {
    return 'positive'
  }

  return 'negative'
}

// Complex conditions with early returns
function validateUser(user) {
  if (!(user && user.isActive)) {
    return 'unauthorized'
  }

  if (!(user.role === 'admin' || user.role === 'moderator')) {
    return 'unauthorized'
  }

  if (!(user.permissions && user.permissions.length > 0)) {
    return 'unauthorized'
  }

  return 'authorized'
}

// Function with method calls and early returns
function processData(data) {
  if (!data.isValid()) {
    return 'skipped'
  }

  if (data.getType() !== 'important') {
    return 'skipped'
  }

  if (data.getValue() <= 100) {
    return 'skipped'
  }

  return 'processed'
}

// Function with multiple statements and early returns
function calculateResult(input) {
  const processed = input * 2

  if (!processed) {
    return 'small'
  }

  if (processed <= 10) {
    return 'small'
  }

  console.log('Large value')
  return 'large'
}

// Function with early returns for empty blocks
function checkValue(value) {
  if (!value) {
    return 'done'
  }

  if (value <= 0) {
    return 'done'
  }

  // empty block - no action needed
  return 'done'
}

// Function with early returns for variable declarations
function processItem(item) {
  if (!item) {
    return 'processed'
  }

  if (!item.id) {
    return 'processed'
  }

  const processed = item.id * 2
  return 'processed'
}

// Function with early returns for console.log
function logValue(value) {
  if (!value) {
    return 'logged'
  }

  if (value <= 0) {
    return 'logged'
  }

  console.log('Positive value')
  return 'logged'
}

// Static class method with early returns
class ConfigService {
  static validateConfig(config) {
    if (!config) {
      return false
    }

    if (!config.apiUrl) {
      return false
    }

    if (config.timeout <= 0) {
      return false
    }

    return true
  }
}

// Function with early returns for deep validation
function deepValidation(obj) {
  if (!obj) {
    return 'invalid'
  }

  if (!obj.user) {
    return 'invalid'
  }

  if (!obj.user.profile) {
    return 'invalid'
  }

  if (!obj.user.profile.settings) {
    return 'invalid'
  }

  if (!obj.user.profile.settings.notifications) {
    return 'invalid'
  }

  return 'valid'
}

// Multiple functions with early returns
function processUser(user) {
  if (!user) {
    return 'inactive'
  }

  if (!user.isActive) {
    return 'inactive'
  }

  return 'active'
}

const processData = function (data) {
  if (!data) {
    return 'invalid'
  }

  return 'valid'
}

const validateInput = input => {
  if (!input) {
    return false
  }

  if (input.length <= 0) {
    return false
  }

  return true
}

// Single if statements (not affected by this rule)
function simpleCheck(value) {
  if (value) {
    return 'truthy'
  }
  return 'falsy'
}

// If-else without nesting (not affected by this rule)
function simpleCondition(value) {
  if (value) {
    return 'positive'
  } else {
    return 'negative'
  }
}

// No if statements (not affected by this rule)
function noConditions() {
  return 'always the same'
}

// Arrow function with single expression (not affected by this rule)
const simpleArrow = value => (value ? 'yes' : 'no')

// Arrow function with single if (not affected by this rule)
const singleIfArrow = value => {
  if (value) {
    return 'yes'
  }
  return 'no'
}
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

The auto-fix properly handles:

- **Condition negation** - Correctly negates complex expressions like `!(user && user.isActive)`
- **Multiple levels** - Handles deeply nested conditions
- **All function types** - Works with declarations, expressions, arrow functions, class methods, async, generators
- **Both branches** - Handles nesting in both `consequent` and `alternate` branches
- **Preserves logic** - Maintains the original function behavior while improving readability
- **First match only** - Only refactors the first problematic if statement to avoid multiple fixes
