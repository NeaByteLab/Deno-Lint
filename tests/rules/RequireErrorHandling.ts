import { runnerTest } from '@tests/index.ts'

const rulesId = 'deno-lint/require-error-handling'

Deno.test('Deno.mkdir without await', () => runnerTest(rulesId, 'Deno.mkdir("newdir")', 1))

Deno.test('Deno.mkdir with await', () => runnerTest(rulesId, 'await Deno.mkdir("newdir")', 0))

Deno.test('Deno.mkdir with catch', () =>
  runnerTest(rulesId, 'Deno.mkdir("newdir").catch(console.error)', 1))

Deno.test('Deno operations in arrow functions', () =>
  runnerTest(
    rulesId,
    `
    const readFile = () => Deno.readTextFile("file.txt")
    const writeFile = async () => await Deno.writeTextFile("file.txt", "content")
    const removeFile = () => Deno.remove("file.txt")
  `,
    2
  ))

Deno.test('Deno operations in class methods', () =>
  runnerTest(
    rulesId,
    `
    class FileManager {
      readFile() {
        Deno.readTextFile("file.txt")
      }
      async writeFile() {
        await Deno.writeTextFile("file.txt", "content")
      }
      removeFile() {
        Deno.remove("file.txt")
      }
    }
  `,
    2
  ))

Deno.test('Deno operations in conditional statements', () =>
  runnerTest(
    rulesId,
    `
    if (shouldRead) {
      Deno.readTextFile("file.txt")
    }
    if (shouldWrite) {
      await Deno.writeTextFile("file.txt", "content")
    }
  `,
    1
  ))

Deno.test('Deno operations in loops', () =>
  runnerTest(
    rulesId,
    `
    for (const file of files) {
      Deno.readTextFile(file)
    }
    for await (const file of asyncFiles) {
      await Deno.writeTextFile(file, "content")
    }
  `,
    1
  ))

Deno.test('Deno operations in module scope', () =>
  runnerTest(
    rulesId,
    `
    // Module level
    Deno.readTextFile("config.json")

    // Inside function
    function init() {
      Deno.writeTextFile("init.txt", "initialized")
    }
  `,
    2
  ))

Deno.test('Deno operations in nested await expressions', () =>
  runnerTest(
    rulesId,
    `
    async function processData() {
      const data = await Deno.readTextFile("input.txt")
      const result = await processFile(data)
      await Deno.writeTextFile("output.txt", result)
    }
  `,
    0
  ))

Deno.test('Deno operations in try-catch with await', () =>
  runnerTest(
    rulesId,
    `
    try {
      await Deno.readTextFile("file.txt")
      await Deno.writeTextFile("output.txt", "data")
    } catch (error) {
      console.error(error)
    }
  `,
    0
  ))

Deno.test('Deno operations in try-catch without await', () =>
  runnerTest(
    rulesId,
    `
    try {
      Deno.readTextFile("file.txt")
      Deno.writeTextFile("output.txt", "data")
    } catch (error) {
      console.error(error)
    }
  `,
    2
  ))

Deno.test('Deno operations inside async function with await', () =>
  runnerTest(
    rulesId,
    `
    async function processFile() {
      await Deno.readTextFile("file.txt")
      await Deno.writeTextFile("output.txt", "processed")
    }
  `,
    0
  ))

Deno.test('Deno operations inside async function without await', () =>
  runnerTest(
    rulesId,
    `
    async function processFile() {
      Deno.readTextFile("file.txt")
      Deno.writeTextFile("output.txt", "processed")
    }
  `,
    2
  ))

Deno.test('Deno operations inside regular function without await', () =>
  runnerTest(
    rulesId,
    `
    function processFile() {
      Deno.readTextFile("file.txt")
      Deno.writeTextFile("output.txt", "processed")
    }
  `,
    2
  ))

Deno.test('Deno operations with chained catch', () =>
  runnerTest(
    rulesId,
    `
    Deno.readTextFile("file.txt")
      .then(data => console.log(data))
      .catch(error => console.error(error))
  `,
    1
  ))

Deno.test('Deno operations with different parameter types', () =>
  runnerTest(
    rulesId,
    `
    Deno.readTextFile("string.txt")
    Deno.readTextFile(variable)
    Deno.writeTextFile("file.txt", stringVariable)
    Deno.remove(pathObject)
    Deno.mkdir(optionsObject)
  `,
    5
  ))

