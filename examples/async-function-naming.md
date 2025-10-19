# Expected Behavior: `async-function-naming` Rule

This rule enforces that async function declarations must have the 'Async' suffix in their name.

## Examples

### Basic Async Function Naming

```diff
- async function fetchUser() {
+ async function fetchUserAsync() {
    const response = await fetch('/api/user')
    return response.json()
  }
```

### Async Function with Parameters

```diff
- async function processData(data: any[]) {
+ async function processDataAsync(data: any[]) {
    return data.map(item => item.processed)
  }
```

### Async Function with Complex Logic

```diff
- async function getUserByIdAndUpdate(id: string, updates: Partial<User>) {
+ async function getUserByIdAndUpdateAsync(id: string, updates: Partial<User>) {
    const user = await db.users.findById(id)
    if (user) {
      await db.users.update(id, updates)
    }
    return user
  }
```

### Async Function with Return Type

```diff
- async function validateInput(input: string): Promise<boolean> {
+ async function validateInputAsync(input: string): Promise<boolean> {
    return input.length > 0
  }
```

### Multiple Async Functions

```diff
- async function saveToDatabase(record: User) {
+ async function saveToDatabaseAsync(record: User) {
    await db.users.insert(record)
  }

- async function handleRequest(req: Request) {
+ async function handleRequestAsync(req: Request) {
    const body = await req.json()
    const result = await processRequest(body)
    return new Response(JSON.stringify(result))
  }
```

## Rule Scope

This rule **only applies to**:

- ✅ `async function` declarations with names

This rule **does NOT apply to**:

- ❌ Arrow functions (`const fn = async () => {}`)
- ❌ Function expressions (`const fn = async function() {}`)
- ❌ Class methods (`async method() {}`)
- ❌ Non-async functions
- ❌ Anonymous functions

## Auto-fix Behavior

The rule provides auto-fix suggestions that add the 'Async' suffix:

- `async function fetchUser()` → `async function fetchUserAsync()`
- `async function processData()` → `async function processDataAsync()`
- `async function saveToDatabase()` → `async function saveToDatabaseAsync()`
