import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { startStaticServer } from './static-server'

test('playground shell loads without detectable accessibility violations', async ({
  page,
}) => {
  const playground = await startStaticServer('apps/playground/dist')

  try {
    await page.goto(playground.url)

    await expect(
      page.getByRole('heading', { name: 'slop-ui playground' }),
    ).toBeVisible()

    // Automated checks catch only a subset of accessibility failures. Component
    // specifications must still reason explicitly about semantics and behavior.
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])
  } finally {
    await playground.close()
  }
})
