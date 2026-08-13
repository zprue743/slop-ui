# Styling architecture

Functionality is headless and must work without the default theme. `@slop-ui/vue`
must never import `@slop-ui/themes` as a requirement for behavior.

Future components may intentionally expose stable semantic attributes or classes
and CSS custom properties. Internal wrapper nesting is not the primary styling
API and must not become an accidental compatibility contract.

The optional theme package will eventually provide replaceable tokens and
polished defaults. Tokens should use CSS custom properties where runtime
composition and consumer overrides benefit from them. No token taxonomy or
visual system is defined during the foundation phase because component needs
have not provided evidence for one.

Consumers must remain able to use normal CSS, utility CSS, CSS Modules, or another
theme system. Headless semantics, focus behavior, and state must not depend on a
particular visual treatment.
