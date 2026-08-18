<script setup lang="ts">
import { useTemplateRef } from 'vue'

import type { ButtonExposed, ButtonProps } from './Button.types'

const props = withDefaults(defineProps<ButtonProps>(), {
  disabled: false,
  loading: false,
  type: 'button',
})

const element = useTemplateRef<HTMLButtonElement>('element')

function preventLoadingActivation(event: MouseEvent) {
  if (!props.loading) return

  // Loading remains focusable so async state changes do not discard the user's
  // focus position. Capture-phase cancellation prevents consumer listeners and
  // native form submission without simulating button keyboard behavior.
  event.preventDefault()
  event.stopImmediatePropagation()
}

defineExpose<ButtonExposed>({
  get element() {
    return element.value
  },
  focus(options?: FocusOptions) {
    element.value?.focus(options)
  },
  blur() {
    element.value?.blur()
  },
})
</script>

<template>
  <button
    ref="element"
    class="slop-button"
    :type="type"
    :disabled="disabled"
    :aria-disabled="loading || undefined"
    :aria-busy="loading || undefined"
    :data-loading="loading ? '' : undefined"
    @click.capture="preventLoadingActivation"
  >
    <slot />
  </button>
</template>
