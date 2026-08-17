# Styling architecture

Functionality is headless and must work without the default theme. `@slop-ui/vue`
must never import `@slop-ui/themes` as a requirement for behavior.

Components may intentionally expose stable semantic attributes or classes
and CSS custom properties. Internal wrapper nesting is not the primary styling
API and must not become an accidental compatibility contract.

The optional theme package provides replaceable, opt-in defaults beneath the
`.slop-theme` wrapper. Tokens use CSS custom properties where runtime composition
and consumer overrides benefit from them. Token groups begin component-scoped;
shared tokens should emerge only when multiple components demonstrate the same
visual responsibility.

Theme defaults live in a named low-priority cascade layer and use zero-specificity
selectors so ordinary consumer CSS can override them independently of import
order. Slotted visual parts use explicit `data-slot` hooks instead of depending
on incidental child elements or wrapper structure.

Consumers must remain able to use normal CSS, utility CSS, CSS Modules, or another
theme system. Headless semantics, focus behavior, and state must not depend on a
particular visual treatment.
