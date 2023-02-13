import { test, expect } from '@fixtures/auth.fixture'

test.describe('auth', () => {
  test('should redirect unauthorized user to the login page', async ({
    page
  }) => {
    await page.goto('http://localhost:5173/')
    await expect(page).toHaveURL('http://localhost:5173/login')
  })

  test('should allow a user to log in', async ({
    loginPage,
    user_credentials,
    page
  }) => {
    await loginPage.login(user_credentials.username, user_credentials.password)
    await expect(page).toHaveURL('http://localhost:5173/login')
  })
})
