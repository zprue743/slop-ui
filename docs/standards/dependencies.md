# Dependency policy

Runtime dependencies require strong justification. Each one adds bundle size,
security exposure, compatibility constraints, and ongoing maintenance.

Before adding a runtime dependency, document the capability it supplies, why a
small local implementation or platform API is insufficient, its tree-shaking and
bundle impact, license, maintenance health, security posture, and SSR/browser
requirements. Prefer a peer dependency when the consumer must own a singleton
runtime, as with Vue.

Development tooling may be broader but remains intentional. Avoid overlapping
tools that enforce the same rule in different ways. Pin exact development
versions through the lockfile and update them in reviewed changes.

pnpm blocks dependency install scripts unless they are explicitly allowlisted in
`pnpm-workspace.yaml`. `esbuild` is allowlisted because Vite/VitePress require its
platform binary; additions to that list require the same security review as a
new runtime dependency.

Run `pnpm boundaries` after changing package manifests. Do not bypass pnpm's
strict peer dependency checks merely to accept an invalid graph.
