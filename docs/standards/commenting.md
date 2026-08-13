# Commenting standard

Everything that is not clearly obvious requires a useful comment. This standard
is especially important in an AI-authored codebase: hidden assumptions cannot be
reconstructed reliably months later.

Comments explain intent rather than syntax. Document:

- why a behavior or boundary exists;
- invariants and consumer-data assumptions;
- accessibility and focus decisions;
- browser, SSR, and hydration constraints;
- performance tradeoffs and intentional caches;
- unusual but necessary TypeScript techniques;
- compatibility requirements and intentional duplication;
- cleanup ownership and external side effects; and
- why a plausible alternative was rejected.

Do not narrate an assignment, loop, obvious condition, or function name. Comment
noise hides the reasoning that matters.

Exported public APIs require TSDoc/JSDoc that explains the consumer contract,
including non-obvious defaults and constraints. Configuration files should note
project-specific choices near the setting when their intent would otherwise be
unclear.

Before finishing a change, ask: would another senior engineer understand why
this exists six months from now? If not, explain it in the nearest durable place:
code comment for local reasoning, public docs for consumer contracts, or an ADR
for consequential architectural decisions.
