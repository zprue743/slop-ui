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

test('Button supports native activation, focus, and unavailable states', async ({
  page,
}) => {
  const playground = await startStaticServer('apps/playground/dist')

  try {
    await page.goto(playground.url)

    const action = page.getByRole('button', { name: 'Run action' })
    await action.focus()
    await expect(action).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page.getByText('Activations: 1')).toBeVisible()
    await page.keyboard.press('Space')
    await expect(page.getByText('Activations: 2')).toBeVisible()

    const disabled = page.getByRole('button', { name: 'Disabled action' })
    const loading = page.getByRole('button', { name: 'Loading action' })
    await expect(disabled).toBeDisabled()
    await expect(loading).toBeDisabled()
    await expect(loading).toHaveAttribute('aria-busy', 'true')

    await page.getByRole('button', { name: 'Close playground' }).click()
    await expect(page.getByText('Activations: 3')).toBeVisible()
  } finally {
    await playground.close()
  }
})
