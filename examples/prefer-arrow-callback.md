# Expected Behavior: `prefer-arrow-callback` Rule

This rule enforces the use of arrow functions over regular function expressions when used as callbacks in array methods like `map`, `filter`, `find`, etc.

## Examples

### Basic Map Callback

```diff
- const doubled = numbers.map(function (item) {
-   return item * 2
- })
+ const doubled = numbers.map(item => item * 2)
```

### Filter Callback with Property Access

```diff
- const filtered = users.filter(function (user) {
-   return user.isActive
- })
+ const filtered = users.filter(user => user.isActive)
```

### Map Callback with Multiple Parameters

```diff
- const processed = data.map(function (item, index) {
-   return { item, index }
- })
+ const processed = data.map((item, index) => ({ item, index }))
```

### Block Body Callback

```diff
- const results = numbers.map(function (num) {
+ const results = numbers.map(num => {
    const doubled = num * 2
    return doubled
  })
```

### Destructuring Callback

```diff
- const processed = users.map(function ({ name, age }) {
-   return { name: name.toUpperCase(), age }
- })
+ const processed = users.map(({ name, age }) => ({ name: name.toUpperCase(), age }))
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
