import { assertEquals } from '@std/assert'
import plugin from '@app/index.ts'

export function runnerTest(rulesId: string, code: string, expectedDiagnosticsCount: number): void {
  const diagnostics = Deno.lint.runPlugin(plugin, 'test.ts', code)
  const paramTypeDiagnostics = diagnostics.filter((d) => d.id === rulesId)
  assertEquals(
    paramTypeDiagnostics.length,
    expectedDiagnosticsCount,
    `Expected ${expectedDiagnosticsCount} parameter type diagnostics, but got ${paramTypeDiagnostics.length}: ${
      JSON.stringify(paramTypeDiagnostics, null, 2)
    }`
  )
  if (expectedDiagnosticsCount > 0) {
    paramTypeDiagnostics.forEach((d) => {
      assertEquals(d.id, rulesId)
    })
  }
}

export function verifyAutoFix(
  rulesId: string,
  code: string,
  expectedFixedCode: string,
  description: string,
  expectedCount = 1
): void {
  const diagnostics = Deno.lint.runPlugin(plugin, 'test.ts', code)
  const ruleDiagnostics = diagnostics.filter((d) => d.id === rulesId)
  console.log(`${description} diagnostics:`, JSON.stringify(ruleDiagnostics, null, 2))
  assertEquals(
    ruleDiagnostics.length,
    expectedCount,
    `Expected ${expectedCount} diagnostic for ${description}`
  )
  const diagnostic = ruleDiagnostics[0]
  assertEquals(diagnostic.fix?.length, 1, `Should have auto-fix available for ${description}`)
  const fix = diagnostic.fix?.[0]
  if (!fix) {
    throw new Error(`No fix available for ${description}`)
  }
  assertEquals(
    fix.text,
    expectedFixedCode,
    `Auto-fix should suggest correct code for ${description}`
  )
}
