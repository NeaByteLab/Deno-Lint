# Expected Behavior: `prefer-spread` Rule

This rule enforces the use of spread syntax (`...`) over manual array operations like `Array.from()` and `array.concat()`.

## Examples

### Array.from() Conversion

```diff
- const array1 = Array.from(iterable)
+ const array1 = [...iterable]

- const array2 = Array.from(nodeList)
+ const array2 = [...nodeList]

- const array3 = Array.from(set)
+ const array3 = [...set]
```

### Array.concat() Replacement

```diff
- const combined1 = arr.concat(otherArr)
+ const combined1 = [...arr, ...otherArr]

- const combined2 = arr.concat(item1, item2)
+ const combined2 = [...arr, item1, item2]

- const combined3 = arr.concat(arr1, arr2, arr3)
+ const combined3 = [...arr, ...arr1, ...arr2, ...arr3]
```

### Function Returns

```diff
  function processData(data) {
-   return Array.from(data)
+   return [...data]
  }

  function combineArrays() {
-   return arr.concat(otherArr)
+   return [...arr, ...otherArr]
  }
```

### Object Properties

```diff
  const config = {
-   items: Array.from(iterable)
+   items: [...iterable]
  }

- const results = [Array.from(data), Array.from(otherData)]
+ const results = [[...data], [...otherData]]
```

### Class Methods

```diff
  class DataProcessor {
    combine(data) {
-     return this.items.concat(data)
+     return [...this.items, ...data]
    }
  }
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
