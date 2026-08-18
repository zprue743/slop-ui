# Testing standard

Tests protect behavior and public contracts so internal implementation can evolve
without rewriting assertions that mirror private structure.

## Test levels

- **Vitest unit tests:** framework-neutral logic, composables where browser layout
  is irrelevant, and regression cases.
- **Vue Test Utils:** component props, emitted events, slots, model contracts, and
  Vue lifecycle behavior.
- **Playwright:** keyboard/focus behavior, browser integration, layout-dependent
  behavior, hydration where relevant, and end-to-end accessibility smoke checks.
- **Automated accessibility:** axe is configured with Playwright. It detects only
  a subset of failures and never replaces semantic, keyboard, focus, or
  assistive-technology reasoning.
- **Type tests:** add compile-time assertions for public generic or inference
  behavior and for consumer-facing component declarations that promise native
  attributes, events, or other inherited contracts. Exercise the exported
  component type rather than only its source prop interface.

Name tests after observable behavior. Avoid reaching into component internals or
asserting exact implementation markup unless that markup is itself a semantic
contract. Keep fixtures narrow. Bug fixes require regression tests whenever
practical.

Run `pnpm test` for unit/integration checks and `pnpm test:e2e` for browser checks.
The normal `pnpm verify` gate excludes browser tests to keep routine local and CI
feedback fast; CI runs the browser job separately after installing Chromium.

## Optional theme coverage

When a component gains an optional theme, browser tests must demonstrate that:

- headless behavior remains complete without the stylesheet;
- ordinary consumer CSS overrides theme defaults regardless of import order;
- every supported color scheme, semantic tone, and visual treatment meets its
  contrast contract on the theme-defined surface;
- focus indication remains visible on every supported surface and color scheme;
- loading and other visual state transitions preserve intended geometry and
  accessible content unless a documented contract requires a layout change;
- explicit light, dark, and system modes behave as documented; and
- forced-colors and reduced-motion preferences retain meaning and operability.

Prefer computed-style and interaction assertions over screenshots for these
contracts. Visual regression coverage may supplement them when rendering details
are themselves part of the supported theme.
