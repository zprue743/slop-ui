<script setup lang="ts">
import { useTemplateRef } from 'vue'

import { Button, type ButtonExposed } from '../src'

const button = useTemplateRef<ButtonExposed>('button')

function handleClick(event: MouseEvent) {
  event.preventDefault()
}

function focusButton() {
  button.value?.focus({ preventScroll: true })
}

void focusButton
</script>

<template>
  <Button
    ref="button"
    class="product-button"
    type="submit"
    aria-label="Save changes"
    data-variant="secondary"
    @click="handleClick"
  />
</template>
