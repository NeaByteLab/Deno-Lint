# Expected Behavior: `prefer-optional-chain` Rule

This rule enforces the use of optional chaining (`?.`) over logical AND (`&&`) for property access when the same object is being checked and accessed.

## ❌ Invalid Examples

```typescript
// Logical AND with property access (same object)
const name = user && user.name
const email = user && user.profile && user.profile.email
const count = data && data.items && data.items.length

// Logical AND with method calls (same object)
const result = api && api.getData()
const user = service && service.getUser(id)
const processed = data && data.filter().map()

// Logical AND with computed property access (same object)
const value = obj && obj[key]
const item = array && array[index]
const prop = config && config[setting]

// Complex nested access patterns
const fullName = user && user.profile && user.profile.name
const settings = config && config.user && config.user.preferences
const data = response && response.data && response.data.results

// In function parameters and returns
function getUserName(user) {
  return user && user.name
}

const getUserEmail = user => user && user.profile && user.profile.email

// In object properties
const userData = {
  name: user && user.name,
  email: user && user.profile && user.profile.email
}

// In template literals
const greeting = `Hello ${user && user.name}!`
const status = `Count: ${data && data.items && data.items.length}`

// In class methods
class UserService {
  getName(user) {
    return user && user.name
  }

  getProfile(user) {
    return user && user.profile && user.profile.details
  }
}

// In async functions
async function fetchUserData(id) {
  const user = await api.getUser(id)
  return user && user.profile && user.profile.email
}
```

## ✅ Valid Examples

```typescript
// Optional chaining with property access (correct)
const name = user?.name
const email = user?.profile?.email
const count = data?.items?.length

// Optional chaining with method calls (correct)
const result = api?.getData()
const user = service?.getUser(id)
const processed = data?.filter()?.map()

// Optional chaining with computed property access (correct)
const value = obj?.[key]
const item = array?.[index]
const prop = config?.[setting]

// Complex nested access patterns with optional chaining
const fullName = user?.profile?.name
const settings = config?.user?.preferences
const data = response?.data?.results

// In function parameters and returns
function getUserName(user) {
  return user?.name
}

const getUserEmail = user => user?.profile?.email

// In object properties
const userData = {
  name: user?.name,
  email: user?.profile?.email
}

// In template literals
const greeting = `Hello ${user?.name}!`
const status = `Count: ${data?.items?.length}`

// In class methods
class UserService {
  getName(user) {
    return user?.name
  }

  getProfile(user) {
    return user?.profile?.details
  }
}

// In async functions
async function fetchUserData(id) {
  const user = await api.getUser(id)
  return user?.profile?.email
}

// Logical AND with different objects (not affected by this rule)
const result = user && profile.name
const data = api && otherService.getData()

// Logical AND with literals (not affected by this rule)
const flag = user && 'active'
const message = data && 'loaded'

// Logical AND with function calls (not affected by this rule)
const result = user && getName()
const data = api && processData()

// Already using optional chaining (not affected by this rule)
const name = user?.name
const email = user?.profile?.email

// Logical OR (not affected by this rule)
const name = user || user.name
const email = user || user.profile?.email
```

## Rule Scope

This rule **only applies to**:

- ✅ Logical AND (`&&`) operators where the same object is being checked and accessed:
  - `object && object.property` → `object?.property`
  - `object && object.method()` → `object?.method()`
  - `object && object[key]` → `object?.[key]`

This rule **does NOT apply to**:

- ❌ Logical AND (`&&`) with different objects (`user && profile.name`)
- ❌ Logical AND (`&&`) with literals (`user && 'active'`)
- ❌ Logical AND (`&&`) with function calls (`user && getName()`)
- ❌ Logical OR (`||`) operators
- ❌ Already using optional chaining (`user?.name`)
- ❌ Other logical operators (`!`, `??`)

## Why This Rule Matters

The logical AND (`&&`) pattern for property access is verbose and error-prone:

```typescript
// ❌ Verbose and repetitive
const name = user && user.name
const email = user && user.profile && user.profile.email
const count = data && data.items && data.items.length
```

Optional chaining (`?.`) is more concise and readable:

```typescript
// ✅ Concise and clear
const name = user?.name
const email = user?.profile?.email
const count = data?.items?.length
```

## Auto-fix Behavior

The rule provides auto-fix suggestions that replace `&&` with `?.`:

- `user && user.name` → `user?.name`
- `user && user.getName()` → `user?.getName()`
- `obj && obj[key]` → `obj?.[key]`
- `api && api.getData(id)` → `api?.getData(id)`
- `user && user.profile && user.profile.email` → `user?.profile?.email`
