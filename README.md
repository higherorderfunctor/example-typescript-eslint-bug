# example-typescript-eslint-bug

This repo demonstrates two bugs with `typescript-eslint` using `EXPERIMENTAL_useProjectService`.

1. `extends` is not used in the default project's `tsconfig.json`.
2. ~~`parserOptions.extraFileExtensions` is not working as expected to setup
   `tsserver` for type checking using project references.~~ (working in v8)

pnpm is required to test the patch in this repo which contains a (non-rigorous)
fix to resolve both issues.

## Expected Errors With Patch

Using the patch, these errors are expected and correctly reported.

```sh
pnpm i
pnpm eslint .

# <REDACTED>/packages/package-a/src/test-component.vue
#   8:7   error  Unsafe assignment of an `any` value       @typescript-eslint/no-unsafe-assignment
#   8:34  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
#
# <REDACTED>/packages/package-a/src/test.ts
#   7:14  error  Unsafe assignment of an `any` value       @typescript-eslint/no-unsafe-assignment
#   7:41  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
```

## Errors Without Patch

These errors are not expected using `typescript-eslint` as is and reveals the extends
in `tsconfig.json` is not followed.

```sh
# remove from root package.json
#
#   "patchedDependencies": {
#     "@typescript-eslint/typescript-estree@8.0.0-alpha.24": "patches/@typescript-eslint__typescript-estree@8.0.0-alpha.24.patch"
#   }

pnpm i
pnpm eslint .

# <REDACTED>/packages/package-a/src/test-component.vue
#   0:0  error  Parsing error: Cannot read properties of undefined (reading 'target')
# 
# <REDACTED>/packages/package-a/src/test.ts
#   0:0  error  Parsing error: Cannot read properties of undefined (reading 'target')
```
