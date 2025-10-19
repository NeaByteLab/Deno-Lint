#!/bin/bash

echo "🧪 Testing Deno Lint Plugin Include/Exclude Issue"
echo "================================================="

# Test Case 1: Include Only (should be broken)
echo ""
echo "📋 Test Case 1: Include Only Configuration"
echo "Expected: Only async-function-naming should run"
echo "Actual:"
cp test-case-1-include-only.json deno.json
deno lint test-code.ts 2>&1 | grep "deno-lint/" || echo "No deno-lint rules triggered"

# Test Case 2: Exclude Only (should work)
echo ""
echo "📋 Test Case 2: Exclude Only Configuration"
echo "Expected: Only async-function-naming should run"
echo "Actual:"
cp test-case-2-exclude-only.json deno.json
deno lint test-code.ts 2>&1 | grep "deno-lint/" || echo "No deno-lint rules triggered"

# Test Case 3: Mixed (should be broken)
echo ""
echo "📋 Test Case 3: Mixed Include/Exclude Configuration"
echo "Expected: Only async-function-naming should run"
echo "Actual:"
cp test-case-3-mixed.json deno.json
deno lint test-code.ts 2>&1 | grep "deno-lint/" || echo "No deno-lint rules triggered"

# Cleanup
rm deno.json

echo ""
echo "✅ Test completed! Check results above."
