// Write problematic code here

// Missing return type annotation
function getUserData(id: string) {
  return { id, name: 'John' }
}

// Missing parameter type annotation
function processData(data) {
  return data.toString()
}

// Using logical OR instead of nullish coalescing
const result = user?.name || 'default'

// Missing async suffix
async function fetchData() {
  return await fetch('/api/data')
}

// Nested if statements (should use early return)
function validateUser(user) {
  if (user) {
    if (user.isActive) {
      if (user.role === 'admin') {
        return true
      }
    }
  }
  return false
}

// Missing const assertion
const config = { apiUrl: 'https://api.example.com' }

// Promise.reject without Error object
Promise.reject('Something went wrong')

// Export to avoid "no unused variable" warnings
export { getUserData, processData, fetchData, validateUser, config, result }
