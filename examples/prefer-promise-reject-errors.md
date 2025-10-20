# Expected Behavior: `prefer-promise-reject-errors` Rule

This rule enforces the use of Error objects in `Promise.reject()` calls instead of primitive values.

## Examples

### String Values

```diff
  function fetchUser(id: string) {
    if (!id) {
-     return Promise.reject('Invalid user ID')
+     return Promise.reject(new Error('Invalid user ID'))
    }
    if (id === 'admin') {
-     return Promise.reject('Access denied')
+     return Promise.reject(new Error('Access denied'))
    }
    return Promise.resolve({ id, name: 'John' })
  }
```

### Number Values

```diff
  function validateInput(input: any) {
    if (typeof input !== 'string') {
-     return Promise.reject(400)
+     return Promise.reject(new Error('400'))
    }
    if (input.length < 3) {
-     return Promise.reject(422)
+     return Promise.reject(new Error('422'))
    }
    return Promise.resolve(input)
  }
```

### Boolean Values

```diff
  function processRequest(data: any) {
    if (!data) {
-     return Promise.reject(false)
+     return Promise.reject(new Error('No data provided'))
    }
    if (data.invalid) {
-     return Promise.reject(true)
+     return Promise.reject(new Error('Invalid data format'))
    }
    return Promise.resolve(data)
  }
```

### Null/Undefined Values

```diff
  function getConfig() {
    const config = loadConfig()
    if (!config) {
-     return Promise.reject(null)
+     return Promise.reject(new Error('Configuration not found'))
    }
    if (config.error) {
-     return Promise.reject(undefined)
+     return Promise.reject(new Error('Configuration error'))
    }
    return Promise.resolve(config)
  }
```

### Arrow Functions

```diff
  const validateUser = (user: any) => {
    if (!user.name) {
-     return Promise.reject('Name is required')
+     return Promise.reject(new Error('Name is required'))
    }
    if (user.age < 18) {
-     return Promise.reject('User must be 18 or older')
+     return Promise.reject(new Error('User must be 18 or older'))
    }
    return Promise.resolve(user)
  }
```

## Rule Scope

This rule **only applies to**:

- ✅ `Promise.reject()` calls with primitive values:
  - String literals (`'error message'`)
  - Number literals (`404`, `500`)
  - Boolean literals (`true`, `false`)
  - `null` and `undefined`
  - Variables containing primitive values
  - Expressions that evaluate to primitive values

This rule **does NOT apply to**:

- ❌ `Promise.reject()` with Error objects (`new Error()`, `new TypeError()`)
- ❌ `Promise.reject()` with Error subclasses (`new RangeError()`, `new SyntaxError()`)
- ❌ `Promise.reject()` with custom Error classes
- ❌ `Promise.resolve()` calls
- ❌ Other Promise methods (`.then()`, `.catch()`, `.finally()`)
- ❌ `throw` statements
- ❌ Non-Promise rejections

## Auto-fix Behavior

The rule provides auto-fix suggestions that wrap primitive values with `new Error()`:

- `Promise.reject('error')` → `Promise.reject(new Error('error'))`
- `Promise.reject(404)` → `Promise.reject(new Error(404))`
- `Promise.reject(true)` → `Promise.reject(new Error(true))`
- `Promise.reject(null)` → `Promise.reject(new Error(null))`
- `Promise.reject(variable)` → `Promise.reject(new Error(variable))`
- `Promise.reject(expression)` → `Promise.reject(new Error(expression))`
