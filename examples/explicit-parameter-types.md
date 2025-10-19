# Expected Behavior: `explicit-parameter-types` Rule

This rule enforces explicit type annotations on all function parameters, including regular parameters, destructured parameters, rest parameters, and default parameters.

## ❌ Invalid Examples

```typescript
// Function declarations without parameter types
function processUser(user) {
  return user.name.toUpperCase()
}

function calculateSum(a, b) {
  return a + b
}

// Arrow functions without parameter types
const fetchData = url => {
  return fetch(url).then(res => res.json())
}

const validateInput = (input, options) => {
  return input.length > 0 && options.strict
}

// Function expressions without parameter types
const handler = function (event, target) {
  event.preventDefault()
  target.focus()
}

// Destructured parameters without types
function createUser({ name, email, age }) {
  return { id: Date.now(), name, email, age }
}

function processConfig({ apiUrl, timeout, retries }) {
  return { apiUrl, timeout: timeout || 5000, retries: retries || 3 }
}

// Rest parameters without types
function logMessages(...messages) {
  console.log(...messages)
}

function combineArrays(...arrays) {
  return arrays.flat()
}

// Default parameters without types
function greetUser(name = 'Guest') {
  return `Hello, ${name}!`
}

function createTimer(duration = 1000, callback) {
  setTimeout(callback, duration)
}

// Mixed parameter types without annotations
function complexFunction(regularParam, { destructuredProp }, ...restParams) {
  return { regularParam, destructuredProp, restParams }
}

// Class methods without parameter types
class UserService {
  constructor(apiUrl, timeout) {
    this.apiUrl = apiUrl
    this.timeout = timeout
  }

  async fetchUser(id, includeProfile = false) {
    const response = await fetch(`${this.apiUrl}/users/${id}`)
    return response.json()
  }

  updateUser(id, { name, email }) {
    return this.api.updateUser(id, { name, email })
  }
}
```

## ✅ Valid Examples

```typescript
// Function declarations with explicit parameter types
function processUser(user: { name: string; email: string }) {
  return user.name.toUpperCase()
}

function calculateSum(a: number, b: number): number {
  return a + b
}

// Arrow functions with explicit parameter types
const fetchData = (url: string): Promise<any> => {
  return fetch(url).then(res => res.json())
}

const validateInput = (input: string, options: { strict: boolean }): boolean => {
  return input.length > 0 && options.strict
}

// Function expressions with explicit parameter types
const handler = function (event: Event, target: HTMLElement): void {
  event.preventDefault()
  target.focus()
}

// Destructured parameters with explicit types
function createUser({ name, email, age }: { name: string; email: string; age: number }) {
  return { id: Date.now(), name, email, age }
}

function processConfig({
  apiUrl,
  timeout,
  retries
}: {
  apiUrl: string
  timeout?: number
  retries?: number
}) {
  return { apiUrl, timeout: timeout || 5000, retries: retries || 3 }
}

// Rest parameters with explicit types
function logMessages(...messages: string[]): void {
  console.log(...messages)
}

function combineArrays(...arrays: any[][]): any[] {
  return arrays.flat()
}

// Default parameters with explicit types
function greetUser(name: string = 'Guest'): string {
  return `Hello, ${name}!`
}

function createTimer(duration: number = 1000, callback: () => void): void {
  setTimeout(callback, duration)
}

// Mixed parameter types with explicit annotations
function complexFunction(
  regularParam: string,
  { destructuredProp }: { destructuredProp: number },
  ...restParams: any[]
): object {
  return { regularParam, destructuredProp, restParams }
}

// Class methods with explicit parameter types
class UserService {
  private apiUrl: string
  private timeout: number

  constructor(apiUrl: string, timeout: number) {
    this.apiUrl = apiUrl
    this.timeout = timeout
  }

  async fetchUser(id: string, includeProfile: boolean = false): Promise<any> {
    const response = await fetch(`${this.apiUrl}/users/${id}`)
    return response.json()
  }

  updateUser(id: string, { name, email }: { name: string; email: string }): Promise<void> {
    return this.api.updateUser(id, { name, email })
  }
}
```

## Rule Scope

This rule applies to all function types:

- ✅ Function declarations
- ✅ Arrow function expressions
- ✅ Function expressions (but not class methods)
- ✅ Class method definitions

## Parameter Types Covered

- ✅ **Regular parameters** - `param: string`
- ✅ **Destructured parameters** - `{ name, age }: { name: string; age: number }`
- ✅ **Rest parameters** - `...items: string[]`
- ✅ **Default parameters** - `name: string = 'default'`

## Auto-fix Behavior

The rule provides auto-fix suggestions that add `: any` type annotations:

- `param` → `param: any`
- `{ name }` → `{ name }: any`
- `...items` → `...items: any[]`
- `name = 'default'` → `name: any = 'default'`
