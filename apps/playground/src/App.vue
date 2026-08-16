<script setup lang="ts">
import { ref } from 'vue'

import { Button } from '@slop-ui/vue'

const activations = ref(0)
</script>

<template>
  <main>
    <h1>slop-ui playground</h1>
    <section aria-labelledby="button-heading">
      <h2 id="button-heading">Button</h2>
      <p>Activations: {{ activations }}</p>
      <div class="examples">
        <Button @click="activations += 1"> Run action </Button>
        <Button disabled @click="activations += 1"> Disabled action </Button>
        <Button loading @click="activations += 1"> Loading action </Button>
        <Button aria-label="Close playground" @click="activations += 1">
          <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" />
          </svg>
        </Button>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  font-family: system-ui, sans-serif;
  margin: 2rem;
}

.examples {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

button {
  min-block-size: 2.75rem;
  padding-inline: 1rem;
}

button:focus-visible {
  outline: 0.2rem solid Highlight;
  outline-offset: 0.15rem;
}
</style>
