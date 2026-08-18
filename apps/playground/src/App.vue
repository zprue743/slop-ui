<script setup lang="ts">
import { ref } from 'vue'

import { Button } from '@slop-ui/vue'

const activations = ref(0)
const submissions = ref(0)
const pendingActivations = ref(0)
const isPending = ref(false)

function startPending() {
  pendingActivations.value += 1
  isPending.value = true
}
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
          <form class="form-example" @submit.prevent="submissions += 1">
            <span>Form submissions: {{ submissions }}</span>
            <div class="examples">
              <Button>Default form action</Button>
              <Button type="submit">Submit form</Button>
            </div>
          </form>
        </fieldset>

        <fieldset class="slop-theme" data-color-scheme="light">
          <legend>Default theme</legend>
          <p>The same component with the optional theme enabled.</p>
          <div class="examples">
            <div class="example">
              <span>Icon with text</span>
              <Button @click="activations += 1">
                <span data-slot="icon">
                  <svg aria-hidden="true" viewBox="0 0 16 16">
                    <path d="M8 3v10M3 8h10" stroke="currentColor" />
                  </svg>
                </span>
                Add item
              </Button>
            </div>
            <div class="example">
              <span>Neutral soft</span>
              <Button
                data-variant="soft"
                data-tone="neutral"
                data-size="sm"
                @click="activations += 1"
              >
                Neutral action
              </Button>
            </div>
            <div class="example">
              <span>Outline</span>
              <Button data-variant="outline" @click="activations += 1">
                Outline action
              </Button>
            </div>
            <div class="example">
              <span>Danger solid</span>
              <Button
                data-tone="danger"
                data-size="lg"
                @click="activations += 1"
              >
                Delete item
              </Button>
            </div>
            <div class="example">
              <span>Loading (activations: {{ pendingActivations }})</span>
              <div class="examples">
                <Button :loading="isPending" @click="startPending">
                  Save changes
                </Button>
                <Button
                  data-variant="ghost"
                  data-tone="neutral"
                  @click="isPending = false"
                >
                  Reset
                </Button>
              </div>
            </div>
            <div class="example">
              <span>Custom loading indicator</span>
              <Button loading>
                <svg
                  data-slot="loading-indicator"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
                Publishing
              </Button>
            </div>
            <div class="example">
              <span>Icon only</span>
              <Button
                data-icon-only
                aria-label="Close playground"
                @click="activations += 1"
              >
                <svg data-slot="icon" aria-hidden="true" viewBox="0 0 16 16">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" />
                </svg>
              </Button>
            </div>
            <div class="example block-example">
              <span>Consumer override</span>
              <Button
                class="product-button"
                data-block
                @click="activations += 1"
              >
                Product action
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

.form-example {
  display: grid;
  gap: 0.5rem;
  margin-block-start: 1rem;
}

.example {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.block-example {
  flex: 1 1 100%;
}
</style>
