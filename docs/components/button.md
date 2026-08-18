# Button

`Button` is an unstyled native action control with safe form behavior and a
consumer-owned loading state.

## Basic use

```vue
<script setup lang="ts">
import { Button } from '@slop-ui/vue'

function save() {
  // Start the application-owned action.
}
</script>

<template>
  <Button @click="save">Save changes</Button>
</template>
```

The default `type` is `button`, so placing the component in a form does not
submit accidentally. Set `type="submit"` or `type="reset"` explicitly when that
native behavior is intended.

## API

| Prop       | Type                              | Default    | Description                                                                   |
| ---------- | --------------------------------- | ---------- | ----------------------------------------------------------------------------- |
| `type`     | `'button' \| 'submit' \| 'reset'` | `'button'` | Selects native button behavior.                                               |
| `disabled` | `boolean`                         | `false`    | Disables activation and sequential focus.                                     |
| `loading`  | `boolean`                         | `false`    | Prevents duplicate activation while preserving focus and exposing busy state. |

All native button attributes and event listeners fall through to the root
button. The default slot is the only content slot.

## Optional default theme

The component remains unstyled until the optional theme stylesheet and wrapper
are both present:

```ts
import '@slop-ui/themes/default.css'
```

```vue
<template>
  <div class="slop-theme">
    <Button>Styled action</Button>
  </div>
</template>
```

The wrapper makes theming local: a `Button` outside `.slop-theme` remains
headless even when the stylesheet is loaded. See the
[default theme guide](../themes/default.md) for tokens and overrides.

## Loading and disabled actions

```vue
<Button :loading="saving" @click="save">Save changes</Button>
<Button disabled>Unavailable action</Button>
```

Loading adds `aria-disabled="true"`, `aria-busy="true"`, and the `data-loading`
styling hook. Activation is blocked while the native button remains focusable, so
an action becoming pending does not discard the user's focus position. Slot
content remains rendered so the button keeps the same accessible name. The
application still owns the asynchronous operation, errors, cancellation, and any
success or failure announcement.

## Icon-only actions

Icon-only buttons require an accessible name. Hide decorative icon content from
assistive technology.

```vue
<Button data-icon-only aria-label="Close dialog">
  <CloseIcon data-slot="icon" aria-hidden="true" />
</Button>
```

Text buttons normally receive their accessible name from the slot. You can also
forward `aria-labelledby` or `aria-describedby` when the surrounding interface
provides those relationships. The optional theme sizes content marked with
`data-slot="icon"` and constrains SVG descendants inside an explicitly marked
wrapper.

## Component refs

```vue
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { Button, type ButtonExposed } from '@slop-ui/vue'

const saveButton = useTemplateRef<ButtonExposed>('saveButton')

function returnFocus() {
  saveButton.value?.focus()
}
</script>

<template>
  <Button ref="saveButton">Save changes</Button>
</template>
```

The ref exposes `element`, `focus(options?)`, and `blur()`. Before mount and after
unmount, `element` is `null` and the methods are safe no-ops.

## Accessibility and environment behavior

The component always renders a native `<button>` with the stable `slop-button`
class, so enabled buttons retain
native `Enter`, `Space`, pointer, touch, and focus behavior. Disabled buttons use
native disabled semantics; loading buttons remain focusable while activation is
suppressed. Without the optional default theme, consumers must provide visible
focus indication, sufficient contrast, and an adequate touch target.

SSR markup is deterministic from props and slot content, and setup does not read
browser globals. No listeners, timers, or observers require cleanup.

See the [approved Button specification](./button-spec.md) for the complete
behavior and compatibility contract.
