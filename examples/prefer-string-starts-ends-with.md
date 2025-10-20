# Expected Behavior: `prefer-string-starts-ends-with` Rule

This rule enforces the use of `String.startsWith()` and `String.endsWith()` over manual `substring()` comparisons for better readability and performance.

## Examples

### Basic String Checks

```diff
- if (str.substring(0, 3) === "abc") {
-   console.log('Starts with abc')
- }
+ if (str.startsWith("abc")) {
+   console.log('Starts with abc')
+ }
```

### String Ends With Check

```diff
- if (str.substring(str.length - 3) === "xyz") {
-   console.log('Ends with xyz')
- }
+ if (str.endsWith("xyz")) {
+   console.log('Ends with xyz')
+ }
```

### Function Returns

```diff
- function checkPrefix(str, prefix) {
-   return str.substring(0, prefix.length) === prefix
- }
+ function checkPrefix(str, prefix) {
+   return str.startsWith(prefix)
+ }
```

### Function Returns Ends With

```diff
- function checkSuffix(str, suffix) {
-   return str.substring(str.length - suffix.length) === suffix
- }
+ function checkSuffix(str, suffix) {
+   return str.endsWith(suffix)
+ }
```

### Variable Assignments

```diff
- const startsWithPrefix = str.substring(0, prefix.length) === prefix
+ const startsWithPrefix = str.startsWith(prefix)
```

### Variable Assignment Ends With

```diff
- const endsWithSuffix = str.substring(str.length - suffix.length) === suffix
+ const endsWithSuffix = str.endsWith(suffix)
```

### Method Calls

```diff
- if (getString().substring(0, 3) === "http") {
-   console.log('URL detected')
- }
+ if (getString().startsWith("http")) {
+   console.log('URL detected')
+ }
```

### Method Call Ends With

```diff
- const isImage = filename.substring(filename.length - 4) === ".jpg"
+ const isImage = filename.endsWith(".jpg")
```

### Property Access

```diff
- if (obj.name.substring(0, 2) === "Mr") {
-   console.log('Title found')
- }
+ if (obj.name.startsWith("Mr")) {
+   console.log('Title found')
+ }
```

### Property Access Ends With

```diff
- const isEmail = user.email.substring(user.email.length - 4) === ".com"
+ const isEmail = user.email.endsWith(".com")
```

## Rule Scope

This rule **only applies to**:

- ✅ `str.substring(0, n) === "literal"` patterns (startsWith)
- ✅ `str.substring(str.length - n) === "literal"` patterns (endsWith)
- ✅ Literal string comparisons only

This rule **does NOT apply to**:

- ❌ `str.substring(0, prefix.length) === prefix` (variable-based patterns)
- ❌ `str.substring(str.length - suffix.length) === suffix` (variable-based patterns)
- ❌ `str.substring(1, 4) === "abc"` (non-zero start index)
- ❌ Already using `String.startsWith()` or `String.endsWith()`
- ❌ Other string methods (`indexOf`, `charAt`, etc.)
- ❌ Different comparison operators (`!==`, `>`, `<`, etc.)

## Covered Operations

This rule applies to the following operations:

- ✅ `str.substring(0, 3) === "abc"` → `str.startsWith("abc")`
- ✅ `str.substring(str.length - 3) === "xyz"` → `str.endsWith("xyz")`
- ✅ `filename.substring(filename.length - 4) === ".jpg"` → `filename.endsWith(".jpg")`

## Auto-fix Behavior

The rule provides auto-fix suggestions that convert `substring()` comparisons to `String.startsWith()` and `String.endsWith()`:

- `str.substring(0, 3) === "abc"` → `str.startsWith("abc")`
- `str.substring(str.length - 3) === "xyz"` → `str.endsWith("xyz")`
- `filename.substring(filename.length - 4) === ".jpg"` → `filename.endsWith(".jpg")`
