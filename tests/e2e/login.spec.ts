import { test, expect } from '@playwright/test'

test.describe('Autenticación de Usuario', () => {
  test('debería permitir al usuario iniciar sesión y ver sus datos', async ({
    page,
  }) => {
    await page.goto('/login')

    await page.waitForTimeout(1000)

    await page.getByPlaceholder('ej. emilys').fill('emilys')
    await page.getByPlaceholder('Password').fill('emilyspass')

    await page.getByRole('button', { name: 'Iniciar Sesión' }).click()

    await expect(page).toHaveURL(/.*products/, { timeout: 10000 })

    const profileName = page.getByText('Emily', { exact: true })
    await expect(profileName).toBeVisible()
  })
})
