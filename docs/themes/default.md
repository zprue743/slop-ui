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
  <AddIcon data-slot="icon" aria-hidden="true" />
  Add item
</Button>

<Button data-icon-only aria-label="Close dialog">
  <CloseIcon data-slot="icon" aria-hidden="true" />
</Button>

<Button loading>Saving changes</Button>
```

`data-slot="icon"` opts icon content into theme sizing. `data-icon-only` opts the
button into a square control while `aria-label` supplies the required accessible
name. Loading and disabled appearances follow the component's existing semantic
attributes, and loading receives a visual spinner without replacing its name.

## Variants, sizes, and layout

Theme configuration uses fallthrough data attributes so visual decisions do not
become behavioral component props.

```vue
<Button>Primary</Button>
<Button data-variant="secondary">Secondary</Button>
<Button data-variant="outline">Outline</Button>
<Button data-variant="ghost">Ghost</Button>
<Button data-variant="danger">Delete</Button>

<Button data-size="sm">Small</Button>
<Button>Medium</Button>
<Button data-size="lg">Large</Button>

<Button data-block>Full-width action</Button>
```

Supported variants are `secondary`, `outline`, `ghost`, and `danger`; omitting
the attribute selects the primary treatment. Supported explicit sizes are `sm`
and `lg`; omitting the attribute selects `md`.

## Light, dark, and system color schemes

The default wrapper uses a light scheme. Select dark explicitly or follow the
operating-system preference:

```vue
<div class="slop-theme" data-color-scheme="dark">...</div>
<div class="slop-theme" data-color-scheme="system">...</div>
```

The theme sets the CSS `color-scheme` property so browser-provided UI inside the
scope can match the selected scheme.

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
  --slop-button-focus-ring: #111827;
  --slop-button-focus-ring-contrast: #ffffff;
  --slop-button-radius: 999px;
  --slop-button-size-md-min-size: 3rem;
  --slop-button-size-md-padding-inline: 1.5rem;
}
```

Component-scoped tokens can grow without prematurely defining a global color or
spacing system. Shared tokens should be introduced only when later components
demonstrate a real common responsibility.

## Accessibility and motion

The defaults include a two-color keyboard focus indicator, minimum control sizes,
forced-colors support, disabled and loading cursors, and reduced-motion handling.
Applications remain responsible for testing token overrides for contrast, focus
visibility, zoom, and target size in their full interface.

## Override classes directly

The stylesheet is published in the low-priority `slop-ui-theme` cascade layer,
and its selectors use zero-specificity `:where()`. Ordinary unlayered consumer
styles therefore win even when imported before the theme:

```css
.product-button {
  background-color: rebeccapurple;
  border-radius: 999px;
}
```
