# Expected Behavior: `prefer-array-includes` Rule

This rule enforces the use of `Array.includes()` over manual `indexOf() !== -1` checks for better readability and performance.

## Examples

### Basic Array Search

```diff
- if (arr.indexOf(item) !== -1) {
+ if (arr.includes(item)) {
    console.log('Item found')
  }
```

### Variable Assignment

```diff
- const found = arr.indexOf(item) !== -1
+ const found = arr.includes(item)
```

### Function Returns

```diff
  function hasItem(arr, item) {
-   return arr.indexOf(item) !== -1
+   return arr.includes(item)
  }
```

### Arrow Function Returns

```diff
- const checkExists = (items, target) => items.indexOf(target) !== -1
+ const checkExists = (items, target) => items.includes(target)
```

### Method Calls

```diff
- if (getArray().indexOf(getItem()) !== -1) {
+ if (getArray().includes(getItem())) {
    console.log('Found')
  }
```

### Simple Variable Assignment

```diff
- const exists = items.indexOf(item) !== -1
+ const exists = items.includes(item)
```

### Property Access

```diff
- if (obj.items.indexOf(item) !== -1) {
+ if (obj.items.includes(item)) {
    console.log('Item in collection')
  }
```

```diff
- const inList = user.favorites.indexOf(book) !== -1
+ const inList = user.favorites.includes(book)
```

### Conditional Expressions

```diff
- const result = arr.indexOf(item) !== -1 ? 'found' : 'not found'
+ const result = arr.includes(item) ? 'found' : 'not found'
```

```diff
- const status = items.indexOf(target) !== -1 && 'active'
+ const status = items.includes(target) && 'active'
```

## Rule Scope

This rule **only applies to**:

- ✅ `array.indexOf(item) !== -1` comparisons
- ✅ Variable assignments with `indexOf() !== -1`
- ✅ Return statements with `indexOf() !== -1`
- ✅ Conditional expressions with `indexOf() !== -1`

This rule **does NOT apply to**:

- ❌ `array.indexOf(item) === -1` (not found checks)
- ❌ `array.indexOf(item) > -1` or `array.indexOf(item) >= 0`
- ❌ Already using `Array.includes()`
- ❌ Other array methods (`find`, `some`, `every`, etc.)
- ❌ `indexOf()` with assignment or other operators

## Covered Operations

This rule applies to the following operations:

- ✅ `arr.indexOf(item) !== -1` → `arr.includes(item)`
- ✅ `items.indexOf(target) !== -1` → `items.includes(target)`
- ✅ `getArray().indexOf(getItem()) !== -1` → `getArray().includes(getItem())`

## Auto-fix Behavior

The rule provides auto-fix suggestions that convert `indexOf() !== -1` patterns to `Array.includes()`:

- `arr.indexOf(item) !== -1` → `arr.includes(item)`
- `items.indexOf(target) !== -1` → `items.includes(target)`
- `getArray().indexOf(getItem()) !== -1` → `getArray().includes(getItem())`
