import { test, expect } from '@fixtures/auth.fixture'

test.describe('auth', () => {
  test('should redirect unauthorized user to the login page', async ({
    page
  }) => {
    await page.goto('http://localhost:5173/')
    await expect(page).toHaveURL('http://localhost:5173/login')
  })

  test('Should redirect to the home page when a new account is created', async ({
    loginPage,
    user_credentials,
    page,
    storage
  }) => {
    const navigation = page.waitForURL('http://localhost:5173')
    await loginPage.populateForm(
      user_credentials.username,
      user_credentials.password
    )
    await page.click('#signup')
    await navigation

    const localStorage = await storage.localStorage

    await expect(localStorage).toHaveProperty('quoots-user')
    await expect(page).toHaveURL('http://localhost:5173')
  })

  test('Should redirect to the home page when a user logs in', async ({
    loginPage,
    validUser,
    user_credentials,
    page,
    storage
  }) => {
    const navigation = page.waitForURL('http://localhost:5173')
    await loginPage.populateForm(validUser.username, user_credentials.password)
    await page.click('#login')
    await navigation

    const localStorage = await storage.localStorage

    await expect(localStorage).toHaveProperty('quoots-user')
    await expect(page).toHaveURL('http://localhost:5173')
  })
})
