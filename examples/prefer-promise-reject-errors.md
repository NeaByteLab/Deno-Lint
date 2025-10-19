# Expected Behavior: `prefer-promise-reject-errors` Rule

This rule enforces the use of Error objects in `Promise.reject()` calls instead of primitive values.

## ❌ Invalid Examples

```typescript
// Promise.reject with primitive string values
function fetchUser(id: string) {
  if (!id) {
    return Promise.reject('Invalid user ID')
  }
  if (id === 'admin') {
    return Promise.reject('Access denied')
  }
  return Promise.resolve({ id, name: 'John' })
}

// Promise.reject with primitive number values
function validateInput(input: any) {
  if (typeof input !== 'string') {
    return Promise.reject(400)
  }
  if (input.length < 3) {
    return Promise.reject(422)
  }
  return Promise.resolve(input)
}

// Promise.reject with primitive boolean values
function processRequest(data: any) {
  if (!data) {
    return Promise.reject(false)
  }
  if (data.invalid) {
    return Promise.reject(true)
  }
  return Promise.resolve(data)
}

// Promise.reject with null/undefined
function getConfig() {
  const config = loadConfig()
  if (!config) {
    return Promise.reject(null)
  }
  if (config.error) {
    return Promise.reject(undefined)
  }
  return Promise.resolve(config)
}

// Promise.reject with variables containing primitives
function handleError(error: any) {
  const message = 'Something went wrong'
  const code = 500
  const status = false

  if (error.code) {
    return Promise.reject(error.code)
  }
  if (error.message) {
    return Promise.reject(message)
  }
  return Promise.reject(status)
}

// Promise.reject in async functions
async function processData(data: unknown) {
  try {
    if (!data) {
      throw new Error('No data provided')
    }

    const parsed = JSON.parse(data as string)

    if (parsed.error) {
      return Promise.reject(parsed.error)
    }

    if (parsed.code && parsed.code > 500) {
      return Promise.reject(parsed.code)
    }

    return parsed
  } catch (err) {
    return Promise.reject(err instanceof Error ? err : 'Parse error')
  }
}

// Promise.reject in arrow functions
const validateUser = (user: any) => {
  if (!user.name) {
    return Promise.reject('Name is required')
  }
  if (user.age < 18) {
    return Promise.reject('User must be 18 or older')
  }
  return Promise.resolve(user)
}

// Promise.reject in class methods
class ApiService {
  async fetchData(url: string) {
    if (!url) {
      return Promise.reject('URL is required')
    }
    if (!url.startsWith('http')) {
      return Promise.reject('Invalid URL format')
    }
    return fetch(url)
  }

  handleResponse(response: Response) {
    if (!response.ok) {
      return Promise.reject(response.status)
    }
    return Promise.resolve(response.json())
  }
}

// Promise.reject with complex expressions
function processResult(result: any) {
  const errorMessage = result.error || 'Unknown error'
  const errorCode = result.code || 500

  if (result.failed) {
    return Promise.reject(errorMessage)
  }
  if (result.invalid) {
    return Promise.reject(errorCode)
  }
  return Promise.resolve(result)
}

// Promise.reject in template literals and expressions
function createErrorMessage(type: string) {
  const message = `Invalid ${type} provided`
  const code = 400

  return Promise.reject(message)
}

// Promise.reject with ternary operators
function handleValidation(isValid: boolean, error: string) {
  return isValid ? Promise.resolve('Valid') : Promise.reject(error)
}
```

## ✅ Valid Examples

