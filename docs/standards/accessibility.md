# Accessibility standard

Accessibility is architecture, not final QA. A component specification must
define semantics before implementation:

- native element choice and ARIA roles;
- accessible names, descriptions, states, and relationships;
- complete keyboard interaction and key conflict behavior;
- focus entry, movement, trapping, restoration, and visible indication;
- disabled and read-only semantics;
- loading, empty, validation, and async announcements;
- expected assistive-technology behavior; and
- touch, zoom, reduced-motion, contrast, and target-size considerations where
  applicable.

Prefer native HTML semantics. ARIA supplements missing native meaning; it does
not repair arbitrary markup automatically. Components must remain operable
without a pointer and should not encode meaning through color alone.

Specs should cite established WAI-ARIA Authoring Practices patterns when a
matching composite widget exists, while still validating the chosen behavior in
the product context. Tests should cover keyboard and focus behavior explicitly.
Automated axe scans are a baseline, not evidence that a component is accessible.
Meaningful components require manual reasoning and, before stable release,
assistive-technology review proportionate to their complexity.

Loading and pending states do not automatically have native disabled semantics.
For every state that suppresses activation, specify whether the focused element
remains focusable, how pointer and keyboard activation and native form behavior
are prevented, and what assistive technology receives. Test the transition into
that state from an enabled, focused control; testing only its initial static
markup is insufficient.

Author-defined focus indicators must remain visibly distinct on every supported
surface and color scheme. Use at least 3:1 contrast between the indicator and its
adjacent colors; a two-color indicator is preferred when no single color is
reliable across those surfaces. Preserve a visible system-color indicator in
forced-colors mode. Motion used only for visual feedback must respect
`prefers-reduced-motion` without hiding state or progress information.
