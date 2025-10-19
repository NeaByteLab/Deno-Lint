# Expected Behavior: `prefer-const-assertions` Rule

This rule enforces the use of const assertions (`as const`) on array and object literals for better type inference, but only when they are used in top-level contexts like variable declarations, return statements, and assignments.

## ❌ Invalid Examples

```typescript
// Array literals without const assertion
const colors = ['red', 'green', 'blue']
const numbers = [1, 2, 3, 4, 5]
const flags = [true, false, true]

// Object literals without const assertion
const config = { apiUrl: 'https://api.example.com', timeout: 5000 }
const user = { name: 'John', age: 30, active: true }
const settings = { debug: false, version: '1.0.0' }

// Mixed type arrays without const assertion
const mixed = [1, 'hello', true, { id: 1 }]
const data = ['string', 42, null, undefined]

// Nested structures without const assertion
const nested = {
  user: { name: 'John', age: 30 },
  settings: { theme: 'dark', language: 'en' }
}

// Arrays with objects without const assertion
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
]

// Complex nested arrays without const assertion
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

// Object with arrays without const assertion
const state = {
  items: ['item1', 'item2'],
  counts: [1, 2, 3],
  flags: [true, false]
}

// In return statements without const assertion
function getColors() {
  return ['red', 'green', 'blue']
}

function getConfig() {
  return { apiUrl: 'https://api.example.com', timeout: 5000 }
}

// In variable declarations with let/var without const assertion
let status = ['pending', 'completed', 'failed']
var options = { retries: 3, timeout: 1000 }

// In assignment expressions without const assertion
let data
data = { name: 'test', value: 42 }

// In function expressions without const assertion
const getData = () => ({ id: 1, name: 'test' })
const getItems = () => ['item1', 'item2', 'item3']
```

## ✅ Valid Examples

```typescript
// Array literals with const assertion
const colors = ['red', 'green', 'blue'] as const
const numbers = [1, 2, 3, 4, 5] as const
const flags = [true, false, true] as const

// Object literals with const assertion
const config = { apiUrl: 'https://api.example.com', timeout: 5000 } as const
const user = { name: 'John', age: 30, active: true } as const
const settings = { debug: false, version: '1.0.0' } as const

// Mixed type arrays with const assertion
const mixed = [1, 'hello', true, { id: 1 }] as const
const data = ['string', 42, null, undefined] as const

// Nested structures with const assertion
const nested = {
  user: { name: 'John', age: 30 },
  settings: { theme: 'dark', language: 'en' }
} as const

// Arrays with objects with const assertion
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
] as const

// Complex nested arrays with const assertion
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
] as const

// Object with arrays with const assertion
const state = {
  items: ['item1', 'item2'],
  counts: [1, 2, 3],
  flags: [true, false]
} as const

// In return statements with const assertion
function getColors() {
  return ['red', 'green', 'blue'] as const
}

function getConfig() {
  return { apiUrl: 'https://api.example.com', timeout: 5000 } as const
}

// In variable declarations with let/var with const assertion
let status = ['pending', 'completed', 'failed'] as const
var options = { retries: 3, timeout: 1000 } as const

// In assignment expressions with const assertion
let data
data = { name: 'test', value: 42 } as const

// In function expressions with const assertion
const getData = () => ({ id: 1, name: 'test' } as const)
const getItems = () => ['item1', 'item2', 'item3'] as const

// Empty arrays and objects (not affected by this rule)
const emptyArray = []
const emptyObject = {}

// Arrays and objects in function parameters (not affected by this rule)
function processData(items = [1, 2, 3]) {
  return items.map(x => x * 2)
}

function createUser(user = { name: 'Guest' }) {
  return user
}

// Arrays and objects in arrow function parameters (not affected by this rule)
const processItems = (items = ['a', 'b', 'c']) => items.length
const createConfig = (config = { debug: false }) => config

// Already using const assertion (not affected by this rule)
const colors = ['red', 'green', 'blue'] as const
const config = { apiUrl: 'https://api.example.com' } as const

// Arrays and objects in nested contexts (not affected by this rule)
const complex = {
  data: [1, 2, 3], // This won't trigger the rule
  nested: {
    items: ['a', 'b'] // This won't trigger the rule
  }
}
```

## Rule Scope

This rule **only applies to**:

- ✅ Array literals (`[]`) in top-level contexts:

  - Variable declarations (`const arr = [...]`)
  - Return statements (`return [...]`)
  - Assignment expressions (`arr = [...]`)
  - Function expressions (`() => [...]`)

- ✅ Object literals (`{}`) in top-level contexts:
  - Variable declarations (`const obj = {...}`)
  - Return statements (`return {...}`)
  - Assignment expressions (`obj = {...}`)
  - Function expressions (`() => ({...})`)

This rule **does NOT apply to**:

- ❌ Empty arrays (`[]`) or objects (`{}`)
- ❌ Arrays/objects in function parameters (`function test(arr = [...])`)
- ❌ Arrays/objects in arrow function parameters (`const test = (arr = [...]) => ...`)
- ❌ Arrays/objects in nested contexts (inside other arrays/objects)
- ❌ Arrays/objects that already have const assertion (`[...] as const`)

## Why This Rule Matters

Const assertions provide better type inference by making TypeScript treat the literal as a readonly tuple or readonly object with exact literal types:

```typescript
// Without const assertion - TypeScript infers general types
const colors = ['red', 'green', 'blue']
// Type: string[]

// With const assertion - TypeScript infers exact literal types
const colors = ['red', 'green', 'blue'] as const
// Type: readonly ['red', 'green', 'blue']
```

This enables:

- **Exact literal types** instead of general types
- **Readonly properties** preventing accidental mutations
- **Better IntelliSense** with exact autocomplete options
- **Type-safe operations** with precise type checking

## Auto-fix Behavior

The rule provides auto-fix suggestions that add `as const` to array and object literals:

- `[1, 2, 3]` → `[1, 2, 3] as const`
- `{ name: 'test' }` → `{ name: 'test' } as const`
- `['a', 'b', 'c']` → `['a', 'b', 'c'] as const`
- `{ id: 1, active: true }` → `{ id: 1, active: true } as const`
