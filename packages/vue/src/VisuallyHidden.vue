<script lang="ts">
import type { CSSProperties } from 'vue'

/**
 * The clip technique keeps content in the accessibility tree while removing it
 * from visual presentation. Every declaration is load-bearing:
 *
 * - `position: absolute` with `margin: -1px` takes the box out of layout flow so
 *   surrounding content does not shift around it.
 * - The dimensions are `1px` rather than `0` because some browser and
 *   screen-reader combinations drop zero-area elements from the accessibility
 *   tree, which would defeat the entire purpose of the component.
 * - `clip-path: inset(50%)` is the modern clip; `clip: rect(0 0 0 0)` is
 *   deprecated but retained for engines that never implemented `clip-path` for
 *   this case.
 * - `overflow: hidden` with `white-space: nowrap` stops a long string from
 *   wrapping inside the 1px box and producing scrollable overflow.
 *
 * Four alternatives are deliberately rejected: `display: none` and
 * `visibility: hidden` remove content from assistive technology entirely, zero
 * dimensions risk the same accessibility-tree removal, and
 * `text-indent: -9999px` breaks in right-to-left writing modes.
 *
 * The style also sets no `font-size`, `line-height`, `letter-spacing`, or
 * `word-spacing`. Their absence is part of the contract rather than an
 * oversight: setting any of them would conflict with the WCAG text-resize and
 * text-spacing criteria, so a test asserts they stay absent.
 *
 * Declared in a plain `<script>` block so the object is created once for the
 * module instead of once per component instance.
 */
const visuallyHiddenStyle = Object.freeze({
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  padding: '0',
  border: '0',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
} satisfies CSSProperties)
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'

import type { VisuallyHiddenProps } from './VisuallyHidden.types'

const props = withDefaults(defineProps<VisuallyHiddenProps>(), {
  as: 'span',
  focusable: false,
})

// `focusin` and `focusout` stand in for a `:focus-within` rule, which inline
// styles cannot express. Both events bubble, so a focusable descendant such as
// the anchor inside a skip link drives the reveal without the root itself ever
// becoming focusable.
//
// Focus presence is tracked whatever `focusable` is set to, and `focusable` only
// gates whether that presence reveals anything. Skipping the tracking while
// hidden would strand a stale reading if `focusable` changed while the subtree
// held focus.
//
// Moving focus between two descendants fires `focusout` then `focusin`
// synchronously. Vue coalesces the resulting render, so the content does not
// flicker between the two events.
//
// The listeners are template-bound, so Vue attaches and removes them with the
// element and the component owns no cleanup.
//
// This reasoning lives here rather than beside the template markup because the
// development-mode compiler preserves template comments as real nodes. One
// there would give the component a second root and break the single-root
// attribute fallthrough that the public API depends on.
const hasFocusWithin = ref(false)

const isRevealed = computed(() => props.focusable && hasFocusWithin.value)
</script>

<template>
  <component
    :is="as"
    :style="isRevealed ? undefined : visuallyHiddenStyle"
    :data-visually-hidden="isRevealed ? undefined : ''"
    @focusin="hasFocusWithin = true"
    @focusout="hasFocusWithin = false"
  >
    <slot />
  </component>
</template>
