# Expected Behavior: `require-error-handling` Rule

This rule enforces proper error handling for Deno file operations by requiring them to be awaited or handled with `.catch()`.

## Examples

### Basic File Operations

```diff
- function readConfig() {
-   const config = Deno.readTextFile('./config.json')
-   return JSON.parse(config)
- }
+ async function readConfig() {
+   const config = await Deno.readTextFile('./config.json')
+   return JSON.parse(config)
+ }
```

```diff
- function saveData(data: any) {
-   Deno.writeTextFile('./data.json', JSON.stringify(data))
- }
+ async function saveData(data: any) {
+   await Deno.writeTextFile('./data.json', JSON.stringify(data))
+ }
```

### File System Operations

```diff
- function copyFiles() {
-   Deno.copyFile('./source.txt', './destination.txt')
- }
+ async function copyFiles() {
+   await Deno.copyFile('./source.txt', './destination.txt')
+ }
```

```diff
- function createDirectory() {
-   Deno.mkdir('./new-folder')
- }
+ async function createDirectory() {
+   await Deno.mkdir('./new-folder')
+ }
```

### Class Methods

```diff
  class FileManager {
    async loadConfig() {
-     const config = Deno.readTextFile('./config.json')
+     const config = await Deno.readTextFile('./config.json')
      return JSON.parse(config)
    }

    saveUser(user: any) {
-     Deno.writeTextFile(`./users/${user.id}.json`, JSON.stringify(user))
+     await Deno.writeTextFile(`./users/${user.id}.json`, JSON.stringify(user))
    }
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

## No Auto-fix

This rule does not provide auto-fix suggestions because proper error handling requires manual consideration of the specific use case and error handling strategy.
