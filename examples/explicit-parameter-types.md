# Expected Behavior: `explicit-parameter-types` Rule

This rule enforces explicit type annotations on all function parameters, including regular parameters, destructured parameters, rest parameters, and default parameters.

## Examples

### Basic Function with Regular Parameters

```diff
- function processUser(user) {
+ function processUser(user: any) {
    return user.name.toUpperCase()
  }
```

### Arrow Function with Multiple Parameters

```diff
- const validateInput = (input, options) => {
+ const validateInput = (input: any, options: any) => {
    return input.length > 0 && options.strict
  }
```

### Function with Destructured Parameters

```diff
- function createUser({ name, email, age }) {
+ function createUser({ name, email, age }: any) {
    return { id: Date.now(), name, email, age }
  }
```

### Function with Rest Parameters

```diff
- function logMessages(...messages) {
+ function logMessages(...messages: any[]) {
    console.log(...messages)
  }
```

### Function with Default Parameters

```diff
- function greetUser(name = 'Guest') {
+ function greetUser(name: any = 'Guest') {
    return `Hello, ${name}!`
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
