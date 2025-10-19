# Expected Behavior: `explicit-return-types` Rule

This rule enforces explicit return type annotations on all functions, methods, and constructors.

## Examples

### Basic Function with Object Return

```diff
- function getUser() {
+ function getUser(): object {
    return { id: 1, name: 'John' }
  }
```

### Function with Number Return

```diff
- function calculateSum(a: number, b: number) {
+ function calculateSum(a: number, b: number): number {
    return a + b
  }
```

### Function with String Return

```diff
- function processData(data: string[]) {
+ function processData(data: string[]): string[] {
    return data.map(item => item.toUpperCase())
  }
```

### Function with Boolean Return

```diff
- function isValid(value: string) {
+ function isValid(value: string): boolean {
    return value.length > 0
  }
```

### Function with Void Return

```diff
- function handler(event: Event) {
+ function handler(event: Event): void {
    event.preventDefault()
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
