import { test as base } from '@playwright/test'
import { LoginPage } from '@pages/login.page'
import { LocalStorage } from '@helpers/LocalStorage'
import prisma from '@helpers/prisma'
import { faker } from '@faker-js/faker'

type UserDetails = {
  username: string
  password: string
}

type AuthFixtures = {
  user_credentials: UserDetails
  account: UserDetails
  loginPage: LoginPage
  storage: LocalStorage
}

export const test = base.extend<AuthFixtures>({
  user_credentials: async ({}, use) => {
    const username = faker.internet.userName()
    const password = faker.internet.password()

    await use({
      username,
      password
    })

    await prisma.user.deleteMany({ where: { username } })
  },
  account: async ({ browser, user_credentials }, use) => {
    const page = await browser.newPage()
    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.populateForm(
      user_credentials.username,
      user_credentials.password
    )

    await page.click('#signup')
    await page.waitForURL('http://localhost:5173')
    await page.close()

    await use(user_credentials)
  },
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