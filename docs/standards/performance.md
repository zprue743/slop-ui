# Performance standard

Do not micro-optimize without evidence, but avoid architectural choices that make
future data-heavy interfaces expensive by default.

- Avoid accidental quadratic work in common paths.
- Avoid deep watches over large consumer datasets.
- Preserve consumer object identity where useful; do not clone entire inputs to
  create library ownership.
- Document caches, invalidation rules, and retained references.
- Benchmark behavior whose performance is part of the public expectation.
- Keep virtualization a reusable capability when evidence supports it, not a
  collection of slightly different component-specific hacks.
- Consider SSR, hydration, allocation, and cleanup costs as well as render time.

DataTable, Tree, Scheduler, Gantt, QueryBuilder, and similar possibilities will
need explicit performance budgets in their component specifications. Their
possible future existence does not justify implementing caches or virtualization
abstractions now.