Deno.test('Deno operations with improper error handling', () =>
  runnerTest(
    rulesId,
    `
    // These should trigger - no await or catch
    Deno.readTextFile("file1.txt")
    Deno.writeTextFile("file2.txt", "content")

    // This should also trigger - rule only checks for await, not catch
    Deno.remove("file3.txt").catch(console.error)
  `,
    3
  ))

Deno.test('Deno operations with multiple chained methods', () =>
  runnerTest(
    rulesId,
    `
    Deno.writeTextFile("file.txt", "content")
      .then(() => console.log("Success"))
      .catch(error => console.error("Error:", error))
  `,
    1
  ))

Deno.test('Deno operations with proper error handling', () =>
  runnerTest(
    rulesId,
    `
    try {
      await Deno.readTextFile("file.txt")
    } catch (error) {
      console.error("Read failed:", error)
    }

    Deno.writeTextFile("file.txt", "content")
      .then(() => console.log("Write successful"))
      .catch(error => console.error("Write failed:", error))
  `,
    1
  ))

Deno.test('Deno operations with await in different scopes', () =>
  runnerTest(
    rulesId,
    `
    // This should trigger (no await)
    Deno.readTextFile("file1.txt")

    // This should not trigger (has await)
    await Deno.readTextFile("file2.txt")

    // This should trigger (no await)
    function helper() {
      Deno.writeTextFile("file3.txt", "content")
    }
  `,
    2
  ))

Deno.test('Deno.readTextFile without await', () =>
  runnerTest(rulesId, 'Deno.readTextFile("file.txt")', 1))

Deno.test('Deno.readTextFile with await', () =>
  runnerTest(rulesId, 'await Deno.readTextFile("file.txt")', 0))

Deno.test('Deno.readTextFile with catch', () =>
  runnerTest(rulesId, 'Deno.readTextFile("file.txt").catch(console.error)', 1))

Deno.test('Deno.remove without await', () => runnerTest(rulesId, 'Deno.remove("file.txt")', 1))

Deno.test('Deno.remove with await', () => runnerTest(rulesId, 'await Deno.remove("file.txt")', 0))

Deno.test('Deno.remove with catch', () =>
  runnerTest(rulesId, 'Deno.remove("file.txt").catch(console.error)', 1))

Deno.test('Deno.writeTextFile without await', () =>
  runnerTest(rulesId, 'Deno.writeTextFile("file.txt", "content")', 1))

Deno.test('Deno.writeTextFile with await', () =>
  runnerTest(rulesId, 'await Deno.writeTextFile("file.txt", "content")', 0))

Deno.test('Deno.writeTextFile with catch', () =>
  runnerTest(rulesId, 'Deno.writeTextFile("file.txt", "content").catch(console.error)', 1))

Deno.test('mixed Deno operations with and without await', () =>
  runnerTest(
    rulesId,
    `
    await Deno.readTextFile("file1.txt")
    Deno.writeTextFile("file2.txt", "content")
    await Deno.remove("file3.txt")
    Deno.mkdir("newdir")
  `,
    2
  ))

Deno.test('multiple Deno operations with await', () =>
  runnerTest(
    rulesId,
    `
    await Deno.readTextFile("file1.txt")
    await Deno.writeTextFile("file2.txt", "content")
    await Deno.remove("file3.txt")
    await Deno.mkdir("newdir")
  `,
    0
  ))

Deno.test('multiple Deno operations without await', () =>
  runnerTest(
    rulesId,
    `
    Deno.readTextFile("file1.txt")
    Deno.writeTextFile("file2.txt", "content")
    Deno.remove("file3.txt")
    Deno.mkdir("newdir")
  `,
    4
  ))

Deno.test('non-Deno file operations should not trigger', () =>
  runnerTest(
    rulesId,
    `
    fs.readFile("file.txt")
    fs.writeFile("file.txt", "content")
    fs.unlink("file.txt")
    fs.mkdir("newdir")
  `,
    0
  ))

Deno.test('other Deno operations should not trigger', () =>
  runnerTest(
    rulesId,
    `
    Deno.exit(0)
    Deno.args
    Deno.env.get("VAR")
    Deno.cwd()
  `,
    0
  ))
