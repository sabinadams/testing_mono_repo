import { testBase } from '@fixtures/base.fixture'

import { LoginPage } from '@pages/login.page'
import { LocalStorage } from '@helpers/LocalStorage'

type AuthFixtures = {
  loginPage: LoginPage
  storage: LocalStorage
}

export const test = testBase.extend<AuthFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await use(loginPage)
  },
  storage: async ({ page }, use) => {
    const storage = new LocalStorage(page.context())
    await use(storage)
  }
})

export { expect } from '@playwright/test'
