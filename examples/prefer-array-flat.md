# Expected Behavior: `prefer-array-flat` Rule

This rule enforces the use of `Array.flat()` over manual flattening patterns like `[].concat(...array)` and `Array.prototype.concat.apply([], array)`.

## Examples

### Basic Array Flattening

```diff
- const flattened = [].concat(...nestedArray)
+ const flattened = nestedArray.flat()
```

### Array.prototype.concat.apply Pattern

```diff
- const flattened = Array.prototype.concat.apply([], nestedArray)
+ const flattened = nestedArray.flat()
```

### Function Returns

```diff
  function flattenArray(arr) {
-   return Array.prototype.concat.apply([], arr)
+   return arr.flat()
  }
```

### Arrow Function Returns

```diff
- const flattenData = (data) => Array.prototype.concat.apply([], data)
+ const flattenData = (data) => data.flat()
```

### Class Methods

```diff
  class ArrayUtils {
    flatten(arr) {
-     return Array.prototype.concat.apply([], arr)
+     return arr.flat()
    }
  }
```

### Complex Expressions

```diff
- const flattened = Array.prototype.concat.apply([], getNestedArrays())
+ const flattened = getNestedArrays().flat()
```

### Spread Operator Pattern

```diff
- const result = [].concat(...getData())
+ const result = getData().flat()
```

### Conditional Flattening

```diff
- const flattened = Array.prototype.concat.apply([], condition ? arr1 : arr2)
+ const flattened = (condition ? arr1 : arr2).flat()
```

### Simple Array Processing

```diff
- const processed = [].concat(...items)
+ const processed = items.flat()
```

## Rule Scope

This rule **only applies to**:

- ✅ `[].concat(...array)` with exactly one spread argument
- ✅ `Array.prototype.concat.apply([], array)` with exactly two arguments where first is empty array

This rule **does NOT apply to**:

- ❌ `[].concat(...arr1, ...arr2)` with multiple spread arguments
- ❌ `[].concat(...arr, item)` with mixed spread and regular elements
- ❌ `Array.prototype.concat.apply([1, 2], array)` with non-empty first argument
- ❌ Already using `Array.flat()`
- ❌ Other array methods (`filter`, `map`, `reduce`, etc.)

## Covered Operations

This rule applies to the following operations:

- ✅ `[].concat(...array)` → `array.flat()`
- ✅ `Array.prototype.concat.apply([], array)` → `array.flat()`

## Auto-fix Behavior

The rule provides auto-fix suggestions that convert manual flattening patterns to `Array.flat()`:

- `[].concat(...nestedArray)` → `nestedArray.flat()`
- `Array.prototype.concat.apply([], arr)` → `arr.flat()`
- `Array.prototype.concat.apply([], getNestedArrays())` → `getNestedArrays().flat()`
