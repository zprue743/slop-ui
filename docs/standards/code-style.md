# Code style and consistency

Predictability beats cleverness. A senior engineer should understand a file's
responsibility quickly without learning an author's preferred micro-framework.

## Naming

- Use kebab-case for directories and non-component files.
- Use PascalCase for Vue component files and exported component/type names.
- Prefix composables with `use` only when they follow Vue composable semantics.
- Name types and interfaces for their domain role; do not add `I` merely to mark
  an interface.
- Suffix configuration types with `Config` when they actually represent a
  configuration contract.
- Use `*.test.ts` for unit/integration tests and `*.spec.ts` for Playwright tests.
- Use descriptive boolean props such as `disabled`, `searchable`, or `clearable`;
  avoid unclear flags and double negatives.
- Name emitted events for what occurred and follow Vue's established model event
  conventions.
- Use uppercase snake case only for true module-level constants.

## Organization

Keep related implementation, tests, and private types close. Put shared behavior
in a shared location only after responsibility is demonstrated. Prefer named
exports and one intentional package entry point; avoid default exports in library
source and nested barrel networks. Tool-required default exports in configuration
and Vue SFC compilation are exceptions.

Errors should identify the violated consumer contract and actionable remedy.
Do not catch errors merely to hide them. Document intentional fallback or error
recovery behavior.

Prettier owns formatting. ESLint owns semantic source rules. Do not hand-format
around either tool or add local disable comments without an adjacent explanation
of why the exception is safe.
