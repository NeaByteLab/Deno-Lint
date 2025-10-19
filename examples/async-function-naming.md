# Expected Behavior: `async-function-naming` Rule

This rule enforces that async function declarations must have the 'Async' suffix in their name.

## ❌ Invalid Examples

```typescript
// Async function declarations without 'Async' suffix
async function fetchUser() {
  const response = await fetch('/api/user')
  return response.json()
}

async function processData(data: any[]) {
  return data.map(item => item.processed)
}

async function saveToDatabase(record: User) {
  await db.users.insert(record)
}

async function validateInput(input: string) {
  return input.length > 0
}

// Complex async functions without 'Async' suffix
async function getUserByIdAndUpdate(id: string, updates: Partial<User>) {
  const user = await db.users.findById(id)
  if (user) {
    await db.users.update(id, updates)
  }
  return user
}

async function handleRequest(req: Request) {
  const body = await req.json()
  const result = await processRequest(body)
  return new Response(JSON.stringify(result))
}
```

## ✅ Valid Examples

```typescript
// Async function declarations with 'Async' suffix
async function fetchUserAsync() {
  const response = await fetch('/api/user')
  return response.json()
}

async function processDataAsync(data: any[]) {
  return data.map(item => item.processed)
}

async function saveToDatabaseAsync(record: User) {
  await db.users.insert(record)
}

async function validateInputAsync(input: string) {
  return input.length > 0
}

// Complex async functions with 'Async' suffix
async function getUserByIdAndUpdateAsync(id: string, updates: Partial<User>) {
  const user = await db.users.findById(id)
  if (user) {
    await db.users.update(id, updates)
  }
  return user
}

async function handleRequestAsync(req: Request) {
  const body = await req.json()
  const result = await processRequest(body)
  return new Response(JSON.stringify(result))
}

// Non-async functions (not affected by this rule)
function calculateSum(a: number, b: number) {
  return a + b
}

const processData = (data: any[]) => {
  return data.map(item => item.processed)
}

// Arrow functions and function expressions (not affected by this rule)
const fetchUser = async () => {
  const response = await fetch('/api/user')
  return response.json()
}

const handler = async function (event: Event) {
  event.preventDefault()
}

// Class methods (not affected by this rule)
class UserService {
  async fetchUser() {
    const response = await fetch('/api/user')
    return response.json()
  }

  async saveUser(user: User) {
    await db.users.insert(user)
  }
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
