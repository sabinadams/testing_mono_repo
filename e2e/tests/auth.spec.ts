import { test, expect } from '@fixtures/auth.fixture'

test.describe('auth', () => {
  test('should redirect unauthorized user to the login page', async ({
    page
  }) => {
    await page.goto('http://localhost:5173/')
    await expect(page).toHaveURL('http://localhost:5173/login')
  })

  test('should redirect to the home page when a new account is created', async ({
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

  test('should redirect to the home page when a user logs in', async ({
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

  test('should warn you if your login is incorrect', async ({
    loginPage,
    page
  }) => {
    const navigation = page.waitForURL('http://localhost:5173/login')

    await loginPage.populateForm('incorrect', 'password')
    await page.click('#login')
    await navigation

    await expect(page).toHaveURL('http://localhost:5173/login')
    await expect(page.getByText('Account not found.')).toBeVisible()
  })

  test('should warn you if an you try to sign up with an existing username', async ({
    loginPage,
    validUser,
    page
  }) => {
    const navigation = page.waitForURL('http://localhost:5173/login')

    await loginPage.populateForm(validUser.username, 'password')
    await page.click('#signup')
    await navigation

    await expect(page).toHaveURL('http://localhost:5173/login')
    await expect(
      page.getByText('A user already exists with that username')
    ).toBeVisible()
  })

  test('should warn you if your form is empty', async ({ page, loginPage }) => {
    await loginPage.page.click('#login')

    await expect(page).toHaveURL('http://localhost:5173/login')
    await expect(
      page.getByText('Please enter a username and password')
    ).toBeVisible()
  })

  test('should return you to the home page when you log out', async ({
    page,
    loginPage,
    validUser,
    user_credentials,
    storage
  }) => {
    const navigationToHome = page.waitForURL('http://localhost:5173')
    const navigationToLogin = page.waitForURL('http://localhost:5173/login')

    await loginPage.populateForm(validUser.username, user_credentials.password)
    await page.click('#login')
    await navigationToHome
    await page.click('#logout')
    await navigationToLogin

    const localStorage = await storage.localStorage

    await expect(page).toHaveURL('http://localhost:5173/login')
    await expect(localStorage).not.toHaveProperty('quoots-user')
  })
})
