# Button specification

**Status:** Approved for issue #1 implementation scope on 2026-08-15.

## Purpose and user problems

`Button` provides the foundational action primitive for toolbar, retry,
pagination, and row actions. It keeps native browser behavior while standardizing
safe defaults, pending-action behavior, and the public Vue ref contract.

## Non-goals

- Styling, variants, sizes, icons, and target-size enforcement belong to the
  consuming design system or the optional theme package.
- Toggle, menu, link, and composite-widget behavior are separate primitives.
- `Button` does not start, cancel, or announce the result of asynchronous work.

## Public API

### Props and configuration

| Prop       | Type                              | Default    | Contract                                                                                |
| ---------- | --------------------------------- | ---------- | --------------------------------------------------------------------------------------- |
| `type`     | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button behavior. Submission and reset require explicit opt-in.                   |
| `disabled` | `boolean`                         | `false`    | Applies native disabled semantics and prevents activation.                              |
| `loading`  | `boolean`                         | `false`    | Disables activation, adds `aria-busy="true"` and `data-loading`, and preserves content. |

Native button attributes, including accessible-name attributes, and native event
listeners fall through to the root `<button>`.

### v-model contracts

There is no model. Pending and disabled state remain consumer-owned props.

### Events, callbacks, slots, and exposed methods

The default slot supplies button content. No component-specific events are
declared; native listeners such as `@click` attach to the button and receive the
native event.

A component template ref exposes:

- `element: HTMLButtonElement | null`
- `focus(options?: FocusOptions): void`
- `blur(): void`

The methods are no-ops before mount or after unmount. Consumers should not depend
on any markup beyond the root button.

## State model

The component has enabled, disabled, and loading states. `disabled` and `loading`
may change independently. Loading takes no ownership of async work and ends only
when the consumer sets `loading` to `false`.

### Loading, empty, disabled, read-only, and error states

Both disabled and loading states set the native `disabled` attribute, so neither
state can activate or receive sequential focus. When they overlap, the loading
attributes remain visible. Loading does not replace slot content, avoiding an
accessible-name change while an action is pending.

An empty default slot is permitted only when another naming mechanism such as
`aria-label` or `aria-labelledby` gives the button an accessible name. There are
no read-only or error states.

### Async behavior

The component only represents consumer-owned pending state. The consumer owns
races, cancellation, stale results, error handling, and any result announcement.

## Consumer data

No consumer data is accepted or mutated.

## Accessibility contract

### Semantics and relationships

The root is always a native `<button>`. Text content normally provides its name.
Icon-only use requires `aria-label` or `aria-labelledby`, and decorative icons
must be hidden from assistive technology. `disabled` uses native semantics;
loading additionally exposes `aria-busy="true"` while retaining the name.

### Keyboard interaction

Enabled buttons use native platform behavior: `Space` and `Enter` activate the
button. Disabled and loading buttons cannot be activated. No custom key handling
is added.

### Focus behavior

Enabled buttons participate in the document's native tab order and use
consumer-supplied focus styling. Disabled and loading buttons do not receive
sequential focus. The exposed methods delegate to the native element and do not
restore or trap focus.

### Assistive technology expectations

Assistive technology encounters an ordinary named button. Loading is conveyed as
busy and unavailable. The component does not use a live region because the
outcome and suitable announcement text belong to the consuming workflow.

## Rendering and customization

The default slot and fallthrough attributes are the customization API. The
component ships no wrapper or visual styles. `slop-button` is the stable component
class, and `data-loading` is a stable state hook. The optional default theme only
applies styles when an ancestor has the `slop-theme` class. Consumers may add the
`data-icon-only` attribute to opt into the theme's square icon-button treatment.

## Environment behavior

### SSR and hydration

Rendering is deterministic from props and slot content. The implementation does
not access browser globals during setup. The exposed element is `null` until
mount, so server output and hydration do not depend on it.

### Mobile and touch

Native pointer and touch activation are preserved. Consumers own visual size and
must provide an adequate touch target for their context.

## Performance

Rendering and state derivation are constant-time. The component creates no
global listeners, timers, observers, registries, or cleanup obligations.

## Composition

No existing primitive provides this responsibility. The behavior stays in
`packages/vue` because its component, slot, attribute-fallthrough, and template
ref contracts are Vue-specific. No framework-neutral core abstraction is needed.

## Test plan

- Vue tests cover defaults, slots, fallthrough attributes/listeners, disabled and
  loading activation, loading semantics, icon-only naming, exposed refs, and SSR.
- Browser tests cover click and keyboard activation, focus, disabled/loading
  behavior, icon-only naming, and an axe smoke check.
- No framework-neutral or generic type test is required because there is no core
  logic or public generic inference contract.
- Cleanup requires no dedicated fixture because the component owns no effects or
  external resources.

## Documentation plan

Publish an API reference with ordinary, loading, icon-only, ref, accessibility,
keyboard, and SSR guidance. Keep equivalent examples in the playground.

## Compatibility and release impact

This is the first public component export from `@slop-ui/vue`, so it is additive
and requires a minor Changeset. The stable styling hooks and optional theme are
also additive public contracts. Future changes to event timing, native semantics,
loading behavior, exposed refs, semantic attributes, or styling hooks require
compatibility review.

## Open architectural questions

None for this scope.