```typescript
// Promise.reject with Error objects
function fetchUser(id: string) {
  if (!id) {
    return Promise.reject(new Error('Invalid user ID'))
  }
  if (id === 'admin') {
    return Promise.reject(new Error('Access denied'))
  }
  return Promise.resolve({ id, name: 'John' })
}

// Promise.reject with specific Error types
function validateInput(input: any) {
  if (typeof input !== 'string') {
    return Promise.reject(new TypeError('Input must be a string'))
  }
  if (input.length < 3) {
    return Promise.reject(new RangeError('Input too short'))
  }
  return Promise.resolve(input)
}

// Promise.reject with custom Error objects
function processRequest(data: any) {
  if (!data) {
    return Promise.reject(new Error('No data provided'))
  }
  if (data.invalid) {
    return Promise.reject(new Error('Invalid data format'))
  }
  return Promise.resolve(data)
}

// Promise.reject with Error constructors
function getConfig() {
  const config = loadConfig()
  if (!config) {
    return Promise.reject(new Error('Configuration not found'))
  }
  if (config.error) {
    return Promise.reject(new Error('Configuration error'))
  }
  return Promise.resolve(config)
}

// Promise.reject with Error objects from variables
function handleError(error: any) {
  const message = 'Something went wrong'
  const code = 500

  if (error.code) {
    return Promise.reject(new Error(`Error code: ${error.code}`))
  }
  if (error.message) {
    return Promise.reject(new Error(message))
  }
  return Promise.reject(new Error('Unknown error'))
}

// Promise.reject in async functions with Error objects
async function processData(data: unknown) {
  try {
    if (!data) {
      throw new Error('No data provided')
    }

    const parsed = JSON.parse(data as string)

    if (parsed.error) {
      return Promise.reject(new Error(parsed.error))
    }

    if (parsed.code && parsed.code > 500) {
      return Promise.reject(new Error('Server error'))
    }

    return parsed
  } catch (err) {
    return Promise.reject(err instanceof Error ? err : new Error('Parse error'))
  }
}

// Promise.reject in arrow functions with Error objects
const validateUser = (user: any) => {
  if (!user.name) {
    return Promise.reject(new Error('Name is required'))
  }
  if (user.age < 18) {
    return Promise.reject(new Error('User must be 18 or older'))
  }
  return Promise.resolve(user)
}

// Promise.reject in class methods with Error objects
class ApiService {
  async fetchData(url: string) {
    if (!url) {
      return Promise.reject(new Error('URL is required'))
    }
    if (!url.startsWith('http')) {
      return Promise.reject(new Error('Invalid URL format'))
    }
    return fetch(url)
  }

  handleResponse(response: Response) {
    if (!response.ok) {
      return Promise.reject(new Error(`HTTP ${response.status}`))
    }
    return Promise.resolve(response.json())
  }
}

// Promise.reject with Error objects in complex expressions
function processResult(result: any) {
  const errorMessage = result.error || 'Unknown error'
  const errorCode = result.code || 500

  if (result.failed) {
    return Promise.reject(new Error(errorMessage))
  }
  if (result.invalid) {
    return Promise.reject(new Error(`Error code: ${errorCode}`))
  }
  return Promise.resolve(result)
}

// Promise.reject with Error objects in template literals
function createErrorMessage(type: string) {
  const message = `Invalid ${type} provided`

  return Promise.reject(new Error(message))
}

// Promise.reject with Error objects in ternary operators
function handleValidation(isValid: boolean, error: string) {
  return isValid ? Promise.resolve('Valid') : Promise.reject(new Error(error))
}

// Already using Error objects (not affected by this rule)
function existingErrorHandling() {
  return Promise.reject(new Error('Already correct'))
}

// Promise.reject with Error subclasses (not affected by this rule)
function specificErrors() {
  return Promise.reject(new TypeError('Type error'))
}

// Promise.reject with custom Error classes (not affected by this rule)
class CustomError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CustomError'
  }
}

function customErrorHandling() {
  return Promise.reject(new CustomError('Custom error'))
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

## Why This Rule Matters

Using primitive values in `Promise.reject()` can lead to:

1. **Poor Error Handling**: Primitive values don't have stack traces
2. **Inconsistent Error Objects**: Makes error handling unpredictable
3. **Debugging Difficulties**: Hard to identify where errors originated
4. **Type Safety Issues**: Primitive values don't provide error context

Error objects provide:

1. **Stack Traces**: Show exactly where the error occurred
2. **Consistent Interface**: All errors have `.message`, `.name`, `.stack`
3. **Better Debugging**: Easier to identify and fix issues
4. **Type Safety**: Error objects are more predictable

## Auto-fix Behavior

The rule provides auto-fix suggestions that wrap primitive values with `new Error()`:

- `Promise.reject('error')` → `Promise.reject(new Error('error'))`
- `Promise.reject(404)` → `Promise.reject(new Error(404))`
- `Promise.reject(true)` → `Promise.reject(new Error(true))`
- `Promise.reject(null)` → `Promise.reject(new Error(null))`
- `Promise.reject(variable)` → `Promise.reject(new Error(variable))`
- `Promise.reject(expression)` → `Promise.reject(new Error(expression))`
