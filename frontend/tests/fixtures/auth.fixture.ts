import { test as base, expect } from '@playwright/test'
import { LoginPage } from '@pages/login.page'

type AuthFixtures = {
  loginPage: LoginPage
  user_credentials: {
    username: string
    password: string
  }
}

export const test = base.extend<AuthFixtures>({
  user_credentials: {
    username: 'username',
    password: 'password'
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await use(loginPage)
  }
})

export { expect } from '@playwright/test'
