# Component workflow

Production component work may begin only after a written specification based on
[the component template](../components/spec-template.md) is reviewed enough to
resolve its public behavior and accessibility contract.

1. Define purpose, user problems, non-goals, and composition with existing
   primitives.
2. Design the smallest simple API and its progressive escape hatches.
3. Define controlled and uncontrolled state, consumer-data assumptions, events,
   slots, and exposed methods.
4. Specify semantic roles, keyboard interactions, focus movement, disabled
   behavior, and assistive-technology relationships before markup is chosen.
   For states that suppress activation, decide whether focus is retained and
   define form behavior and state-transition semantics explicitly.
5. Identify loading, empty, error, async, SSR, hydration, touch, performance, and
   virtualization behavior that applies.
6. Agree on headless hooks and optional theming hooks without making internal DOM
   structure a public contract. Treat documented classes, CSS custom properties,
   and `data-*` styling hooks as public contracts once published.
7. List unit, Vue, browser, accessibility, and type tests required by the public
   contract. For an optionally themed component, include the unstyled behavior,
   consumer override order, supported color schemes, treatment contrast, focus
   indication, state geometry, forced colors, and reduced motion where
   applicable. Type fixtures must exercise the exported consumer-facing
   declaration whenever its contract extends beyond custom component props.
8. Implement the narrowest coherent behavior, tests, API docs, examples, and
   change metadata together.
9. Review compatibility and migration impact before changing a published API.

Do not create a production-looking placeholder to stand in for an unresolved
component design.
