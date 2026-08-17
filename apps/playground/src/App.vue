<script setup lang="ts">
// This shell exercises the library in a real browser for development and the
// Playwright suite. It is not a library component or an example public API.
import { ref } from 'vue'

import { VisuallyHidden } from '@slop-ui/vue'

interface Report {
  name: string
  owner: string
}

const reports = ref<Report[]>([
  { name: 'Q3 revenue', owner: 'Priya' },
  { name: 'Q4 forecast', owner: 'Sam' },
])

const status = ref('')

function remove(name: string) {
  reports.value = reports.value.filter((report) => report.name !== name)
  status.value = `Deleted ${name}`
}
</script>

<template>
  <header>
    <!--
      The skip link is the first focusable element in the document, so it must
      reveal itself on focus. Without `focusable` it would be reachable by
      keyboard while staying invisible.
    -->
    <VisuallyHidden focusable>
      <a class="skip-link" href="#main">Skip to content</a>
    </VisuallyHidden>
  </header>

  <main id="main" tabindex="-1">
    <h1>slop-ui playground</h1>

    <section aria-labelledby="visually-hidden-heading">
      <h2 id="visually-hidden-heading">VisuallyHidden</h2>

      <table>
        <caption>
          Saved reports
        </caption>
        <thead>
          <tr>
            <th scope="col">Report</th>
            <th scope="col">Owner</th>
            <!--
              The actions column header is obvious to a sighted reader and
              missing entirely for a screen reader, so it renders as a real
              `th` that only assistive technology encounters.
            -->
            <VisuallyHidden as="th" scope="col"> Actions </VisuallyHidden>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in reports" :key="report.name">
            <td>{{ report.name }}</td>
            <td>{{ report.owner }}</td>
            <td>
              <button type="button" @click="remove(report.name)">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                >
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" />
                </svg>
                <VisuallyHidden>Delete {{ report.name }}</VisuallyHidden>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-if="reports.length === 0">Every report was deleted.</p>

      <!--
        A visually hidden live region announces an outcome that is otherwise
        conveyed only by a row disappearing. The element is present from first
        render so the region exists before its text changes.
      -->
      <VisuallyHidden role="status" aria-live="polite">
        {{ status }}
      </VisuallyHidden>
    </section>
  </main>
</template>

<style scoped>
main {
  font-family: system-ui, sans-serif;
  margin: 2rem;
}

/*
 * The skip link moves focus here, so `main` needs `tabindex="-1"` to be a valid
 * target. It is not an interactive control, and the `:focus-visible` rule below
 * still covers every control a keyboard user actually operates.
 */
main:focus {
  outline: none;
}

table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #767676;
  padding: 0.5rem 0.75rem;
  text-align: start;
}

button {
  min-block-size: 2.75rem;
  min-inline-size: 2.75rem;
}

/* The library ships no styling, so the playground owns visible focus. */
:focus-visible {
  outline: 0.2rem solid Highlight;
  outline-offset: 0.15rem;
}

.skip-link {
  display: inline-block;
  margin: 0.5rem;
}
</style>
