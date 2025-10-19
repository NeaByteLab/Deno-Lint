# Expected Behavior: `prefer-optional-chain` Rule

This rule enforces the use of optional chaining (`?.`) over logical AND (`&&`) for property access when the same object is being checked and accessed.

## Examples

### Basic Property Access

```diff
- const name = user && user.name
- const email = user && user.profile && user.profile.email
- const count = data && data.items && data.items.length
+ const name = user?.name
+ const email = user?.profile?.email
+ const count = data?.items?.length
```

### Method Calls

```diff
- const result = api && api.getData()
- const user = service && service.getUser(id)
- const processed = data && data.filter().map()
+ const result = api?.getData()
+ const user = service?.getUser(id)
+ const processed = data?.filter()?.map()
```

### Computed Property Access

```diff
- const value = obj && obj[key]
- const item = array && array[index]
- const prop = config && config[setting]
+ const value = obj?.[key]
+ const item = array?.[index]
+ const prop = config?.[setting]
```

### Function Returns

```diff
- function getUserName(user) {
-   return user && user.name
- }
-
- const getUserEmail = user => user && user.profile && user.profile.email
+ function getUserName(user) {
+   return user?.name
+ }
+
+ const getUserEmail = user => user?.profile?.email
```

### Template Literals

```diff
- const greeting = `Hello ${user && user.name}!`
- const status = `Count: ${data && data.items && data.items.length}`
+ const greeting = `Hello ${user?.name}!`
+ const status = `Count: ${data?.items?.length}`
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

## Auto-fix Behavior

The rule provides auto-fix suggestions that replace `&&` with `?.`:

- `user && user.name` → `user?.name`
- `user && user.getName()` → `user?.getName()`
- `obj && obj[key]` → `obj?.[key]`
- `api && api.getData(id)` → `api?.getData(id)`
- `user && user.profile && user.profile.email` → `user?.profile?.email`
