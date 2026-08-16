<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'

import type { ButtonExposed, ButtonProps } from './Button.types'

const props = withDefaults(defineProps<ButtonProps>(), {
  disabled: false,
  loading: false,
  type: 'button',
})

const element = useTemplateRef<HTMLButtonElement>('element')
const isDisabled = computed(() => props.disabled || props.loading)

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
    :type="type"
    :disabled="isDisabled"
    :aria-busy="loading || undefined"
    :data-loading="loading ? '' : undefined"
  >
    <slot />
  </button>
</template>
