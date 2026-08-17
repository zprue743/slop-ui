import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    // The playground and its browser tests must exercise the current source.
    // Resolving the package name normally would pick up a previously built
    // `dist`, so a stale artifact could silently pass the e2e suite.
    alias: {
      '@slop-ui/vue': fileURLToPath(
        new URL('../../packages/vue/src/index.ts', import.meta.url),
      ),
    },
  },
})
