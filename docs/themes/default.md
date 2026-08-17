# Default theme

`@slop-ui/themes` provides an optional visual baseline for applications,
documentation, and playground examples. Component behavior never depends on it.

## Enable the theme

Import the stylesheet once, then apply `slop-theme` only where the defaults
should take effect.

```ts
import '@slop-ui/themes/default.css'
```

```vue
<template>
  <main class="slop-theme">
    <Button>Save changes</Button>
  </main>
</template>
```

Buttons outside the wrapper remain unstyled. This makes it possible to compare
the headless primitive with the default theme or combine slop-ui with another
design system incrementally.

## Button examples

The default theme styles the component's stable `slop-button` class. Slot
content still controls text and icons.

```vue
<Button>
  <AddIcon aria-hidden="true" />
  Add item
</Button>

<Button data-icon-only aria-label="Close dialog">
  <CloseIcon aria-hidden="true" />
</Button>

<Button loading>Saving changes</Button>
```

`data-icon-only` opts into a square control while `aria-label` supplies the
required accessible name. Loading and disabled appearances follow the component's
existing semantic attributes.

## Customize tokens

The initial token surface is deliberately Button-specific. Override tokens on
the same wrapper or a nested theme scope:

```css
.product-theme {
  --slop-button-background: #7c3aed;
  --slop-button-background-hover: #6d28d9;
  --slop-button-background-active: #5b21b6;
  --slop-button-border-color: #7c3aed;
  --slop-button-color: #ffffff;
  --slop-button-focus-ring: #facc15;
  --slop-button-radius: 999px;
  --slop-button-min-size: 3rem;
}
```

Component-scoped tokens can grow without prematurely defining a global color or
spacing system. Shared tokens should be introduced only when later components
demonstrate a real common responsibility.

## Accessibility and motion

The defaults include visible keyboard focus, a minimum control size, disabled
and loading cursors, and reduced-motion handling. Applications remain responsible
for testing any token overrides for contrast, focus visibility, zoom, and target
size in their full interface.
