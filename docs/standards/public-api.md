# Public API standard

Published APIs evolve more slowly than internals. Design the smallest coherent
contract and expose only what consumers need.

Simple component use should rely on direct props and conventional Vue models.
Configuration describes behavior rather than internal markup. Advanced needs
progress through callbacks, slots/custom rendering, and lower-level primitives.

Public APIs require:

- deliberate, readable TypeScript types and TSDoc;
- documented defaults, states, edge cases, SSR behavior, and accessibility;
- behavior and type tests appropriate to the contract;
- consumer-data freedom through properties, accessors, identities, or adapters;
- an analysis of backwards compatibility and migration impact; and
- a Changeset for changes that affect a publishable package.

Deprecate before removal when feasible. Explain the replacement and retain a
reasonable migration window. Changes in event timing, focus movement, keyboard
behavior, inferred types, semantic attributes, or required markup can be breaking
even when a prop name is unchanged.

Use one public entry point per package by default. Internal files should not be
reachable through sprawling barrels or undocumented deep imports.
