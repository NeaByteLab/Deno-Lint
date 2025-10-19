# Expected Behavior: `prefer-nullish-coalescing` Rule

This rule enforces the use of nullish coalescing operator (`??`) over logical OR (`||`) when dealing with null or undefined values, particularly when the right-hand side is a falsy but not nullish value.

## Examples

### Empty String Default

```diff
- const displayName = user.name || ''
- const message = input || ''
- const title = config.title || ''
+ const displayName = user.name ?? ''
+ const message = input ?? ''
+ const title = config.title ?? ''
```

### Zero Default

```diff
- const count = items.length || 0
- const index = searchIndex || 0
- const timeout = settings.timeout || 0
+ const count = items.length ?? 0
+ const index = searchIndex ?? 0
+ const timeout = settings.timeout ?? 0
```

### Boolean False Default

```diff
- const enabled = feature.flag || false
- const visible = config.show || false
- const required = field.required || false
+ const enabled = feature.flag ?? false
+ const visible = config.show ?? false
+ const required = field.required ?? false
```

### Object Properties with Falsy Defaults

```diff
- const user = {
-   name: input.name || '',
-   count: data.count || 0,
-   active: status.active || false
- }
+ const user = {
+   name: input.name ?? '',
+   count: data.count ?? 0,
+   active: status.active ?? false
+ }
```

### Template Literals with Falsy Values

```diff
- const greeting = `Hello ${user.name || ''}!`
- const status = `Count: ${items.length || 0}`
- const message = `Debug: ${config.debug || false}`
+ const greeting = `Hello ${user.name ?? ''}!`
+ const status = `Count: ${items.length ?? 0}`
+ const message = `Debug: ${config.debug ?? false}`
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

## Auto-fix Behavior

The rule provides auto-fix suggestions that replace `||` with `??`:

- `value || ""` → `value ?? ""`
- `count || 0` → `count ?? 0`
- `flag || false` → `flag ?? false`
- `(user?.name || "") || false` → `(user?.name ?? "") || false` (first occurrence)
