# Expected Behavior: `prefer-const-assertions` Rule

This rule enforces the use of const assertions (`as const`) on array and object literals for better type inference, but only when they are used in top-level contexts like variable declarations, return statements, and assignments.

## Examples

### Basic Array Literal

```diff
- const colors = ['red', 'green', 'blue']
+ const colors = ['red', 'green', 'blue'] as const
```

### Basic Object Literal

```diff
- const config = { apiUrl: 'https://api.example.com', timeout: 5000 }
+ const config = { apiUrl: 'https://api.example.com', timeout: 5000 } as const
```

### Return Statement Array

```diff
  function getColors() {
-   return ['red', 'green', 'blue']
+   return ['red', 'green', 'blue'] as const
  }
```

### Return Statement Object

```diff
  function getConfig() {
-   return { apiUrl: 'https://api.example.com', timeout: 5000 }
+   return { apiUrl: 'https://api.example.com', timeout: 5000 } as const
  }
```

### Arrow Function Return

```diff
- const getData = () => ({ id: 1, name: 'test' })
+ const getData = () => ({ id: 1, name: 'test' } as const)
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

## Auto-fix Behavior

The rule provides auto-fix suggestions that add `as const` to array and object literals:

- `[1, 2, 3]` → `[1, 2, 3] as const`
- `{ name: 'test' }` → `{ name: 'test' } as const`
- `['a', 'b', 'c']` → `['a', 'b', 'c'] as const`
- `{ id: 1, active: true }` → `{ id: 1, active: true } as const`
