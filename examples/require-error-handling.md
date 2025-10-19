# Expected Behavior: `require-error-handling` Rule

This rule enforces proper error handling for Deno file operations by requiring them to be awaited or handled with `.catch()`.

## Examples

### Basic File Operations

```diff
- function readConfig() {
-   const config = Deno.readTextFile('./config.json') // Missing await
-   return JSON.parse(config)
- }
-
- function saveData(data: any) {
-   Deno.writeTextFile('./data.json', JSON.stringify(data)) // Missing await
- }
+ async function readConfig() {
+   const config = await Deno.readTextFile('./config.json')
+   return JSON.parse(config)
+ }
+
+ async function saveData(data: any) {
+   await Deno.writeTextFile('./data.json', JSON.stringify(data))
+ }
```

### File System Operations

```diff
- function copyFiles() {
-   Deno.copyFile('./source.txt', './destination.txt') // Missing await
- }
-
- function createDirectory() {
-   Deno.mkdir('./new-folder') // Missing await
- }
+ async function copyFiles() {
+   await Deno.copyFile('./source.txt', './destination.txt')
+ }
+
+ async function createDirectory() {
+   await Deno.mkdir('./new-folder')
+ }
```

### File Information Operations

```diff
- function getFileInfo() {
-   const stats = Deno.stat('./file.txt') // Missing await
-   return stats.size
- }
-
- function readDirectory() {
-   const files = Deno.readDir('./src') // Missing await
-   return Array.from(files)
- }
+ async function getFileInfo() {
+   const stats = await Deno.stat('./file.txt')
+   return stats.size
+ }
+
+ async function readDirectory() {
+   const files = Deno.readDir('./src')
+   return Array.from(files)
+ }
```

### Multiple Operations

```diff
- function processFiles() {
-   const config = Deno.readTextFile('./config.json') // Missing await
-   const data = Deno.readTextFile('./data.json') // Missing await
-   Deno.writeTextFile('./result.json', JSON.stringify({ config, data })) // Missing await
- }
+ async function processFiles() {
+   const config = await Deno.readTextFile('./config.json')
+   const data = await Deno.readTextFile('./data.json')
+   await Deno.writeTextFile('./result.json', JSON.stringify({ config, data }))
+ }
```

### Class Methods

```diff
- class FileManager {
-   async loadConfig() {
-     const config = Deno.readTextFile('./config.json') // Missing await
-     return JSON.parse(config)
-   }
-
-   saveUser(user: any) {
-     Deno.writeTextFile(`./users/${user.id}.json`, JSON.stringify(user)) // Missing await
-   }
- }
+ class FileManager {
+   async loadConfig() {
+     const config = await Deno.readTextFile('./config.json')
+     return JSON.parse(config)
+   }
+
+   async saveUser(user: any) {
+     await Deno.writeTextFile(`./users/${user.id}.json`, JSON.stringify(user))
+   }
+ }
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
