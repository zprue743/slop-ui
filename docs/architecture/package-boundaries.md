# Package boundaries

Allowed production dependency direction is:

```text
shared <- core <- vue
   ^               |
   +---------------+

themes (independent and optional)
```

- `shared` has no internal production dependency.
- `core` may depend on `shared`.
- `vue` may depend on `core` and `shared`.
- `themes` must not be required by headless packages and currently remains
  independent.

`scripts/check-package-boundaries.mjs` enforces internal manifest edges through
`pnpm boundaries`. Source-level circular dependency tooling is intentionally
deferred until real implementation provides enough graph complexity to justify
it.

## Adding a package

A new package requires a responsibility that cannot remain coherent in an
existing package. Document its purpose and dependency direction, add build and
typecheck scripts, register it in the root TypeScript project and boundary
checker, and explain its public entry point. An anticipated future use is not by
itself sufficient evidence.

Development apps may consume packages to exercise them. They are not published
and must not become a hidden source of production logic.
