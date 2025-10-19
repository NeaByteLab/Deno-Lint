# Expected Behavior: `prefer-arrow-callback` Rule

This rule enforces the use of arrow functions over regular function expressions when used as callbacks in array methods like `map`, `filter`, `find`, etc.

## ❌ Invalid Examples

```typescript
// Function expressions in array method callbacks
const doubled = numbers.map(function (item) {
  return item * 2
})

const filtered = users.filter(function (user) {
  return user.isActive
})

const found = items.find(function (item) {
  return item.id === targetId
})

// Function expressions with parameters
const processed = data.map(function (item, index) {
  return { item, index }
})

const validItems = items.filter(function (item) {
  return item.isValid()
})

// Function expressions with block body
const results = numbers.map(function (num) {
  const doubled = num * 2
  return doubled
})

// Function expressions in various contexts
function processData(data) {
  return data.map(function (item) {
    return item.processed
  })
}

const handler = event => {
  const items = event.target.value.split(',').map(function (value) {
    return value.trim()
  })
}

class DataProcessor {
  processItems(items) {
    return items.map(function (item) {
      return item.value
    })
  }
}

// Function expressions with complex logic
const formatted = users.map(function (user) {
  return `User: ${user.getName()} (ID: ${user.id})`
})

const filtered = items.filter(function (item) {
  return item?.value || 0
})

// Function expressions in object properties
const config = {
  processor: function (item) {
    return item.name
  }
}

// Function expressions in template literals
const message = `Processing ${items
  .map(function (item) {
    return item.name
  })
  .join(', ')}`

// Function expressions with destructuring
const processed = users.map(function ({ name, age }) {
  return { name: name.toUpperCase(), age }
})

// Function expressions with rest parameters
const combined = arrays.map(function (...items) {
  return items.flat()
})

// Function expressions with default parameters
const processed = data.map(function (item = {}) {
  return item.value
})
```

## ✅ Valid Examples

```typescript
// Arrow functions in array method callbacks (preferred)
const doubled = numbers.map(item => item * 2)

const filtered = users.filter(user => user.isActive)

const found = items.find(item => item.id === targetId)

// Arrow functions with parameters
const processed = data.map((item, index) => ({ item, index }))

const validItems = items.filter(item => item.isValid())

// Arrow functions with block body
const results = numbers.map(num => {
  const doubled = num * 2
  return doubled
})

// Arrow functions in various contexts
function processData(data) {
  return data.map(item => item.processed)
}

const handler = event => {
  const items = event.target.value.split(',').map(value => value.trim())
}

class DataProcessor {
  processItems(items) {
    return items.map(item => item.value)
  }
}

// Arrow functions with complex logic
const formatted = users.map(user => `User: ${user.getName()} (ID: ${user.id})`)

const filtered = items.filter(item => item?.value || 0)

// Arrow functions in object properties
const config = {
  processor: item => item.name
}

// Arrow functions in template literals
const message = `Processing ${items.map(item => item.name).join(', ')}`

// Arrow functions with destructuring
const processed = users.map(({ name, age }) => ({ name: name.toUpperCase(), age }))

// Arrow functions with rest parameters
const combined = arrays.map((...items) => items.flat())

// Arrow functions with default parameters
const processed = data.map((item = {}) => item.value)

// Already using arrow functions (not affected by this rule)
const doubled = numbers.map(item => item * 2)

// Function declarations (not affected by this rule)
function processItem(item) {
  return item * 2
}

const doubled = numbers.map(processItem)

// Class methods (not affected by this rule)
class ItemProcessor {
  process(item) {
    return item * 2
  }
}

const processor = new ItemProcessor()
const doubled = numbers.map(processor.process.bind(processor))

// Function expressions not in callback context (not affected by this rule)
const handler = function (event) {
  event.preventDefault()
}

// Function expressions with 'this' usage (not affected by this rule)
const processor = {
  multiplier: 2,
  process: function (item) {
    return item * this.multiplier
  }
}

// Function expressions with 'arguments' usage (not affected by this rule)
const handler = function () {
  console.log(arguments.length)
}

// Function expressions with names (not affected by this rule)
const processor = function processItem(item) {
  return item * 2
}
```

## Rule Scope

This rule **only applies to**:

- ✅ Function expressions used as callbacks in array methods:
  - `map`, `filter`, `find`, `some`, `every`, `reduce`, `forEach`
  - `findIndex`, `reduceRight`, `flatMap`, `sort`
- ✅ Anonymous function expressions (without names)
- ✅ Function expressions that don't use `this` or `arguments`

This rule **does NOT apply to**:

- ❌ Function declarations
- ❌ Arrow functions (already preferred)
- ❌ Class methods
- ❌ Function expressions with names
- ❌ Function expressions that use `this`
- ❌ Function expressions that use `arguments`
- ❌ Function expressions not used as callbacks

## Covered Array Methods

This rule applies to the following array methods:

- ✅ `Array.prototype.map()`
- ✅ `Array.prototype.filter()`
- ✅ `Array.prototype.find()`
- ✅ `Array.prototype.some()`
- ✅ `Array.prototype.every()`
- ✅ `Array.prototype.reduce()`
- ✅ `Array.prototype.forEach()`
- ✅ `Array.prototype.findIndex()`
- ✅ `Array.prototype.reduceRight()`
- ✅ `Array.prototype.flatMap()`
- ✅ `Array.prototype.sort()`

## Auto-fix Behavior

The rule provides auto-fix suggestions that convert function expressions to arrow functions:

- `function(item) { return item * 2 }` → `item => item * 2`
- `function(item, index) { return { item, index } }` → `(item, index) => ({ item, index })`
- `function(item) { const doubled = item * 2; return doubled }` → `item => { const doubled = item * 2; return doubled }`

The auto-fix properly handles:

- **Parameter preservation** - Keeps all parameters and their types
- **Body conversion** - Converts block bodies and expression bodies appropriately
- **Complex expressions** - Handles destructuring, rest parameters, default parameters
- **Context preservation** - Maintains the original callback behavior
