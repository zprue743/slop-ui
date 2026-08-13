# Project philosophy

slop-ui aims to pair readable Vue ergonomics with the depth required by complex
application interfaces. Simple use should look simple; consumers should meet
complexity only when their problem requires it.

The preferred customization progression is:

```text
props and configuration
  -> callbacks
  -> slots and render customization
  -> lower-level primitives
```

Configuration describes intent—such as searchable, clearable, or virtualized—not
the library's nested DOM. Opinionated defaults are welcome; architectural dead
ends are not.

The library must not demand proprietary records for ordinary consumer data.
Future data-heavy APIs should support conventional properties, useful nested
paths, typed accessors, identity callbacks, and adapters for unusual sources.

## Product principles

- Vue-first and idiomatic rather than a second framework hidden inside Vue.
- Headless functionality with replaceable optional styling.
- Excellent TypeScript as a form of product documentation.
- Accessibility specified before implementation.
- Backwards compatibility and migration impact considered at public boundaries.
- Composition over slightly different copies of existing capabilities.
- Evidence before abstraction; predictability before cleverness.

Likely early primitives, future data table/query tooling, and possible scheduling
features are directional context only. They are not a committed roadmap and no
generic architecture should be invented solely to anticipate them.
