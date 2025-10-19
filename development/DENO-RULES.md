# Deno Lint Rules - Clean Reference

## 📋 Overview

This document provides a clean, organized reference of all available Deno lint rules.

**Main Documentation:** https://docs.deno.com/lint/rules/

---

## 🏷️ Rule Categories

### ✅ Recommended Rules (Enabled by default)

These rules are part of the recommended configuration and are enabled by default.

| Rule Name                           | Description                                                                           | Documentation                                                                                |
| ----------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `adjacent-overload-signatures`      | Enforce adjacent overload signatures                                                  | [Link](https://docs.deno.com/lint/rules/adjacent-overload-signatures)                        |
| `ban-ts-comment`                    | Ban `@ts-ignore` comments                                                             | [Link](https://docs.deno.com/lint/rules/ban-ts-comment)                                      |
| `ban-types`                         | Ban certain types                                                                     | [Link](https://docs.deno.com/lint/rules/ban-types)                                           |
| `ban-unknown-rule-code`             | Ban unknown rule codes                                                                | [Link](https://docs.deno.com/lint/rules/ban-unknown-rule-code)                               |
| `ban-untagged-ignore`               | Ban untagged ignore comments                                                          | [Link](https://docs.deno.com/lint/rules/ban-untagged-ignore)                                 |
| `ban-unused-ignore`                 | Ban unused ignore comments                                                            | [Link](https://docs.deno.com/lint/rules/ban-unused-ignore)                                   |
| `constructor-super`                 | Require super() calls in constructors                                                 | [Link](https://docs.deno.com/lint/rules/constructor-super)                                   |
| `for-direction`                     | Enforce "for" loop update clause                                                      | [Link](https://docs.deno.com/lint/rules/for-direction)                                       |
| `getter-return`                     | Enforce return statements in getters                                                  | [Link](https://docs.deno.com/lint/rules/getter-return)                                       |
| `jsx-boolean-value`                 | Enforce boolean attributes notation in JSX                                            | [Link](https://docs.deno.com/lint/rules/jsx-boolean-value)                                   |
| `jsx-button-has-type`               | Enforce button elements have an explicit type                                         | [Link](https://docs.deno.com/lint/rules/jsx-button-has-type)                                 |
| `jsx-curly-braces`                  | Enforce curly braces for JSX attributes                                               | [Link](https://docs.deno.com/lint/rules/jsx-curly-braces)                                    |
| `jsx-key`                           | Enforce that elements with array keys have unique keys                                | [Link](https://docs.deno.com/lint/rules/jsx-key)                                             |
| `jsx-no-children-prop`              | Disallow children as a prop                                                           | [Link](https://docs.deno.com/lint/rules/jsx-no-children-prop)                                |
| `jsx-no-comment-text-nodes`         | Disallow comments from being inserted as text nodes                                   | [Link](https://docs.deno.com/lint/rules/jsx-no-comment-text-nodes)                           |
| `jsx-no-duplicate-props`            | Disallow duplicate props in JSX                                                       | [Link](https://docs.deno.com/lint/rules/jsx-no-duplicate-props)                              |
| `jsx-no-unescaped-entities`         | Disallow unescaped entities in JSX                                                    | [Link](https://docs.deno.com/lint/rules/jsx-no-unescaped-entities)                           |
| `jsx-no-useless-fragment`           | Disallow unnecessary fragments                                                        | [Link](https://docs.deno.com/lint/rules/jsx-no-useless-fragment)                             |
| `jsx-props-no-spread-multi`         | Disallow multiple prop spreads                                                        | [Link](https://docs.deno.com/lint/rules/jsx-props-no-spread-multi)                           |
| `jsx-void-dom-elements-no-children` | Disallow void DOM elements from having children                                       | [Link](https://docs.deno.com/lint/rules/jsx-void-dom-elements-no-children)                   |
| `no-array-constructor`              | Disallow Array constructors                                                           | [Link](https://docs.deno.com/lint/rules/no-array-constructor)                                |
| `no-async-promise-executor`         | Disallow async functions as promise executors                                         | [Link](https://docs.deno.com/lint/rules/no-async-promise-executor)                           |
| `no-await-in-sync-fn`               | Disallow await in sync functions                                                      | [Link](https://docs.deno.com/lint/rules/no-await-in-sync-fn)                                 |
| `no-case-declarations`              | Disallow lexical declarations in case clauses                                         | [Link](https://docs.deno.com/lint/rules/no-case-declarations)                                |
| `no-class-assign`                   | Disallow reassigning class members                                                    | [Link](https://docs.deno.com/lint/rules/no-class-assign)                                     |
| `no-compare-neg-zero`               | Disallow comparing against -0                                                         | [Link](https://docs.deno.com/lint/rules/no-compare-neg-zero)                                 |
| `no-cond-assign`                    | Disallow assignment operators in conditional expressions                              | [Link](https://docs.deno.com/lint/rules/no-cond-assign)                                      |
| `no-constant-condition`             | Disallow constant expressions in conditions                                           | [Link](https://docs.deno.com/lint/rules/no-constant-condition)                               |
| `no-control-regex`                  | Disallow control characters in regular expressions                                    | [Link](https://docs.deno.com/lint/rules/no-control-regex)                                    |
| `no-debugger`                       | Disallow debugger statements                                                          | [Link](https://docs.deno.com/lint/rules/no-debugger)                                         |
| `no-delete-var`                     | Disallow deleting variables                                                           | [Link](https://docs.deno.com/lint/rules/no-delete-var)                                       |
| `no-deprecated-deno-api`            | Disallow deprecated Deno APIs                                                         | [Link](https://docs.deno.com/lint/rules/no-deprecated-deno-api)                              |
| `no-dupe-args`                      | Disallow duplicate arguments in function definitions                                  | [Link](https://docs.deno.com/lint/rules/no-dupe-args)                                        |
| `no-dupe-class-members`             | Disallow duplicate class members                                                      | [Link](https://docs.deno.com/lint/rules/no-dupe-class-members)                               |
| `no-dupe-else-if`                   | Disallow duplicate conditions in if-else-if chains                                    | [Link](https://docs.deno.com/lint/rules/no-dupe-else-if)                                     |
| `no-dupe-keys`                      | Disallow duplicate keys in object literals                                            | [Link](https://docs.deno.com/lint/rules/no-dupe-keys)                                        |
| `no-duplicate-case`                 | Disallow duplicate case labels                                                        | [Link](https://docs.deno.com/lint/rules/no-duplicate-case)                                   |
| `no-empty`                          | Disallow empty block statements                                                       | [Link](https://docs.deno.com/lint/rules/no-empty)                                            |
| `no-empty-character-class`          | Disallow empty character classes in regular expressions                               | [Link](https://docs.deno.com/lint/rules/no-empty-character-class)                            |
| `no-empty-enum`                     | Disallow empty enums                                                                  | [Link](https://docs.deno.com/lint/rules/no-empty-enum)                                       |
| `no-empty-interface`                | Disallow empty interfaces                                                             | [Link](https://docs.deno.com/lint/rules/no-empty-interface)                                  |
| `no-empty-pattern`                  | Disallow empty destructuring patterns                                                 | [Link](https://docs.deno.com/lint/rules/no-empty-pattern)                                    |
| `no-ex-assign`                      | Disallow reassigning exceptions in catch clauses                                      | [Link](https://docs.deno.com/lint/rules/no-ex-assign)                                        |
| `no-explicit-any`                   | Disallow the use of `any` type                                                        | [Link](https://docs.deno.com/lint/rules/no-explicit-any)                                     |
| `no-extra-boolean-cast`             | Disallow unnecessary boolean casts                                                    | [Link](https://docs.deno.com/lint/rules/no-extra-boolean-cast)                               |
| `no-extra-non-null-assertion`       | Disallow unnecessary non-null assertions                                              | [Link](https://docs.deno.com/lint/rules/no-extra-non-null-assertion)                         |
| `no-fallthrough`                    | Disallow fallthrough of case statements                                               | [Link](https://docs.deno.com/lint/rules/no-fallthrough)                                      |
| `no-func-assign`                    | Disallow reassigning function declarations                                            | [Link](https://docs.deno.com/lint/rules/no-func-assign)                                      |
| `no-global-assign`                  | Disallow assignments to native objects or read-only global variables                  | [Link](https://docs.deno.com/lint/rules/no-global-assign)                                    |
| `no-import-assertions`              | Disallow import assertions                                                            | [Link](https://docs.deno.com/lint/rules/no-import-assertions)                                |
| `no-import-assign`                  | Disallow assigning to imported bindings                                               | [Link](https://docs.deno.com/lint/rules/no-import-assign)                                    |
| `no-inner-declarations`             | Disallow variable or function declarations in nested blocks                           | [Link](https://docs.deno.com/lint/rules/no-inner-declarations)                               |
| `no-invalid-regexp`                 | Disallow invalid regular expression strings in RegExp constructors                    | [Link](https://docs.deno.com/lint/rules/no-invalid-regexp)                                   |
| `no-invalid-triple-slash-reference` | Disallow invalid triple slash references                                              | [Link](https://docs.deno.com/lint/rules/no-invalid-triple-slash-reference)                   |
| `no-irregular-whitespace`           | Disallow irregular whitespace                                                         | [Link](https://docs.deno.com/lint/rules/no-irregular-whitespace)                             |
| `no-misused-new`                    | Disallow `new` operators with the `Symbol` object                                     | [Link](https://docs.deno.com/lint/rules/no-misused-new)                                      |
| `no-namespace`                      | Disallow the use of custom TypeScript modules and namespaces                          | [Link](https://docs.deno.com/lint/rules/no-namespace)                                        |
| `no-new-symbol`                     | Disallow `new` operators with the `Symbol` object                                     | [Link](https://docs.deno.com/lint/rules/no-new-symbol)                                       |
| `no-node-globals`                   | Disallow Node.js global variables                                                     | [Link](https://docs.deno.com/lint/rules/no-node-globals)                                     |
| `no-obj-calls`                      | Disallow calling global object properties as functions                                | [Link](https://docs.deno.com/lint/rules/no-obj-calls)                                        |
| `no-octal`                          | Disallow octal literals                                                               | [Link](https://docs.deno.com/lint/rules/no-octal)                                            |
| `no-process-global`                 | Disallow the use of `process` global                                                  | [Link](https://docs.deno.com/lint/rules/no-process-global)                                   |
| `no-prototype-builtins`             | Disallow calling some `Object.prototype` methods directly on objects                  | [Link](https://docs.deno.com/lint/rules/no-prototype-builtins)                               |
| `no-redeclare`                      | Disallow variable redeclaration                                                       | [Link](https://docs.deno.com/lint/rules/no-redeclare)                                        |
| `no-regex-spaces`                   | Disallow multiple spaces in regular expressions                                       | [Link](https://docs.deno.com/lint/rules/no-regex-spaces)                                     |
| `no-self-assign`                    | Disallow assignments where both sides are exactly the same                            | [Link](https://docs.deno.com/lint/rules/no-self-assign)                                      |
| `no-setter-return`                  | Disallow return statements in setters                                                 | [Link](https://docs.deno.com/lint/rules/no-setter-return)                                    |
| `no-shadow-restricted-names`        | Disallow shadowing of restricted names                                                | [Link](https://docs.deno.com/lint/rules/no-shadow-restricted-names)                          |
| `no-sloppy-imports`                 | Disallow sloppy imports                                                               | [Link](https://docs.deno.com/runtime/manual/tools/unstable_flags/#--unstable-sloppy-imports) |
| `no-this-alias`                     | Disallow aliasing `this`                                                              | [Link](https://docs.deno.com/lint/rules/no-this-alias)                                       |
| `no-this-before-super`              | Disallow use of `this`/`super` before calling `super()` in constructors               | [Link](https://docs.deno.com/lint/rules/no-this-before-super)                                |
| `no-unreachable`                    | Disallow unreachable code after `return`, `throw`, `continue`, and `break` statements | [Link](https://docs.deno.com/lint/rules/no-unreachable)                                      |
| `no-unsafe-finally`                 | Disallow control flow statements in `finally` blocks                                  | [Link](https://docs.deno.com/lint/rules/no-unsafe-finally)                                   |
| `no-unsafe-negation`                | Disallow negating the left operand of relational operators                            | [Link](https://docs.deno.com/lint/rules/no-unsafe-negation)                                  |
| `no-unused-labels`                  | Disallow unused labels                                                                | [Link](https://docs.deno.com/lint/rules/no-unused-labels)                                    |
| `no-unused-vars`                    | Disallow unused variables                                                             | [Link](https://docs.deno.com/lint/rules/no-unused-vars)                                      |
| `no-unversioned-import`             | Disallow unversioned imports                                                          | [Link](https://docs.deno.com/lint/rules/no-unversioned-import)                               |
| `no-var`                            | Disallow `var` declarations                                                           | [Link](https://docs.deno.com/lint/rules/no-var)                                              |
| `no-window`                         | Disallow the use of `window` global                                                   | [Link](https://docs.deno.com/lint/rules/no-window)                                           |
| `no-window-prefix`                  | Disallow the use of `window` prefix                                                   | [Link](https://docs.deno.com/lint/rules/no-window-prefix)                                    |
| `no-with`                           | Disallow `with` statements                                                            | [Link](https://docs.deno.com/lint/rules/no-with)                                             |
| `prefer-as-const`                   | Prefer `as const` over type assertion                                                 | [Link](https://docs.deno.com/lint/rules/prefer-as-const)                                     |
| `prefer-const`                      | Prefer `const` declarations for variables that are never reassigned                   | [Link](https://docs.deno.com/lint/rules/prefer-const)                                        |
| `prefer-namespace-keyword`          | Prefer `namespace` keyword over `module` keyword                                      | [Link](https://docs.deno.com/lint/rules/prefer-namespace-keyword)                            |
| `require-await`                     | Disallow async functions which have no `await` expression                             | [Link](https://docs.deno.com/lint/rules/require-await)                                       |
| `require-yield`                     | Disallow generator functions that do not have `yield`                                 | [Link](https://docs.deno.com/lint/rules/require-yield)                                       |
| `use-isnan`                         | Require calls to `isNaN()` when checking for `NaN`                                    | [Link](https://docs.deno.com/lint/rules/use-isnan)                                           |
| `valid-typeof`                      | Enforce comparing `typeof` expressions against valid strings                          | [Link](https://docs.deno.com/lint/rules/valid-typeof)                                        |

---

## 🔧 Optional Rules (Not enabled by default)

### General JavaScript/TypeScript Rules

| Rule Name                              | Description                                                                     | Documentation                                                                 |
| -------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `ban-untagged-todo`                    | Ban untagged TODO comments                                                      | [Link](https://docs.deno.com/lint/rules/ban-untagged-todo)                    |
| `camelcase`                            | Enforce camelCase naming convention                                             | [Link](https://docs.deno.com/lint/rules/camelcase)                            |
| `default-param-last`                   | Enforce default parameters to be last                                           | [Link](https://docs.deno.com/lint/rules/default-param-last)                   |
| `eqeqeq`                               | Require the use of `===` and `!==`                                              | [Link](https://docs.deno.com/lint/rules/eqeqeq)                               |
| `explicit-function-return-type`        | Require explicit return types on functions                                      | [Link](https://docs.deno.com/lint/rules/explicit-function-return-type)        |
| `explicit-module-boundary-types`       | Require explicit return and argument types on exported functions                | [Link](https://docs.deno.com/lint/rules/explicit-module-boundary-types)       |
| `guard-for-in`                         | Require `for-in` loops to include an `if` statement                             | [Link](https://docs.deno.com/lint/rules/guard-for-in)                         |
| `no-await-in-loop`                     | Disallow `await` inside of loops                                                | [Link](https://docs.deno.com/lint/rules/no-await-in-loop)                     |
| `no-boolean-literal-for-arguments`     | Disallow boolean literals in arguments                                          | [Link](https://docs.deno.com/lint/rules/no-boolean-literal-for-arguments)     |
| `no-console`                           | Disallow the use of `console`                                                   | [Link](https://docs.deno.com/lint/rules/no-console)                           |
| `no-const-assign`                      | Disallow reassigning `const` variables                                          | [Link](https://docs.deno.com/lint/rules/no-const-assign)                      |
| `no-eval`                              | Disallow the use of `eval()`                                                    | [Link](https://docs.deno.com/lint/rules/no-eval)                              |
| `no-external-import`                   | Disallow external imports                                                       | [Link](https://docs.deno.com/lint/rules/no-external-import)                   |
| `no-implicit-declare-namespace-export` | Disallow implicit declare namespace exports                                     | [Link](https://docs.deno.com/lint/rules/no-implicit-declare-namespace-export) |
| `no-import-prefix`                     | Disallow import prefixes                                                        | [Link](https://docs.deno.com/lint/rules/no-import-prefix)                     |
| `no-inferrable-types`                  | Disallow type annotations for inferrable types                                  | [Link](https://docs.deno.com/lint/rules/no-inferrable-types)                  |
| `no-non-null-asserted-optional-chain`  | Disallow non-null assertions after optional chain expressions                   | [Link](https://docs.deno.com/lint/rules/no-non-null-asserted-optional-chain)  |
| `no-non-null-assertion`                | Disallow non-null assertions                                                    | [Link](https://docs.deno.com/lint/rules/no-non-null-assertion)                |
| `no-self-compare`                      | Disallow comparisons where both sides are exactly the same                      | [Link](https://docs.deno.com/lint/rules/no-self-compare)                      |
| `no-slow-types`                        | Disallow slow types                                                             | [Link](https://jsr.io/docs/about-slow-types)                                  |
| `no-sparse-arrays`                     | Disallow sparse arrays                                                          | [Link](https://docs.deno.com/lint/rules/no-sparse-arrays)                     |
| `no-sync-fn-in-async-fn`               | Disallow synchronous functions in async functions                               | [Link](https://docs.deno.com/lint/rules/no-sync-fn-in-async-fn)               |
| `no-throw-literal`                     | Disallow throwing literals as exceptions                                        | [Link](https://docs.deno.com/lint/rules/no-throw-literal)                     |
| `no-top-level-await`                   | Disallow top-level `await`                                                      | [Link](https://docs.deno.com/lint/rules/no-top-level-await)                   |
| `no-undef`                             | Disallow the use of undeclared variables                                        | [Link](https://docs.deno.com/lint/rules/no-undef)                             |
| `no-useless-rename`                    | Disallow renaming import, export, and destructured assignments to the same name | [Link](https://docs.deno.com/lint/rules/no-useless-rename)                    |
| `prefer-ascii`                         | Prefer ASCII characters                                                         | [Link](https://docs.deno.com/lint/rules/prefer-ascii)                         |
| `prefer-primordials`                   | Prefer primordials                                                              | [Link](https://docs.deno.com/lint/rules/prefer-primordials)                   |
| `single-var-declarator`                | Enforce variables to be declared separately                                     | [Link](https://docs.deno.com/lint/rules/single-var-declarator)                |
| `triple-slash-reference`               | Enforce triple slash references                                                 | [Link](https://docs.deno.com/lint/rules/triple-slash-reference)               |
| `verbatim-module-syntax`               | Enforce verbatim module syntax                                                  | [Link](https://docs.deno.com/lint/rules/verbatim-module-syntax)               |

### React/JSX Rules

| Rule Name                       | Description                                      | Documentation                                                          |
| ------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------- |
| `react-no-danger`               | Disallow `dangerouslySetInnerHTML`               | [Link](https://docs.deno.com/lint/rules/react-no-danger)               |
| `react-no-danger-with-children` | Disallow `dangerouslySetInnerHTML` with children | [Link](https://docs.deno.com/lint/rules/react-no-danger-with-children) |
| `react-rules-of-hooks`          | Enforce Rules of Hooks                           | [Link](https://docs.deno.com/lint/rules/react-rules-of-hooks)          |

### Fresh Framework Rules

| Rule Name                     | Description                         | Documentation                                                        |
| ----------------------------- | ----------------------------------- | -------------------------------------------------------------------- |
| `fresh-handler-export`        | Enforce Fresh handler exports       | [Link](https://docs.deno.com/lint/rules/fresh-handler-export)        |
| `fresh-server-event-handlers` | Enforce Fresh server event handlers | [Link](https://docs.deno.com/lint/rules/fresh-server-event-handlers) |

### JSR (JavaScript Registry) Rules

| Rule Name                | Description                    | Documentation                                                   |
| ------------------------ | ------------------------------ | --------------------------------------------------------------- |
| `no-slow-types`          | Disallow slow types            | [Link](https://jsr.io/docs/about-slow-types)                    |
| `verbatim-module-syntax` | Enforce verbatim module syntax | [Link](https://docs.deno.com/lint/rules/verbatim-module-syntax) |

### Workspace Rules

| Rule Name          | Description              | Documentation                                             |
| ------------------ | ------------------------ | --------------------------------------------------------- |
| `no-import-prefix` | Disallow import prefixes | [Link](https://docs.deno.com/lint/rules/no-import-prefix) |

---

## 📊 Summary

- **Total Rules:** 83
- **Recommended Rules:** 67 (enabled by default)
- **Optional Rules:** 16 (not enabled by default)
- **Categories:** General JS/TS, React/JSX, Fresh, JSR, Workspace

---

_Generated from `deno lint --rules` output. Last updated: October 19, 2025._
