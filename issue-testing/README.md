# Issue Test Cases

This directory contains test cases that demonstrate the Deno v2.5.4 bug where `include` configuration doesn't work for plugin rules.

## Test Cases

### Test Case 1: Include Only (BROKEN)

- **File**: `test-case-1-include-only.json`
- **Expected**: Only `deno-lint/async-function-naming` should run
- **Actual**: ALL plugin rules run (include is ignored)

### Test Case 2: Exclude Only (WORKS)

- **File**: `test-case-2-exclude-only.json`
- **Expected**: Only `deno-lint/async-function-naming` should run
- **Actual**: Only `deno-lint/async-function-naming` runs ✅

### Test Case 3: Mixed Include/Exclude (BROKEN)

- **File**: `test-case-3-mixed.json`
- **Expected**: Only `deno-lint/async-function-naming` should run
- **Actual**: `deno-lint/async-function-naming` AND `deno-lint/explicit-return-types` run (include ignored)

## How to Test

1. Copy one of the test case JSON files to `deno.json`
2. Run: `deno lint test-code.ts`
3. Observe which rules are triggered
