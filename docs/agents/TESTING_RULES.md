# Testing rules for agents

- Test observable behavior and public contracts, not private implementation
  shape.
- Use Vitest for framework-neutral and unit behavior, Vue Test Utils when a
  component needs Vue-aware mounting, and Playwright for browser behavior.
- Add keyboard, focus, disabled, error, async, cleanup, and accessibility cases
  identified by the component specification.
- Automated axe checks supplement rather than replace semantic and manual
  accessibility reasoning.
- Add compile-time tests once a public generic or inference contract needs
  protection.
- A bug fix should include a failing regression test whenever practical.
- Keep fixtures minimal and name the behavior they establish.
- Run `pnpm test:e2e` for browser-observable changes and `pnpm verify` before
  completion.

The canonical rationale and test placement are in
[testing standards](../standards/testing.md).
