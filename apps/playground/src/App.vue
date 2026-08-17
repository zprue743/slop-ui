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
      <div class="comparison">
        <fieldset>
          <legend>Headless</legend>
          <p>No theme styles are applied to these buttons.</p>
          <div class="examples">
            <Button @click="activations += 1"> Run action </Button>
            <Button disabled @click="activations += 1">
              Disabled action
            </Button>
          </div>
        </fieldset>

        <fieldset class="slop-theme">
          <legend>Default theme</legend>
          <p>The same component with the optional theme enabled.</p>
          <div class="examples">
            <div class="example">
              <span>Icon with text</span>
              <Button @click="activations += 1">
                <svg aria-hidden="true" viewBox="0 0 16 16">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" />
                </svg>
                Add item
              </Button>
            </div>
            <div class="example">
              <span>Loading</span>
              <Button loading @click="activations += 1">
                Loading action
              </Button>
            </div>
            <div class="example">
              <span>Icon only</span>
              <Button
                data-icon-only
                aria-label="Close playground"
                @click="activations += 1"
              >
                <svg aria-hidden="true" viewBox="0 0 16 16">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" />
                </svg>
              </Button>
            </div>
          </div>
        </fieldset>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  font-family: system-ui, sans-serif;
  margin: 2rem;
}

.comparison {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
}

fieldset {
  min-inline-size: 0;
}

.examples {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.example {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
</style>
