# Expected Behavior: `explicit-return-types` Rule

This rule enforces explicit return type annotations on all functions, methods, and constructors.

## ❌ Invalid Examples

```typescript
// Function declarations without return types
function getUser() {
  return { id: 1, name: 'John' }
}

function calculateSum(a: number, b: number) {
  return a + b
}

// Arrow functions without return types
const processData = (data: string[]) => {
  return data.map(item => item.toUpperCase())
}

const isValid = (value: string) => value.length > 0

// Function expressions without return types
const handler = function (event: Event) {
  event.preventDefault()
}

// Class methods without return types
class UserService {
  constructor() {
    this.apiUrl = 'https://api.example.com'
  }

  async fetchUser(id: string) {
    const response = await fetch(`${this.apiUrl}/users/${id}`)
    return response.json()
  }

  validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Generator functions without return types
  *generateIds() {
    let id = 1
    while (true) {
      yield id++
    }
  }
}
```

## ✅ Valid Examples

```typescript
// Function declarations with explicit return types
function getUser(): { id: number; name: string } {
  return { id: 1, name: 'John' }
}

function calculateSum(a: number, b: number): number {
  return a + b
}

// Arrow functions with explicit return types
const processData = (data: string[]): string[] => {
  return data.map(item => item.toUpperCase())
}

const isValid = (value: string): boolean => value.length > 0

// Function expressions with explicit return types
const handler = function (event: Event): void {
  event.preventDefault()
}

// Class methods with explicit return types
class UserService {
  private apiUrl: string

  constructor() {
    this.apiUrl = 'https://api.example.com'
  }

  async fetchUser(id: string): Promise<{ id: number; name: string }> {
    const response = await fetch(`${this.apiUrl}/users/${id}`)
    return response.json()
  }

  validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Generator functions with explicit return types
  *generateIds(): Generator<number, void, unknown> {
    let id = 1
    while (true) {
      yield id++
    }
  }
}
```

## Rule Scope

This rule applies to:

- ✅ Function declarations
- ❌ Arrow functions (not covered by this rule)
- ❌ Function expressions (not covered by this rule)
- ❌ Class methods (not covered by this rule)

## Auto-fix Behavior

The rule provides auto-fix suggestions that attempt to infer return types:

- `function foo() { return true }` → `function foo(): boolean { return true }`
- `function bar() { return "hello" }` → `function bar(): string { return "hello" }`
- `function baz() { return 42 }` → `function baz(): number { return 42 }`
- `function qux() { return {} }` → `function qux(): object { return {} }`
- `function quux() { return [] }` → `function quux(): any[] { return [] }`
- `function corge() { }` → `function corge(): void { }`
