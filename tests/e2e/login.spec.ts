import { test, expect } from '@playwright/test'

test.describe('Autenticación de Usuario', () => {
  test('debería permitir al usuario iniciar sesión y ver sus datos', async ({
    page,
  }) => {
    await page.goto('/login', { waitUntil: 'networkidle' })

    await page.fill('input[name="username"]', 'emilys')
    await page.fill('input[name="password"]', 'emilyspass')

    await page.click('button[type="submit"]')

    await expect(page).toHaveURL(/.*products/, { timeout: 10000 })

    const userName = page.getByText('Emily', { exact: true }).first()
    await expect(userName).toBeVisible()
  })
})