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
on incidental child elements or wrapper structure. Theme treatment axes such as
solid or outline remain independent from semantic tone axes such as accent or
danger, so consumers can compose them without a growing set of combined variants.

A theme that provides transparent or surface-derived treatments must define and
apply the supported surface and foreground for each color scheme. Contrast is a
contract across every supported scheme, semantic tone, and visual treatment, not
only the default combination. State indicators should preserve intended control
geometry and accessible content unless a documented interaction requires a
layout change.

Every visual-part hook must document whether consumers place it on the rendered
leaf or may place it on a wrapper. If wrappers are supported, theme selectors
must constrain the documented descendants without reverting to incidental DOM
structure or broad element selectors.

Consumers must remain able to use normal CSS, utility CSS, CSS Modules, or another
theme system. Headless semantics, focus behavior, and state must not depend on a
particular visual treatment.
