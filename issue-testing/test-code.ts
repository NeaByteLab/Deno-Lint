// Test code to trigger all plugin rules

// Should trigger: deno-lint/async-function-naming
async function fetchData() {
  return 'data'
}

// Should trigger: deno-lint/explicit-parameter-types
function processUser(user) {
  return user.name
}

// Should trigger: deno-lint/explicit-return-types
function calculateSum(a: number, b: number) {
  return a + b
}

// Should trigger: deno-lint/require-error-handling
function readConfig() {
  Deno.readTextFile('./config.json')
}

export { fetchData, processUser, calculateSum, readConfig }
