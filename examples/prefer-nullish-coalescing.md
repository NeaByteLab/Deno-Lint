# Expected Behavior: `prefer-nullish-coalescing` Rule

This rule enforces the use of nullish coalescing operator (`??`) over logical OR (`||`) when dealing with null or undefined values, particularly when the right-hand side is a falsy but not nullish value.

## ❌ Invalid Examples

```typescript
// Logical OR with empty string (falsy but not nullish)
const displayName = user.name || ''
const message = input || ''
const title = config.title || ''

// Logical OR with zero (falsy but not nullish)
const count = items.length || 0
const index = searchIndex || 0
const timeout = settings.timeout || 0

// Logical OR with false (falsy but not nullish)
const enabled = feature.flag || false
const visible = config.show || false
const required = field.required || false

// Complex expressions with falsy values
const result = user?.name || '' || 'Anonymous'
const config = {
  apiUrl: process.env.API_URL || '',
  timeout: settings.timeout || 0,
  debug: process.env.DEBUG || false
}

// Function parameters with falsy defaults
function createUser(name = user.name || '', age = user.age || 0) {
  return { name, age }
}

// Object properties with falsy values
const user = {
  name: input.name || '',
  count: data.count || 0,
  active: status.active || false
}

// Template literals with falsy values
const greeting = `Hello ${user.name || ''}!`
const status = `Count: ${items.length || 0}`
const message = `Debug: ${config.debug || false}`
```

## ✅ Valid Examples

```typescript
// Nullish coalescing with empty string (correct)
const displayName = user.name ?? ''
const message = input ?? ''
const title = config.title ?? ''

// Nullish coalescing with zero (correct)
const count = items.length ?? 0
const index = searchIndex ?? 0
const timeout = settings.timeout ?? 0

// Nullish coalescing with false (correct)
const enabled = feature.flag ?? false
const visible = config.show ?? false
const required = field.required ?? false

// Complex expressions with nullish coalescing
const result = (user?.name ?? '') || 'Anonymous'
const config = {
  apiUrl: process.env.API_URL ?? '',
  timeout: settings.timeout ?? 0,
  debug: process.env.DEBUG ?? false
}

// Function parameters with nullish coalescing defaults
function createUser(name = user.name ?? '', age = user.age ?? 0) {
  return { name, age }
}

// Object properties with nullish coalescing
const user = {
  name: input.name ?? '',
  count: data.count ?? 0,
  active: status.active ?? false
}

// Template literals with nullish coalescing
const greeting = `Hello ${user.name ?? ''}!`
const status = `Count: ${items.length ?? 0}`
const message = `Debug: ${config.debug ?? false}`

// Logical OR with non-falsy values (not affected by this rule)
const name = user.name || 'Anonymous'
const count = items.length || 10
const enabled = feature.flag || true

// Logical AND (not affected by this rule)
const result = user && user.name
const isValid = input && input.length > 0

// Already using nullish coalescing (not affected by this rule)
const displayName = user.name ?? 'Anonymous'
const count = items.length ?? 10
const enabled = feature.flag ?? true
```

## Rule Scope

This rule **only applies to**:

- ✅ Logical OR (`||`) operators where the right-hand side is a falsy but not nullish value:
  - Empty string (`""`)
  - Zero (`0`)
  - Boolean `false`

This rule **does NOT apply to**:

- ❌ Logical OR (`||`) with non-falsy values (`"hello"`, `1`, `true`)
- ❌ Logical AND (`&&`) operators
- ❌ Nullish coalescing (`??`) operators
- ❌ Other logical operators (`!`, `&&`, `??`)

## Why This Rule Matters

The logical OR (`||`) operator treats **all** falsy values as "missing":

- `""` (empty string) → treated as missing
- `0` (zero) → treated as missing
- `false` (boolean) → treated as missing

The nullish coalescing (`??`) operator only treats `null` and `undefined` as missing:

- `""` (empty string) → preserved
- `0` (zero) → preserved
- `false` (boolean) → preserved

## Auto-fix Behavior

The rule provides auto-fix suggestions that replace `||` with `??`:

- `value || ""` → `value ?? ""`
- `count || 0` → `count ?? 0`
- `flag || false` → `flag ?? false`
- `(user?.name || "") || false` → `(user?.name ?? "") || false` (first occurrence)
