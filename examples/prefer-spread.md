# Expected Behavior: `prefer-spread` Rule

This rule enforces the use of spread syntax (`...`) over manual array operations like `Array.from()` and `array.concat()`.

## ❌ Invalid Examples

```typescript
// Array.from() with single argument
const array1 = Array.from(iterable)
const array2 = Array.from(nodeList)
const array3 = Array.from(set)

// array.concat() with arguments
const combined1 = arr.concat(otherArr)
const combined2 = arr.concat(item1, item2)
const combined3 = arr.concat(arr1, arr2, arr3)

// Array.from() in function parameter
function processData(data) {
  return Array.from(data)
}

// Array.from() in arrow function
const processItems = items => {
  return Array.from(items)
}

// array.concat() in return statement
function combineArrays() {
  return arr.concat(otherArr)
}

// Array.from() in object property
const config = {
  items: Array.from(iterable)
}

// array.concat() in array element
const results = [Array.from(data), Array.from(otherData)]

// Nested Array.from() expressions
const processed = Array.from(Array.from(iterable))

// Array.from() with complex expressions
const items = Array.from(user?.items || [])

// array.concat() in conditional expression
const result = condition ? arr.concat(otherArr) : arr

// Array.from() with template literals
const message = `Items: ${Array.from(iterable)}`

// array.concat() in class method
class DataProcessor {
  combine(data) {
    return this.items.concat(data)
  }
}

// Array.from() in async function
async function processAsync() {
  return Array.from(await getData())
}

// array.concat() with destructuring
const [first, ...rest] = arr.concat(otherArr)

// Array.from() with function calls
const processed = Array.from(getIterable())

// array.concat() with member expressions
const combined = arr.concat(obj.items)
```

## ✅ Valid Examples

```typescript
// Using spread syntax (preferred)
const array1 = [...iterable]
const array2 = [...nodeList]
const array3 = [...set]

// Spread syntax with concat replacement
const combined1 = [...arr, ...otherArr]
const combined2 = [...arr, item1, item2]
const combined3 = [...arr, ...arr1, ...arr2, ...arr3]

// Spread syntax in function parameter
function processData(data) {
  return [...data]
}

// Spread syntax in arrow function
const processItems = items => {
  return [...items]
}

// Spread syntax in return statement
function combineArrays() {
  return [...arr, ...otherArr]
}

// Spread syntax in object property
const config = {
  items: [...iterable]
}

// Spread syntax in array element
const results = [[...data], [...otherData]]

// Nested spread expressions
const processed = [...[...iterable]]

// Spread syntax with complex expressions
const items = [...(user?.items || [])]

// Spread syntax in conditional expression
const result = condition ? [...arr, ...otherArr] : arr

// Spread syntax with template literals
const message = `Items: ${[...iterable]}`

// Spread syntax in class method
class DataProcessor {
  combine(data) {
    return [...this.items, ...data]
  }
}

// Spread syntax in async function
async function processAsync() {
  return [...(await getData())]
}

// Spread syntax with destructuring
const [first, ...rest] = [...arr, ...otherArr]

// Spread syntax with function calls
const processed = [...getIterable()]

// Spread syntax with member expressions
const combined = [...arr, ...obj.items]

// Array.from() with multiple arguments (not affected by this rule)
const mapped = Array.from(iterable, x => x * 2)

// array.concat() with no arguments (not affected by this rule)
const copy = arr.concat()

// Already using spread syntax (not affected by this rule)
const array1 = [...iterable]
const combined = [...arr, ...otherArr]

// Other array methods (not affected by this rule)
const filtered = arr.filter(item => item.isValid)
const mapped = arr.map(item => item.value)
const reduced = arr.reduce((acc, item) => acc + item, 0)
```

## Rule Scope

This rule **only applies to**:

- ✅ `Array.from()` with a single argument
- ✅ `array.concat()` with one or more arguments

This rule **does NOT apply to**:

- ❌ `Array.from()` with multiple arguments (mapping function)
- ❌ `array.concat()` with no arguments
- ❌ Already using spread syntax
- ❌ Other array methods (`filter`, `map`, `reduce`, etc.)

## Covered Operations

This rule applies to the following operations:

- ✅ `Array.from(iterable)` → `[...iterable]`
- ✅ `arr.concat(otherArr)` → `[...arr, ...otherArr]`
- ✅ `arr.concat(item1, item2)` → `[...arr, item1, item2]`
- ✅ `arr.concat(arr1, arr2)` → `[...arr, ...arr1, ...arr2]`

## Auto-fix Behavior

The rule provides auto-fix suggestions that convert manual array operations to spread syntax:

- `Array.from(iterable)` → `[...iterable]`
- `arr.concat(otherArr)` → `[...arr, ...otherArr]`
- `arr.concat(item1, item2)` → `[...arr, item1, item2]`
- `arr.concat(arr1, arr2)` → `[...arr, ...arr1, ...arr2]`

The auto-fix properly handles:

- **Single argument conversion** - Converts `Array.from()` to spread syntax
- **Multiple argument handling** - Handles `concat()` with multiple arrays and items
- **Complex expressions** - Preserves complex expressions and function calls
- **Context preservation** - Maintains the original operation behavior
