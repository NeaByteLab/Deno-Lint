# Expected Behavior: `require-error-handling` Rule

This rule enforces proper error handling for Deno file operations by requiring them to be awaited or handled with `.catch()`.

## ❌ Invalid Examples

```typescript
// Deno file operations without await or .catch()
function readConfig() {
  const config = Deno.readTextFile('./config.json') // Missing await
  return JSON.parse(config)
}

function saveData(data: any) {
  Deno.writeTextFile('./data.json', JSON.stringify(data)) // Missing await
}

function copyFiles() {
  Deno.copyFile('./source.txt', './destination.txt') // Missing await
}

function createDirectory() {
  Deno.mkdir('./new-folder') // Missing await
}

function removeFile() {
  Deno.remove('./temp-file.txt') // Missing await
}

function getFileInfo() {
  const stats = Deno.stat('./file.txt') // Missing await
  return stats.size
}

function readDirectory() {
  const files = Deno.readDir('./src') // Missing await
  return Array.from(files)
}

// Multiple operations without proper handling
function processFiles() {
  const config = Deno.readTextFile('./config.json') // Missing await
  const data = Deno.readTextFile('./data.json') // Missing await
  Deno.writeTextFile('./result.json', JSON.stringify({ config, data })) // Missing await
}

// In class methods
class FileManager {
  async loadConfig() {
    const config = Deno.readTextFile('./config.json') // Missing await
    return JSON.parse(config)
  }

  saveUser(user: any) {
    Deno.writeTextFile(`./users/${user.id}.json`, JSON.stringify(user)) // Missing await
  }
}

// In arrow functions
const backupFile = (source: string, dest: string) => {
  Deno.copyFile(source, dest) // Missing await
}

const createSymlink = (target: string, link: string) => {
  Deno.symlink(target, link) // Missing await
}
```

## ✅ Valid Examples

```typescript
// Deno file operations with await
async function readConfig() {
  const config = await Deno.readTextFile('./config.json')
  return JSON.parse(config)
}

async function saveData(data: any) {
  await Deno.writeTextFile('./data.json', JSON.stringify(data))
}

async function copyFiles() {
  await Deno.copyFile('./source.txt', './destination.txt')
}

async function createDirectory() {
  await Deno.mkdir('./new-folder')
}

async function removeFile() {
  await Deno.remove('./temp-file.txt')
}

async function getFileInfo() {
  const stats = await Deno.stat('./file.txt')
  return stats.size
}

async function readDirectory() {
  const files = Deno.readDir('./src')
  return Array.from(files)
}

// Multiple operations with proper await
async function processFiles() {
  const config = await Deno.readTextFile('./config.json')
  const data = await Deno.readTextFile('./data.json')
  await Deno.writeTextFile('./result.json', JSON.stringify({ config, data }))
}

// With try-catch error handling
async function safeReadFile(path: string) {
  try {
    const content = await Deno.readTextFile(path)
    return content
  } catch (error) {
    console.error(`Failed to read file ${path}:`, error)
    return null
  }
}

// Using .catch() for error handling
function readConfigWithCatch() {
  return Deno.readTextFile('./config.json')
    .then(content => JSON.parse(content))
    .catch(error => {
      console.error('Failed to read config:', error)
      return {}
    })
}

// In class methods with proper handling
class FileManager {
  async loadConfig() {
    try {
      const config = await Deno.readTextFile('./config.json')
      return JSON.parse(config)
    } catch (error) {
      console.error('Config load failed:', error)
      return {}
    }
  }

  async saveUser(user: any) {
    await Deno.writeTextFile(`./users/${user.id}.json`, JSON.stringify(user))
  }

  // Using .catch() in class method
  loadUser(id: string) {
    return Deno.readTextFile(`./users/${id}.json`)
      .then(content => JSON.parse(content))
      .catch(error => {
        console.error(`Failed to load user ${id}:`, error)
        return null
      })
  }
}

// In arrow functions with proper handling
const backupFile = async (source: string, dest: string) => {
  await Deno.copyFile(source, dest)
}

const createSymlink = async (target: string, link: string) => {
  await Deno.symlink(target, link)
}

// Using .catch() with arrow functions
const safeReadFile = (path: string) => {
  return Deno.readTextFile(path)
    .then(content => content)
    .catch(error => {
      console.error(`Failed to read ${path}:`, error)
      return ''
    })
}
```

## Covered Deno Operations

This rule applies to the following Deno file operations:

- ✅ `Deno.readTextFile()`
- ✅ `Deno.writeTextFile()`
- ✅ `Deno.readFile()`
- ✅ `Deno.writeFile()`
- ✅ `Deno.copyFile()`
- ✅ `Deno.copy()`
- ✅ `Deno.remove()`
- ✅ `Deno.readDir()`
- ✅ `Deno.readLink()`
- ✅ `Deno.mkdir()`
- ✅ `Deno.chmod()`
- ✅ `Deno.chown()`
- ✅ `Deno.stat()`
- ✅ `Deno.lstat()`
- ✅ `Deno.realPath()`
- ✅ `Deno.symlink()`

## Rule Behavior

The rule checks if Deno file operations are:

- ✅ **Awaited** - `await Deno.readTextFile(...)`
- ✅ **Handled with .catch()** - `Deno.readTextFile(...).catch(...)`
- ❌ **Neither** - Triggers the lint error

## Error Message

When the rule is violated, it reports:

> "Deno file operations should be awaited or handled with .catch()"

## No Auto-fix

This rule does not provide auto-fix suggestions because proper error handling requires manual consideration of the specific use case and error handling strategy.
