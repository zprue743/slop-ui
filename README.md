# slop-ui

slop-ui is the foundation of a Vue-first, headless-first open-source UI
component library. The project aims to make ordinary use cases concise while
providing progressive escape hatches for demanding application interfaces.

The intended product direction combines:

- simple Vue props and configuration-driven ergonomics;
- framework-independent behavior where that boundary is genuinely useful;
- optional polished styling that headless functionality never requires;
- strong TypeScript and accessibility contracts; and
- room for capable application components such as data tables and query
  builders without dictating consumer data models.

## Status

The repository is in its **foundation/bootstrap phase**. It is not ready for
production and currently exports no UI components. The current code establishes
tooling, package boundaries, tests, documentation, and contribution rules for
future implementation work.

The likely product directions described in the documentation are context, not a
committed roadmap.

## Requirements

- Node.js 22 or newer
- pnpm 11 or newer

## Development

```bash
pnpm install
pnpm verify
```

Useful focused commands include:

```bash
pnpm dev
pnpm docs:dev
pnpm test
pnpm test:e2e
pnpm typecheck
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting a change. Engineering
standards and architecture decisions live in [docs](./docs/index.md); coding
agents must begin with [AGENTS.md](./AGENTS.md).

## Philosophy

Simple usage should remain simple. Configuration should describe behavior, not
internal markup. Advanced users should be able to progress from props and
configuration to callbacks, slots, custom rendering, and lower-level APIs only
when their use case needs that power.

Accessibility, TypeScript quality, documentation, and backwards compatibility
are product requirements rather than cleanup phases.

## License

[MIT](./LICENSE)
