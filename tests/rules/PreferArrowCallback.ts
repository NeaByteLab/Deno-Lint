import { runnerTest, verifyAutoFix } from '@tests/index.ts'

const rulesId = 'deno-lint/prefer-arrow-callback'

Deno.test('arrow function in callback (should not trigger)', () =>
  runnerTest(rulesId, 'const result = arr.map(item => item * 2)', 0))

Deno.test('function expression in async function callback (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    async function fetchData(ids) {
      return ids.map(function(id) { return fetch(\`/api/\${id}\`) })
    }
  `,
    1
  ))

Deno.test('function declaration in callback (should not trigger)', () =>
  runnerTest(rulesId, 'function double(x) { return x * 2 }; const result = arr.map(double)', 0))

Deno.test('function expression in class method callback (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    class TestClass {
      processItems(items) {
        return items.map(function(item) { return item.processed })
      }
    }
  `,
    1
  ))

Deno.test('function expression in conditional callback (should trigger)', () =>
  runnerTest(rulesId, 'const result = condition ? arr.map(function(item) { return item }) : []', 1))

Deno.test('function expression in every callback (should trigger)', () =>
  runnerTest(rulesId, 'const result = arr.every(function(item) { return item.valid })', 1))

Deno.test('function expression in filter callback (should trigger)', () =>
  runnerTest(rulesId, 'const result = arr.filter(function(item) { return item > 0 })', 1))

Deno.test('function expression in find callback (should trigger)', () =>
  runnerTest(rulesId, 'const result = arr.find(function(item) { return item.id === 1 })', 1))

Deno.test('function expression in findIndex callback (should trigger)', () =>
  runnerTest(rulesId, 'const result = arr.findIndex(function(item) { return item === target })', 1))

Deno.test('function expression in flatMap callback (should trigger)', () =>
  runnerTest(rulesId, 'const result = arr.flatMap(function(item) { return [item, item * 2] })', 1))

Deno.test('function expression in forEach callback (should trigger)', () =>
  runnerTest(rulesId, 'arr.forEach(function(item) { console.log(item) })', 1))

Deno.test('function expression in map callback (should trigger)', () =>
  runnerTest(rulesId, 'const result = arr.map(function(item) { return item * 2 })', 1))

Deno.test('function expression in nested callback (should trigger)', () =>
  runnerTest(
    rulesId,
    `
    const result = arr.map(function(item) {
      return item.items.map(function(subItem) { return subItem.value })
    })
  `,
    2
  ))

Deno.test('function expression in reduce callback (should trigger)', () =>
  runnerTest(rulesId, 'const result = arr.reduce(function(acc, item) { return acc + item }, 0)', 1))

Deno.test('function expression in reduceRight callback (should trigger)', () =>
  runnerTest(
    rulesId,
    'const result = arr.reduceRight(function(acc, item) { return acc + item }, 0)',
    1
  ))

Deno.test('function expression in some callback (should trigger)', () =>
  runnerTest(rulesId, 'const result = arr.some(function(item) { return item.active })', 1))

Deno.test('function expression in sort callback (should trigger)', () =>
  runnerTest(rulesId, 'const result = arr.sort(function(a, b) { return a - b })', 1))

Deno.test('function expression in template literal callback (should trigger)', () =>
  runnerTest(
    rulesId,
    `const result = \`Items: \${arr.map(function(item) { return item.name })}\``,
    1
  ))

Deno.test('function expression with arguments usage (should not trigger)', () =>
  runnerTest(rulesId, 'const result = arr.map(function(item) { return arguments[0] + item })', 0))

Deno.test('function expression with default parameters (should trigger)', () =>
  runnerTest(rulesId, 'const result = arr.map(function(item = 0) { return item * 2 })', 1))

Deno.test('function expression with destructuring (should trigger)', () =>
  runnerTest(rulesId, 'const result = arr.map(function({id, name}) { return {id, name} })', 1))

Deno.test('function expression with parameters in callback (should trigger)', () =>
  runnerTest(
    rulesId,
    'const result = arr.map(function(item, index) { return { item, index } })',
    1
  ))

Deno.test('function expression with rest parameters (should trigger)', () =>
  runnerTest(
    rulesId,
    'const result = arr.map(function(item, ...rest) { return item + rest.length })',
    1
  ))

Deno.test('function expression with return type annotation (should trigger)', () =>
  runnerTest(rulesId, 'const result = arr.map(function(item): number { return item * 2 })', 1))

Deno.test('function expression with this usage (should not trigger)', () =>
  runnerTest(rulesId, 'const result = arr.map(function(item) { return this.value + item })', 0))

Deno.test('verify auto-fix for function expression with block body', () =>
  verifyAutoFix(
    rulesId,
    'const result = arr.map(function(item) { const doubled = item * 2; return doubled })',
    'item => { const doubled = item * 2; return doubled }',
    'Function expression with block body auto-fix test'
  ))

Deno.test('verify auto-fix for function expression with parameters', () =>
  verifyAutoFix(
    rulesId,
    'const result = arr.map(function(item, index) { return {item, index} })',
    '(item, index) => { return {item, index} }',
    'Function expression with parameters auto-fix test'
  ))

Deno.test('verify auto-fix for simple function expression', () =>
  verifyAutoFix(
    rulesId,
    'const result = arr.map(function(item) { return item * 2 })',
    'item => { return item * 2 }',
    'Simple function expression auto-fix test'
  ))

Deno.test('verify auto-fix in arrow function', () =>
  verifyAutoFix(
    rulesId,
    'const process = (items) => items.map(function(item) { return item.value })',
    'item => { return item.value }',
    'Arrow function callback auto-fix test'
  ))

Deno.test('verify auto-fix in function', () =>
  verifyAutoFix(
    rulesId,
    'function processItems(items) { return items.map(function(item) { return item.processed }) }',
    'item => { return item.processed }',
    'Function callback auto-fix test'
  ))

Deno.test('verify auto-fix in object property', () =>
  verifyAutoFix(
    rulesId,
    'const obj = { items: arr.map(function(item) { return item.name }) }',
    'item => { return item.name }',
    'Object property callback auto-fix test'
  ))

Deno.test('verify auto-fix in template literal', () =>
  verifyAutoFix(
    rulesId,
    `const result = \`Items: \${arr.map(function(item) { return item.name })}\``,
    'item => { return item.name }',
    'Template literal callback auto-fix test'
  ))

Deno.test('verify auto-fix with complex expression', () =>
  verifyAutoFix(
    rulesId,
    'const result = arr.map(function(item) { return item?.value || 0 })',
    'item => { return item?.value || 0 }',
    'Complex expression callback auto-fix test'
  ))
