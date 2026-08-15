# TypeScript standard

TypeScript is part of the product. Public types should make valid use easy to
discover and invalid use difficult to express without requiring type gymnastics
that maintainers cannot explain.

The shared configuration enables `strict`, `noUncheckedIndexedAccess`,
`exactOptionalPropertyTypes`, `noImplicitOverride`,
`useUnknownInCatchVariables`, and related consistency checks. `skipLibCheck`
remains enabled because third-party declaration compatibility is outside this
library's control; all project source and emitted declarations are still checked.

The workspace currently pins TypeScript 6 even though TypeScript 7 is available,
because the current `typescript-eslint` compiler integration does not yet support
the TypeScript 7 API. Revisit the pin once the lint stack declares support; do not
upgrade only the compiler and silently lose type-aware linting.

## Rules

- Do not use routine `any`; use `unknown` at untrusted boundaries and narrow it.
- Avoid non-null assertions. When an invariant makes one necessary, document the
  invariant next to the assertion.
- Avoid assertions used only to silence inference. Prefer validation, narrowing,
  or a clearer model.
- Use meaningful generic parameter names for public APIs.
- Prefer readable types over deeply recursive or distributive cleverness.
- Type props, emits, slots, configuration, events, and exposed methods
  intentionally.
- Make cross-package type relationships explicit. Do not duplicate a contract
  owned by another package and rely on incidental structural compatibility;
  import and use the canonical type directly, extend or intersect it when adding
  fields, or use a named typed adapter when the representations intentionally
  differ.
- Preserve consumer types through accessors and configuration where practical.
- Use type-only imports and exports when a symbol has no runtime role.

Compile-time API tests should be added when the first meaningful inference or
generic contract exists. An empty type-test harness now would protect nothing;
future tests may use `vue-tsc` fixtures or a dedicated tool if diagnostics need
more precise assertions.
