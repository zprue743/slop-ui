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

    await page.getByRole('button', { name: 'Default form action' }).click()
    await expect(page.getByText('Form submissions: 0')).toBeVisible()
    await page.getByRole('button', { name: 'Submit form' }).click()
    await expect(page.getByText('Form submissions: 1')).toBeVisible()

    const disabled = page.getByRole('button', { name: 'Disabled action' })
    const loading = page.getByRole('button', { name: 'Loading action' })
    await expect(disabled).toBeDisabled()
    await expect(loading).toBeDisabled()
    await expect(loading).toHaveAttribute('aria-busy', 'true')

    const themedGroup = page.getByRole('group', { name: 'Default theme' })
    const themedAction = themedGroup.getByRole('button', { name: 'Add item' })
    await expect(themedAction).toHaveCSS('background-color', 'rgb(29, 78, 216)')
    await expect(themedAction.locator('[data-slot="icon"]')).toBeVisible()

    const secondary = themedGroup.getByRole('button', {
      name: 'Secondary action',
    })
    await expect(secondary).toHaveCSS('background-color', 'rgb(248, 250, 252)')

    const danger = themedGroup.getByRole('button', { name: 'Delete item' })
    await expect(danger).toHaveCSS('min-height', '52px')

    const overridden = themedGroup.getByRole('button', {
      name: 'Product action',
    })
    await expect(overridden).toHaveCSS('background-color', 'rgb(124, 58, 237)')

    const iconOnly = themedGroup.getByRole('button', {
      name: 'Close playground',
    })
    await expect(iconOnly).toHaveAttribute('data-icon-only', '')

    await iconOnly.click()
    await expect(page.getByText('Activations: 3')).toBeVisible()
  } finally {
    await playground.close()
  }
})

test('default theme adapts to accessibility and color preferences', async ({
  page,
}) => {
  const playground = await startStaticServer('apps/playground/dist')

  try {
    await page.goto(playground.url)

    const themedGroup = page.getByRole('group', { name: 'Default theme' })
    const action = themedGroup.getByRole('button', { name: 'Add item' })
    const loading = themedGroup.getByRole('button', { name: 'Loading action' })

    await action.focus()
    await expect(action).toHaveCSS('outline-color', 'rgb(15, 23, 42)')
    await expect(action).toHaveCSS('box-shadow', /rgb\(255, 255, 255\)/)

    const animatedLoadingIndicator = await loading.evaluate((element) => {
      const style = getComputedStyle(element, '::before')
      return { animationName: style.animationName, content: style.content }
    })
    expect(animatedLoadingIndicator.content).not.toBe('none')
    expect(animatedLoadingIndicator.animationName).not.toBe('none')

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(action).toHaveCSS('transition-duration', '0s')
    expect(
      await loading.evaluate(
        (element) => getComputedStyle(element, '::before').animationName,
      ),
    ).toBe('none')

    await themedGroup.evaluate((element) => {
      element.setAttribute('data-color-scheme', 'dark')
    })
    await expect(themedGroup).toHaveCSS('color-scheme', 'dark')
    await expect(action).toHaveCSS('background-color', 'rgb(59, 130, 246)')

    await page.emulateMedia({ forcedColors: 'active' })
    await action.focus()
    await expect(action).toHaveCSS('outline-style', 'solid')
    await expect(action).toHaveCSS('box-shadow', 'none')
  } finally {
    await playground.close()
  }
})
